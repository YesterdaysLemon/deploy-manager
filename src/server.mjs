#!/usr/bin/env node
import { createHmac, timingSafeEqual } from "node:crypto";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createServer } from "node:http";

const {
  DEPLOY_MANAGER_APPS_FILE = "/etc/deploy-manager/apps.json",
  DEPLOY_MANAGER_HOST = "127.0.0.1",
  DEPLOY_MANAGER_PORT = "9000",
  DEPLOY_MANAGER_SCRIPT = "/usr/local/bin/deploy-manager-sudo",
  DEPLOY_MANAGER_MAX_BYTES = "65536",
} = process.env;

const appIdPattern = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
const shaPattern = /^[0-9a-f]{40}$/i;
const deployingApps = new Set();

function loadAppsConfig() {
  const config = JSON.parse(readFileSync(DEPLOY_MANAGER_APPS_FILE, "utf8"));

  if (!config || typeof config !== "object" || !config.apps) {
    throw new Error("apps config must contain an apps object");
  }

  for (const [appId, app] of Object.entries(config.apps)) {
    if (!appIdPattern.test(appId)) {
      throw new Error(`invalid app id in config: ${appId}`);
    }

    if (!app || typeof app !== "object") {
      throw new Error(`app config must be an object: ${appId}`);
    }

    if (!app.secretEnv && !app.secret) {
      throw new Error(`app config needs secretEnv or secret: ${appId}`);
    }

    if (!getSecret(app)) {
      throw new Error(`missing webhook secret for app: ${appId}`);
    }
  }

  return config.apps;
}

function getSecret(app) {
  if (typeof app.secret === "string" && app.secret.length > 0) {
    return app.secret;
  }

  if (typeof app.secretEnv === "string" && app.secretEnv.length > 0) {
    return process.env[app.secretEnv] ?? "";
  }

  return "";
}

function send(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

function verifySignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader?.startsWith("sha256=")) {
    return false;
  }

  const expected = Buffer.from(
    `sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`,
  );
  const received = Buffer.from(signatureHeader);

  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let bytes = 0;
    const maxBytes = Number(DEPLOY_MANAGER_MAX_BYTES);

    request.on("data", (chunk) => {
      bytes += chunk.length;

      if (bytes > maxBytes) {
        reject(new Error("request_too_large"));
        request.destroy();
        return;
      }

      chunks.push(chunk);
    });

    request.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    request.on("error", () => {
      reject(new Error("request_error"));
    });
  });
}

function validatePayload(payload, app) {
  if (!payload || typeof payload !== "object") {
    return "bad_payload";
  }

  const expectedEvent = app.event ?? "push";
  const expectedBranch = app.branch ?? "master";

  if (payload.event !== expectedEvent || payload.branch !== expectedBranch) {
    return "skipped";
  }

  if (app.repo && payload.repo !== app.repo) {
    return "wrong_repo";
  }

  if (!shaPattern.test(payload.sha ?? "")) {
    return "bad_sha";
  }

  return null;
}

function runDeploy(appId, payload, app) {
  return new Promise((resolve, reject) => {
    const child = spawn(DEPLOY_MANAGER_SCRIPT, [appId, payload.sha], {
      env: {
        ...process.env,
        DEPLOY_APP_ID: appId,
        DEPLOY_BRANCH: app.branch ?? "master",
        DEPLOY_SHA: payload.sha,
      },
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`deploy script exited with status ${code}`));
    });
  });
}

const apps = loadAppsConfig();

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");

  if (request.method === "GET" && url.pathname === "/healthz") {
    send(response, 200, { ok: true });
    return;
  }

  const match = /^\/deploy\/([a-z0-9_-]+)$/i.exec(url.pathname);

  if (request.method !== "POST" || !match) {
    send(response, 404, { ok: false, error: "not_found" });
    return;
  }

  const appId = match[1];
  const app = apps[appId];

  if (!app) {
    send(response, 404, { ok: false, error: "unknown_app" });
    return;
  }

  let rawBody;
  try {
    rawBody = await readRequestBody(request);
  } catch (error) {
    send(response, error.message === "request_too_large" ? 413 : 400, {
      ok: false,
      error: error.message,
    });
    return;
  }

  if (
    !verifySignature(
      rawBody,
      request.headers["x-hub-signature-256"],
      getSecret(app),
    )
  ) {
    send(response, 401, { ok: false, error: "bad_signature" });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch {
    send(response, 400, { ok: false, error: "bad_json" });
    return;
  }

  if (request.headers["x-github-event"] !== (app.event ?? "push")) {
    send(response, 202, { ok: true, skipped: true, reason: "wrong_event" });
    return;
  }

  const payloadError = validatePayload(payload, app);

  if (payloadError === "skipped") {
    send(response, 202, { ok: true, skipped: true, reason: "wrong_ref" });
    return;
  }

  if (payloadError) {
    send(response, 400, { ok: false, error: payloadError });
    return;
  }

  if (deployingApps.has(appId)) {
    send(response, 409, { ok: false, error: "deploy_in_progress" });
    return;
  }

  deployingApps.add(appId);

  try {
    await runDeploy(appId, payload, app);
    send(response, 200, { ok: true, app: appId, sha: payload.sha });
  } catch (error) {
    send(response, 500, {
      ok: false,
      app: appId,
      error: error instanceof Error ? error.message : "deploy_failed",
    });
  } finally {
    deployingApps.delete(appId);
  }
});

server.listen(Number(DEPLOY_MANAGER_PORT), DEPLOY_MANAGER_HOST, () => {
  console.log(
    `deploy manager listening on http://${DEPLOY_MANAGER_HOST}:${DEPLOY_MANAGER_PORT}`,
  );
});
