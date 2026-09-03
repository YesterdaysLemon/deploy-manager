import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHmac } from "node:crypto";
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

test("public release city stays focused and does not leak deploy secrets", async (context) => {
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
      DEPLOY_MANAGER_JOURNAL_FILE: ":memory:",
      DEPLOY_MANAGER_PROBES_ENABLED: "false",
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
  assert.match(page, /Deploy Manager — a tiny release city/);
  assert.match(page, /id="city-3d-scene"/);
  assert.match(page, /id="simulate-push"/);
  assert.match(page, /Watch a release/);
  assert.match(page, /SOURCE ↗/);
  assert.doesNotMatch(page, /Ship a release/);
  assert.match(page, /city3d\.bundle\.js/);
  assert.doesNotMatch(page, /Ship the little server|Not a cluster orchestrator|For humans and their agents/i);
  assert.doesNotMatch(page, /entity-index|detail-body|event-list|trace-system|scenes\.js/i);
  assert.doesNotMatch(page, /test-secret|secretEnv/i);

  const cityResponse = await fetch(`${url}/city`);
  const city = await cityResponse.text();
  assert.equal(cityResponse.status, 200);
  assert.equal(city, page);

  const citySlashResponse = await fetch(`${url}/city/`);
  assert.equal(citySlashResponse.status, 200);

  const topologyResponse = await fetch(`${url}/api/topology`);
  const topology = await topologyResponse.json();
  const serializedTopology = JSON.stringify(topology);
  assert.equal(topologyResponse.status, 200);
  assert.equal(topology.city.routes.length, 8);
  assert.equal(topology.city.datastores.length, 1);
  assert.equal(topology.city.datastores[0].id, "androidhell-postgres");
  assert.equal(topology.city.host.release, "fffffff");
  assert.equal(topology.service.release, "fffffff");
  assert.equal(topology.probes.enabled, false);
  assert.equal(topology.releaseCursor, 0);
  assert.deepEqual(topology.releases, []);
  assert.doesNotMatch(serializedTopology, /test-secret|secretEnv|secret/i);

  const imageResponse = await fetch(`${url}/og.png`);
  assert.equal(imageResponse.status, 200);
  assert.equal(imageResponse.headers.get("content-type"), "image/png");
  assert.ok(Number(imageResponse.headers.get("content-length")) > 1_000_000);

  assert.equal((await fetch(`${url}/product.css`)).status, 404);
  assert.equal((await fetch(`${url}/scenes.js`)).status, 404);

  const cityBundleResponse = await fetch(`${url}/city3d.bundle.js`);
  const cityBundle = await cityBundleResponse.text();
  assert.equal(cityBundleResponse.status, 200);
  assert.match(cityBundleResponse.headers.get("content-type") ?? "", /^text\/javascript/);
  assert.ok(cityBundle.length < 850_000, `city bundle exceeded budget: ${cityBundle.length}`);
  assert.match(cityBundle, /BUILD YOUR OWN CITY/);
  assert.match(cityBundle, /github\.com\/YesterdaysLemon\/deploy-manager/);

  const modelResponse = await fetch(`${url}/assets/kenney/industrial/building-m.glb`);
  assert.equal(modelResponse.status, 200);
  assert.equal(modelResponse.headers.get("content-type"), "model/gltf-binary");
  assert.ok(Number(modelResponse.headers.get("content-length")) > 100_000);

  for (const assetPath of [
    "roads/road-bend.glb",
    "roads/road-curve.glb",
    "trains/railroad-corner-large.glb",
    "trains/train-carriage-coal.glb",
  ]) {
    const assetResponse = await fetch(`${url}/assets/kenney/${assetPath}`);
    assert.equal(assetResponse.status, 200, assetPath);
    assert.equal(assetResponse.headers.get("content-type"), "model/gltf-binary");
    assert.ok(Number(assetResponse.headers.get("content-length")) > 10_000, assetPath);
  }

  const textureResponse = await fetch(`${url}/assets/kenney/industrial/Textures/colormap.png`);
  assert.equal(textureResponse.status, 200);
  assert.equal(textureResponse.headers.get("content-type"), "image/png");
  assert.ok(Number(textureResponse.headers.get("content-length")) > 8_000);

  const assetNoticeResponse = await fetch(`${url}/assets/kenney/README.md`);
  const assetNotice = await assetNoticeResponse.text();
  assert.equal(assetNoticeResponse.status, 200);
  assert.match(assetNotice, /Creative Commons Zero/);
  assert.match(assetNotice, /Train Kit 1\.1/);

  const agentIndexResponse = await fetch(`${url}/llms.txt`);
  const agentIndex = await agentIndexResponse.text();
  assert.equal(agentIndexResponse.status, 200);
  assert.match(agentIndexResponse.headers.get("content-type") ?? "", /^text\/plain/);
  assert.match(agentIndex, /docs\/agent-quickstart\.md/);
  assert.match(agentIndex, /Stop for operator review/i);
  assert.doesNotMatch(agentIndex, /test-secret|secretEnv/i);

  const faviconResponse = await fetch(`${url}/favicon.svg`);
  assert.equal(faviconResponse.status, 200);
  assert.match(faviconResponse.headers.get("content-type") ?? "", /^image\/svg\+xml/);

  const missingResponse = await fetch(`${url}/definitely-not-a-route`);
  assert.equal(missingResponse.status, 404);

  const releasesResponse = await fetch(`${url}/api/releases`);
  assert.equal(releasesResponse.status, 200);
  assert.deepEqual(await releasesResponse.json(), { cursor: 0, releases: [] });

  const missingReleaseResponse = await fetch(`${url}/api/releases/00000000-0000-4000-8000-000000000000`);
  assert.equal(missingReleaseResponse.status, 404);
  assert.deepEqual(await missingReleaseResponse.json(), { ok: false, error: "unknown_release" });

  const pageHeadResponse = await fetch(`${url}/`, { method: "HEAD" });
  assert.equal(pageHeadResponse.status, 200);
  assert.match(pageHeadResponse.headers.get("content-type") ?? "", /^text\/html/);
  assert.equal(await pageHeadResponse.text(), "");

  const cityHeadResponse = await fetch(`${url}/city`, { method: "HEAD" });
  assert.equal(cityHeadResponse.status, 200);
  assert.match(cityHeadResponse.headers.get("content-type") ?? "", /^text\/html/);
  assert.equal(await cityHeadResponse.text(), "");

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

  const releasePayload = JSON.stringify({
    event: "push",
    branch: "main",
    repo: "example-org/app-one",
    sha: "a".repeat(40),
  });
  const signature = `sha256=${createHmac("sha256", "test-secret-one").update(releasePayload).digest("hex")}`;
  const requestRelease = () => fetch(`${url}/deploy/app-one`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Event": "push",
      "X-Hub-Signature-256": signature,
    },
    body: releasePayload,
  });
  const acceptedResponse = await requestRelease();
  const accepted = await acceptedResponse.json();
  assert.equal(acceptedResponse.status, 202);
  assert.equal(accepted.accepted, true);
  assert.equal(accepted.duplicate, false);
  assert.equal(accepted.job.sha, "a".repeat(40));
  assert.match(accepted.job.id, /^[0-9a-f-]{36}$/);
  assert.equal(accepted.receipt, `/api/releases/${accepted.job.id}`);

  const duplicateResponse = await requestRelease();
  const duplicate = await duplicateResponse.json();
  assert.equal(duplicateResponse.status, 202);
  assert.equal(duplicate.accepted, false);
  assert.equal(duplicate.duplicate, true);
  assert.equal(duplicate.job.id, accepted.job.id);

  let terminalReceipt = null;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const receiptResponse = await fetch(`${url}${accepted.receipt}`);
    terminalReceipt = await receiptResponse.json();
    if (["failed", "rolled-back", "interrupted", "succeeded"].includes(terminalReceipt.job?.status)) break;
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  assert.equal(terminalReceipt.job.status, "failed");
  assert.equal(terminalReceipt.job.sha, undefined);
  assert.equal(terminalReceipt.job.release, "aaaaaaa");

  const topologyPostResponse = await fetch(`${url}/api/topology`, { method: "POST" });
  assert.equal(topologyPostResponse.status, 404);
});
