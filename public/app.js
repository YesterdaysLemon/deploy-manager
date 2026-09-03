const FALLBACK_CITY = Object.freeze({
  host: {
    name: "One Docker VPS",
    platform: "Linux + Docker",
    edge: "Caddy",
    manager: "Deploy Manager",
    release: "unknown",
    status: "unknown",
  },
  routes: [
    ["galaxy-menu", "Galaxy Menu", "alirezaafshan.com"],
    ["portfolio", "Portfolio", "portfolio.alirezaafshan.com"],
    ["aquarium", "Aquarium", "fish.alirezaafshan.com"],
    ["birds", "Bird of the Day", "birds.alirezaafshan.com"],
    ["celegans", "C. elegans", "worm.alirezaafshan.com"],
    ["continuity", "Codex Continuity", "continuity.alirezaafshan.com"],
    ["conspiracy", "Loose Thread", "conspiracy.alirezaafshan.com"],
    ["androidhell", "Android Hell", "androidhell.alirezaafshan.com"],
  ].map(([id, name, hostname]) => ({ id, appId: id, name, hostname, url: `https://${hostname}/`, status: "unknown" })),
  datastores: [{
    id: "androidhell-postgres",
    name: "PostgreSQL 17",
    status: "unknown",
    scope: "private Docker network",
    connectedTo: ["androidhell"],
  }],
});

const CONTROL_DETAILS = Object.freeze({
  git: { title: "Git push", kicker: "INLET", meta: "signed commit" },
  "deploy-manager": { title: "Deploy Manager", kicker: "CONTROL", meta: "release coordinator" },
  caddy: { title: "Caddy gate", kicker: "EDGE", meta: "public HTTPS" },
  docker: { title: "Container yard", kicker: "BUILD", meta: "candidate → health → swap" },
});

const PHASE_COPY = Object.freeze({
  accepted: "release accepted",
  queued: "waiting for the release lane",
  starting: "release lane opened",
  fetch: "fetching exact commit",
  incoming: "commit received",
  build: "building image",
  candidate: "candidate healthy",
  promote: "switching traffic",
  deliver: "delivery en route",
  rebuild: "rebuilding service",
  verify: "checking production",
  return: "release complete",
  complete: "release complete",
  rollback: "restoring previous image",
  failed: "release failed",
  interrupted: "manager restarted",
});

const stage = document.querySelector("#city-3d-scene");
const hostLed = document.querySelector("#host-led");
const hostStatus = document.querySelector("#host-status");
const fleetSummary = document.querySelector("#fleet-summary");
const selectionCard = document.querySelector("#selection-card");
const selectionLed = document.querySelector("#selection-led");
const detailKicker = document.querySelector("#detail-kicker");
const detailTitle = document.querySelector("#detail-title");
const detailMeta = document.querySelector("#detail-meta");
const detailEvidence = document.querySelector("#detail-evidence");
const detailLink = document.querySelector("#detail-link");
const entityPosition = document.querySelector("#entity-position");
const simulateButton = document.querySelector("#simulate-push");
const simulateLabel = document.querySelector("#simulate-label");
const simulationToast = document.querySelector("#simulation-toast");
const simulationCopy = document.querySelector("#simulation-copy");

let payload = null;
let city = FALLBACK_CITY;
let city3d = null;
let selectedId = "deploy-manager";
let sceneSignature = "";
let routeCursor = 0;
let refreshPending = false;
let toastTimer = null;
let refreshTimer = null;
let fetchController = null;
let releaseCursor = 0;
let releaseFeedReady = false;
let releaseUiChain = Promise.resolve();
let demoRunning = false;

function normalizedStatus(value) {
  const status = String(value ?? "unknown").toLowerCase();
  if (["healthy", "online", "steady", "ok", "ready", "current"].includes(status)) return "healthy";
  if (["deploying", "active", "building", "running"].includes(status)) return "deploying";
  if (["checking", "starting", "pending", "queued"].includes(status)) return "checking";
  if (["unhealthy", "offline", "failed", "error"].includes(status)) return "unhealthy";
  return "unknown";
}

function shortStatus(value) {
  return {
    healthy: "online",
    deploying: "deploying",
    checking: "checking",
    unhealthy: "unreachable",
    unknown: "not probed",
  }[normalizedStatus(value)];
}

function signatureFor(nextCity) {
  return JSON.stringify({
    routes: (nextCity.routes ?? []).map(({ id, appId, name, hostname, kind, datastores, plot, url }) => ({
      id, appId, name, hostname, kind, datastores, plot, url,
    })),
    datastores: (nextCity.datastores ?? []).map(({ id, name, kind, connectedTo, plot }) => ({ id, name, kind, connectedTo, plot })),
  });
}

function entityIds() {
  return [
    ...Object.keys(CONTROL_DETAILS),
    ...(city.routes ?? []).map(({ id }) => id),
    ...(city.datastores ?? []).map(({ id }) => id),
  ];
}

function releaseFor(entity) {
  const appId = entity.appId ?? (entity.kind === "route" ? entity.id : null);
  if (appId) return (payload?.releases ?? []).find((release) => release.appId === appId) ?? null;
  if (["deploy-manager", "docker", "git"].includes(entity.id)) return payload?.releases?.[0] ?? null;
  return null;
}

function timeAgo(value) {
  const timestamp = Date.parse(value ?? "");
  if (!Number.isFinite(timestamp)) return "not yet";
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 5) return "now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
}

function releaseEvidence(release) {
  if (!release) return null;
  const phase = String(release.phase ?? release.status).replaceAll("-", " ");
  return `release ${release.release} · ${phase} · ${timeAgo(release.updatedAt)}`;
}

function probeEvidence(entity) {
  const probe = entity.probe;
  if (!probe?.checkedAt) return "probe evidence pending";
  const latency = Number.isFinite(probe.latencyMs) ? `${probe.latencyMs}ms` : "no response";
  const code = Number.isInteger(probe.statusCode) ? `HTTP ${probe.statusCode}` : "transport error";
  return `probe ${timeAgo(probe.checkedAt)} · ${latency} · ${code}`;
}

function entityFor(id) {
  if (CONTROL_DETAILS[id]) return { id, kind: "control", ...CONTROL_DETAILS[id], status: city.host?.status };
  const route = (city.routes ?? []).find((item) => item.id === id);
  if (route) return { ...route, kind: "route", kicker: "SERVICE", title: route.name };
  const store = (city.datastores ?? []).find((item) => item.id === id);
  if (store) return { ...store, kind: "datastore", kicker: "PRIVATE", title: store.name };
  return null;
}

function metadataFor(entity) {
  if (entity.id === "deploy-manager") {
    const release = city.host?.release && city.host.release !== "unknown" ? ` · ${city.host.release}` : "";
    return `${shortStatus(entity.status)}${release}`;
  }
  if (entity.kind === "control") return `${entity.meta} · ${shortStatus(entity.status)}`;
  if (entity.kind === "datastore") return `${entity.scope ?? "private"} · ${shortStatus(entity.status)}`;
  return `${entity.hostname ?? "unpublished"} · ${shortStatus(entity.status)}`;
}

function evidenceFor(entity) {
  const release = releaseFor(entity);
  if (entity.kind === "route") {
    const probe = probeEvidence(entity);
    return release ? `${probe} · ${releaseEvidence(release)}` : probe;
  }
  if (entity.id === "deploy-manager") {
    const receipts = payload?.releases?.length ?? 0;
    return release ? `${receipts} recent receipt${receipts === 1 ? "" : "s"} · ${releaseEvidence(release)}` : `${receipts} recent release receipts`;
  }
  if (entity.kind === "datastore") return entity.description ?? "declared private service";
  return releaseEvidence(release) ?? entity.meta ?? "control-plane service";
}

function selectEntity(id) {
  const entity = entityFor(id);
  if (!entity) return;
  selectedId = id;
  city3d?.select(id);
  selectionCard.dataset.kind = entity.kind;
  selectionLed.dataset.status = normalizedStatus(entity.status);
  detailKicker.textContent = entity.kicker;
  detailTitle.textContent = entity.title;
  detailMeta.textContent = metadataFor(entity);
  detailEvidence.textContent = evidenceFor(entity);
  const ids = entityIds();
  const position = Math.max(0, ids.indexOf(id));
  entityPosition.textContent = `${position + 1}/${ids.length}`;
  const url = entity.kind === "route" ? entity.url : null;
  detailLink.hidden = !url;
  if (url) {
    detailLink.href = url;
    detailLink.setAttribute("aria-label", `Open ${entity.title} (opens in a new tab)`);
  } else {
    detailLink.removeAttribute("href");
    detailLink.removeAttribute("aria-label");
  }
}

function selectAdjacent(direction) {
  const ids = entityIds();
  if (!ids.length) return;
  const current = Math.max(0, ids.indexOf(selectedId));
  const next = (current + direction + ids.length) % ids.length;
  selectEntity(ids[next]);
}

function renderStatus(connected) {
  const routes = city.routes ?? [];
  const healthy = routes.filter((route) => normalizedStatus(route.status) === "healthy").length;
  const checking = routes.filter((route) => normalizedStatus(route.status) === "checking").length;
  const state = connected ? normalizedStatus(payload?.service?.status ?? city.host?.status) : "unknown";
  hostLed.dataset.status = state;
  hostStatus.textContent = connected ? "live topology" : "preview only";
  if (payload?.probes?.enabled) {
    fleetSummary.textContent = checking > 0
      ? `${routes.length} services · probing`
      : `${healthy}/${routes.length} responding`;
  } else {
    fleetSummary.textContent = `${routes.length} services`;
  }
  const liveCount = payload?.liveDeployments?.length ?? 0;
  simulateButton.disabled = demoRunning || liveCount > 0;
  simulateButton.title = liveCount > 0 ? "A factual release is already moving through the city" : "Play a labeled release demonstration";
  selectEntity(selectedId);
}

async function fetchTopology() {
  const controller = new AbortController();
  fetchController = controller;
  const response = await fetch("/api/topology", {
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal: controller.signal,
  });
  if (!response.ok) throw new Error(`topology request failed with ${response.status}`);
  const nextPayload = await response.json();
  if (!nextPayload?.city || !Array.isArray(nextPayload.city.routes)) throw new Error("topology response is incomplete");
  return nextPayload;
}

function targetForRelease(release) {
  return (city.routes ?? []).find((route) => route.appId === release.appId || route.id === release.appId) ?? null;
}

function queueReleaseEvent(release, event, target) {
  releaseUiChain = releaseUiChain
    .then(async () => {
      showPhase(event.phase, target, "live");
      await city3d?.handleReleaseEvent?.({
        jobId: release.id,
        targetId: target.id,
        sequence: event.sequence,
        phase: event.phase,
        status: event.status,
      });
    })
    .catch((error) => console.error("Unable to present factual release event", error));
}

function consumeReleaseFeed(nextPayload) {
  const releases = Array.isArray(nextPayload.releases) ? nextPayload.releases : [];
  const events = releases
    .flatMap((release) => (release.events ?? []).map((event) => ({ ...event, release })))
    .sort((left, right) => left.sequence - right.sequence);
  const maximum = Math.max(Number(nextPayload.releaseCursor) || 0, ...events.map(({ sequence }) => sequence), 0);

  if (!releaseFeedReady) {
    releaseFeedReady = true;
    releaseCursor = maximum;
    const current = releases.find(({ status }) => status === "running")
      ?? releases.find(({ status }) => status === "queued");
    const target = current ? targetForRelease(current) : null;
    const event = current?.events?.at(-1);
    if (current && target && event) {
      queueReleaseEvent(current, event, target);
    }
    return;
  }

  for (const { release, ...event } of events.filter(({ sequence }) => sequence > releaseCursor)) {
    if (release.status === "queued" && Number(release.queuePosition) > 0) continue;
    const target = targetForRelease(release);
    if (!target) continue;
    queueReleaseEvent(release, event, target);
  }
  releaseCursor = maximum;
}

async function applyPayload(nextPayload) {
  payload = nextPayload;
  city = nextPayload.city;
  const nextSignature = signatureFor(city);
  if (city3d && nextSignature !== sceneSignature) {
    sceneSignature = nextSignature;
    await city3d.setTopology(city);
  } else {
    city3d?.setStatuses(city);
  }
  city3d?.setLiveDeployments(nextPayload.liveDeployments ?? []);
  consumeReleaseFeed(nextPayload);
  renderStatus(true);
}

async function refreshTopology() {
  if (refreshPending) return;
  refreshPending = true;
  try {
    await applyPayload(await fetchTopology());
  } catch {
    renderStatus(false);
  } finally {
    refreshPending = false;
    fetchController = null;
  }
}

function showPhase(phase, target, source = "demo") {
  window.clearTimeout(toastTimer);
  simulationToast.hidden = false;
  simulationToast.dataset.phase = phase;
  const copy = phase === "rebuild"
    ? `rebuilding ${target.name}`
    : PHASE_COPY[phase] ?? "release moving";
  simulationToast.dataset.source = source;
  simulationCopy.textContent = `${source === "live" ? "LIVE" : "DEMO"} · ${copy}`;
  if (["complete", "failed", "rollback", "interrupted"].includes(phase)) {
    toastTimer = window.setTimeout(() => {
      simulationToast.hidden = true;
    }, 2600);
  }
}

async function simulateRelease() {
  const routes = city.routes ?? [];
  if (!routes.length || simulateButton.disabled) return;
  const selectedRoute = routes.find((route) => route.id === selectedId);
  const target = selectedRoute ?? routes[routeCursor++ % routes.length];
  selectEntity(target.id);
  demoRunning = true;
  simulateButton.disabled = true;
  simulateButton.classList.add("is-running");
  simulateLabel.textContent = "Watching…";
  showPhase("incoming", target, "demo");
  try {
    const completed = await city3d?.simulateDeployment(target.id, (phase) => showPhase(phase, target, "demo"));
    if (!completed) showPhase("complete", target, "demo");
  } finally {
    demoRunning = false;
    simulateButton.disabled = (payload?.liveDeployments?.length ?? 0) > 0;
    simulateButton.classList.remove("is-running");
    simulateLabel.textContent = "Watch a release";
    toastTimer = window.setTimeout(() => {
      simulationToast.hidden = true;
    }, 1400);
  }
}

simulateButton.addEventListener("click", simulateRelease);
document.querySelector("#fit-city").addEventListener("click", () => city3d?.fit());
document.querySelector("#zoom-in").addEventListener("click", () => city3d?.zoom(0.82));
document.querySelector("#zoom-out").addEventListener("click", () => city3d?.zoom(1.22));
document.querySelector("#entity-prev").addEventListener("click", () => selectAdjacent(-1));
document.querySelector("#entity-next").addEventListener("click", () => selectAdjacent(1));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") city3d?.fit();
});

function activateSelected() {
  if (!detailLink.hidden && detailLink.href) detailLink.click();
}

async function start() {
  try {
    payload = await fetchTopology();
    city = payload.city;
  } catch {
    payload = null;
  }

  city3d = window.DeployManager3D?.createCity3D({
    stage,
    onSelect: selectEntity,
    onNavigate: selectAdjacent,
    onActivate: activateSelected,
  });
  if (!city3d) {
    stage.querySelector(".city3d-loading").textContent = "CITY VIEW UNAVAILABLE";
    renderStatus(Boolean(payload));
    return;
  }

  sceneSignature = signatureFor(city);
  await city3d.setTopology(city);
  city3d.setLiveDeployments(payload?.liveDeployments ?? []);
  if (payload) consumeReleaseFeed(payload);
  renderStatus(Boolean(payload));
  refreshTimer = window.setInterval(refreshTopology, 2000);
}

start();

window.addEventListener("beforeunload", () => {
  if (refreshTimer) window.clearInterval(refreshTimer);
  fetchController?.abort();
  city3d?.destroy?.();
});
