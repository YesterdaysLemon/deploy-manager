import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

function reservePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      const port = typeof address === "object" && address ? address.port : 0;
      probe.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

async function waitForServer(url, child) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`preview server exited with ${child.exitCode}`);
    try {
      const response = await fetch(`${url}/healthz`);
      if (response.ok) return;
    } catch {
      // The socket is expected to refuse connections for the first few attempts.
    }
    await new Promise((resolve) => setTimeout(resolve, 40));
  }
  throw new Error("preview server did not become ready");
}

test("public homepage serves the visualizer without leaking deploy secrets", async (context) => {
  const port = await reservePort();
  const url = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [path.join(ROOT, "src", "server.mjs")], {
    cwd: ROOT,
    env: {
      ...process.env,
      DEPLOY_MANAGER_APPS_FILE: path.join(ROOT, "examples", "apps.json"),
      DEPLOY_MANAGER_HOST: "127.0.0.1",
      DEPLOY_MANAGER_PORT: String(port),
      DEPLOY_MANAGER_RELEASE_SHA: "f".repeat(40),
      PORTFOLIO_DEPLOY_WEBHOOK_SECRET: "test-secret-portfolio",
      APP_ONE_DEPLOY_WEBHOOK_SECRET: "test-secret-one",
      APP_TWO_DEPLOY_WEBHOOK_SECRET: "test-secret-two",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  context.after(() => child.kill());
  await waitForServer(url, child);

  const pageResponse = await fetch(`${url}/`);
  const page = await pageResponse.text();
  assert.equal(pageResponse.status, 200);
  assert.match(pageResponse.headers.get("content-security-policy") ?? "", /default-src 'self'/);
  assert.match(page, /A tiny city that ships itself/);
  assert.match(page, /Live VPS city/);
  assert.match(page, /How it works/);
  assert.match(page, /og\.png/);

  const topologyResponse = await fetch(`${url}/api/topology`);
  const topology = await topologyResponse.json();
  const serializedTopology = JSON.stringify(topology);
  assert.equal(topologyResponse.status, 200);
  assert.equal(topology.city.routes.length, 8);
  assert.equal(topology.city.datastores.length, 1);
  assert.equal(topology.city.datastores[0].id, "androidhell-postgres");
  assert.equal(topology.city.host.release, "fffffff");
  assert.equal(topology.service.release, "fffffff");
  assert.doesNotMatch(serializedTopology, /test-secret|secretEnv|secret/i);

  const imageResponse = await fetch(`${url}/og.png`);
  assert.equal(imageResponse.status, 200);
  assert.equal(imageResponse.headers.get("content-type"), "image/png");
  assert.ok(Number(imageResponse.headers.get("content-length")) > 1_000_000);

  const missingResponse = await fetch(`${url}/definitely-not-a-route`);
  assert.equal(missingResponse.status, 404);

  const pageHeadResponse = await fetch(`${url}/`, { method: "HEAD" });
  assert.equal(pageHeadResponse.status, 200);
  assert.match(pageHeadResponse.headers.get("content-type") ?? "", /^text\/html/);
  assert.equal(await pageHeadResponse.text(), "");

  const deployGetResponse = await fetch(`${url}/deploy/app-one`);
  assert.equal(deployGetResponse.status, 404);
  assert.deepEqual(await deployGetResponse.json(), { ok: false, error: "not_found" });

  const unsignedDeployResponse = await fetch(`${url}/deploy/app-one`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sha: "a".repeat(40) }),
  });
  assert.equal(unsignedDeployResponse.status, 401);
  assert.deepEqual(await unsignedDeployResponse.json(), { ok: false, error: "bad_signature" });

  const topologyPostResponse = await fetch(`${url}/api/topology`, { method: "POST" });
  assert.equal(topologyPostResponse.status, 404);
});
