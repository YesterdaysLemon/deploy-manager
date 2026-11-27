import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  ApprovalError,
  b64url,
  canonicalAsk,
  newAsk,
  parseRegistration,
  sha256,
  verifyAssertion,
} from "../bin/approval-gate.mjs";
import { ORIGIN, RP_ID, softwarePasskey } from "./passkey.mjs";

const GATE = fileURLToPath(new URL("../bin/approval-gate.mjs", import.meta.url));
const SHA = "0123456789abcdef0123456789abcdef01234567";
const IMAGE = `sha256:${"ab".repeat(32)}`;

function anAsk(overrides = {}) {
  return canonicalAsk({ ...newAsk({ app: "app-one", sha: SHA, image: IMAGE, ttlSeconds: 900 }), ...overrides });
}

function refuses(code, fn) {
  assert.throws(fn, (error) => error instanceof ApprovalError && error.code === code, `expected ${code}`);
}

test("a passkey yes over the exact ask is accepted", () => {
  const key = softwarePasskey();
  const askBytes = anAsk();
  const result = verifyAssertion({ askBytes, assertion: key.sign(askBytes), approver: key.approver });
  assert.equal(result.ask.image, IMAGE);
});

test("a yes for one ask does not approve a changed ask", () => {
  const key = softwarePasskey();
  const signedFor = anAsk();
  const changed = canonicalAsk({ ...JSON.parse(signedFor), image: `sha256:${"cd".repeat(32)}` });
  refuses("challenge_mismatch", () => verifyAssertion({ askBytes: changed, assertion: key.sign(signedFor), approver: key.approver }));
});

test("expired asks, other origins, other relying parties and unverified users are refused", () => {
  const key = softwarePasskey();
  const past = canonicalAsk(newAsk({ app: "app-one", sha: SHA, image: IMAGE, ttlSeconds: 30, now: Date.now() - 60_000 }));
  refuses("ask_expired", () => verifyAssertion({ askBytes: past, assertion: key.sign(past), approver: key.approver }));
  const askBytes = anAsk();
  refuses("origin_mismatch", () => verifyAssertion({ askBytes, assertion: key.sign(askBytes, { signOrigin: "https://evil.example" }), approver: key.approver }));
  refuses("rp_id_mismatch", () => verifyAssertion({ askBytes, assertion: key.sign(askBytes, { signRpId: "evil.example" }), approver: key.approver }));
  refuses("user_not_verified", () => verifyAssertion({ askBytes, assertion: key.sign(askBytes, { flags: 0x01 }), approver: key.approver }));
  refuses("client_data_wrong_type", () => verifyAssertion({ askBytes, assertion: key.sign(askBytes, { type: "webauthn.create" }), approver: key.approver }));
});

test("another passkey, a forged signature and a non-canonical ask are refused", () => {
  const key = softwarePasskey();
  const stranger = softwarePasskey();
  const askBytes = anAsk();
  refuses("unknown_credential", () => verifyAssertion({ askBytes, assertion: stranger.sign(askBytes), approver: key.approver }));
  const forged = { ...stranger.sign(askBytes), credentialId: key.approver.credentialId };
  refuses("bad_signature", () => verifyAssertion({ askBytes, assertion: forged, approver: key.approver }));
  const spaced = Buffer.from(JSON.stringify(JSON.parse(askBytes), null, 1));
  refuses("ask_not_canonical", () => verifyAssertion({ askBytes: spaced, assertion: key.sign(spaced), approver: key.approver }));
});

function gate(...argv) {
  return spawnSync(process.execPath, [GATE, ...argv], { encoding: "utf8" });
}

test("the root CLI opens an ask, grants one yes, and refuses the same yes twice", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "approval-gate-"));
  try {
    const askDir = path.join(tmp, "asks");
    const spentDir = path.join(tmp, "spent");
    fs.mkdirSync(askDir);
    fs.mkdirSync(spentDir);
    const key = softwarePasskey();
    fs.writeFileSync(path.join(tmp, "approver.json"), JSON.stringify(key.approver));

    const opened = gate("open", "--app", "app-one", "--sha", SHA, "--image", IMAGE, "--ttl", "900", "--ask-dir", askDir);
    assert.equal(opened.status, 0, opened.stdout + opened.stderr);
    const nonce = opened.stdout.trim();
    const askFile = path.join(askDir, `${nonce}.json`);
    const answerFile = path.join(tmp, `${nonce}.answer.json`);
    fs.writeFileSync(answerFile, JSON.stringify(key.sign(fs.readFileSync(askFile))));

    const verify = () => gate("verify", "--ask-file", askFile, "--answer-file", answerFile, "--approver", path.join(tmp, "approver.json"), "--spent-dir", spentDir);
    const first = verify();
    assert.equal(first.status, 0, first.stdout + first.stderr);
    assert.match(first.stdout, /approval=granted/);
    const second = verify();
    assert.equal(second.status, 1);
    assert.match(second.stdout, /reason=yes_already_spent/);

    fs.writeFileSync(answerFile, JSON.stringify({ decision: "deny", nonce }));
    assert.equal(verify().status, 3);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("the root CLI will not follow a link planted in place of an answer", { skip: process.platform === "win32" }, () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "approval-gate-"));
  try {
    const key = softwarePasskey();
    fs.writeFileSync(path.join(tmp, "approver.json"), JSON.stringify(key.approver));
    const opened = gate("open", "--app", "app-one", "--sha", SHA, "--image", IMAGE, "--ttl", "900", "--ask-dir", tmp);
    const nonce = opened.stdout.trim();
    fs.symlinkSync(path.join(tmp, "approver.json"), path.join(tmp, "answer.json"));
    const result = gate("verify", "--ask-file", path.join(tmp, `${nonce}.json`), "--answer-file", path.join(tmp, "answer.json"), "--approver", path.join(tmp, "approver.json"), "--spent-dir", tmp);
    assert.equal(result.status, 1);
    assert.match(result.stdout, /reason=file_unreadable/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

// A tiny CBOR writer, enough to build an attestation object for the test.
function cbor(value) {
  const head = (major, n) => {
    if (n < 24) return Buffer.from([(major << 5) | n]);
    if (n < 256) return Buffer.from([(major << 5) | 24, n]);
    const b = Buffer.alloc(3); b[0] = (major << 5) | 25; b.writeUInt16BE(n, 1); return b;
  };
  if (Buffer.isBuffer(value)) return Buffer.concat([head(2, value.length), value]);
  if (typeof value === "string") { const b = Buffer.from(value); return Buffer.concat([head(3, b.length), b]); }
  if (Number.isInteger(value)) return value >= 0 ? head(0, value) : head(1, -1 - value);
  if (value instanceof Map) return Buffer.concat([head(5, value.size), ...[...value].flatMap(([k, v]) => [cbor(k), cbor(v)])]);
  throw new Error("unsupported");
}

test("a passkey registration becomes an approver record that verifies its yeses", () => {
  const key = softwarePasskey();
  const jwk = key.publicKey.export({ format: "jwk" });
  const credentialId = Buffer.from(key.approver.credentialId, "base64url");
  const cose = cbor(new Map([[1, 2], [3, -7], [-1, 1], [-2, Buffer.from(jwk.x, "base64url")], [-3, Buffer.from(jwk.y, "base64url")]]));
  const idLength = Buffer.alloc(2); idLength.writeUInt16BE(credentialId.length);
  const authData = Buffer.concat([sha256(RP_ID), Buffer.from([0x45]), Buffer.alloc(4), Buffer.alloc(16), idLength, credentialId, cose]);
  const challenge = b64url(crypto.randomBytes(32));
  const clientDataJSON = b64url(Buffer.from(JSON.stringify({ type: "webauthn.create", challenge, origin: ORIGIN })));
  const attestationObject = b64url(cbor(new Map([["fmt", "none"], ["attStmt", new Map()], ["authData", authData]])));

  const approver = parseRegistration({ attestationObject, clientDataJSON, challenge, rpId: RP_ID, origin: ORIGIN });
  assert.equal(approver.credentialId, key.approver.credentialId);
  const askBytes = anAsk();
  assert.doesNotThrow(() => verifyAssertion({ askBytes, assertion: key.sign(askBytes), approver }));
  refuses("challenge_mismatch", () => parseRegistration({ attestationObject, clientDataJSON, challenge: "other", rpId: RP_ID, origin: ORIGIN }));
});

test("any enrolled key can say yes, and a key that was removed cannot", async () => {
  const { addApprover, removeApprover } = await import("../bin/approval-gate.mjs");
  const phone = softwarePasskey();
  const keychain = softwarePasskey();
  let file = addApprover(null, { ...phone.approver, label: "phone" });
  file = addApprover(file, { ...keychain.approver, label: "keychain YubiKey" });
  const askBytes = anAsk();
  assert.equal(verifyAssertion({ askBytes, assertion: phone.sign(askBytes), approver: file }).label, "phone");
  assert.equal(verifyAssertion({ askBytes, assertion: keychain.sign(askBytes), approver: file }).label, "keychain YubiKey");
  refuses("approver_duplicate", () => addApprover(file, phone.approver));
  const without = removeApprover(file, phone.approver.credentialId);
  refuses("unknown_credential", () => verifyAssertion({ askBytes, assertion: phone.sign(askBytes), approver: without }));
  refuses("approver_last_one", () => removeApprover(without, keychain.approver.credentialId));
  // The first, single-record format still works.
  assert.doesNotThrow(() => verifyAssertion({ askBytes, assertion: phone.sign(askBytes), approver: phone.approver }));
});

test("the install command from the enroll page adds a key and keeps the others", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "approval-gate-"));
  try {
    const file = path.join(tmp, "approver.json");
    const phone = softwarePasskey();
    fs.writeFileSync(file, JSON.stringify(phone.approver)); // an existing single-record file
    const keychain = softwarePasskey();
    const record = JSON.stringify({ ...keychain.approver, label: "keychain YubiKey" });
    const added = spawnSync("sh", ["-c", `printf '%s\\n' '${record}' | "${process.execPath}" "${GATE}" add-approver --file "${file}"`], { encoding: "utf8" });
    assert.equal(added.status, 0, added.stdout + added.stderr);
    assert.match(added.stdout, /approvers=2/);
    const listed = gate("list-approvers", "--file", file);
    assert.match(listed.stdout, /keychain YubiKey/);
    assert.equal(listed.stdout.trim().split("\n").length, 2);
    const again = spawnSync("sh", ["-c", `printf '%s\\n' '${record}' | "${process.execPath}" "${GATE}" add-approver --file "${file}"`], { encoding: "utf8" });
    assert.match(again.stdout, /reason=approver_duplicate/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
