const cityFallback = {
  auditedAt: "2026-09-02T17:34:49+01:00",
  host: {
    name: "Alireza's VPS",
    platform: "Ubuntu + Docker",
    edge: "Caddy",
    manager: "Deploy Manager",
    release: "07bae6f",
    status: "online",
  },
  routes: [
    { id: "galaxy-menu", appId: "galaxy-menu", name: "Galaxy Menu", hostname: "alirezaafshan.com", port: 3070, kind: "observatory", healthPath: "/", status: "steady" },
    { id: "portfolio", appId: "website", name: "Portfolio", hostname: "portfolio.alirezaafshan.com", port: 3000, kind: "tower", healthPath: "/healthz", status: "steady" },
    { id: "aquarium", appId: "aquarium", name: "Aquarium", hostname: "fish.alirezaafshan.com", port: 3010, kind: "aquarium", healthPath: "/", status: "steady" },
    { id: "birds", appId: "birds", name: "Bird of the Day", hostname: "birds.alirezaafshan.com", port: 3020, kind: "aviary", healthPath: "/api/health", status: "steady" },
    { id: "celegans", appId: "celegans", name: "C. elegans", hostname: "worm.alirezaafshan.com", port: 3030, kind: "lab", healthPath: "/build.json", status: "steady" },
    { id: "continuity", name: "Codex Continuity", hostname: "continuity.alirezaafshan.com", port: 3040, kind: "bridge", healthPath: "/healthz", managedBy: "continuity-deploy-manager", status: "steady" },
    { id: "conspiracy", appId: "conspiracy", name: "Loose Thread", hostname: "conspiracy.alirezaafshan.com", port: 3050, kind: "archive", healthPath: "/healthz", status: "steady" },
    { id: "androidhell", appId: "androidhell", name: "Android Hell", hostname: "androidhell.alirezaafshan.com", port: 3060, kind: "factory", healthPath: "/healthz", datastores: ["androidhell-postgres"], status: "steady" },
  ],
  datastores: [
    { id: "androidhell-postgres", name: "PostgreSQL 17", kind: "postgres", status: "online", scope: "private Docker network", connectedTo: ["androidhell"] },
  ],
  controlPlane: [],
};

const cityCopy = {
  caddy: {
    kicker: "The city gate",
    title: "Caddy edge",
    deck: "One public entrance, eight stable addresses.",
    overview: [
      "Caddy terminates public HTTPS and sends each hostname to a loopback-only service. It is the city gate: visitors see permanent addresses even while the machinery behind one address changes.",
      "The teal boulevards are public traffic. Their job is intentionally boring—keep routing while Deploy Manager works elsewhere.",
    ],
    wiring: [
      "Public hostnames terminate at Caddy, then reverse-proxy to ports 3000 through 3070 on 127.0.0.1.",
      "Deploy traffic for the shared manager enters on 9019. Codex Continuity keeps a separate inlet on 9020.",
    ],
    facts: [["role", "HTTPS + reverse proxy"], ["scope", "public edge"], ["state", "online"]],
  },
  git: {
    kicker: "The freight dock",
    title: "Git push dock",
    deck: "Where a commit asks to enter the release city.",
    overview: [
      "A repository push is pictured as a little SHA cargo packet. In the real system, the webhook must be signed and must name an allowlisted repository, branch, event, and exact commit.",
      "The animated packet on this page is theatre with accurate choreography. It never sends a webhook or touches production.",
    ],
    wiring: [
      "The manager reads the raw request body, verifies HMAC-SHA256 in constant time, then validates release identity before work can begin.",
      "A duplicate rollout for the same app is refused while its lane is occupied.",
    ],
    facts: [["cargo", "exact 40-character SHA"], ["gate", "signed webhook"], ["demo", "simulation only"]],
  },
  "deploy-manager": {
    kicker: "The control tower",
    title: "Deploy Manager",
    deck: "One quiet service choreographing safe releases.",
    overview: [
      "Deploy Manager receives a trusted release request, checks its identity, and asks a narrow root-owned runner to deploy exactly that commit.",
      "It builds beside the live site, tests a candidate on a private port, swaps only after health passes, and keeps the previous image ready for rollback.",
    ],
    wiring: [
      "The shared manager listens on loopback port 9019 behind Caddy. Seven application lanes are allowlisted in root-owned configuration.",
      "This public topology endpoint exposes names and states only. Secrets, filesystem paths, and webhook material stay server-side.",
    ],
    facts: [["release", "07bae6f"], ["shared lanes", "7"], ["listen", "127.0.0.1:9019"], ["state", "online"]],
  },
  docker: {
    kicker: "The rail yard",
    title: "Container switchyard",
    deck: "New and old containers briefly occupy different tracks.",
    overview: [
      "A new image first runs as a candidate on its own loopback port. The live container keeps serving until the candidate has proved it can answer its health check.",
      "At promotion, the previous image moves onto the rollback track and the proven image takes the familiar production port.",
    ],
    wiring: [
      "Container names, ports, networks, health paths, and optional environment files come from root-owned per-app configuration—not from the webhook payload.",
      "Exact container enumeration is intentionally outside this public page. The city displays the audited routing and deployment model.",
    ],
    facts: [["candidate", "isolated loopback port"], ["promotion", "health-gated"], ["recovery", "known-good image"]],
  },
  "androidhell-postgres": {
    kicker: "The private utility",
    title: "PostgreSQL 17",
    deck: "Persistent state stays home while the web container moves.",
    overview: [
      "Android Hell has the one confirmed datastore relationship in this public map. Its PostgreSQL 17 sidecar persists on a private Docker network.",
      "Deploy Manager swaps the Android Hell application container; it does not replace or directly connect to the database.",
    ],
    wiring: [
      "The application uses PostgreSQL through its private Docker network. The database is not part of Caddy's public route and is not a Deploy Manager endpoint.",
      "The dashed rust service line marks that private application-to-database relationship.",
    ],
    facts: [["engine", "PostgreSQL 17"], ["network", "private Docker network"], ["connected app", "Android Hell"], ["state", "online"]],
  },
};

const routeCopy = {
  "galaxy-menu": ["The front door to the collection: a navigable index of the worlds on this server.", "observatory"],
  portfolio: ["The long-running portfolio site, promoted through the shared rollout lane.", "signal tower"],
  aquarium: ["A glassy, static-first aquarium served from its own container.", "glass tank"],
  birds: ["A daily bird exhibit with a small API-backed application server.", "aviary"],
  celegans: ["A browser-run organism simulation with a versioned model and WASM runtime.", "research lab"],
  continuity: ["A continuity bridge with its own dedicated deployment inlet.", "suspension bridge"],
  conspiracy: ["An evidence-mapping workspace in its own health-checked container.", "archive"],
  androidhell: ["A stateful application whose web container can move without replacing its database.", "factory"],
};

const systemCopy = {
  webhook: {
    kicker: "The radio receiver", title: "Signed webhook", deck: "A narrow entrance for a release request.",
    overview: ["A deployment begins with one authenticated POST. The manager verifies the raw body before it believes anything inside.", "A bounded request body and constant-time signature comparison keep the front door deliberately small."],
    wiring: ["The request carries an HMAC-SHA256 signature in x-hub-signature-256.", "Only an allowlisted application route can proceed."],
    facts: [["input", "POST /deploy/:app"], ["proof", "HMAC-SHA256"], ["body", "bounded"]],
  },
  identity: {
    kicker: "The passport arch", title: "Identity gate", deck: "A valid signature is necessary, but not sufficient.",
    overview: ["Repository, event, branch, and commit identity all have to agree before a release crosses the gate.", "A per-app lock prevents two trains from racing toward the same production port."],
    wiring: ["The allowlist maps an app ID to exactly one expected repository, branch, event, and secret source.", "Concurrent work for the same app returns a conflict instead of guessing."],
    facts: [["checks", "repository · branch · event · SHA"], ["lock", "one rollout per app"], ["failure", "closed"]],
  },
  checkout: {
    kicker: "The provenance crane", title: "Exact checkout", deck: "Build what was approved, not merely what is newest.",
    overview: ["The runner fetches the configured branch and resolves the exact requested commit. That identity follows the release into its image tag and log.", "User input never becomes an arbitrary shell command or filesystem path."],
    wiring: ["A root-owned app mapping supplies repository and runtime configuration.", "The requested commit must belong to the configured branch."],
    facts: [["source", "exact commit"], ["tag", "image:<sha>"], ["authority", "root-owned mapping"]],
  },
  build: {
    kicker: "The image foundry", title: "Immutable image build", deck: "The live site stays open while the new artifact is forged.",
    overview: ["Docker builds an image tagged with the verified SHA. A failed build stops here and never touches the current production container.", "The artifact keeps a direct line back to the source commit that made it."],
    wiring: ["The verified checkout becomes Docker's build context.", "Per-app network and environment settings are applied from trusted configuration."],
    facts: [["artifact", "Docker image"], ["identity", "exact SHA tag"], ["live impact", "none during build"]],
  },
  candidate: {
    kicker: "The glass chamber", title: "Candidate health", deck: "A rehearsal before the public handoff.",
    overview: ["The new image starts beside production on a separate loopback-only port. It must pass bounded health checks before promotion.", "If it never becomes healthy, it disappears and the current site remains untouched."],
    wiring: ["The candidate uses the intended runtime image, network, container port, and optional environment file.", "Its name and host port are distinct from production."],
    facts: [["lane", "candidate port"], ["probe", "app-defined health path"], ["failure", "remove candidate"]],
  },
  promote: {
    kicker: "The switch lever", title: "Atomic promotion", deck: "A proven image takes the familiar platform.",
    overview: ["The manager records the current image, stops the old container, and starts the proven candidate image on the production port.", "Caddy keeps the public hostname stable while the container behind it changes."],
    wiring: ["The old image reference is captured before replacement.", "Trusted configuration—not webhook input—selects names and ports."],
    facts: [["precondition", "healthy candidate"], ["route", "stable hostname"], ["reserve", "old image retained"]],
  },
  verify: {
    kicker: "The harbor beacon", title: "Production proof", deck: "Starting is not the same thing as surviving.",
    overview: ["The promoted container must answer its production health endpoint before the rollout can return success.", "A green response here is the final proof attached to the exact requested SHA."],
    wiring: ["The production port is probed with bounded retries.", "Each app defines the health path that represents readiness for its runtime."],
    facts: [["probe", "production loopback"], ["policy", "bounded retries"], ["success", "health + exact SHA"]],
  },
  rollback: {
    kicker: "The recovery vault", title: "Automatic rollback", deck: "A failed promotion becomes an instruction, not a catastrophe.",
    overview: ["If the new production container fails, Deploy Manager removes it and restores the previously running image on the same port.", "The release still reports failure after recovery. Rollback protects availability; it does not disguise a broken release."],
    wiring: ["The pre-promotion image is the explicit rollback target.", "The restored service is health-checked before recovery is recorded."],
    facts: [["target", "known-good image"], ["verification", "health recheck"], ["result", "release remains failed"]],
  },
  runner: {
    kicker: "The machinery below", title: "Narrow root runner", deck: "Elevated authority with a very short vocabulary.",
    overview: ["The public service does not receive a general-purpose root shell. It can ask a narrow wrapper to deploy one known app at one validated SHA.", "This is the boundary between web-facing orchestration and machine-level container work."],
    wiring: ["The app ID maps to a root-owned environment file.", "Repository paths, ports, networks, and container names never come directly from request input."],
    facts: [["authority", "root"], ["interface", "app ID + SHA"], ["configuration", "root-owned"]],
  },
};

const systemOrder = ["webhook", "identity", "checkout", "build", "candidate", "promote", "verify", "rollback", "runner"];
const systemLabels = {
  webhook: ["W", "Signed webhook"], identity: ["I", "Identity gate"], checkout: ["G", "Exact checkout"],
  build: ["B", "Image foundry"], candidate: ["C", "Health chamber"], promote: ["P", "Atomic switch"],
  verify: ["H", "Production proof"], rollback: ["R", "Rollback vault"], runner: ["K", "Root runner"],
};
const cityControls = [
  ["caddy", "TLS", "Caddy gate"],
  ["git", "G", "Git push dock"],
  ["deploy-manager", "DM", "Deploy Manager"],
  ["docker", "D", "Container yard"],
];
const simulationTargets = ["galaxy-menu", "portfolio", "aquarium", "birds", "celegans", "conspiracy", "androidhell"];
const targetPoints = {
  "galaxy-menu": [462, 177], portfolio: [722, 183], aquarium: [1010, 282], birds: [1177, 427],
  celegans: [1080, 601], conspiracy: [543, 687], androidhell: [358, 583], continuity: [800, 720],
};
const sceneBoxes = {
  city: { x: 30, y: 20, width: 1340, height: 840 },
  system: { x: 25, y: 145, width: 1350, height: 825 },
};
const worldBounds = { x: -5000, y: -5000, width: 10_000, height: 10_000 };
const cityDepth = {
  "galaxy-menu": 177,
  portfolio: 183,
  aquarium: 282,
  git: 302,
  "deploy-manager": 413,
  birds: 427,
  caddy: 482,
  docker: 522,
  androidhell: 583,
  celegans: 601,
  "androidhell-postgres": 671,
  conspiracy: 687,
  continuity: 720,
};
const systemDepth = {
  checkout: 338,
  identity: 414,
  build: 432,
  promote: 442,
  webhook: 518,
  candidate: 523,
  verify: 552,
  rollback: 690,
  runner: 692,
};

const shell = document.querySelector("#site-shell");
const map = document.querySelector("#topology-map");
const viewport = document.querySelector("#map-viewport");
const cityScene = document.querySelector("#city-scene");
const systemScene = document.querySelector("#system-scene");
const simulateButton = document.querySelector("#simulate-push");
const traceButton = document.querySelector("#trace-system");
const overviewTab = document.querySelector("#overview-tab");
const wiringTab = document.querySelector("#wiring-tab");
const detailBody = document.querySelector("#detail-body");
const factList = document.querySelector("#fact-list");
const packet = document.querySelector("#push-packet");

let topology = { city: cityFallback, apps: [], activeDeployments: 0, liveDeployments: [], generatedAt: new Date().toISOString() };
let currentView = "city";
let selectedEntity = "deploy-manager";
let selectedDetailTab = "overview";
let viewBox = { ...sceneBoxes.city };
let dragState = null;
let draggedRecently = false;
let simulationToken = 0;
let simulationCursor = 0;
let traceTimer = null;
let traceIndex = 0;
let simEvents = [];

function safePublicUrl(hostname) {
  if (typeof hostname !== "string") return null;
  try {
    const url = new URL(`https://${hostname}`);
    if (url.protocol !== "https:" || !/^(?:[a-z0-9-]+\.)*alirezaafshan\.com$/i.test(url.hostname)) return null;
    return url.href;
  } catch {
    return null;
  }
}

function routeDescriptor(route) {
  const [description = "A health-checked website in the VPS neighborhood.", silhouette = route.kind ?? "building"] = routeCopy[route.id] ?? [];
  const manager = route.managedBy === "continuity-deploy-manager" ? "dedicated continuity inlet" : "shared Deploy Manager";
  return {
    kicker: `Public world / ${silhouette}`,
    title: route.name,
    deck: description,
    overview: [
      description,
      `Caddy keeps ${route.hostname} stable while its application listens privately on loopback port ${route.port}.`,
    ],
    wiring: [
      `Public HTTPS → Caddy → 127.0.0.1:${route.port}. Readiness is checked at ${route.healthPath}.`,
      route.id === "androidhell"
        ? "The replaceable web container talks to PostgreSQL 17 on a private Docker network; the database remains in place during an app swap."
        : `Releases enter through the ${manager}.`,
    ],
    facts: [
      ["hostname", route.hostname, safePublicUrl(route.hostname)],
      ["loopback", `127.0.0.1:${route.port}`],
      ["health", route.healthPath],
      ["manager", manager],
      ["state", route.status ?? "steady"],
    ],
  };
}

function descriptorFor(entityId) {
  if (currentView === "system") return systemCopy[entityId] ?? systemCopy.webhook;
  const route = topology.city.routes.find((item) => item.id === entityId);
  if (route) return routeDescriptor(route);
  const base = cityCopy[entityId] ?? cityCopy["deploy-manager"];
  if (entityId === "deploy-manager") {
    return {
      ...base,
      facts: [
        ["release", topology.city.host?.release ?? "unknown"],
        ["shared lanes", String(topology.city.routes.filter((route) => route.appId).length)],
        ["listen", "127.0.0.1:9019"],
        ["state", topology.city.host?.status ?? "online"],
      ],
    };
  }
  return base;
}

function renderDetails() {
  const descriptor = descriptorFor(selectedEntity);
  document.querySelector("#detail-kicker").textContent = descriptor.kicker;
  document.querySelector("#detail-title").textContent = descriptor.title;
  document.querySelector("#detail-deck").textContent = descriptor.deck;
  document.querySelector("#detail-heading").textContent = selectedDetailTab === "overview" ? "What it does" : "How it is wired";
  detailBody.replaceChildren();
  for (const copy of descriptor[selectedDetailTab]) {
    const paragraph = document.createElement("p");
    paragraph.textContent = copy;
    detailBody.append(paragraph);
  }

  factList.replaceChildren();
  for (const [label, value, href] of descriptor.facts) {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    if (href) {
      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = value;
      detail.append(link);
    } else {
      detail.textContent = value;
    }
    row.append(term, detail);
    factList.append(row);
  }
}

function selectEntity(entityId, { scroll = false } = {}) {
  selectedEntity = entityId;
  document.querySelectorAll(".map-entity").forEach((entity) => {
    entity.classList.toggle("is-selected", entity.dataset.entity === entityId && entity.closest(".scene")?.classList.contains("is-visible"));
  });
  document.querySelectorAll(".index-button").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.entityTarget === entityId);
  });
  document.querySelectorAll(".connection-group").forEach((connection) => {
    const connectedIds = connection.dataset.connects?.split(/\s+/) ?? [];
    connection.classList.toggle("is-related", currentView === "city" && connectedIds.includes(entityId));
  });
  renderDetails();
  if (scroll && window.matchMedia("(max-width: 900px)").matches) {
    document.querySelector(".detail-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function sortSceneEntities(scene, depthMap, topLayer) {
  const entities = [...scene.querySelectorAll(":scope > .map-entity")];
  entities
    .sort((left, right) => (depthMap[left.dataset.entity] ?? 0) - (depthMap[right.dataset.entity] ?? 0))
    .forEach((entity) => scene.append(entity));
  if (topLayer) scene.append(topLayer);
}

function createIndexButton(id, code, name, kind, status = "steady") {
  const button = document.createElement("button");
  button.className = `index-button${status === "deploying" ? " is-deploying" : ""}`;
  button.type = "button";
  button.dataset.entityTarget = id;
  button.dataset.kind = kind;

  const codeNode = document.createElement("span");
  codeNode.className = "index-code";
  codeNode.textContent = code;
  const nameNode = document.createElement("span");
  nameNode.className = "index-name";
  nameNode.textContent = name;
  const stateNode = document.createElement("span");
  stateNode.className = "index-state";
  stateNode.setAttribute("aria-label", status);
  button.append(codeNode, nameNode, stateNode);
  button.addEventListener("click", () => selectEntity(id, { scroll: true }));
  return button;
}

function appendIndexGroup(index, label, entries) {
  const heading = document.createElement("p");
  heading.className = "index-group-label";
  heading.textContent = label;
  index.append(heading);
  for (const entry of entries) index.append(createIndexButton(...entry));
}

function renderIndex() {
  const index = document.querySelector("#entity-index");
  index.replaceChildren();
  if (currentView === "system") {
    appendIndexGroup(index, "Release path", systemOrder.slice(0, 8).map((id) => [id, systemLabels[id][0], systemLabels[id][1], "step", "steady"]));
    appendIndexGroup(index, "Below the boundary", [["runner", "K", "Root runner", "step", "steady"]]);
    return;
  }

  appendIndexGroup(index, "Control plane", cityControls.map(([id, code, name]) => [id, code, name, "control", "steady"]));
  appendIndexGroup(index, "Public worlds", topology.city.routes.map((route, indexNumber) => [
    route.id,
    String(indexNumber + 1).padStart(2, "0"),
    route.name,
    "route",
    route.status ?? "steady",
  ]));
  appendIndexGroup(index, "Private utilities", topology.city.datastores.map((store) => [store.id, "DB", store.name, "datastore", store.status ?? "online"]));
}

function setEvents(entries, mode = "REAL STATE") {
  const list = document.querySelector("#event-list");
  const badge = document.querySelector("#event-mode");
  list.replaceChildren();
  badge.textContent = mode;
  badge.classList.toggle("is-simulated", mode === "SIMULATION");
  for (const entry of entries.slice(-5).reverse()) {
    const item = document.createElement("li");
    const time = document.createElement("time");
    const copy = document.createElement("span");
    time.textContent = entry.time;
    copy.textContent = entry.copy;
    item.append(time, copy);
    list.append(item);
  }
}

function renderRealEvents() {
  const active = topology.liveDeployments ?? [];
  const entries = [
    { time: "note", copy: "Simulation never sends a production request." },
    { time: "audit", copy: `${topology.city.routes.length} public routes and ${topology.city.datastores.length} confirmed datastore relationship are mapped.` },
    { time: "live", copy: "Caddy, Docker, and Deploy Manager report online." },
    active.length
      ? { time: "now", copy: `${active.join(", ")} has a live rollout in progress.` }
      : { time: "now", copy: "Seven shared rollout lanes report steady." },
  ];
  setEvents(entries);
}

function applyViewBox() {
  map.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
}

function clampViewBox() {
  const minVisibleX = worldBounds.x + 70;
  const maxVisibleX = worldBounds.x + worldBounds.width - 70;
  const minVisibleY = worldBounds.y + 70;
  const maxVisibleY = worldBounds.y + worldBounds.height - 70;
  viewBox.x = Math.min(maxVisibleX, Math.max(minVisibleX - viewBox.width, viewBox.x));
  viewBox.y = Math.min(maxVisibleY, Math.max(minVisibleY - viewBox.height, viewBox.y));
}

function fitView() {
  viewBox = { ...sceneBoxes[currentView] };
  applyViewBox();
}

function screenToSvg(clientX, clientY) {
  const matrix = map.getScreenCTM();
  if (!matrix) return { x: viewBox.x + viewBox.width / 2, y: viewBox.y + viewBox.height / 2 };
  const point = map.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  return point.matrixTransform(matrix.inverse());
}

function zoom(factor, clientX, clientY) {
  const origin = Number.isFinite(clientX) && Number.isFinite(clientY)
    ? screenToSvg(clientX, clientY)
    : { x: viewBox.x + viewBox.width / 2, y: viewBox.y + viewBox.height / 2 };
  const nextWidth = Math.min(2100, Math.max(260, viewBox.width * factor));
  const nextHeight = Math.min(1660, Math.max(165, viewBox.height * factor));
  const widthRatio = nextWidth / viewBox.width;
  const heightRatio = nextHeight / viewBox.height;
  viewBox.x = origin.x - (origin.x - viewBox.x) * widthRatio;
  viewBox.y = origin.y - (origin.y - viewBox.y) * heightRatio;
  viewBox.width = nextWidth;
  viewBox.height = nextHeight;
  clampViewBox();
  applyViewBox();
}

function stopTrace() {
  if (traceTimer) window.clearInterval(traceTimer);
  traceTimer = null;
  traceButton.classList.remove("is-running");
  traceButton.textContent = "Trace the system";
}

function clearTraceMarks() {
  document.querySelectorAll("[data-step-line]").forEach((line) => line.classList.remove("is-traced"));
  document.querySelectorAll(".system-entity").forEach((entity) => entity.classList.remove("is-tracing"));
}

function traceOneStep() {
  const flow = systemOrder.slice(0, 8);
  const id = flow[traceIndex % flow.length];
  document.querySelectorAll(".system-entity").forEach((entity) => entity.classList.toggle("is-tracing", entity.dataset.entity === id));
  document.querySelector(`[data-step-line="${id}"]`)?.classList.add("is-traced");
  selectEntity(id);
  const descriptor = systemCopy[id];
  setEvents([
    { time: "trace", copy: `Step ${traceIndex + 1}/${flow.length}: ${descriptor.title}.` },
    { time: "note", copy: descriptor.deck },
    { time: "safe", copy: "This trace is explanatory; no deployment is sent." },
  ], "SIMULATION");
  traceIndex += 1;
  if (traceIndex >= flow.length) {
    stopTrace();
    window.setTimeout(() => {
      clearTraceMarks();
      renderRealEvents();
    }, 1300);
  }
}

function startTrace() {
  if (traceTimer) {
    stopTrace();
    return;
  }
  if (currentView !== "system") switchView("system");
  traceIndex = 0;
  clearTraceMarks();
  traceButton.classList.add("is-running");
  traceButton.textContent = "Pause trace";
  traceOneStep();
  traceTimer = window.setInterval(traceOneStep, 920);
}

function switchView(nextView) {
  if (!sceneBoxes[nextView] || currentView === nextView) return;
  stopTrace();
  clearTraceMarks();
  simulationToken += 1;
  resetSimulationVisuals();
  currentView = nextView;
  shell.dataset.view = nextView;
  cityScene.classList.toggle("is-visible", nextView === "city");
  systemScene.classList.toggle("is-visible", nextView === "system");
  cityScene.setAttribute("aria-hidden", String(nextView !== "city"));
  systemScene.setAttribute("aria-hidden", String(nextView !== "system"));
  document.querySelectorAll("[data-view-target]").forEach((tab) => {
    const active = tab.dataset.viewTarget === nextView;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  if (nextView === "city") {
    document.querySelector("#index-kicker").textContent = "The neighborhood";
    document.querySelector("#index-intro").textContent = "A public-safe portrait of the services currently routed through this VPS. Pick a structure to inspect it.";
    document.querySelector("#scene-kicker").textContent = "Current topology";
    document.querySelector("#scene-heading").textContent = "A tiny city that ships itself";
    document.querySelector("#scene-deck").textContent = "Live inventory, illustrated. Release movement is simulated unless the rail says LIVE.";
    document.querySelector("#map-title").textContent = "Deploy Manager VPS city";
    document.querySelector("#map-description").textContent = "An interactive isometric city showing Deploy Manager, the public edge, Docker, eight websites, and a private PostgreSQL database.";
    selectedEntity = "deploy-manager";
  } else {
    document.querySelector("#index-kicker").textContent = "The rollout path";
    document.querySelector("#index-intro").textContent = "Follow a signed request from the radio tower to production proof—or back into the rollback vault.";
    document.querySelector("#scene-kicker").textContent = "System anatomy";
    document.querySelector("#scene-heading").textContent = "How a release crosses the city";
    document.querySelector("#scene-deck").textContent = "Each structure has a different job, authority boundary, and failure behavior.";
    document.querySelector("#map-title").textContent = "Deploy Manager release system";
    document.querySelector("#map-description").textContent = "An interactive system map tracing a signed webhook through identity checks, exact checkout, image build, candidate health, atomic promotion, production proof, and rollback.";
    selectedEntity = "webhook";
  }
  renderIndex();
  selectEntity(selectedEntity);
  renderRealEvents();
  fitView();
}

function delay(milliseconds, token) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(token === simulationToken), milliseconds);
  });
}

function positionPacket(point) {
  packet.setAttribute("transform", `translate(${point[0]} ${point[1]})`);
}

function animatePacket(points, duration, token) {
  const segments = [];
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1];
    const end = points[index];
    const length = Math.hypot(end[0] - start[0], end[1] - start[1]);
    segments.push({ start, end, length, begins: total });
    total += length;
  }
  packet.classList.add("is-visible");
  positionPacket(points[0]);
  const started = performance.now();
  return new Promise((resolve) => {
    function frame(now) {
      if (token !== simulationToken) {
        packet.classList.remove("is-visible");
        resolve(false);
        return;
      }
      const progress = Math.min(1, (now - started) / duration);
      const travelled = progress * total;
      const segment = segments.find((item) => travelled <= item.begins + item.length) ?? segments.at(-1);
      const local = segment.length ? Math.min(1, Math.max(0, (travelled - segment.begins) / segment.length)) : 1;
      const eased = local < 0.5 ? 2 * local * local : 1 - Math.pow(-2 * local + 2, 2) / 2;
      positionPacket([
        segment.start[0] + (segment.end[0] - segment.start[0]) * eased,
        segment.start[1] + (segment.end[1] - segment.start[1]) * eased,
      ]);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        resolve(true);
      }
    }
    requestAnimationFrame(frame);
  });
}

function addSimEvent(time, copy) {
  simEvents.push({ time, copy });
  setEvents(simEvents, "SIMULATION");
}

function setSimulationMessage(copy) {
  document.querySelector("#simulation-copy").textContent = copy;
}

function resetSimulationVisuals() {
  packet.classList.remove("is-visible");
  document.querySelectorAll(".is-sim-target").forEach((entity) => entity.classList.remove("is-sim-target"));
  const current = document.querySelector(".current-container");
  const candidate = document.querySelector(".candidate-container");
  current?.setAttribute("transform", "translate(-43 28)");
  candidate?.setAttribute("transform", "translate(42 28)");
  current?.classList.remove("is-rollback", "is-live", "is-building", "is-healthy");
  candidate?.classList.remove("is-rollback", "is-live", "is-building", "is-healthy");
  simulateButton.classList.remove("is-running");
  simulateButton.innerHTML = '<span aria-hidden="true">◆</span> Simulate a push';
  document.querySelector("#truth-chip").classList.remove("is-simulated");
  document.querySelector("#truth-copy").textContent = topology.activeDeployments ? `LIVE · ${topology.activeDeployments} rollout moving` : "live topology · steady";
  setSimulationMessage("Topology is live. Pushes and swaps are illustrated only when you press simulate.");
}

async function simulatePush() {
  simulationToken += 1;
  const token = simulationToken;
  if (currentView !== "city") switchView("city");
  resetSimulationVisuals();
  simulationToken = token;

  const targetId = simulationTargets[simulationCursor % simulationTargets.length];
  simulationCursor += 1;
  const target = topology.city.routes.find((route) => route.id === targetId) ?? topology.city.routes[0];
  const targetPoint = targetPoints[target.id] ?? [1010, 282];
  const manager = document.querySelector('[data-entity="deploy-manager"]');
  const yard = document.querySelector('[data-entity="docker"]');
  const targetEntity = document.querySelector(`[data-entity="${target.id}"]`);
  const current = document.querySelector(".current-container");
  const candidate = document.querySelector(".candidate-container");

  selectEntity(target.id);
  simulateButton.classList.add("is-running");
  simulateButton.textContent = "Simulation running";
  document.querySelector("#truth-chip").classList.add("is-simulated");
  document.querySelector("#truth-copy").textContent = "SIMULATION · no request sent";
  simEvents = [];
  addSimEvent("sim", `A pretend push for ${target.name} arrived at the Git dock.`);
  setSimulationMessage(`SIMULATION — ${target.name}: signed SHA packet crossing the city. No production request sent.`);

  if (!await animatePacket([[270, 302], [566, 413]], 1300, token)) return;
  manager?.classList.add("is-sim-target");
  candidate?.classList.add("is-building");
  addSimEvent("build", `Deploy Manager checks identity and builds ${target.id}:<sha>.`);
  setSimulationMessage(`SIMULATION — exact SHA accepted; the image foundry is building beside ${target.name}.`);
  if (!await delay(950, token)) return;

  manager?.classList.remove("is-sim-target");
  yard?.classList.add("is-sim-target");
  if (!await animatePacket([[566, 413], [818, 522]], 900, token)) return;
  candidate?.classList.remove("is-building");
  candidate?.classList.add("is-healthy");
  addSimEvent("probe", `Candidate answers ${target.healthPath}; the live container is still serving.`);
  setSimulationMessage(`SIMULATION — candidate is healthy at ${target.healthPath}; production is still untouched.`);
  if (!await delay(900, token)) return;

  current?.setAttribute("transform", "translate(-98 74)");
  current?.classList.add("is-rollback");
  candidate?.setAttribute("transform", "translate(-43 28)");
  candidate?.classList.remove("is-healthy");
  candidate?.classList.add("is-live");
  addSimEvent("swap", `Known-good image moves to rollback; candidate takes port ${target.port}.`);
  setSimulationMessage(`SIMULATION — atomic swap: new container takes 127.0.0.1:${target.port}; old image waits on the rollback track.`);
  if (!await delay(850, token)) return;

  yard?.classList.remove("is-sim-target");
  if (!await animatePacket([[818, 522], targetPoint], 1150, token)) return;
  packet.classList.remove("is-visible");
  targetEntity?.classList.add("is-sim-target");
  addSimEvent("green", `${target.hostname} stays put; production health returns green.`);
  setSimulationMessage(`SIMULATION COMPLETE — Caddy keeps ${target.hostname} stable and the new container is healthy.`);
  if (!await delay(2200, token)) return;

  resetSimulationVisuals();
  renderRealEvents();
}

function resetAll() {
  simulationToken += 1;
  stopTrace();
  clearTraceMarks();
  resetSimulationVisuals();
  selectedDetailTab = "overview";
  overviewTab.classList.add("is-active");
  overviewTab.setAttribute("aria-selected", "true");
  wiringTab.classList.remove("is-active");
  wiringTab.setAttribute("aria-selected", "false");
  const defaultEntity = currentView === "city" ? "deploy-manager" : "webhook";
  renderIndex();
  selectEntity(defaultEntity);
  renderRealEvents();
  fitView();
}

function setDetailTab(tabName) {
  selectedDetailTab = tabName;
  const overview = tabName === "overview";
  overviewTab.classList.toggle("is-active", overview);
  wiringTab.classList.toggle("is-active", !overview);
  overviewTab.setAttribute("aria-selected", String(overview));
  wiringTab.setAttribute("aria-selected", String(!overview));
  renderDetails();
}

function applyLiveStatus() {
  document.querySelectorAll(".city-entity").forEach((entity) => entity.classList.remove("is-live-deploying"));
  for (const appId of topology.liveDeployments ?? []) {
    const route = topology.city.routes.find((item) => item.appId === appId);
    if (route) document.querySelector(`[data-entity="${route.id}"]`)?.classList.add("is-live-deploying");
  }
  if ((topology.liveDeployments ?? []).length) {
    document.querySelector('[data-entity="deploy-manager"]')?.classList.add("is-live-deploying");
    document.querySelector('[data-entity="docker"]')?.classList.add("is-live-deploying");
  }
}

async function refreshTopology() {
  try {
    const response = await fetch("/api/topology", { headers: { Accept: "application/json" }, cache: "no-store" });
    if (!response.ok) throw new Error(`topology returned ${response.status}`);
    const nextTopology = await response.json();
    if (!nextTopology?.city?.routes || !Array.isArray(nextTopology.city.routes)) throw new Error("topology shape invalid");
    topology = nextTopology;
    shell.classList.remove("is-offline");
    document.querySelector("#host-status").textContent = topology.city.host?.status ?? "online";
    document.querySelector("#route-count").textContent = String(topology.city.routes.length).padStart(2, "0");
    document.querySelector("#lane-count").textContent = `${topology.city.routes.filter((route) => route.appId).length} + 01`;
    document.querySelector("#manager-release").textContent = topology.city.host?.release ?? "unknown";
    document.querySelector("#sample-time").textContent = `sampled ${new Date(topology.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
    document.querySelector("#audit-stamp").textContent = `inventory audited ${new Date(topology.city.auditedAt).toLocaleDateString([], { year: "numeric", month: "short", day: "2-digit" })}`;
    if (!simulateButton.classList.contains("is-running")) {
      document.querySelector("#truth-copy").textContent = topology.activeDeployments ? `LIVE · ${topology.activeDeployments} rollout moving` : "live topology · steady";
    }
    applyLiveStatus();
    renderIndex();
    selectEntity(selectedEntity);
    if (!simulateButton.classList.contains("is-running") && !traceTimer) renderRealEvents();
  } catch {
    shell.classList.add("is-offline");
    document.querySelector("#host-status").textContent = "link unavailable";
    document.querySelector("#sample-time").textContent = "retrying live sample…";
    document.querySelector("#truth-copy").textContent = "cached topology · link unavailable";
    renderIndex();
    selectEntity(selectedEntity);
  }
}

document.querySelectorAll("[data-view-target]").forEach((tab) => tab.addEventListener("click", () => switchView(tab.dataset.viewTarget)));
document.querySelectorAll(".map-entity").forEach((entity) => {
  entity.addEventListener("click", () => {
    if (draggedRecently) return;
    selectEntity(entity.dataset.entity, { scroll: true });
  });
  entity.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectEntity(entity.dataset.entity, { scroll: true });
    }
  });
});

overviewTab.addEventListener("click", () => setDetailTab("overview"));
wiringTab.addEventListener("click", () => setDetailTab("wiring"));
simulateButton.addEventListener("click", simulatePush);
traceButton.addEventListener("click", startTrace);
document.querySelector("#reset-view").addEventListener("click", resetAll);
document.querySelector("#fit-map").addEventListener("click", fitView);
document.querySelector("#zoom-in").addEventListener("click", () => zoom(0.78));
document.querySelector("#zoom-out").addEventListener("click", () => zoom(1.28));

viewport.addEventListener("wheel", (event) => {
  event.preventDefault();
  zoom(event.deltaY > 0 ? 1.12 : 0.89, event.clientX, event.clientY);
}, { passive: false });

viewport.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  const matrix = map.getScreenCTM();
  dragState = {
    pointerId: event.pointerId,
    clientX: event.clientX,
    clientY: event.clientY,
    x: viewBox.x,
    y: viewBox.y,
    scaleX: Math.abs(matrix?.a || viewport.clientWidth / viewBox.width),
    scaleY: Math.abs(matrix?.d || viewport.clientHeight / viewBox.height),
  };
  draggedRecently = false;
  viewport.setPointerCapture(event.pointerId);
  viewport.classList.add("is-dragging");
});

viewport.addEventListener("pointermove", (event) => {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  const dx = event.clientX - dragState.clientX;
  const dy = event.clientY - dragState.clientY;
  if (Math.hypot(dx, dy) > 4) draggedRecently = true;
  viewBox.x = dragState.x - dx / dragState.scaleX;
  viewBox.y = dragState.y - dy / dragState.scaleY;
  clampViewBox();
  applyViewBox();
});

function endDrag(event) {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  viewport.releasePointerCapture(event.pointerId);
  dragState = null;
  viewport.classList.remove("is-dragging");
  window.setTimeout(() => { draggedRecently = false; }, 0);
}

viewport.addEventListener("pointerup", endDrag);
viewport.addEventListener("pointercancel", endDrag);

window.addEventListener("keydown", (event) => {
  if (event.key === "+" || event.key === "=") zoom(0.82);
  if (event.key === "-") zoom(1.22);
  if (event.key.toLowerCase() === "f" && !event.metaKey && !event.ctrlKey) fitView();
});

sortSceneEntities(cityScene, cityDepth, packet);
sortSceneEntities(systemScene, systemDepth);
fitView();
renderIndex();
selectEntity("deploy-manager");
renderRealEvents();
refreshTopology();
window.setInterval(refreshTopology, 10_000);
