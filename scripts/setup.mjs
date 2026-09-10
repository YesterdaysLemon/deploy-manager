#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";
import {
  CONTROL_PLOT_ADDRESSES,
  normalizePlotAddress,
  stablePlotAddresses,
} from "../client/plot-layout.js";

const APP_ID = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const REPOSITORY = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const BRANCH = /^[A-Za-z0-9._/-]{1,120}$/;
const SECRET_ENV = /^[A-Z][A-Z0-9_]{2,127}$/;
const LINUX_USER = /^[a-z_][a-z0-9_-]{0,31}$/;
const DOCKER_NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,127}$/;
const HOSTNAME = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;
const KINDS = new Set(["archive", "aquarium", "aviary", "bridge", "factory", "lab", "observatory", "site", "tower"]);

function fail(message) {
  throw new Error(message);
}

function requiredString(value, label, maxLength = 240) {
  if (typeof value !== "string" || !value.trim()) fail(`${label} is required`);
  const result = value.trim();
  if (result.length > maxLength) fail(`${label} must be at most ${maxLength} characters`);
  return result;
}

function optionalString(value, label, maxLength = 240) {
  if (value === undefined || value === null || value === "") return undefined;
  return requiredString(value, label, maxLength);
}

function patternString(value, label, pattern) {
  const result = requiredString(value, label);
  if (!pattern.test(result)) fail(`${label} has an invalid format`);
  return result;
}

function branchName(value, label) {
  const result = patternString(value, label, BRANCH);
  const components = result.split("/");
  if (
    result.startsWith("-")
    || result.includes("..")
    || result.includes("@{")
    || components.some((component) => !component
      || component.startsWith(".")
      || component.endsWith(".")
      || component.endsWith(".lock"))
  ) {
    fail(`${label} is not a safe Git branch name`);
  }
  return result;
}

function portNumber(value, label) {
  const result = Number(value);
  if (!Number.isInteger(result) || result < 1 || result > 65_535) fail(`${label} must be an integer from 1 to 65535`);
  return result;
}

function boundedInteger(value, label, minimum, maximum, fallback) {
  const result = Number(value ?? fallback);
  if (!Number.isInteger(result) || result < minimum || result > maximum) {
    fail(`${label} must be an integer from ${minimum} to ${maximum}`);
  }
  return result;
}

function absolutePosixPath(value, label) {
  const result = requiredString(value, label, 512);
  if (!result.startsWith("/") || result.includes("\n") || result.includes("\r")) fail(`${label} must be an absolute POSIX path`);
  return result;
}

function healthPath(value, label) {
  const result = requiredString(value ?? "/healthz", label, 180);
  if (!result.startsWith("/") || result.startsWith("//") || /[\\\u0000-\u001f\u007f#]/.test(result)) {
    fail(`${label} must be a local URL path beginning with one slash`);
  }
  return result;
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", `'"'"'`)}'`;
}

function optionalPlot(value, label) {
  if (value === undefined || value === null) return undefined;
  const plot = normalizePlotAddress(value);
  if (!plot) fail(`${label} must contain half-integer x and z coordinates from -31.5 to 31.5`);
  return plot;
}

function yamlQuote(value) {
  return JSON.stringify(String(value));
}

function normalizeDatastore(store, index) {
  const label = `datastores[${index}]`;
  return {
    id: patternString(store?.id, `${label}.id`, APP_ID),
    name: requiredString(store?.name, `${label}.name`, 100),
    kind: optionalString(store?.kind, `${label}.kind`, 32) ?? "datastore",
    scope: optionalString(store?.scope, `${label}.scope`, 120) ?? "private Docker network",
    description: optionalString(store?.description, `${label}.description`, 240) ?? "Private application data service.",
    plot: optionalPlot(store?.plot, `${label}.plot`),
  };
}

function normalizeApp(app, index) {
  const label = `apps[${index}]`;
  const id = patternString(app?.id, `${label}.id`, APP_ID);
  const kind = (optionalString(app?.kind, `${label}.kind`, 32) ?? "site").toLowerCase();
  if (!KINDS.has(kind)) fail(`${label}.kind must be one of: ${[...KINDS].join(", ")}`);

  const result = {
    id,
    name: requiredString(app?.name, `${label}.name`, 100),
    description: optionalString(app?.description, `${label}.description`, 240) ?? "A health-checked web application.",
    kind,
    repository: patternString(app?.repository, `${label}.repository`, REPOSITORY),
    branch: branchName(app?.branch ?? "main", `${label}.branch`),
    event: "push",
    secretEnv: patternString(app?.secretEnv ?? `${id.replaceAll("-", "_").toUpperCase()}_DEPLOY_WEBHOOK_SECRET`, `${label}.secretEnv`, SECRET_ENV),
    repoDir: absolutePosixPath(app?.repoDir, `${label}.repoDir`),
    repoUser: patternString(app?.repoUser ?? "deploy", `${label}.repoUser`, LINUX_USER),
    imageName: patternString(app?.imageName ?? id, `${label}.imageName`, DOCKER_NAME),
    containerName: patternString(app?.containerName ?? id, `${label}.containerName`, DOCKER_NAME),
    candidateContainerName: patternString(app?.candidateContainerName ?? `${id}-candidate`, `${label}.candidateContainerName`, DOCKER_NAME),
    publicPort: portNumber(app?.publicPort, `${label}.publicPort`),
    candidatePort: portNumber(app?.candidatePort, `${label}.candidatePort`),
    containerPort: portNumber(app?.containerPort, `${label}.containerPort`),
    healthPath: healthPath(app?.healthPath ?? "/healthz", `${label}.healthPath`),
    hostname: patternString(app?.hostname, `${label}.hostname`, HOSTNAME).toLowerCase(),
    runtimeEnvFile: app?.runtimeEnvFile ? absolutePosixPath(app.runtimeEnvFile, `${label}.runtimeEnvFile`) : undefined,
    dockerNetwork: app?.dockerNetwork ? patternString(app.dockerNetwork, `${label}.dockerNetwork`, DOCKER_NAME) : undefined,
    datastores: Array.isArray(app?.datastores)
      ? app.datastores.map((idValue, datastoreIndex) => patternString(idValue, `${label}.datastores[${datastoreIndex}]`, APP_ID))
      : [],
    plot: optionalPlot(app?.plot, `${label}.plot`),
  };

  if (result.publicPort === result.candidatePort) fail(`${label}.candidatePort must differ from publicPort`);
  return result;
}

export function normalizeFleetSpec(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("fleet spec must be a JSON object");
  if (input.version !== 1) fail("fleet spec version must be 1");
  if (!Array.isArray(input.apps) || input.apps.length === 0) fail("fleet spec needs at least one app");
  if (input.apps.length > 64) fail("fleet spec supports at most 64 apps");

  const apps = input.apps.map(normalizeApp);
  const datastores = Array.isArray(input.datastores) ? input.datastores.map(normalizeDatastore) : [];
  const appIds = new Set();
  const ports = new Map();
  const hostnames = new Set();
  const datastoreIds = new Set();
  const secretNames = new Set();
  const containerNames = new Set();
  const repoDirectories = new Set();
  const plotKeys = new Set(CONTROL_PLOT_ADDRESSES.map(({ x, z }) => `${x}:${z}`));
  for (const store of datastores) {
    if (datastoreIds.has(store.id)) fail(`duplicate datastore id: ${store.id}`);
    datastoreIds.add(store.id);
  }

  for (const app of apps) {
    if (appIds.has(app.id)) fail(`duplicate app id: ${app.id}`);
    if (datastoreIds.has(app.id)) fail(`app id conflicts with datastore id: ${app.id}`);
    appIds.add(app.id);
    if (hostnames.has(app.hostname)) fail(`duplicate hostname: ${app.hostname}`);
    hostnames.add(app.hostname);
    if (secretNames.has(app.secretEnv)) fail(`duplicate secret environment name: ${app.secretEnv}`);
    secretNames.add(app.secretEnv);
    if (repoDirectories.has(app.repoDir)) fail(`duplicate repository directory: ${app.repoDir}`);
    repoDirectories.add(app.repoDir);
    for (const name of [app.containerName, app.candidateContainerName]) {
      if (containerNames.has(name)) fail(`duplicate container name: ${name}`);
      containerNames.add(name);
    }
    for (const [role, port] of [["public", app.publicPort], ["candidate", app.candidatePort]]) {
      if (ports.has(port)) fail(`port ${port} is shared by ${ports.get(port)} and ${app.id} ${role}`);
      ports.set(port, `${app.id} ${role}`);
    }
    for (const datastoreId of app.datastores) {
      if (!datastoreIds.has(datastoreId)) fail(`${app.id} references unknown datastore ${datastoreId}`);
    }
  }

  const entities = [...apps, ...datastores];
  const assignedPlots = new Map();
  for (const item of entities.filter(({ plot }) => plot)) {
    const key = `${item.plot.x}:${item.plot.z}`;
    if (plotKeys.has(key)) fail(`plot ${key} is duplicated or reserved for the control plane`);
    plotKeys.add(key);
    assignedPlots.set(item, item.plot);
  }

  const fallbackPlots = stablePlotAddresses(entities.length + 64);
  let fallbackIndex = 0;
  const missingPlots = entities
    .filter(({ plot }) => !plot)
    .sort((left, right) => left.id.localeCompare(right.id));
  for (const item of missingPlots) {
    while (fallbackIndex < fallbackPlots.length) {
      const candidate = fallbackPlots[fallbackIndex++];
      const key = `${candidate.x}:${candidate.z}`;
      if (plotKeys.has(key)) continue;
      item.plot = candidate;
      plotKeys.add(key);
      assignedPlots.set(item, candidate);
      break;
    }
    if (!assignedPlots.has(item)) fail(`could not assign a stable plot to fleet entity ${item.id}`);
  }

  const managerPort = portNumber(input.manager?.port ?? 9000, "manager.port");
  if (ports.has(managerPort)) fail(`manager port ${managerPort} conflicts with ${ports.get(managerPort)}`);
  const managerHostname = patternString(input.manager?.hostname, "manager.hostname", HOSTNAME).toLowerCase();
  if (hostnames.has(managerHostname)) fail(`manager hostname duplicates an app hostname: ${managerHostname}`);

  return {
    version: 1,
    host: {
      name: requiredString(input.host?.name ?? "My VPS", "host.name", 100),
      platform: optionalString(input.host?.platform, "host.platform", 100) ?? "Linux + Docker",
      edge: optionalString(input.host?.edge, "host.edge", 80) ?? "Caddy",
      manager: optionalString(input.host?.manager, "host.manager", 80) ?? "Deploy Manager",
    },
    manager: {
      hostname: managerHostname,
      port: managerPort,
      repository: patternString(input.manager?.repository ?? "YesterdaysLemon/deploy-manager", "manager.repository", REPOSITORY),
      branch: branchName(input.manager?.branch ?? "main", "manager.branch"),
      probeIntervalMs: boundedInteger(input.manager?.probeIntervalMs, "manager.probeIntervalMs", 5_000, 300_000, 30_000),
      probeTimeoutMs: boundedInteger(input.manager?.probeTimeoutMs, "manager.probeTimeoutMs", 250, 15_000, 2_500),
    },
    apps,
    datastores,
  };
}

function appsJson(spec) {
  return {
    apps: Object.fromEntries(spec.apps.map((app) => [app.id, {
      repo: app.repository,
      branch: app.branch,
      event: app.event,
      secretEnv: app.secretEnv,
      publicName: app.name,
      publicDescription: app.description,
      publicUrl: `https://${app.hostname}/`,
    }])),
  };
}

function appEnv(app) {
  const values = [
    ["APP_ID", app.id],
    ["REPO_DIR", app.repoDir],
    ["REPO_USER", app.repoUser],
    ["BRANCH", app.branch],
    ["IMAGE_NAME", app.imageName],
    ["CONTAINER_NAME", app.containerName],
    ["CANDIDATE_CONTAINER_NAME", app.candidateContainerName],
    ["APP_PORT", app.publicPort],
    ["CANDIDATE_APP_PORT", app.candidatePort],
    ["CONTAINER_PORT", app.containerPort],
    ["HEALTH_PATH", app.healthPath],
    ["LOG_FILE", `/var/log/deploy-manager/${app.id}.log`],
  ];
  if (app.runtimeEnvFile) values.push(["CONTAINER_ENV_FILE", app.runtimeEnvFile]);
  if (app.dockerNetwork) values.push(["DOCKER_NETWORK", app.dockerNetwork]);
  return `${values.map(([key, value]) => `${key}=${shellQuote(value)}`).join("\n")}\n`;
}

function publicTopology(spec, generatedAt) {
  return {
    generatedBy: "deploy-manager setup",
    auditedAt: generatedAt,
    host: {
      ...spec.host,
      release: "unknown",
      status: "configured",
    },
    routes: spec.apps.map((app) => ({
      id: app.id,
      appId: app.id,
      name: app.name,
      hostname: app.hostname,
      port: app.publicPort,
      kind: app.kind,
      description: app.description,
      url: `https://${app.hostname}/`,
      plot: app.plot,
      healthPath: app.healthPath,
      ...(app.datastores.length ? { datastores: app.datastores } : {}),
    })),
    datastores: spec.datastores.map((store) => ({
      ...store,
      status: "declared",
      connectedTo: spec.apps.filter((app) => app.datastores.includes(store.id)).map((app) => app.id),
    })),
    controlPlane: [
      { id: "caddy", name: `${spec.host.edge} edge`, status: "declared", description: "Terminates public HTTPS and routes hostnames to loopback-only services." },
      { id: "deploy-manager", name: spec.host.manager, status: "online", description: "Receives signed release requests and reports active loopback health evidence." },
      { id: "docker", name: "Docker engine", status: "declared", description: "Runs production and candidate containers on isolated local ports." },
    ],
  };
}

function managerEnv(spec) {
  const lines = [
    `DEPLOY_MANAGER_APPS_FILE=/etc/deploy-manager/apps.json`,
    `DEPLOY_MANAGER_PUBLIC_TOPOLOGY_FILE=/etc/deploy-manager/public-topology.json`,
    `DEPLOY_MANAGER_HOST=127.0.0.1`,
    `DEPLOY_MANAGER_PORT=${spec.manager.port}`,
    `DEPLOY_MANAGER_SCRIPT=/usr/local/bin/deploy-manager-sudo`,
    `DEPLOY_MANAGER_MAX_BYTES=65536`,
    `DEPLOY_MANAGER_STATE_DIR=/var/lib/deploy-manager`,
    `DEPLOY_MANAGER_PROBES_ENABLED=true`,
    `DEPLOY_MANAGER_PROBE_INTERVAL_MS=${spec.manager.probeIntervalMs}`,
    `DEPLOY_MANAGER_PROBE_TIMEOUT_MS=${spec.manager.probeTimeoutMs}`,
    "",
    "# Replace every placeholder locally on the VPS. Never commit this file after editing.",
  ];
  for (const app of spec.apps) lines.push(`${app.secretEnv}=REPLACE_WITH_A_RANDOM_64_HEX_SECRET`);
  return `${lines.join("\n")}\n`;
}

function caddyfile(spec) {
  const blocks = spec.apps.map((app) => `${app.hostname} {
  reverse_proxy 127.0.0.1:${app.publicPort}
}`);
  blocks.push(`${spec.manager.hostname} {
  reverse_proxy 127.0.0.1:${spec.manager.port}
}`);
  return `${blocks.join("\n\n")}\n`;
}

function workflow(app) {
  const template = fs.readFileSync(new URL("../examples/github-actions/deploy.yml", import.meta.url), "utf8").replaceAll("\r\n", "\n");
  return template
    .replace("name: Validate and deploy", `name: ${yamlQuote(`Validate and deploy ${app.name}`)}`)
    .replaceAll('["main"]', `[${yamlQuote(app.branch)}]`)
    .replace("refs/heads/main", `refs/heads/${app.branch}`);
}

function receipt(spec, generatedAt) {
  const appRows = spec.apps.map((app) => `| \`${app.id}\` | \`${app.repository}\` | \`127.0.0.1:${app.publicPort}\` | \`127.0.0.1:${app.candidatePort}\` | \`${app.healthPath}\` |`).join("\n");
  return `# Deploy Manager setup receipt

Generated at ${generatedAt}. No production files were changed.

| App | Repository | Production | Candidate | Health |
| --- | --- | --- | --- | --- |
${appRows}

## Review before installation

1. Replace the fail-closed placeholder in every generated GitHub workflow with the app's real tests and build, then set the repository variable \`DEPLOY_ENABLED=true\`. Pushes and manual runs deploy only the configured branch; pull requests validate only.
2. Verify every repository path, owner, hostname, and port against the target VPS.
3. Replace every secret placeholder in \`deploy-manager.env\` on the VPS; never commit that edited file.
4. Review \`apps.json\`, \`apps/*.env\`, \`public-topology.json\`, and \`caddy/Caddyfile\` as one bundle.
5. Back up the existing site configuration before copying anything under \`/etc\`.
6. Stop for explicit operator approval before sudo, systemd, Caddy, DNS, secret, or container changes.

See \`docs/manual-setup.md\` or \`docs/agent-quickstart.md\` in the repository for the installation and verification boundary.
`;
}

export function generateBundle(input, generatedAt = new Date().toISOString()) {
  const spec = normalizeFleetSpec(input);
  const files = new Map([
    ["fleet.json", `${JSON.stringify(spec, null, 2)}\n`],
    ["apps.json", `${JSON.stringify(appsJson(spec), null, 2)}\n`],
    ["deploy-manager.env", managerEnv(spec)],
    ["public-topology.json", `${JSON.stringify(publicTopology(spec, generatedAt), null, 2)}\n`],
    ["caddy/Caddyfile", caddyfile(spec)],
    ["SETUP-RECEIPT.md", receipt(spec, generatedAt)],
  ]);
  for (const app of spec.apps) {
    files.set(`apps/${app.id}.env`, appEnv(app));
    files.set(`github/${app.id}-deploy.yml`, workflow(app));
  }
  return { spec, files };
}

export function writeBundle(bundle, outputDirectory) {
  const resolved = path.resolve(outputDirectory);
  if (fs.existsSync(resolved) && fs.readdirSync(resolved).length > 0) {
    fail(`output directory is not empty: ${resolved}`);
  }
  fs.mkdirSync(resolved, { recursive: true, mode: 0o700 });
  for (const [relativePath, contents] of bundle.files) {
    const target = path.join(resolved, relativePath);
    fs.mkdirSync(path.dirname(target), { recursive: true, mode: 0o700 });
    fs.writeFileSync(target, contents, { encoding: "utf8", mode: 0o600, flag: "wx" });
  }
  return resolved;
}

async function ask(terminal, question, defaultValue) {
  const suffix = defaultValue === undefined ? "" : ` [${defaultValue}]`;
  const answer = (await terminal.question(`${question}${suffix}: `)).trim();
  return answer || defaultValue;
}

async function interactiveSpec() {
  const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const baseDomain = await ask(terminal, "Base domain", "example.com");
    const appCount = Number(await ask(terminal, "Number of applications", "1"));
    if (!Number.isInteger(appCount) || appCount < 1 || appCount > 64) fail("application count must be from 1 to 64");
    const apps = [];
    for (let index = 0; index < appCount; index += 1) {
      process.stdout.write(`\nApplication ${index + 1} of ${appCount}\n`);
      const id = await ask(terminal, "App ID", `app-${index + 1}`);
      const publicPort = Number(await ask(terminal, "Production loopback port", String(3000 + index * 10)));
      apps.push({
        id,
        name: await ask(terminal, "Display name", id),
        description: await ask(terminal, "Short public description", "A health-checked web application."),
        kind: await ask(terminal, "Building kind (site/tower/lab/factory/etc.)", "site"),
        repository: await ask(terminal, "GitHub owner/repository", `your-org/${id}`),
        branch: await ask(terminal, "Stable branch", "main"),
        repoDir: await ask(terminal, "VPS checkout path", `/opt/${id}/app`),
        repoUser: await ask(terminal, "VPS checkout owner", "deploy"),
        hostname: await ask(terminal, "Public hostname", `${id}.${baseDomain}`),
        publicPort,
        candidatePort: Number(await ask(terminal, "Candidate loopback port", String(publicPort + 1))),
        containerPort: Number(await ask(terminal, "Container port", "3000")),
        healthPath: await ask(terminal, "Health path", "/healthz"),
        runtimeEnvFile: await ask(terminal, "Runtime env file (blank for none)", ""),
        dockerNetwork: await ask(terminal, "Docker network (blank for none)", ""),
      });
    }
    return {
      version: 1,
      host: {
        name: await ask(terminal, "VPS display name", "My VPS"),
        platform: "Linux + Docker",
        edge: "Caddy",
        manager: "Deploy Manager",
      },
      manager: {
        hostname: await ask(terminal, "Deploy Manager hostname", `deploy.${baseDomain}`),
        port: Number(await ask(terminal, "Deploy Manager loopback port", "9000")),
        repository: "YesterdaysLemon/deploy-manager",
        branch: "main",
      },
      apps,
      datastores: [],
    };
  } finally {
    terminal.close();
  }
}

function parseArguments(argv) {
  const result = { from: null, output: ".deploy-manager/setup", check: false, json: false, nonInteractive: false };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--from" || argument === "--output") {
      const value = argv[index + 1];
      if (!value || value.startsWith("--")) fail(`${argument} requires a value`);
      if (argument === "--from") result.from = value;
      else result.output = value;
      index += 1;
    }
    else if (argument === "--check") result.check = true;
    else if (argument === "--json") result.json = true;
    else if (argument === "--non-interactive") result.nonInteractive = true;
    else if (argument === "--help" || argument === "-h") result.help = true;
    else fail(`unknown argument: ${argument}`);
  }
  if (!result.output) fail("--output requires a directory");
  if (result.nonInteractive && !result.from) fail("--non-interactive requires --from <fleet.json>");
  return result;
}

function help() {
  return `Deploy Manager setup

Human-guided:
  npm run setup

Generate from a reviewed fleet spec:
  npm run setup -- --from examples/fleet.json --output .deploy-manager/setup

Agent-friendly, machine-readable result:
  npm run setup:agent -- --from examples/fleet.json --output .deploy-manager/agent-setup

Validate without writing:
  npm run setup -- --from examples/fleet.json --check
`;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(help());
    return;
  }
  const input = options.from
    ? JSON.parse(fs.readFileSync(path.resolve(options.from), "utf8"))
    : await interactiveSpec();
  const bundle = generateBundle(input);
  if (options.check) {
    const result = { ok: true, apps: bundle.spec.apps.length, files: bundle.files.size, wrote: false };
    process.stdout.write(options.json ? `${JSON.stringify(result)}\n` : `SETUP_VALID apps=${result.apps} files=${result.files}\n`);
    return;
  }
  const output = writeBundle(bundle, options.output);
  const result = { ok: true, apps: bundle.spec.apps.length, files: bundle.files.size, wrote: true, output };
  process.stdout.write(options.json ? `${JSON.stringify(result)}\n` : `SETUP_READY apps=${result.apps} files=${result.files} output=${output}\n`);
}

const isEntrypoint = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isEntrypoint) {
  main().catch((error) => {
    process.stderr.write(`setup: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  });
}
