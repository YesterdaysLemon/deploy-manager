#!/usr/bin/env node
// Operator-invoked configuration tool. Never imported by the webhook server.
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { generateBundle, normalizeFleetSpec, writeBundle } from "./setup.mjs";
import { CONTROL_PLOT_ADDRESSES, normalizePlotAddress, stablePlotAddresses } from "../client/plot-layout.js";

const ENV_KEYS = new Set(["APP_ID", "REPO_DIR", "REPO_USER", "APP_PORT", "CANDIDATE_APP_PORT", "CONTAINER_NAME", "CANDIDATE_CONTAINER_NAME", "IMAGE_NAME", "DEPLOY_MANAGER_PORT"]);
const json = value => `${JSON.stringify(value, null, 2)}\n`;
const hash = value => createHash("sha256").update(value).digest("hex");
const reject = message => { throw new Error(message); };
const plotKey = ({ x, z }) => `${x}:${z}`;

// Read only known nonsecret settings; never source a shell file.
export function readSettings(text, label) {
  const settings = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const match = line.match(/^([A-Z][A-Z0-9_]*)=(.*)$/);
    if (!match) reject(`${label}: expected literal KEY=value assignments`);
    const [, key, raw] = match;
    if (!ENV_KEYS.has(key)) continue;
    if (Object.hasOwn(settings, key)) reject(`${label}: duplicate ${key}`);
    const value = raw.match(/^'([^']*)'$/)?.[1] ?? raw.match(/^"([^"$`\\]*)"$/)?.[1] ?? (/^[a-zA-Z0-9_./:-]*$/.test(raw) ? raw : null);
    if (value === null) reject(`${label}: ${key} must be literal, without shell expansion`);
    settings[key] = value;
  }
  return settings;
}

function regularFile(file) {
  const stat = fs.lstatSync(file);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.nlink !== 1) reject(`expected a regular, unlinked file: ${file}`);
  return stat;
}

function directory(dir) {
  if (!fs.lstatSync(dir).isDirectory() || fs.realpathSync(dir) !== path.resolve(dir)) reject(`expected a directory without symlinks: ${dir}`);
}

export function snapshotConfig(configDirectory) {
  const root = path.resolve(configDirectory);
  directory(root);
  directory(path.join(root, "apps"));
  const names = ["apps.json", "public-topology.json", "deploy-manager.env",
    ...fs.readdirSync(path.join(root, "apps")).filter(name => name.endsWith(".env")).sort().map(name => `apps/${name}`)];
  const contents = {};
  const fingerprints = {};
  for (const name of names) {
    if (name.startsWith("apps/") && !/^apps\/[a-z0-9][a-z0-9_-]{0,63}\.env$/.test(name)) reject("unsafe existing app env filename");
    const file = path.join(root, name);
    const stat = regularFile(file);
    const buffer = fs.readFileSync(file);
    contents[name] = buffer.toString("utf8");
    fingerprints[name] = { sha256: hash(buffer), mode: stat.mode & 0o777, uid: stat.uid, gid: stat.gid };
  }
  return { root, contents, fingerprints };
}

function repositoryIdentity(value) {
  return String(value).replace(/^https:\/\/github\.com\//i, "").replace(/^git@github\.com:/i, "").replace(/\.git$/, "").toLowerCase();
}

function safeRepoPath(value) {
  if (!value?.startsWith("/") || value === "/") reject("repoDir must be an absolute checkout path");
  if (path.posix.normalize(value) !== value || value.endsWith("/")) reject("repoDir must be canonical without dot segments or a trailing slash");
  return value;
}

// Snapshot and plan are independent of live processes, for isolated replay tests.
export function planRegistration(input, snapshot) {
  if (input?.apps?.length !== 1) reject("registration adds exactly one app at a time");
  if (input.datastores?.length || input.apps[0].datastores?.length) reject("configure datastore relationships separately; registration adds a web app only");
  const spec = normalizeFleetSpec(input);
  const app = spec.apps[0];
  safeRepoPath(app.repoDir);
  const allowlist = JSON.parse(snapshot.contents["apps.json"]);
  const topology = JSON.parse(snapshot.contents["public-topology.json"]);
  if (!allowlist.apps || Array.isArray(allowlist.apps) || typeof allowlist.apps !== "object" || !Array.isArray(topology.routes) || !Array.isArray(topology.datastores ?? [])) reject("unsupported existing fleet shape");
  const manager = readSettings(snapshot.contents["deploy-manager.env"], "deploy-manager.env");
  if (Number(manager.DEPLOY_MANAGER_PORT) !== spec.manager.port) reject("manager.port must match the installed manager");
  if (snapshot.contents["deploy-manager.env"].split(/\r?\n/).some(line => line.startsWith(`${app.secretEnv}=`))) reject("new secret environment name is already present in manager settings");
  const entities = [...topology.routes, ...(topology.datastores ?? [])];
  const control = topology.controlPlane ?? [];
  if (Object.hasOwn(allowlist.apps, app.id) || [...entities, ...control].some(entity => entity.id === app.id || entity.appId === app.id)) reject(`app id already exists: ${app.id}`);
  if (Object.hasOwn(snapshot.contents, `apps/${app.id}.env`)) reject(`app env already exists: ${app.id}`);
  for (const [id, existing] of Object.entries(allowlist.apps)) {
    if (Object.hasOwn(existing, "secret")) reject("move inline webhook secrets to secretEnv before generating a review bundle");
    if (!Object.hasOwn(snapshot.contents, `apps/${id}.env`)) reject(`missing existing app env: ${id}`);
    if (repositoryIdentity(existing.repo) === repositoryIdentity(app.repository)) reject(`repository already registered: ${id}`);
    if (existing.secretEnv === app.secretEnv) reject(`secret environment name already registered: ${id}`);
  }
  const ports = new Set([spec.manager.port]);
  const hostnames = new Set([spec.manager.hostname.toLowerCase()]);
  for (const route of topology.routes) {
    if (route.hostname) hostnames.add(route.hostname.toLowerCase());
    if (route.port) ports.add(Number(route.port));
  }
  for (const existing of Object.values(allowlist.apps)) {
    if (existing.publicUrl) hostnames.add(new URL(existing.publicUrl).hostname.toLowerCase());
  }
  if (hostnames.has(app.hostname)) reject(`hostname already registered: ${app.hostname}`);
  const containerNames = new Set();
  const imageNames = new Set();
  for (const [name, text] of Object.entries(snapshot.contents).filter(([name]) => name.startsWith("apps/"))) {
    const env = readSettings(text, name);
    for (const key of ["REPO_DIR", "APP_PORT", "CANDIDATE_APP_PORT", "CONTAINER_NAME", "IMAGE_NAME"]) {
      if (!env[key]) reject(`${name}: missing ${key}`);
    }
    const existingPath = path.posix.normalize(env.REPO_DIR).replace(/\/$/, "");
    if (!existingPath.startsWith("/")) reject(`${name}: repository path must be absolute`);
    if (app.repoDir === existingPath || app.repoDir.startsWith(`${existingPath}/`) || existingPath.startsWith(`${app.repoDir}/`)) reject(`repository directory overlaps ${name}`);
    for (const key of ["APP_PORT", "CANDIDATE_APP_PORT"]) {
      const port = Number(env[key]);
      if (!Number.isInteger(port) || port < 1 || port > 65535) reject(`${name}: invalid ${key}`);
      ports.add(port);
    }
    containerNames.add(env.CONTAINER_NAME);
    containerNames.add(env.CANDIDATE_CONTAINER_NAME || `${env.CONTAINER_NAME}-candidate`);
    imageNames.add(env.IMAGE_NAME);
  }
  if ([app.publicPort, app.candidatePort].some(port => ports.has(port))) reject("production or candidate port is already reserved");
  if ([app.containerName, app.candidateContainerName].some(name => containerNames.has(name))) reject("container name is already registered");
  if (imageNames.has(app.imageName)) reject("image name is already registered");

  // Resolve omitted legacy plots exactly as the current city does, then persist
  // those addresses so adding an alphabetically earlier ID cannot move them.
  const occupied = new Set(CONTROL_PLOT_ADDRESSES.map(plotKey));
  const seenIds = new Set();
  for (const entity of entities) {
    if (!entity.id || seenIds.has(entity.id)) reject("existing topology has missing or duplicate entity IDs");
    seenIds.add(entity.id);
    if (entity.plot == null) continue;
    const plot = normalizePlotAddress(entity.plot);
    if (!plot || occupied.has(plotKey(plot))) reject("existing topology has invalid, duplicate or reserved plots");
    occupied.add(plotKey(plot));
  }
  const available = stablePlotAddresses(4092).filter(plot => !occupied.has(plotKey(plot)));
  const pinned = [];
  for (const entity of entities.filter(entity => entity.plot == null).sort((a, b) => a.id.localeCompare(b.id))) {
    const plot = available.shift();
    if (!plot) reject("plot space exhausted");
    entity.plot = plot;
    occupied.add(plotKey(plot));
    pinned.push(entity.id);
  }
  const plot = input.apps[0].plot == null ? available.shift() : app.plot;
  if (!plot || occupied.has(plotKey(plot))) reject("new app plot is occupied or reserved");
  app.plot = plot;
  const bundle = generateBundle(spec, "registration proposal");
  allowlist.apps[app.id] = JSON.parse(bundle.files.get("apps.json")).apps[app.id];
  topology.routes.push(JSON.parse(bundle.files.get("public-topology.json")).routes[0]);
  const files = {
    [`apps/${app.id}.env`]: bundle.files.get(`apps/${app.id}.env`),
    "public-topology.json": json(topology),
    "apps.json": json(allowlist),
  };
  return { version: 1, root: snapshot.root, input: spec, before: snapshot.fingerprints, files, pinned,
    workflow: bundle.files.get(`github/${app.id}-deploy.yml`),
    caddy: `${app.hostname} {\n  reverse_proxy 127.0.0.1:${app.publicPort}\n}\n`,
    app };
}

export const planDigest = plan => hash(json(plan));

export function validateHost(app, host) {
  if (!Number.isInteger(host.ownerUid) || host.ownerUid <= 0) reject("repoUser must exist and be unprivileged");
  if (host.repoUid !== host.ownerUid || host.repoRealpath !== app.repoDir) reject("checkout owner or real path does not match the spec");
  if (repositoryIdentity(host.repository) !== repositoryIdentity(app.repository)) reject("checkout origin does not match repository");
  if ([app.publicPort, app.candidatePort].some(port => host.listeningPorts.includes(port))) reject("production or candidate port is already listening");
  if ([app.containerName, app.candidateContainerName].some(name => host.containers.includes(name))) reject("production or candidate container already exists");
}

function inspectHost(app) {
  if (process.platform !== "linux") reject("live registration runs on the Linux VPS; use exported plan functions for offline fixtures");
  const run = (command, args) => execFileSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], timeout: 15000 }).trim();
  const ownerUid = Number(run("id", ["-u", app.repoUser]));
  const repoStat = fs.statSync(app.repoDir);
  const gitArgs = ["-C", app.repoDir, "remote", "get-url", "origin"];
  const repository = process.getuid() === 0
    ? run("runuser", ["-u", app.repoUser, "--", "git", ...gitArgs]) : run("git", gitArgs);
  const listeningPorts = run("ss", ["-H", "-ltn"]).split("\n").map(line => Number(line.trim().split(/\s+/)[3]?.match(/:(\d+)$/)?.[1]));
  const containers = run("docker", ["ps", "-a", "--format", "{{.Names}}"] ).split("\n");
  const host = { ownerUid, repoUid: repoStat.uid, repoRealpath: fs.realpathSync(app.repoDir), repository, listeningPorts, containers };
  validateHost(app, host);
  return host;
}

function atomicWrite(file, contents, metadata) {
  const temporary = `${file}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporary, contents, { mode: metadata.mode, flag: "wx" });
    if (process.platform !== "win32") fs.chownSync(temporary, metadata.uid, metadata.gid);
    fs.chmodSync(temporary, metadata.mode);
    fs.renameSync(temporary, file);
  } finally { if (fs.existsSync(temporary)) fs.unlinkSync(temporary); }
}

// Only computed configuration files are writable. A modified plan cannot turn
// this into an arbitrary-file installer. No sudo, service restart or shell eval.
export function applyRegistration(plan, expectedDigest, { write = atomicWrite } = {}) {
  if (expectedDigest !== planDigest(plan)) reject("plan digest does not match the reviewed plan");
  directory(plan.root);
  const lock = path.join(plan.root, ".registration-lock");
  fs.mkdirSync(lock, { mode: 0o700 });
  let backup;
  const written = [];
  let snapshot;
  try {
    snapshot = snapshotConfig(plan.root);
    const fresh = planRegistration(plan.input, snapshot);
    if (planDigest(fresh) !== expectedDigest) reject("configuration or plan changed; generate and review a fresh plan");
    const backups = path.join(plan.root, ".registration-backups");
    if (!fs.existsSync(backups)) fs.mkdirSync(backups, { mode: 0o700 });
    directory(backups);
    backup = path.join(backups, randomUUID());
    fs.mkdirSync(backup, { mode: 0o700 });
    for (const name of Object.keys(plan.files)) {
      if (!Object.hasOwn(snapshot.contents, name)) continue;
      const target = path.join(backup, name);
      fs.mkdirSync(path.dirname(target), { recursive: true, mode: 0o700 });
      fs.copyFileSync(path.join(plan.root, name), target, fs.constants.COPYFILE_EXCL);
      fs.chmodSync(target, 0o600);
    }
    fs.writeFileSync(path.join(backup, "receipt.json"), json({ digest: expectedDigest, before: plan.before, created: Object.keys(plan.files).filter(name => !Object.hasOwn(snapshot.contents, name)) }), { mode: 0o600, flag: "wx" });
    for (const [name, contents] of Object.entries(plan.files)) {
      const metadata = snapshot.fingerprints[name] ?? { ...snapshot.fingerprints["apps.json"], mode: 0o600 };
      write(path.join(plan.root, name), contents, metadata);
      written.push(name);
    }
    for (const [name, contents] of Object.entries(plan.files)) {
      if (hash(fs.readFileSync(path.join(plan.root, name))) !== hash(contents)) reject(`verification failed: ${name}`);
    }
    return { registered: plan.app.id, digest: expectedDigest, backup, deploymentStarted: false };
  } catch (error) {
    for (const name of written.reverse()) {
      if (Object.hasOwn(snapshot.contents, name)) atomicWrite(path.join(plan.root, name), snapshot.contents[name], snapshot.fingerprints[name]);
      else fs.unlinkSync(path.join(plan.root, name));
    }
    throw new Error(`${error.message}${backup ? `; backup: ${backup}` : ""}`, { cause: error });
  } finally { fs.rmdirSync(lock); }
}

function main(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i];
    if (key === "--help") {
      console.log("Plan: node scripts/register-app.mjs --from app-fleet.json --config /etc/deploy-manager --output /root/app-review\nApply: node scripts/register-app.mjs --apply /root/app-review/plan.json --expect <reviewed-sha256>");
      return;
    }
    if (!["--from", "--config", "--output", "--apply", "--expect"].includes(key) || !argv[i + 1] || args[key]) reject(`invalid argument: ${key}`);
    args[key] = argv[i + 1];
  }
  if (args["--apply"]) {
    if (!args["--expect"] || Object.keys(args).length !== 2) reject("apply requires only --apply and --expect");
    const plan = JSON.parse(fs.readFileSync(args["--apply"], "utf8"));
    if (planDigest(plan) !== args["--expect"]) reject("plan digest does not match the reviewed plan");
    // Validate before any filesystem mutation, and repeat live host checks.
    const fresh = planRegistration(plan.input, snapshotConfig(plan.root));
    if (planDigest(fresh) !== args["--expect"]) reject("configuration or plan changed; generate and review a fresh plan");
    inspectHost(fresh.app);
    console.log(json(applyRegistration(plan, args["--expect"])));
  } else {
    if (!args["--from"] || !args["--output"] || args["--expect"]) reject("planning requires --from and --output");
    const plan = planRegistration(JSON.parse(fs.readFileSync(args["--from"], "utf8")), snapshotConfig(args["--config"] ?? "/etc/deploy-manager"));
    inspectHost(plan.app);
    const digest = planDigest(plan);
    const files = new Map([["plan.json", json(plan)], ["Caddyfile.addition", plan.caddy], ["deploy.yml", plan.workflow],
      ["REVIEW.md", `# Add ${plan.app.id}\n\nPlan SHA256: ${digest}\n\nTarget: ${plan.root}\n\nAdds one app; pins existing inferred plots: ${plan.pinned.join(", ") || "none"}.\n\nCompare before/ and after/ with git diff --no-index. Review Caddyfile.addition and deploy.yml separately. See docs/add-app.md for secret provisioning, service activation and release verification.\n`]]);
    for (const [name, contents] of Object.entries(plan.files)) {
      files.set(`after/${name}`, contents);
      if (Object.hasOwn(plan.before, name)) files.set(`before/${name}`, fs.readFileSync(path.join(plan.root, name), "utf8"));
    }
    const output = writeBundle({ files }, args["--output"]);
    console.log(json({ planned: plan.app.id, digest, output, productionChanged: false }));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { main(process.argv.slice(2)); }
  catch (error) { console.error(`register-app: ${error.message}`); process.exitCode = 1; }
}
