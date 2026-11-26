#!/usr/bin/env node
// The approval gate: a production swap waits for a passkey signature over
// the exact release (app, commit and built image ID).
//
// Root plane. deploy-app.sh runs this file as root from
// /usr/local/libexec/deploy-manager/ to open an ask and to verify an answer.
// The unprivileged manager imports the same functions to show asks, to give
// early feedback on an answer and to turn a passkey registration into an
// approver record. Only the root side decides; the manager is never trusted.
//
// No dependencies: node:crypto verifies ES256 and Ed25519 WebAuthn
// assertions, and a small CBOR reader parses registrations.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const POLICY = "y0-1";
export const MAX_ANSWER_BYTES = 16384;
const NONCE = /^[0-9a-f]{32}$/;
const APP = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
const SHA = /^[0-9a-f]{40}$/i;
const IMAGE = /^sha256:[0-9a-f]{64}$/;
const B64URL = /^[A-Za-z0-9_-]*$/;

export class ApprovalError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

export function b64url(buffer) {
  return Buffer.from(buffer).toString("base64url");
}

export function fromB64url(value, field) {
  if (typeof value !== "string" || !B64URL.test(value)) throw new ApprovalError(`bad_${field}`);
  return Buffer.from(value, "base64url");
}

export function sha256(data) {
  return crypto.createHash("sha256").update(data).digest();
}

// One canonical form for an ask: keys sorted, only strings and safe
// integers, no whitespace. The challenge the passkey signs is the hash of
// exactly these bytes, so the same ask always yields the same challenge.
export function canonicalAsk(ask) {
  const sorted = {};
  for (const key of Object.keys(ask).sort()) {
    const value = ask[key];
    if (typeof value === "string" || Number.isSafeInteger(value)) sorted[key] = value;
    else throw new ApprovalError(`ask_field_type_${key}`);
  }
  return Buffer.from(JSON.stringify(sorted), "utf8");
}

export function challengeFor(askBytes) {
  return b64url(sha256(askBytes));
}

export function newAsk({ app, sha, image, ttlSeconds, now = Date.now(), nonce }) {
  if (!APP.test(app ?? "")) throw new ApprovalError("bad_app");
  if (!SHA.test(sha ?? "")) throw new ApprovalError("bad_sha");
  if (!IMAGE.test(image ?? "")) throw new ApprovalError("bad_image");
  const ttl = Number(ttlSeconds);
  if (!Number.isSafeInteger(ttl) || ttl < 5 || ttl > 86400) throw new ApprovalError("bad_ttl");
  const created = Math.floor(now / 1000);
  return {
    app,
    created_at: created,
    expires_at: created + ttl,
    image,
    nonce: nonce ?? crypto.randomBytes(16).toString("hex"),
    policy: POLICY,
    sha: sha.toLowerCase(),
  };
}

export function parseAsk(askBytes) {
  let ask;
  try {
    ask = JSON.parse(Buffer.from(askBytes).toString("utf8"));
  } catch {
    throw new ApprovalError("ask_unreadable");
  }
  if (!ask || typeof ask !== "object" || Array.isArray(ask)) throw new ApprovalError("ask_unreadable");
  if (!canonicalAsk(ask).equals(Buffer.from(askBytes))) throw new ApprovalError("ask_not_canonical");
  if (ask.policy !== POLICY) throw new ApprovalError("ask_policy_unknown");
  if (!NONCE.test(ask.nonce ?? "") || !APP.test(ask.app ?? "") || !SHA.test(ask.sha ?? "") || !IMAGE.test(ask.image ?? "")) {
    throw new ApprovalError("ask_fields_invalid");
  }
  return ask;
}

function publicKeyFrom(approver) {
  try {
    return crypto.createPublicKey(approver.publicKey);
  } catch {
    throw new ApprovalError("approver_key_unreadable");
  }
}

// The approver file holds one or more enrolled authenticators: a phone, a
// security key on a keychain, a spare. It may be a single record (the first
// format) or {"approvers": [record, ...]}. Any one of them can say yes.
export const MAX_APPROVERS = 16;

export function approversFrom(parsed) {
  const list = Array.isArray(parsed?.approvers) ? parsed.approvers : parsed && typeof parsed === "object" && !Array.isArray(parsed) && parsed.credentialId ? [parsed] : null;
  if (!list || list.length === 0) throw new ApprovalError("approver_missing");
  if (list.length > MAX_APPROVERS) throw new ApprovalError("approver_too_many");
  const seen = new Set();
  for (const record of list) {
    validateApprover(record);
    if (seen.has(record.credentialId)) throw new ApprovalError("approver_duplicate");
    seen.add(record.credentialId);
  }
  return list;
}

export function validateApprover(approver) {
  if (!approver || typeof approver !== "object") throw new ApprovalError("approver_missing");
  for (const field of ["credentialId", "publicKey", "rpId", "origin"]) {
    if (typeof approver[field] !== "string" || approver[field] === "") throw new ApprovalError(`approver_${field}_missing`);
  }
  if (approver.alg !== -7 && approver.alg !== -8) throw new ApprovalError("approver_alg_unsupported");
  publicKeyFrom(approver);
  return approver;
}

// Checks one WebAuthn assertion against one ask. Throws ApprovalError with a
// stable code on any failure. It does not record the yes as spent; the root
// CLI does that atomically after this returns.
export function verifyAssertion({ askBytes, assertion, approver, approvers, now = Date.now() }) {
  const ask = parseAsk(askBytes);
  const enrolled = approvers ?? approversFrom(approver);
  if (Math.floor(now / 1000) >= ask.expires_at) throw new ApprovalError("ask_expired");
  if (!assertion || typeof assertion !== "object") throw new ApprovalError("answer_unreadable");
  if (assertion.nonce !== ask.nonce) throw new ApprovalError("answer_for_other_ask");
  approver = enrolled.find((record) => record.credentialId === assertion.credentialId);
  if (!approver) throw new ApprovalError("unknown_credential");

  const clientDataBytes = fromB64url(assertion.clientDataJSON, "client_data");
  const authData = fromB64url(assertion.authenticatorData, "authenticator_data");
  const signature = fromB64url(assertion.signature, "signature");

  let clientData;
  try {
    clientData = JSON.parse(clientDataBytes.toString("utf8"));
  } catch {
    throw new ApprovalError("client_data_unreadable");
  }
  if (clientData.type !== "webauthn.get") throw new ApprovalError("client_data_wrong_type");
  if (clientData.challenge !== challengeFor(askBytes)) throw new ApprovalError("challenge_mismatch");
  if (clientData.origin !== approver.origin) throw new ApprovalError("origin_mismatch");
  if (clientData.crossOrigin === true) throw new ApprovalError("cross_origin");

  if (authData.length < 37) throw new ApprovalError("authenticator_data_short");
  if (!authData.subarray(0, 32).equals(sha256(approver.rpId))) throw new ApprovalError("rp_id_mismatch");
  const flags = authData[32];
  if ((flags & 0x01) === 0) throw new ApprovalError("user_not_present");
  if ((flags & 0x04) === 0) throw new ApprovalError("user_not_verified");

  const signed = Buffer.concat([authData, sha256(clientDataBytes)]);
  const key = publicKeyFrom(approver);
  const valid = approver.alg === -8
    ? crypto.verify(null, signed, key, signature)
    : crypto.verify("sha256", signed, { key, dsaEncoding: "der" }, signature);
  if (!valid) throw new ApprovalError("bad_signature");
  return { ask, signCount: authData.readUInt32BE(33), credentialId: approver.credentialId, label: approver.label ?? "" };
}

// --- Registration: a passkey's attestation becomes an approver record. ---

function readCbor(buffer, start = 0) {
  let offset = start;
  const need = (n) => {
    if (offset + n > buffer.length) throw new ApprovalError("cbor_truncated");
  };
  const length = (info) => {
    if (info < 24) return info;
    const size = { 24: 1, 25: 2, 26: 4, 27: 8 }[info];
    if (!size) throw new ApprovalError("cbor_unsupported");
    need(size);
    const value = size === 8 ? Number(buffer.readBigUInt64BE(offset)) : buffer.readUIntBE(offset, size);
    offset += size;
    return value;
  };
  const item = (depth) => {
    if (depth > 8) throw new ApprovalError("cbor_too_deep");
    need(1);
    const first = buffer[offset++];
    const major = first >> 5;
    const info = first & 31;
    if (major === 7) {
      if (info === 20) return false;
      if (info === 21) return true;
      if (info === 22) return null;
      throw new ApprovalError("cbor_unsupported");
    }
    const n = length(info);
    switch (major) {
      case 0: return n;
      case 1: return -1 - n;
      case 2: need(n); offset += n; return buffer.subarray(offset - n, offset);
      case 3: need(n); offset += n; return buffer.subarray(offset - n, offset).toString("utf8");
      case 4: return Array.from({ length: n }, () => item(depth + 1));
      case 5: {
        const map = new Map();
        for (let i = 0; i < n; i += 1) map.set(item(depth + 1), item(depth + 1));
        return map;
      }
      default: throw new ApprovalError("cbor_unsupported");
    }
  };
  const value = item(0);
  return { value, end: offset };
}

function coseToPublicKey(cose) {
  const kty = cose.get(1);
  const alg = cose.get(3);
  if (kty === 2 && alg === -7 && cose.get(-1) === 1) {
    const x = cose.get(-2);
    const y = cose.get(-3);
    if (!Buffer.isBuffer(x) || !Buffer.isBuffer(y) || x.length !== 32 || y.length !== 32) throw new ApprovalError("cose_key_invalid");
    return { alg, key: crypto.createPublicKey({ key: { kty: "EC", crv: "P-256", x: b64url(x), y: b64url(y) }, format: "jwk" }) };
  }
  if (kty === 1 && alg === -8 && cose.get(-1) === 6) {
    const x = cose.get(-2);
    if (!Buffer.isBuffer(x) || x.length !== 32) throw new ApprovalError("cose_key_invalid");
    return { alg, key: crypto.createPublicKey({ key: { kty: "OKP", crv: "Ed25519", x: b64url(x) }, format: "jwk" }) };
  }
  throw new ApprovalError("cose_alg_unsupported");
}

// Turns navigator.credentials.create() output into an approver record. The
// caller checks the challenge it issued. Nothing here installs the record:
// an operator copies it into /etc/deploy-manager/approver.json as root.
export function parseRegistration({ attestationObject, clientDataJSON, challenge, rpId, origin, label = "", now = Date.now() }) {
  const clientDataBytes = fromB64url(clientDataJSON, "client_data");
  let clientData;
  try {
    clientData = JSON.parse(clientDataBytes.toString("utf8"));
  } catch {
    throw new ApprovalError("client_data_unreadable");
  }
  if (clientData.type !== "webauthn.create") throw new ApprovalError("client_data_wrong_type");
  if (clientData.challenge !== challenge) throw new ApprovalError("challenge_mismatch");
  if (clientData.origin !== origin) throw new ApprovalError("origin_mismatch");

  const { value: attestation } = readCbor(fromB64url(attestationObject, "attestation"));
  if (!(attestation instanceof Map)) throw new ApprovalError("attestation_invalid");
  const authData = attestation.get("authData");
  if (!Buffer.isBuffer(authData) || authData.length < 55) throw new ApprovalError("authenticator_data_short");
  if (!authData.subarray(0, 32).equals(sha256(rpId))) throw new ApprovalError("rp_id_mismatch");
  const flags = authData[32];
  if ((flags & 0x04) === 0) throw new ApprovalError("user_not_verified");
  if ((flags & 0x40) === 0) throw new ApprovalError("no_credential_data");
  const idLength = authData.readUInt16BE(53);
  if (authData.length < 55 + idLength + 1) throw new ApprovalError("authenticator_data_short");
  const credentialId = authData.subarray(55, 55 + idLength);
  const { value: cose } = readCbor(authData, 55 + idLength);
  if (!(cose instanceof Map)) throw new ApprovalError("cose_key_invalid");
  const { alg, key } = coseToPublicKey(cose);
  return {
    credentialId: b64url(credentialId),
    label: cleanLabel(label),
    alg,
    publicKey: key.export({ type: "spki", format: "pem" }),
    rpId,
    origin,
    enrolledAt: new Date(now).toISOString(),
  };
}

export function cleanLabel(label) {
  return String(label ?? "").replace(/[^\p{L}\p{N} ._-]/gu, "").trim().slice(0, 40);
}

// Adds an enrolled record to an approver file's contents, refusing a
// duplicate. Returns the new contents as {"approvers": [...]}.
export function addApprover(existing, record) {
  const list = existing ? approversFrom(existing) : [];
  validateApprover(record);
  if (list.some((item) => item.credentialId === record.credentialId)) throw new ApprovalError("approver_duplicate");
  const next = { approvers: [...list, { ...record, label: cleanLabel(record.label) }] };
  approversFrom(next);
  return next;
}

export function removeApprover(existing, credentialId) {
  const list = approversFrom(existing);
  const rest = list.filter((item) => item.credentialId !== credentialId);
  if (rest.length === list.length) throw new ApprovalError("approver_not_found");
  if (rest.length === 0) throw new ApprovalError("approver_last_one");
  return { approvers: rest };
}

// --- Files. Answers come from the unprivileged manager, so they are read
// without following links, only as small regular files. ---

export function readSmallFile(file, limit = MAX_ANSWER_BYTES) {
  let fd;
  try {
    fd = fs.openSync(file, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0));
  } catch {
    throw new ApprovalError("file_unreadable");
  }
  try {
    const stat = fs.fstatSync(fd);
    if (!stat.isFile()) throw new ApprovalError("file_not_regular");
    if (stat.size > limit) throw new ApprovalError("file_too_large");
    const buffer = Buffer.alloc(stat.size);
    fs.readSync(fd, buffer, 0, stat.size, 0);
    return buffer;
  } finally {
    fs.closeSync(fd);
  }
}

function writeNew(file, data, mode) {
  const fd = fs.openSync(file, fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL | (fs.constants.O_NOFOLLOW ?? 0), mode);
  try {
    fs.writeSync(fd, data);
  } finally {
    fs.closeSync(fd);
  }
}

function args(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i]?.startsWith("--")) throw new ApprovalError("bad_arguments");
    out[argv[i].slice(2)] = argv[i + 1];
  }
  return out;
}

// open: write a new ask, print its nonce.
// verify: check an answer; exit 0 granted, 3 denied, 1 refused.
export function main(argv) {
  const [command, ...rest] = argv;
  const options = args(rest);
  if (command === "open") {
    const ask = newAsk({ app: options.app, sha: options.sha, image: options.image, ttlSeconds: options.ttl });
    writeNew(path.join(options["ask-dir"], `${ask.nonce}.json`), canonicalAsk(ask), 0o644);
    process.stdout.write(`${ask.nonce}\n`);
    return 0;
  }
  if (command === "verify") {
    const askBytes = readSmallFile(options["ask-file"]);
    const ask = parseAsk(askBytes);
    let answer;
    try {
      answer = JSON.parse(readSmallFile(options["answer-file"]).toString("utf8"));
    } catch (error) {
      throw error instanceof ApprovalError ? error : new ApprovalError("answer_unreadable");
    }
    if (answer?.decision === "deny" && answer.nonce === ask.nonce) {
      process.stdout.write(`approval=denied nonce=${ask.nonce}\n`);
      return 3;
    }
    if (answer?.decision !== "approve") throw new ApprovalError("answer_decision_unknown");
    let approver;
    try {
      approver = JSON.parse(readSmallFile(options.approver).toString("utf8"));
    } catch {
      throw new ApprovalError("approver_unreadable");
    }
    const result = verifyAssertion({ askBytes, assertion: answer, approver });
    // Spending is the last step and is atomic: a second spend of the same
    // nonce finds the record and is refused.
    try {
      writeNew(path.join(options["spent-dir"], ask.nonce), `${new Date().toISOString()} ${ask.app} ${ask.sha} ${ask.image}\n`, 0o600);
    } catch (error) {
      if (error.code === "EEXIST") throw new ApprovalError("yes_already_spent");
      throw new ApprovalError("spent_record_unwritable");
    }
    process.stdout.write(`approval=granted nonce=${ask.nonce} image=${ask.image} key=${result.label || result.credentialId.slice(0, 12)}\n`);
    return 0;
  }
  // Operator commands, run as root on the server. add-approver reads one
  // record (JSON from the enroll page) on stdin.
  if (command === "add-approver" || command === "remove-approver" || command === "list-approvers") {
    const file = options.file;
    if (!file) throw new ApprovalError("bad_arguments");
    let existing = null;
    if (fs.existsSync(file)) {
      try {
        existing = JSON.parse(readSmallFile(file).toString("utf8"));
      } catch {
        throw new ApprovalError("approver_unreadable");
      }
    }
    if (command === "list-approvers") {
      for (const record of existing ? approversFrom(existing) : []) {
        process.stdout.write(`${record.credentialId}\t${record.label || "(no label)"}\t${record.enrolledAt ?? ""}\n`);
      }
      return 0;
    }
    let next;
    if (command === "add-approver") {
      let record;
      try {
        record = JSON.parse(fs.readFileSync(0, "utf8"));
      } catch {
        throw new ApprovalError("record_unreadable");
      }
      if (options.label) record.label = options.label;
      next = addApprover(existing, record);
    } else {
      next = removeApprover(existing, options.credential);
    }
    const temporary = `${file}.${crypto.randomBytes(4).toString("hex")}.tmp`;
    writeNew(temporary, `${JSON.stringify(next, null, 2)}\n`, 0o644);
    fs.renameSync(temporary, file);
    process.stdout.write(`approvers=${next.approvers.length}\n`);
    return 0;
  }
  throw new ApprovalError("unknown_command");
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    const code = error instanceof ApprovalError ? error.code : "internal_error";
    process.stdout.write(`approval=refused reason=${code}\n`);
    process.exitCode = 1;
  }
}
