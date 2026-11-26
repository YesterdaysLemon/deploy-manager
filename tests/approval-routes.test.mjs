import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import { createServer } from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { canonicalAsk, newAsk } from "../bin/approval-gate.mjs";
import { ORIGIN, RP_ID, softwarePasskey } from "./passkey.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SHA = "0123456789abcdef0123456789abcdef01234567";
const IMAGE = `sha256:${"ab".repeat(32)}`;

function reservePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

async function withManager(fn) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "manager-approvals-"));
  const askDir = path.join(tmp, "asks");
  const answerDir = path.join(tmp, "answers");
  fs.mkdirSync(askDir);
  const key = softwarePasskey();
  const approverFile = path.join(tmp, "approver.json");
  fs.writeFileSync(approverFile, JSON.stringify(key.approver));
  const ask = newAsk({ app: "app-one", sha: SHA, image: IMAGE, ttlSeconds: 900 });
  const askBytes = canonicalAsk(ask);
  fs.writeFileSync(path.join(askDir, `${ask.nonce}.json`), askBytes);

  const port = await reservePort();
  const url = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [path.join(ROOT, "src", "server.mjs")], {
    env: {
      ...process.env,
      DEPLOY_MANAGER_APPS_FILE: path.join(ROOT, "examples", "apps.json"),
      DEPLOY_MANAGER_PORT: String(port),
      DEPLOY_MANAGER_STATE_DIR: tmp,
      DEPLOY_MANAGER_PROBES_ENABLED: "false",
      DEPLOY_MANAGER_APPROVAL_ASK_DIR: askDir,
      DEPLOY_MANAGER_APPROVAL_ANSWER_DIR: answerDir,
      DEPLOY_MANAGER_APPROVER_FILE: approverFile,
      DEPLOY_MANAGER_APPROVAL_RP_ID: RP_ID,
      DEPLOY_MANAGER_APPROVAL_ORIGIN: ORIGIN,
      PORTFOLIO_DEPLOY_WEBHOOK_SECRET: "test-only",
      APP_ONE_DEPLOY_WEBHOOK_SECRET: "test-only",
      APP_TWO_DEPLOY_WEBHOOK_SECRET: "test-only",
    },
    stdio: "ignore",
  });
  try {
    for (let attempt = 0; ; attempt += 1) {
      try {
        if ((await fetch(`${url}/healthz`)).ok) break;
      } catch {
        if (attempt > 100) throw new Error("manager did not start");
      }
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    await fn({ url, ask, askBytes, key, answerDir });
  } finally {
    child.kill();
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

const post = (url, body, origin = ORIGIN) => fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: origin },
  body: JSON.stringify(body),
});

test("the manager lists open asks with the exact bytes to sign and the approval page", async () => {
  await withManager(async ({ url, ask, askBytes, key }) => {
    const data = await (await fetch(`${url}/api/approvals`)).json();
    assert.equal(data.asks.length, 1);
    assert.equal(data.asks[0].nonce, ask.nonce);
    assert.equal(Buffer.from(data.asks[0].askB64, "base64url").toString(), askBytes.toString());
    assert.equal(data.approver.credentialId, key.approver.credentialId);
    const page = await fetch(`${url}/approve`);
    assert.equal(page.status, 200);
    assert.match(page.headers.get("content-security-policy"), /script-src 'self'/);
  });
});

test("a good yes is handed to the root side once, and a bad one is turned back", async () => {
  await withManager(async ({ url, ask, askBytes, key, answerDir }) => {
    const { softwarePasskey: another } = await import("./passkey.mjs");
    const stranger = another();
    const forged = { ...stranger.sign(askBytes), credentialId: key.approver.credentialId };
    const bad = await post(`${url}/api/approvals/${ask.nonce}`, forged);
    assert.equal(bad.status, 400);
    assert.equal((await bad.json()).error, "bad_signature");
    assert.equal(fs.existsSync(path.join(answerDir, `${ask.nonce}.json`)), false);

    const good = await post(`${url}/api/approvals/${ask.nonce}`, key.sign(askBytes));
    assert.equal(good.status, 202);
    const written = JSON.parse(fs.readFileSync(path.join(answerDir, `${ask.nonce}.json`), "utf8"));
    assert.equal(written.decision, "approve");
    assert.equal(written.nonce, ask.nonce);

    const again = await post(`${url}/api/approvals/${ask.nonce}`, key.sign(askBytes));
    assert.equal(again.status, 409);
  });
});

test("answers from another origin and asks that do not exist are refused", async () => {
  await withManager(async ({ url, ask, askBytes, key }) => {
    const elsewhere = await post(`${url}/api/approvals/${ask.nonce}`, key.sign(askBytes), "https://evil.example");
    assert.equal(elsewhere.status, 403);
    const missing = await post(`${url}/api/approvals/${"0".repeat(32)}`, { decision: "deny" });
    assert.equal(missing.status, 404);
    const enroll = await post(`${url}/api/enroll/options`, {}, "https://evil.example");
    assert.equal(enroll.status, 403);
    const options = await (await post(`${url}/api/enroll/options`, {})).json();
    assert.equal(options.rp.id, RP_ID);
    assert.equal(options.authenticatorSelection.userVerification, "required");
  });
});
