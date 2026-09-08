#!/usr/bin/env node
import { createHmac, timingSafeEqual } from "node:crypto";
import { spawn } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ReleaseCoordinator,
  ReleaseJournal,
  releaseReplayKey,
} from "./release-journal.mjs";

const {
  DEPLOY_MANAGER_APPS_FILE = "/etc/deploy-manager/apps.json",
  DEPLOY_MANAGER_HOST = "127.0.0.1",
  DEPLOY_MANAGER_PORT = "9000",
  DEPLOY_MANAGER_SCRIPT = "/usr/local/bin/deploy-manager-sudo",
  DEPLOY_MANAGER_MAX_BYTES = "65536",
  DEPLOY_MANAGER_PROBE_INTERVAL_MS = "30000",
  DEPLOY_MANAGER_PROBE_TIMEOUT_MS = "2500",
  DEPLOY_MANAGER_PROBES_ENABLED = "true",
  DEPLOY_MANAGER_STATE_DIR = process.platform === "win32"
    ? path.join(process.cwd(), ".deploy-manager")
    : "/var/lib/deploy-manager",
  DEPLOY_MANAGER_JOURNAL_FILE = "",
} = process.env;

const appIdPattern = /^[a-z0-9][a-z0-9_-]{0,63}$/i;
const shaPattern = /^[0-9a-f]{40}$/i;
const routeProbes = new Map();
const releaseJournalPath = DEPLOY_MANAGER_JOURNAL_FILE
  || path.join(DEPLOY_MANAGER_STATE_DIR, "release-journal.jsonl");
const RELEASE_PHASES = new Set([
  "fetch",
  "build",
  "candidate",
  "promote",
  "verify",
  "rollback",
  "complete",
]);
let probeRun = null;
let probeSummary = {
  enabled: DEPLOY_MANAGER_PROBES_ENABLED !== "false",
  state: DEPLOY_MANAGER_PROBES_ENABLED === "false" ? "disabled" : "starting",
  checkedAt: null,
  durationMs: null,
  healthy: 0,
  unhealthy: 0,
  checking: 0,
};
const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'none'",
    "connect-src 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "img-src 'self' data:",
    "object-src 'none'",
    "script-src 'self'",
    "style-src 'self'",
  ].join("; "),
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

const staticAssets = new Map([
  [
    "/",
    {
      body: readFileSync(new URL("../public/index.html", import.meta.url)),
      contentType: "text/html; charset=utf-8",
      cacheControl: "no-cache",
    },
  ],
  [
    "/city",
    {
      body: readFileSync(new URL("../public/index.html", import.meta.url)),
      contentType: "text/html; charset=utf-8",
      cacheControl: "no-cache",
    },
  ],
  [
    "/city/",
    {
      body: readFileSync(new URL("../public/index.html", import.meta.url)),
      contentType: "text/html; charset=utf-8",
      cacheControl: "no-cache",
    },
  ],
  [
    "/styles.css",
    {
      body: readFileSync(new URL("../public/styles.css", import.meta.url)),
      contentType: "text/css; charset=utf-8",
      cacheControl: "public, max-age=300",
    },
  ],
  [
    "/app.js",
    {
      body: readFileSync(new URL("../public/app.js", import.meta.url)),
      contentType: "text/javascript; charset=utf-8",
      cacheControl: "public, max-age=300",
    },
  ],
  [
    "/city3d.bundle.js",
    {
      body: readFileSync(new URL("../public/city3d.bundle.js", import.meta.url)),
      contentType: "text/javascript; charset=utf-8",
      cacheControl: "public, max-age=300",
    },
  ],
  [
    "/favicon.svg",
    {
      body: readFileSync(new URL("../public/favicon.svg", import.meta.url)),
      contentType: "image/svg+xml; charset=utf-8",
      cacheControl: "public, max-age=86400",
    },
  ],
  [
    "/llms.txt",
    {
      body: readFileSync(new URL("../public/llms.txt", import.meta.url)),
      contentType: "text/plain; charset=utf-8",
      cacheControl: "public, max-age=300",
    },
  ],
  [
    "/og.png",
    {
      body: readFileSync(new URL("../public/og.png", import.meta.url)),
      contentType: "image/png",
      cacheControl: "public, max-age=86400",
    },
  ],
]);

const kenneyModelPaths = [
  "suburban/building-type-c.glb",
  "suburban/building-type-f.glb",
  "suburban/building-type-i.glb",
  "suburban/building-type-k.glb",
  "suburban/building-type-p.glb",
  "suburban/building-type-u.glb",
  "suburban/planter.glb",
  "suburban/path-stones-long.glb",
  "suburban/fence-low.glb",
  "commercial/detail-parasol-a.glb",
  "commercial/detail-parasol-b.glb",
  "commercial/detail-awning.glb",
  "cars/delivery.glb",
  "cars/sedan.glb",
  "cars/taxi.glb",
  "cars/truck.glb",
  "commercial/building-a.glb",
  "commercial/building-f.glb",
  "commercial/building-j.glb",
  "commercial/building-k.glb",
  "commercial/building-n.glb",
  "commercial/building-skyscraper-e.glb",
  "industrial/building-c.glb",
  "industrial/building-e.glb",
  "industrial/building-m.glb",
  "industrial/building-p.glb",
  "industrial/detail-tank-large.glb",
  "industrial/shipping-container-a.glb",
  "industrial/shipping-container-b.glb",
  "roads/road-bend.glb",
  "roads/road-crossroad.glb",
  "roads/road-curve.glb",
  "roads/road-straight.glb",
  "roads/sign-highway.glb",
  "roads/traffic-light-object-vertical.glb",
  "suburban/building-type-a.glb",
  "suburban/building-type-h.glb",
  "suburban/building-type-n.glb",
  "suburban/building-type-r.glb",
  "suburban/tree-large.glb",
  "suburban/tree-small.glb",
  "suburban/building-type-b.glb",
  "suburban/building-type-d.glb",
  "suburban/building-type-e.glb",
  "trains/railroad-corner-large.glb",
  "trains/railroad-straight.glb",
  "trains/train-carriage-coal.glb",
  "trains/train-carriage-container-blue.glb",
  "trains/train-diesel-a.glb",
  "trains/train-diesel-b.glb",
  "trains/train-locomotive-passenger-a.glb",
  "trains/train-electric-city-a.glb",
  "trains/train-electric-city-b.glb",
  "trains/train-electric-city-c.glb",
  "watercraft/boat-tug-a.glb",
  "watercraft/ship-cargo-a.glb",
  "watercraft/boat-sail-a.glb",
  "watercraft/boat-fishing-small.glb",
  "watercraft/boat-speed-a.glb",
  "watercraft/buoy.glb",
];

for (const modelPath of kenneyModelPaths) {
  staticAssets.set(`/assets/kenney/${modelPath}`, {
    body: readFileSync(new URL(`../public/assets/kenney/${modelPath}`, import.meta.url)),
    contentType: "model/gltf-binary",
    cacheControl: "public, max-age=86400",
  });
}

for (const kitName of ["cars", "commercial", "industrial", "roads", "suburban", "trains", "watercraft"]) {
  const texturePath = `${kitName}/Textures/colormap.png`;
  staticAssets.set(`/assets/kenney/${texturePath}`, {
    body: readFileSync(new URL(`../public/assets/kenney/${texturePath}`, import.meta.url)),
    contentType: "image/png",
    cacheControl: "public, max-age=86400",
  });
}

for (const licensePath of [
  "cars/LICENSE.txt",
  "commercial/LICENSE.txt",
  "industrial/LICENSE.txt",
  "roads/LICENSE.txt",
  "suburban/LICENSE.txt",
  "trains/LICENSE.txt",
  "watercraft/LICENSE.txt",
]) {
  staticAssets.set(`/assets/kenney/${licensePath}`, {
    body: readFileSync(new URL(`../public/assets/kenney/${licensePath}`, import.meta.url)),
    contentType: "text/plain; charset=utf-8",
    cacheControl: "public, max-age=86400",
  });
}

staticAssets.set("/assets/kenney/README.md", {
  body: readFileSync(new URL("../public/assets/kenney/README.md", import.meta.url)),
  contentType: "text/markdown; charset=utf-8",
  cacheControl: "public, max-age=86400",
});

function loadPublicCity() {
  const source = process.env.DEPLOY_MANAGER_PUBLIC_TOPOLOGY_FILE
    ? process.env.DEPLOY_MANAGER_PUBLIC_TOPOLOGY_FILE
    : new URL("../config/public-topology.json", import.meta.url);
  const city = JSON.parse(readFileSync(source, "utf8"));

  if (
    !city ||
    typeof city !== "object" ||
    !city.host ||
    !Array.isArray(city.routes) ||
    !Array.isArray(city.datastores)
  ) {
    throw new Error("public topology must contain host, routes, and datastores");
  }

  return city;
}

const publicCity = loadPublicCity();

function probeSettings() {
  const intervalMs = Number(DEPLOY_MANAGER_PROBE_INTERVAL_MS);
  const timeoutMs = Number(DEPLOY_MANAGER_PROBE_TIMEOUT_MS);
  return {
    enabled: DEPLOY_MANAGER_PROBES_ENABLED !== "false",
    intervalMs: Number.isFinite(intervalMs)
      ? Math.min(300_000, Math.max(5_000, intervalMs))
      : 30_000,
    timeoutMs: Number.isFinite(timeoutMs)
      ? Math.min(15_000, Math.max(250, timeoutMs))
      : 2_500,
  };
}

function safeHealthPath(value) {
  if (typeof value !== "string") return "/";
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//")) return "/";
  if (/[\\\u0000-\u001f\u007f#]/.test(path)) return "/";
  return path.slice(0, 180);
}

function probeTarget(route) {
  const port = cleanPublicPort(route.probePort) ?? cleanPublicPort(route.port);
  if (!port) return null;
  return `http://127.0.0.1:${port}${safeHealthPath(route.healthPath)}`;
}

async function probeRoute(route, index, timeoutMs) {
  const id = cleanPublicId(route.id, `route-${index + 1}`);
  const target = probeTarget(route);
  const checkedAt = new Date().toISOString();

  if (!target) {
    return [id, {
      status: "not-probed",
      checkedAt,
      latencyMs: null,
      statusCode: null,
      source: "no-loopback-target",
    }];
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = performance.now();

  try {
    const response = await fetch(target, {
      method: "GET",
      cache: "no-store",
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "deploy-manager-health-probe/1" },
    });
    await response.body?.cancel();
    return [id, {
      status: response.status >= 200 && response.status < 300 ? "healthy" : "unhealthy",
      checkedAt,
      latencyMs: Math.max(0, Math.round(performance.now() - startedAt)),
      statusCode: response.status,
      source: "active-loopback-http",
    }];
  } catch {
    return [id, {
      status: "unhealthy",
      checkedAt,
      latencyMs: Math.max(0, Math.round(performance.now() - startedAt)),
      statusCode: null,
      source: "active-loopback-http",
    }];
  } finally {
    clearTimeout(timeout);
  }
}

async function refreshPublicProbes() {
  const settings = probeSettings();
  if (!settings.enabled) return;
  if (probeRun) return probeRun;

  probeRun = (async () => {
    const startedAt = performance.now();
    const routes = publicCity.routes.slice(0, 64);
    probeSummary = {
      ...probeSummary,
      enabled: true,
      state: "running",
      checking: routes.length,
    };

    const results = await Promise.all(
      routes.map((route, index) => probeRoute(route, index, settings.timeoutMs)),
    );
    for (const [id, result] of results) routeProbes.set(id, result);

    const values = results.map(([, result]) => result);
    probeSummary = {
      enabled: true,
      state: "current",
      checkedAt: new Date().toISOString(),
      durationMs: Math.max(0, Math.round(performance.now() - startedAt)),
      healthy: values.filter((result) => result.status === "healthy").length,
      unhealthy: values.filter((result) => result.status === "unhealthy").length,
      checking: 0,
    };
  })().finally(() => {
    probeRun = null;
  });

  return probeRun;
}

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

function sendJson(request, response, statusCode, body, cacheControl = "no-store") {
  const payload = Buffer.from(`${JSON.stringify(body)}\n`);
  response.writeHead(statusCode, {
    ...securityHeaders,
    "Cache-Control": cacheControl,
    "Content-Length": payload.length,
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(request.method === "HEAD" ? undefined : payload);
}

function sendAsset(request, response, asset) {
  response.writeHead(200, {
    ...securityHeaders,
    "Cache-Control": asset.cacheControl,
    "Content-Length": asset.body.length,
    "Content-Type": asset.contentType,
  });
  response.end(request.method === "HEAD" ? undefined : asset.body);
}

function cleanPublicText(value, fallback, maxLength = 100) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/\s+/g, " ").trim();
  return cleaned ? cleaned.slice(0, maxLength) : fallback;
}

function cleanPublicUrl(value) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function cleanPublicId(value, fallback) {
  return typeof value === "string" && appIdPattern.test(value)
    ? value
    : fallback;
}

function cleanPublicPort(value) {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 && port <= 65535 ? port : null;
}

function cleanPublicList(value) {
  return Array.isArray(value)
    ? value
        .map((item) => cleanPublicId(item, null))
        .filter(Boolean)
        .slice(0, 32)
    : [];
}

function cleanPublicPlot(value) {
  if (!value || typeof value !== "object") return undefined;
  const x = Number(value.x);
  const z = Number(value.z);
  const isHalfStep = (coordinate) => {
    const doubled = Math.round(coordinate * 2);
    return Number.isFinite(coordinate)
      && Math.abs(coordinate) <= 31.5
      && Math.abs(coordinate * 2 - doubled) < 0.0001
      && Math.abs(doubled) % 2 === 1;
  };
  return isHalfStep(x) && isHalfStep(z) ? { x, z } : undefined;
}

function currentReleaseId() {
  const configured = process.env.DEPLOY_MANAGER_RELEASE_SHA;
  if (typeof configured === "string" && /^[0-9a-f]{7,40}$/i.test(configured)) {
    return configured.slice(0, 7).toLowerCase();
  }

  try {
    const sourcePath = realpathSync(fileURLToPath(import.meta.url));
    const releaseMatch = sourcePath.match(/[\\/]([0-9a-f]{40})[\\/]src[\\/]server\.mjs$/i);
    if (releaseMatch) return releaseMatch[1].slice(0, 7).toLowerCase();
  } catch {
    // Fall back to the audited public topology when no release path is available.
  }

  return cleanPublicText(publicCity.host.release, "unknown", 40);
}

function publicCitySnapshot() {
  return {
    auditedAt: cleanPublicText(publicCity.auditedAt, "unknown", 64),
    host: {
      name: cleanPublicText(publicCity.host.name, "VPS"),
      platform: cleanPublicText(publicCity.host.platform, "Linux + Docker"),
      edge: cleanPublicText(publicCity.host.edge, "Caddy"),
      manager: cleanPublicText(publicCity.host.manager, "Deploy Manager"),
      release: currentReleaseId(),
      status: cleanPublicText(publicCity.host.status, "unknown", 24),
    },
    routes: publicCity.routes.slice(0, 64).map((route, index) => {
      const id = cleanPublicId(route.id, `route-${index + 1}`);
      const probe = routeProbes.get(id);
      const releaseState = route.appId ? releaseCoordinator.stateForApp(route.appId) : null;
      const status = releaseState === "running"
        ? "deploying"
        : releaseState === "queued"
          ? "queued"
          : probe?.status ?? (probeSettings().enabled ? "checking" : "not-probed");
      return {
        id,
        appId: cleanPublicId(route.appId, undefined),
        name: cleanPublicText(route.name, `Route ${index + 1}`),
        hostname: cleanPublicText(route.hostname, "unpublished", 180),
        port: cleanPublicPort(route.port),
        kind: cleanPublicText(route.kind, "site", 32),
        description: cleanPublicText(route.description, "Health-checked website.", 240),
        url: cleanPublicUrl(route.url)
          ?? (typeof route.hostname === "string" ? cleanPublicUrl(`https://${route.hostname}/`) : null),
        plot: cleanPublicPlot(route.plot),
        healthPath: safeHealthPath(route.healthPath),
        managedBy: cleanPublicId(route.managedBy, undefined),
        datastores: cleanPublicList(route.datastores),
        status,
        probe: probe
          ? {
              status: probe.status,
              checkedAt: probe.checkedAt,
              latencyMs: probe.latencyMs,
              statusCode: probe.statusCode,
              source: probe.source,
            }
          : {
              status,
              checkedAt: null,
              latencyMs: null,
              statusCode: null,
              source: probeSettings().enabled ? "pending" : "disabled",
            },
      };
    }),
    datastores: publicCity.datastores.slice(0, 32).map((store, index) => ({
      id: cleanPublicId(store.id, `datastore-${index + 1}`),
      name: cleanPublicText(store.name, `Datastore ${index + 1}`),
      kind: cleanPublicText(store.kind, "datastore", 32),
      status: cleanPublicText(store.status, "unknown", 24),
      scope: cleanPublicText(store.scope, "private", 120),
      connectedTo: cleanPublicList(store.connectedTo),
      description: cleanPublicText(store.description, "Private application data service.", 240),
      plot: cleanPublicPlot(store.plot),
    })),
    controlPlane: Array.isArray(publicCity.controlPlane)
      ? publicCity.controlPlane.slice(0, 32).map((service, index) => ({
          id: cleanPublicId(service.id, `service-${index + 1}`),
          name: cleanPublicText(service.name, `Service ${index + 1}`),
          status: cleanPublicText(service.status, "unknown", 24),
          description: cleanPublicText(service.description, "Control-plane service.", 240),
        }))
      : [],
  };
}

function publicTopology() {
  const settings = probeSettings();
  const releases = releaseCoordinator.publicJobs(12);
  const liveAppIds = releaseCoordinator.liveAppIds();
  const publicApps = Object.entries(apps)
    .filter(([, app]) => app.public !== false)
    .map(([appId, app]) => ({
      id: appId,
      name: cleanPublicText(app.publicName, appId.replaceAll(/[-_]/g, " ")),
      description: cleanPublicText(
        app.publicDescription,
        "Signed, health-checked deployment target.",
        180,
      ),
      branch: cleanPublicText(app.branch, "master", 64),
      event: cleanPublicText(app.event, "push", 32),
      url: cleanPublicUrl(app.publicUrl),
      status: releaseCoordinator.stateForApp(appId) ?? "ready",
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

  return {
    service: {
      name: "deploy-manager",
      repository: cleanPublicText(
        process.env.DEPLOY_MANAGER_PUBLIC_REPOSITORY,
        "YesterdaysLemon / deploy-manager",
      ),
      branch: cleanPublicText(
        process.env.DEPLOY_MANAGER_PUBLIC_BRANCH,
        "main",
        64,
      ),
      engine: `node ${process.versions.node.split(".")[0]}`,
      release: currentReleaseId(),
      status: "online",
    },
    apps: publicApps,
    activeDeployments: releaseCoordinator.active ? 1 : 0,
    queuedDeployments: releaseCoordinator.queue.length,
    liveDeployments: liveAppIds,
    releaseCursor: releaseJournal.latestSequence,
    releases,
    city: publicCitySnapshot(),
    probes: {
      ...probeSummary,
      intervalSeconds: Math.round(settings.intervalMs / 1000),
      timeoutMs: settings.timeoutMs,
    },
    safeguards: [
      "signed webhook",
      "exact SHA",
      "CI-origin signed request",
      "candidate health",
      "automatic rollback",
      "persistent release receipts",
      "global deployment queue",
      "active loopback probes",
    ],
    generatedAt: new Date().toISOString(),
  };
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
    const configuredMaxBytes = Number(DEPLOY_MANAGER_MAX_BYTES);
    const maxBytes = Number.isSafeInteger(configuredMaxBytes) && configuredMaxBytes > 0
      ? Math.min(configuredMaxBytes, 1_048_576)
      : 65_536;

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

function runDeploy(appId, payload, app, onPhase = () => {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(DEPLOY_MANAGER_SCRIPT, [appId, payload.sha], {
      env: {
        ...process.env,
        DEPLOY_APP_ID: appId,
        DEPLOY_BRANCH: app.branch ?? "master",
        DEPLOY_SHA: payload.sha,
      },
      stdio: ["ignore", "pipe", "pipe"],
    });

    let pendingOutput = "";
    const inspectOutput = (chunk) => {
      process.stdout.write(chunk);
      pendingOutput += chunk.toString("utf8");
      const lines = pendingOutput.split(/\r?\n/);
      pendingOutput = lines.pop() ?? "";
      for (const line of lines) {
        const match = /(?:^|\s)release_phase=([a-z][a-z0-9-]{0,31})(?:\s|$)/.exec(line);
        if (match && RELEASE_PHASES.has(match[1])) onPhase(match[1]);
      }
    };

    child.stdout?.on("data", inspectOutput);
    child.stderr?.on("data", (chunk) => process.stderr.write(chunk));

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
const releaseJournal = new ReleaseJournal(releaseJournalPath);
const releaseCoordinator = new ReleaseCoordinator({
  journal: releaseJournal,
  runner: ({ appId, context }, onPhase) => runDeploy(appId, context.payload, context.app, onPhase),
});

const probes = probeSettings();
if (probes.enabled) {
  void refreshPublicProbes();
  const probeTimer = setInterval(refreshPublicProbes, probes.intervalMs);
  probeTimer.unref();
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");

  if (
    (request.method === "GET" || request.method === "HEAD") &&
    staticAssets.has(url.pathname)
  ) {
    sendAsset(request, response, staticAssets.get(url.pathname));
    return;
  }

  if (
    (request.method === "GET" || request.method === "HEAD") &&
    url.pathname === "/healthz"
  ) {
    sendJson(request, response, 200, { ok: true });
    return;
  }

  if (
    (request.method === "GET" || request.method === "HEAD") &&
    url.pathname === "/api/topology"
  ) {
    sendJson(request, response, 200, publicTopology());
    return;
  }

  if (
    (request.method === "GET" || request.method === "HEAD") &&
    url.pathname === "/api/releases"
  ) {
    const limit = Math.min(50, Math.max(1, Number(url.searchParams.get("limit")) || 12));
    sendJson(request, response, 200, {
      cursor: releaseJournal.latestSequence,
      releases: releaseCoordinator.publicJobs(limit),
    });
    return;
  }

  const releaseMatch = /^\/api\/releases\/([0-9a-f-]{36})$/i.exec(url.pathname);
  if ((request.method === "GET" || request.method === "HEAD") && releaseMatch) {
    const job = releaseCoordinator.job(releaseMatch[1]);
    sendJson(
      request,
      response,
      job ? 200 : 404,
      job ? { job } : { ok: false, error: "unknown_release" },
    );
    return;
  }

  const match = /^\/deploy\/([a-z0-9_-]+)$/i.exec(url.pathname);

  if (request.method !== "POST" || !match) {
    sendJson(request, response, 404, { ok: false, error: "not_found" });
    return;
  }

  const appId = match[1];
  const app = apps[appId];

  if (!app) {
    sendJson(request, response, 404, { ok: false, error: "unknown_app" });
    return;
  }

  let rawBody;
  try {
    rawBody = await readRequestBody(request);
  } catch (error) {
    sendJson(
      request,
      response,
      error.message === "request_too_large" ? 413 : 400,
      {
        ok: false,
        error: error.message,
      },
    );
    return;
  }

  if (
    !verifySignature(
      rawBody,
      request.headers["x-hub-signature-256"],
      getSecret(app),
    )
  ) {
    sendJson(request, response, 401, { ok: false, error: "bad_signature" });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch {
    sendJson(request, response, 400, { ok: false, error: "bad_json" });
    return;
  }

  if (request.headers["x-github-event"] !== (app.event ?? "push")) {
    sendJson(request, response, 202, {
      ok: true,
      skipped: true,
      reason: "wrong_event",
    });
    return;
  }

  const payloadError = validatePayload(payload, app);

  if (payloadError === "skipped") {
    sendJson(request, response, 202, {
      ok: true,
      skipped: true,
      reason: "wrong_ref",
    });
    return;
  }

  if (payloadError) {
    sendJson(request, response, 400, { ok: false, error: payloadError });
    return;
  }

  try {
    const accepted = releaseCoordinator.submit({
      appId,
      sha: payload.sha,
      replayKey: releaseReplayKey(appId, payload),
      source: "signed-webhook",
      context: { payload, app },
    });
    sendJson(request, response, 202, {
      ok: true,
      accepted: !accepted.duplicate,
      duplicate: accepted.duplicate,
      job: releaseCoordinator.job(accepted.job.id, { includeSha: true }),
      receipt: `/api/releases/${accepted.job.id}`,
    });
  } catch (error) {
    console.error(`release acceptance failed app=${appId}`, error);
    sendJson(request, response, 500, {
      ok: false,
      app: appId,
      error: "release_not_accepted",
    });
  }
});

server.listen(Number(DEPLOY_MANAGER_PORT), DEPLOY_MANAGER_HOST, () => {
  console.log(
    `deploy manager listening on http://${DEPLOY_MANAGER_HOST}:${DEPLOY_MANAGER_PORT}`,
  );
  // Only immutable SHA-named installations produce self-update evidence.
  // Local previews and a configured display SHA must not fabricate receipts.
  let installed;
  try {installed=realpathSync(fileURLToPath(import.meta.url)).match(/[\\/]([0-9a-f]{40})[\\/]src[\\/]server\.mjs$/i)?.[1];}
  catch {return;}
  if (installed) {
    const address=server.address();
    const host=DEPLOY_MANAGER_HOST.includes(":") ? "[::1]" : "127.0.0.1";
    void fetch(`http://${host}:${address.port}/healthz`,{signal:AbortSignal.timeout(5000)})
      .then(async response=> {
        if (!response.ok || (await response.json()).ok!==true) throw new Error("local health not confirmed");
        releaseJournal.observeManagerRelease(installed);
      })
      .catch(error=>console.error("Unable to record manager observation",error.message));
  }
});
