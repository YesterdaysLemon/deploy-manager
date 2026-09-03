import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import { createServer as createHttpServer } from "node:http";
import { createServer as createNetServer } from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

function reservePort() {
  return new Promise((resolve, reject) => {
    const server = createNetServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      server.close((error) => error ? reject(error) : resolve(port));
    });
  });
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolve(server.address().port));
  });
}

function close(server) {
  return new Promise((resolve) => server.close(() => resolve()));
}

async function waitForManager(url, child) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`manager exited with ${child.exitCode}`);
    try {
      const response = await fetch(`${url}/healthz`);
      if (response.ok) return;
    } catch {
      // Expected while the manager binds its socket.
    }
    await new Promise((resolve) => setTimeout(resolve, 35));
  }
  throw new Error("manager did not become ready");
}

test("public topology reports fresh loopback probe evidence without exposing internal targets", async () => {
  const healthServer = createHttpServer((request, response) => {
    const status = request.url === "/healthy" ? 204 : request.url === "/redirect" ? 302 : 503;
    response.writeHead(status, status === 302 ? { Location: "/healthy" } : undefined);
    response.end();
  });
  const healthPort = await listen(healthServer);
  const managerPort = await reservePort();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-manager-probes-"));
  const appsFile = path.join(tmp, "apps.json");
  const topologyFile = path.join(tmp, "topology.json");
  fs.writeFileSync(appsFile, JSON.stringify({
    apps: {
      healthy: { repo: "example/healthy", branch: "main", event: "push", secretEnv: "HEALTHY_SECRET" },
      failing: { repo: "example/failing", branch: "main", event: "push", secretEnv: "FAILING_SECRET" },
    },
  }));
  fs.writeFileSync(topologyFile, JSON.stringify({
    auditedAt: "2026-09-02T20:00:00Z",
    host: { name: "Probe test", platform: "test", edge: "test", manager: "test" },
    routes: [
      { id: "healthy", appId: "healthy", name: "Healthy", hostname: "healthy.example.com", port: 3100, probePort: healthPort, healthPath: "/healthy" },
      { id: "failing", appId: "failing", name: "Failing", hostname: "failing.example.com", port: 3110, probePort: healthPort, healthPath: "/failing" },
      { id: "redirected", name: "Redirected", hostname: "redirected.example.com", port: 3120, probePort: healthPort, healthPath: "/redirect" },
      { id: "declared", name: "Declared", hostname: "declared.example.com", healthPath: "/healthz" },
    ],
    datastores: [],
    controlPlane: [],
  }));

  const child = spawn(process.execPath, [path.join(ROOT, "src", "server.mjs")], {
    cwd: ROOT,
    env: {
      ...process.env,
      DEPLOY_MANAGER_APPS_FILE: appsFile,
      DEPLOY_MANAGER_PUBLIC_TOPOLOGY_FILE: topologyFile,
      DEPLOY_MANAGER_HOST: "127.0.0.1",
      DEPLOY_MANAGER_PORT: String(managerPort),
      DEPLOY_MANAGER_JOURNAL_FILE: ":memory:",
      DEPLOY_MANAGER_PROBE_TIMEOUT_MS: "500",
      DEPLOY_MANAGER_PROBE_INTERVAL_MS: "5000",
      HEALTHY_SECRET: "test-secret",
      FAILING_SECRET: "test-secret",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    const url = `http://127.0.0.1:${managerPort}`;
    await waitForManager(url, child);
    let topology;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      topology = await fetch(`${url}/api/topology`).then((response) => response.json());
      if (topology.probes.state === "current") break;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    assert.equal(topology.probes.state, "current");
    assert.equal(topology.probes.healthy, 1);
    assert.equal(topology.probes.unhealthy, 2);
    assert.equal(topology.city.routes[0].status, "healthy");
    assert.equal(topology.city.routes[0].probe.statusCode, 204);
    assert.equal(topology.city.routes[0].probe.source, "active-loopback-http");
    assert.equal(topology.city.routes[1].status, "unhealthy");
    assert.equal(topology.city.routes[1].probe.statusCode, 503);
    assert.equal(topology.city.routes[2].status, "unhealthy");
    assert.equal(topology.city.routes[2].probe.statusCode, 302);
    assert.equal(topology.city.routes[3].status, "not-probed");
    assert.equal(topology.city.routes[3].probe.source, "no-loopback-target");
    assert.doesNotMatch(JSON.stringify(topology), new RegExp(String(healthPort)));
    assert.doesNotMatch(JSON.stringify(topology), /probePort|test-secret/);
  } finally {
    child.kill();
    await close(healthServer);
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
