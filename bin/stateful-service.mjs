#!/usr/bin/env node
// Installed with deploy-app.sh by the manual root-plane bootstrap, never by
// the service updater. Runtime JSON and backup hooks are operator-owned.
import fs from "node:fs";
import path from "node:path";
import net from "node:net";
import { createHash, randomUUID } from "node:crypto";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execute = promisify(execFile);
const NAME = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,127}$/;
const IMAGE = /^[a-zA-Z0-9][a-zA-Z0-9._/:@-]{0,255}$/;
const IMAGE_ID = /^sha256:[a-f0-9]{64}$/;
const ID = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const SNAPSHOT = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,255}$/;
const reject = message => { throw new Error(message); };
const json = value => `${JSON.stringify(value, null, 2)}\n`;
export const fingerprint = value => createHash("sha256").update(json(value)).digest("hex");
export const configurationFingerprint = (context, runtime) => fingerprint({ runtime,
  appId: context.appId, containerName: context.containerName, port: context.port,
  containerPort: context.containerPort, network: context.network ?? null,
  envFile: context.envFile ?? null, envHash: context.envHash ?? null,
  healthPath: context.healthPath ?? "/healthz" });

function canonical(value, label) {
  if (typeof value !== "string" || !value.startsWith("/") || value === "/"
    || path.posix.normalize(value) !== value || value.endsWith("/")
    || /[\u0000-\u0020\u007f,]/.test(value)) reject(`${label} must be a canonical absolute POSIX path`);
  return value;
}
function port(value, label) {
  if (!Number.isInteger(value) || value < 1 || value > 65535) reject(`${label} must be a port number`);
  return value;
}

export function normalizeRuntime(value, label = "runtime") {
  if (!value || typeof value !== "object" || Array.isArray(value)) reject(`${label} must be an object`);
  const keys = new Set(["version", "deployment", "mounts", "ports", "backupHook", "stopTimeoutSeconds", "memory", "cpus", "exposeHttp", "ipv4Address"]);
  if (Object.keys(value).some(key => !keys.has(key))) reject(`${label} contains unsupported fields; keep secrets in the service configuration`);
  if (value.version !== 1 || value.deployment !== "stateful") reject(`${label} requires version 1 and deployment stateful`);
  if (!Array.isArray(value.mounts) || value.mounts.length < 1 || value.mounts.length > 16) reject(`${label}.mounts needs 1 to 16 mounts`);
  const targets = new Set();
  const sources = new Set();
  const mounts = value.mounts.map((mount, index) => {
    const item = `${label}.mounts[${index}]`;
    if (!["bind", "volume"].includes(mount?.type)) reject(`${item}.type must be bind or volume`);
    const source = mount.type === "bind" ? canonical(mount.source, `${item}.source`) : mount.source;
    if (mount.type === "volume" && !NAME.test(source ?? "")) reject(`${item}.source is not a safe Docker volume name`);
    const target = canonical(mount.target, `${item}.target`);
    if ([...targets].some(existing => target === existing || target.startsWith(`${existing}/`) || existing.startsWith(`${target}/`))) reject(`${item}.target overlaps another mount`);
    if (sources.has(`${mount.type}:${source}`)) reject(`${item}.source is duplicated`);
    targets.add(target); sources.add(`${mount.type}:${source}`);
    if (mount.readOnly !== undefined && typeof mount.readOnly !== "boolean") reject(`${item}.readOnly must be boolean`);
    return { type: mount.type, source, target, readOnly: mount.readOnly ?? false };
  });
  if (!mounts.some(mount => !mount.readOnly)) reject(`${label} needs writable persistent storage`);
  if (mounts.some(mount => mount.type === "bind" && ["/etc", "/usr", "/var", "/proc", "/sys", "/dev", "/run"].some(root => mount.source === root || mount.source.startsWith(`${root}/`)))) reject(`${label} bind sources must be dedicated application directories outside system trees`);
  if (!Array.isArray(value.ports ?? []) || (value.ports ?? []).length > 16) reject(`${label}.ports must contain at most 16 additional TCP ports`);
  const bindings = new Set();
  const ports = (value.ports ?? []).map((binding, index) => {
    const item = `${label}.ports[${index}]`;
    if (!net.isIPv4(binding?.host ?? "") || binding.host === "0.0.0.0") reject(`${item}.host must be an explicit IPv4 address`);
    const hostPort = port(binding.hostPort, `${item}.hostPort`);
    const containerPort = port(binding.containerPort, `${item}.containerPort`);
    if (bindings.has(hostPort)) reject(`${item}.hostPort is duplicated`);
    bindings.add(hostPort);
    return { host: binding.host, hostPort, containerPort };
  });
  const backupHook = canonical(value.backupHook, `${label}.backupHook`);
  if (!backupHook.startsWith("/etc/deploy-manager/hooks/") || path.posix.dirname(backupHook) !== "/etc/deploy-manager/hooks") reject(`${label}.backupHook must be directly under /etc/deploy-manager/hooks`);
  const stopTimeoutSeconds = value.stopTimeoutSeconds ?? 60;
  if (!Number.isInteger(stopTimeoutSeconds) || stopTimeoutSeconds < 10 || stopTimeoutSeconds > 300) reject(`${label}.stopTimeoutSeconds must be 10 to 300`);
  if (value.memory !== undefined && !/^[1-9][0-9]{0,6}[mg]$/.test(value.memory)) reject(`${label}.memory must be a Docker memory limit in m or g`);
  if (value.cpus !== undefined && (typeof value.cpus !== "number" || value.cpus < 0.1 || value.cpus > 64)) reject(`${label}.cpus must be 0.1 to 64`);
  if (value.ipv4Address !== undefined && (!net.isIPv4(value.ipv4Address) || !/^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(value.ipv4Address))) reject(`${label}.ipv4Address must be a private Docker IPv4 address`);
  if (value.exposeHttp !== undefined && typeof value.exposeHttp !== "boolean") reject(`${label}.exposeHttp must be boolean`);
  return { version: 1, deployment: "stateful", mounts, ports, backupHook, stopTimeoutSeconds,
    ...(value.memory ? { memory: value.memory } : {}), ...(value.cpus ? { cpus: value.cpus } : {}),
    ...(value.ipv4Address ? { ipv4Address: value.ipv4Address } : {}), exposeHttp: value.exposeHttp ?? false };
}

export function containerArguments(context, runtime, image) {
  if (!NAME.test(context.containerName) || !IMAGE.test(image)) reject("unsafe container name or image");
  const args = ["run", "-d", "--name", context.containerName, "--restart", "unless-stopped", "--stop-timeout", String(runtime.stopTimeoutSeconds)];
  if (context.network) { if (!NAME.test(context.network)) reject("unsafe Docker network"); args.push("--network", context.network); }
  if (runtime.ipv4Address) { if (!context.network) reject("static Docker address requires a named network"); args.push("--ip", runtime.ipv4Address); }
  if (context.envFile) args.push("--env-file", context.envFile);
  if (runtime.memory) args.push("--memory", runtime.memory);
  if (runtime.cpus) args.push("--cpus", String(runtime.cpus));
  args.push("-p", `127.0.0.1:${port(context.port, "health port")}:${port(context.containerPort, "container port")}`);
  for (const binding of runtime.ports) args.push("-p", `${binding.host}:${binding.hostPort}:${binding.containerPort}`);
  for (const mount of runtime.mounts) args.push("--mount", `type=${mount.type},source=${mount.source},target=${mount.target}${mount.readOnly ? ",readonly" : ""}`);
  args.push(image);
  return args;
}
export function transportMatches(context, runtime, container) {
  const expected = [`${context.containerPort}/tcp:127.0.0.1:${context.port}`,
    ...runtime.ports.map(binding => `${binding.containerPort}/tcp:${binding.host}:${binding.hostPort}`)].sort();
  const actual = [];
  for (const [key, bindings] of Object.entries(container?.portBindings ?? {})) for (const binding of bindings ?? []) actual.push(`${key}:${binding.HostIp}:${Number(binding.HostPort)}`);
  return fingerprint(expected) === fingerprint(actual.sort());
}

export function validateBackupReceipt(value) {
  if (value?.version !== 1 || value.verified !== true || value.encrypted !== true || value.offHost !== true
    || !SNAPSHOT.test(value.snapshotId ?? "")) reject("backup hook did not confirm a verified encrypted off-host snapshot");
  return { version: 1, snapshotId: value.snapshotId, verified: true, encrypted: true, offHost: true };
}

export function validateLivePorts(context, runtime, containers, listeningPorts) {
  const ports = new Set([port(context.port, "health port"), ...runtime.ports.map(binding => binding.hostPort)]);
  if (ports.size !== runtime.ports.length + 1) reject("health and service ports overlap");
  const own = new Set();
  for (const container of containers) for (const [key, bindings] of Object.entries(container.portBindings ?? {})) {
    for (const binding of bindings ?? []) {
      const hostPort = Number(binding.HostPort);
      if (!key.endsWith("/tcp") || !ports.has(hostPort)) continue;
      if (container.name !== context.containerName) reject("service port is published by another container");
      if (container.running) own.add(hostPort);
    }
  }
  if (listeningPorts.some(value => ports.has(value) && !own.has(value))) reject("service port is already listening");
}

export function validateVolume(value, appId) {
  if (value?.Driver !== "local" || Object.keys(value.Options ?? {}).length || value.Labels?.["deploy-manager.app"] !== appId) reject("persistent volume must be a labelled plain local volume without driver options");
  return canonical(value.Mountpoint, "volume backing path");
}

// The image may own the source directory's contents; only trusted root-owned
// ancestors may replace the directory itself. This permits UID 2000 storage.
export function validateBindSource(source) {
  const stat = fs.lstatSync(source);
  if (!stat.isDirectory() || stat.isSymbolicLink() || (stat.mode & 0o022) || fs.realpathSync(source) !== source) reject("application storage directory is missing, symlinked or publicly writable");
  let current = path.dirname(source);
  while (true) {
    const ancestor = fs.lstatSync(current);
    if (!ancestor.isDirectory() || ancestor.uid !== 0 || (ancestor.mode & 0o022) || ancestor.isSymbolicLink()) reject("application storage ancestors must be root owned and not writable by another user");
    const parent = path.dirname(current); if (parent === current) break; current = parent;
  }
  return source;
}

export function validateLiveMounts(runtime, containers, containerName, backingPaths = {}) {
  for (const container of containers) for (const live of container.mounts) {
    const type = live.Type;
    const source = type === "volume" ? live.Name : live.Source;
    if (container.name === containerName) {
      if (live.RW && !runtime.mounts.some(mount => !mount.readOnly && mount.type === type && mount.source === source && mount.target === live.Destination)) reject("current writable storage is absent from the reviewed runtime");
      continue;
    }
    for (const mount of runtime.mounts) {
      if (!live.RW && mount.readOnly) continue;
      const reviewed = mount.type === "bind" ? mount.source : backingPaths[mount.source];
      const actual = live.Source;
      if ((type === mount.type && source === mount.source) || (reviewed && actual && (actual === reviewed || actual.startsWith(`${reviewed}/`) || reviewed.startsWith(`${actual}/`)))) reject("persistent storage is also mounted by another container");
    }
  }
}

// These transitions deliberately never remove a volume, restore data
// automatically, or launch an old image after the new image touched live state.
export async function deployStateful(context, runtime, ops) {
  await ops.preflight();
  if (!IMAGE_ID.test(context.image)) reject("stateful deployment requires an immutable image ID");
  if (await ops.readRecord()) reject("unfinished stateful rollout requires recovery or an explicit restore");
  const old = await ops.inspect();
  if (old && !IMAGE_ID.test(old.image)) reject("previous stateful image is not immutable");
  const baseline = await ops.readBaseline();
  if (!old && baseline) reject("previously deployed stateful container is missing; explicit recovery review required");
  if (old) {
    if (baseline?.version !== 1 || baseline.image !== old.image || baseline.configurationFingerprint !== configurationFingerprint(context, runtime)) reject("existing stateful service has no matching successful configuration baseline; explicit migration or adoption review required");
  }
  let record = { version: 2, appId: context.appId, phase: "quiescing", oldImage: old?.image ?? null,
    newImage: context.image, sha: context.sha, configurationFingerprint: configurationFingerprint(context, runtime) };
  await ops.writeRecord(record);
  try {
    if (old) await ops.stop();
    ops.checkInterrupted();
    const backup = validateBackupReceipt(await ops.backup());
    const snapshot = await ops.saveSnapshot({ ...record, backup });
    record = { ...record, phase: "backed-up", snapshot };
    await ops.writeRecord(record);
    ops.checkInterrupted();
    // Persist before removal/run. A crash from this point is conservatively
    // treated as potentially migrated state, even if docker run never finished.
    record = { ...record, phase: "promoting" };
    await ops.writeRecord(record);
    ops.phase("promote");
    if (old) await ops.remove();
    await ops.run(context.image);
    ops.checkInterrupted();
    ops.phase("verify");
    if (!await ops.healthy() || !transportMatches(context, runtime, await ops.inspect())) reject("new stateful service failed health or transport verification");
    await ops.writeBaseline({ version: 1, image: context.image, configurationFingerprint: configurationFingerprint(context, runtime) });
    await ops.clearRecord();
    ops.success(snapshot);
    return { succeeded: true, snapshot };
  } catch (error) {
    if (["quiescing", "backed-up"].includes(record.phase)) {
      // No new process has written to persistent state; restarting the same
      // existing container is safe. Keep the record if restart/proof fails.
      if (old) { await ops.start(); if (!await ops.healthy()) reject("backup/pre-promotion failure; previous service restart failed"); }
      await ops.clearRecord();
      reject(`stateful update stopped before promotion: ${error.message}`);
    }
    // Stop acceptance/writes but retain all live state and the failed container.
    const stopped = await ops.stop().then(() => true, () => false);
    await ops.writeRecord({ ...record, phase: "manual-restore-required", stopVerified: stopped });
    reject(`stateful promotion failed; ${stopped ? "service stopped" : "service stop could not be verified"}, data retained, explicit compatible restore required`);
  }
}

export function validateTransportTransition(context, runtime, next, approval) {
  const before = configurationFingerprint(context, runtime), after = configurationFingerprint(context, next);
  if (approval !== `${before}:${after}` || before === after) reject("transport transition fingerprints do not match the reviewed change");
  if (fingerprint({ ...runtime, ports: [] }) !== fingerprint({ ...next, ports: [] })
    || fingerprint(runtime.ports.map(binding => binding.containerPort)) !== fingerprint(next.ports.map(binding => binding.containerPort))) reject("transport transition may only change existing published hosts and host ports");
  return { before, after };
}

export async function rebindStateful(context, runtime, next, ops, approval) {
  const { before, after } = validateTransportTransition(context, runtime, next, approval);
  await ops.preflight(); await ops.preflight(next);
  if (await ops.readRecord()) reject("unfinished stateful rollout blocks transport changes");
  const old = await ops.inspect(), baseline = await ops.readBaseline();
  if (!old || !IMAGE_ID.test(old.image) || baseline?.image !== old.image || baseline.configurationFingerprint !== before) reject("transport transition requires the matching successful service baseline");
  let record = { version: 2, appId: context.appId, operation: "transport-rebind", phase: "quiescing",
    oldImage: old.image, newImage: old.image, configurationFingerprint: before, oldRuntime: runtime, nextRuntime: next, nextFingerprint: after };
  await ops.writeRecord(record);
  try {
    await ops.stop(); ops.checkInterrupted();
    const backup = validateBackupReceipt(await ops.backup());
    // Only the published transport changes; the same image/data/env remain
    // compatible. The snapshot is expressly associated with the reviewed next transport.
    const snapshot = await ops.saveSnapshot({ ...record, configurationFingerprint: after, backup });
    record = { ...record, phase: "rebind-configuring", snapshot };
    await ops.writeRecord(record); ops.checkInterrupted();
    await ops.installRuntime(next);
    record = { ...record, phase: "promoting", configurationFingerprint: after };
    await ops.writeRecord(record);
    ops.phase("promote"); await ops.remove(); await ops.run(old.image);
    ops.checkInterrupted(); ops.phase("verify");
    if (!await ops.healthy() || !transportMatches(context, next, await ops.inspect())) reject("rebound service failed health or transport verification");
    await ops.writeBaseline({ version: 1, image: old.image, configurationFingerprint: after });
    await ops.clearRecord(); ops.rebindSuccess(snapshot, old.image);
    return { rebound: true, snapshot };
  } catch (error) {
    if (["quiescing", "rebind-configuring"].includes(record.phase)) {
      await ops.installRuntime(runtime); await ops.start();
      if (!await ops.healthy() || !transportMatches(context, runtime, await ops.inspect())) reject("transport failure; previous instance restart not verified");
      await ops.clearRecord(); reject(`transport change stopped before promotion: ${error.message}`);
    }
    const stopped = await ops.stop().then(() => true, () => false);
    await ops.writeRecord({ ...record, phase: "manual-restore-required", stopVerified: stopped });
    reject("transport promotion failed; data retained and explicit repair required");
  }
}

export async function recoverStateful(context, runtime, ops) {
  await ops.preflight();
  const record = await ops.readRecord();
  if (!record) return "not-needed";
  if (record.operation === "transport-rebind" && record.phase === "rebind-configuring") {
    const before = configurationFingerprint(context, normalizeRuntime(record.oldRuntime));
    const after = configurationFingerprint(context, normalizeRuntime(record.nextRuntime));
    validateTransportTransition(context, record.oldRuntime, record.nextRuntime, `${before}:${after}`);
    if (record.appId !== context.appId || record.configurationFingerprint !== before || record.nextFingerprint !== after
      || ![before, after].includes(configurationFingerprint(context, runtime)) || (await ops.inspect())?.image !== record.oldImage) reject("interrupted transport change needs operator review");
    if (!transportMatches(context, record.oldRuntime, await ops.inspect())) { await ops.stop(); reject("previous transport bindings changed; operator review required"); }
    await ops.installRuntime(record.oldRuntime); await ops.start();
    if (!await ops.healthy() || !transportMatches(context, record.oldRuntime, await ops.inspect())) reject("previous transport restart failed");
    await ops.clearRecord(); return "restored";
  }
  if (record.version !== 2 || record.appId !== context.appId || record.configurationFingerprint !== configurationFingerprint(context, runtime)) reject("stateful recovery configuration changed; operator review required");
  const existing = await ops.inspect();
  if (["quiescing", "backed-up"].includes(record.phase)) {
    if (!record.oldImage && !existing) { await ops.clearRecord(); return "not-needed"; }
    if (existing?.image !== record.oldImage) reject("pre-promotion recovery container no longer matches the recorded image");
    if (!transportMatches(context, runtime, existing)) { await ops.stop(); reject("previous transport bindings changed; operator review required"); }
    await ops.start();
    if (!await ops.healthy() || !transportMatches(context, runtime, await ops.inspect())) reject("previous stateful service restart failed");
    await ops.clearRecord(); return "restored";
  }
  if (record.phase === "promoting" && existing?.image === record.newImage && existing.running && transportMatches(context, runtime, existing) && await ops.healthy()) {
    await ops.writeBaseline({ version: 1, image: existing.image, configurationFingerprint: configurationFingerprint(context, runtime) });
    await ops.clearRecord(); return "healthy";
  }
  await ops.stop().catch(() => {});
  reject("stateful recovery needs explicit compatible restore; all volumes and images retained");
}

export async function restoreStateful(context, runtime, ops, snapshotId, expectedImage) {
  await ops.preflight();
  if (!SNAPSHOT.test(snapshotId)) reject("invalid snapshot ID");
  const snapshot = await ops.readSnapshot(snapshotId);
  if (snapshot.version !== 2 || snapshot.appId !== context.appId || snapshot.configurationFingerprint !== configurationFingerprint(context, runtime) || !IMAGE_ID.test(snapshot.oldImage ?? "")) reject("snapshot does not match this service configuration and a compatible image");
  validateBackupReceipt(snapshot.backup);
  await ops.requireImage(snapshot.oldImage);
  const current = await ops.inspect();
  if (current?.running) reject("stop the stateful service before explicit restore");
  const pending = await ops.readRecord();
  const reviewedAbsence = !current && expectedImage === "absent" && pending?.version === 2 && pending.snapshot === snapshotId
    && pending.appId === context.appId && pending.configurationFingerprint === configurationFingerprint(context, runtime)
    && ["promoting", "manual-restore-required"].includes(pending.phase);
  if (!reviewedAbsence && (!current || current.image !== expectedImage)) reject("current image changed; review the restore again");
  // Protect writes accepted by a failed new image before replacing live data.
  const quarantine = validateBackupReceipt(await ops.backup());
  const preserved = await ops.saveSnapshot({ version: 2, appId: context.appId, phase: "pre-restore",
    oldImage: current?.image ?? null, configurationFingerprint: configurationFingerprint(context, runtime), backup: quarantine });
  const record = { version: 2, appId: context.appId, phase: "manual-restore-required", oldImage: snapshot.oldImage,
    configurationFingerprint: configurationFingerprint(context, runtime), snapshot: snapshotId, preserved };
  await ops.writeRecord(record);
  try {
    ops.checkInterrupted();
    await ops.restore(snapshot.backup.snapshotId);
    ops.checkInterrupted();
    if (current) await ops.remove();
    await ops.run(snapshot.oldImage);
    ops.checkInterrupted();
    if (!await ops.healthy() || !transportMatches(context, runtime, await ops.inspect())) reject("explicit restore health or transport check failed");
    await ops.writeBaseline({ version: 1, image: snapshot.oldImage, configurationFingerprint: configurationFingerprint(context, runtime) });
    await ops.clearRecord();
    return { restored: snapshotId, preserved };
  } catch {
    const stopped = await ops.stop().then(() => true, () => false);
    await ops.writeRecord({ ...record, stopVerified: stopped });
    reject(`explicit restore failed; ${stopped ? "service stopped" : "service stop could not be verified"}, preserved snapshots retained`);
  }
}

export function protectedPath(target, directory = false) {
  const absolute = path.resolve(target);
  if (fs.realpathSync(absolute) !== absolute) reject("root control path contains a symlink");
  let current = absolute;
  while (true) {
    const stat = fs.lstatSync(current);
    if (stat.uid !== 0 || (stat.mode & 0o022) || stat.isSymbolicLink()) reject("root control path is writable by another user");
    if (current === absolute && (directory ? !stat.isDirectory() : !stat.isFile() || stat.nlink !== 1)) reject("root control path has an invalid type");
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return absolute;
}
export function atomicRecord(file, value) {
  const temporary = `${file}.${randomUUID()}.tmp`;
  const fd = fs.openSync(temporary, "wx", 0o600);
  try { fs.writeFileSync(fd, json(value)); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  fs.renameSync(temporary, file);
  const directory = fs.openSync(path.dirname(file), "r");
  try { fs.fsyncSync(directory); } finally { fs.closeSync(directory); }
}
function clearRecord(file) {
  if (!fs.existsSync(file)) return;
  fs.unlinkSync(file);
  const fd = fs.openSync(path.dirname(file), "r");
  try { fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
}

async function main(args) {
  if (process.platform !== "linux" || process.getuid() !== 0) reject("stateful runtime must run on Linux as root");
  protectedPath(fileURLToPath(import.meta.url));
  if (args[0] === "--prepare-lock") {
    const target = args[1];
    if (typeof target !== "string" || !/^\/var\/lib\/deploy-manager-locks\/[a-z0-9][a-z0-9_-]{0,63}\.lock$/.test(target)) reject("invalid stateful lock path");
    protectedPath("/var/lib", true);
    const directory = path.dirname(target);
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { mode: 0o700 });
    protectedPath(directory, true);
    if (!fs.existsSync(target)) {
      const fd = fs.openSync(target, "wx", 0o600); fs.closeSync(fd);
    }
    protectedPath(target);
    return;
  }
  // deploy-app.sh execs this helper while holding its existing per-app lock.
  const lockStat = fs.fstatSync(9);
  if (!process.env.LOCK_FILE || lockStat.uid !== 0 || (lockStat.mode & 0o022) || !lockStat.isFile() || lockStat.nlink !== 1
    || fs.readlinkSync("/proc/self/fd/9") !== protectedPath(process.env.LOCK_FILE)) reject("protected per-app flock was not retained");
  const [mode, sha, expectedImage] = args;
  const appId = process.env.APP_ID;
  if (!ID.test(appId ?? "")) reject("invalid app ID");
  const runtimeFile = protectedPath(process.env.STATEFUL_RUNTIME_FILE ?? "");
  let runtime = normalizeRuntime(JSON.parse(fs.readFileSync(runtimeFile, "utf8")));
  protectedPath(runtime.backupHook);
  fs.accessSync(runtime.backupHook, fs.constants.X_OK);
  const state = process.env.ROLLOUT_STATE_DIR ?? "/var/lib/deploy-manager-rollout";
  if (!fs.existsSync(state)) fs.mkdirSync(state, { mode: 0o700 });
  protectedPath(state, true);
  const snapshots = path.join(state, `${appId}.snapshots`);
  if (!fs.existsSync(snapshots)) fs.mkdirSync(snapshots, { mode: 0o700 });
  protectedPath(snapshots, true);
  const recordFile = path.join(state, `${appId}.stateful.json`);
  const baselineFile = path.join(state, `${appId}.baseline.json`);
  const context = { appId, sha, image: `${process.env.IMAGE_NAME}:${sha}`, containerName: process.env.CONTAINER_NAME,
    port: Number(process.env.APP_PORT), containerPort: Number(process.env.CONTAINER_PORT),
    network: process.env.DOCKER_NETWORK, envFile: process.env.CONTAINER_ENV_FILE,
    healthPath: process.env.HEALTH_PATH ?? "/healthz" };
  if (context.envFile) {
    protectedPath(context.envFile);
    context.envHash = createHash("sha256").update(fs.readFileSync(context.envFile)).digest("hex");
  }
  if (mode === "deploy" && !/^[a-fA-F0-9]{40}$/.test(sha ?? "")) reject("expected a 40 character SHA");
  let interrupted = false;
  process.stdout.on("error", () => {});
  for (const signal of ["SIGTERM", "SIGINT", "SIGHUP"]) process.on(signal, () => { interrupted = true; });
  const run = async (command, argv, timeout = 120000) => {
    try { return (await execute(command, argv, { timeout, maxBuffer: 16384, encoding: "utf8" })).stdout.trim(); }
    catch { reject(`${path.basename(command)} operation failed`); } // no bootstrap passwords or raw logs
  };
  const log = text => {
    const line = `${new Date().toISOString()} app=${appId} ${text}\n`;
    fs.appendFileSync(process.env.LOG_FILE, line, { mode: 0o600 });
    try { process.stdout.write(line); } catch { /* root log survives manager stop */ }
  };
  const docker = (argv, timeout) => run("docker", argv, timeout);
  if (mode === "deploy") {
    context.image = await docker(["image", "inspect", "--format", "{{.Id}}", context.image]);
    if (!IMAGE_ID.test(context.image)) reject("built image did not resolve to an immutable image ID");
  }
  const hook = async (operation, snapshot = "") => {
    // Share the already-held app flock. Keep the whole hook process group alive
    // until it is reaped, so a failed backup cannot leave a reader racing a restart.
    const output = await new Promise((resolve, rejectPromise) => {
      const stdio = Array(10).fill("ignore"); stdio[1] = "pipe"; stdio[9] = 9;
      const child = spawn(runtime.backupHook, [operation, appId, runtimeFile, context.containerName, snapshot], { detached: true, stdio });
      let result = "", killed = false;
      const terminate = () => { killed = true; try { process.kill(-child.pid, "SIGKILL"); } catch { /* already exited */ } };
      const timer = setTimeout(terminate, 900000);
      const interruption = setInterval(() => { if (interrupted) terminate(); }, 100);
      child.stdout.on("data", chunk => { result += chunk; if (result.length > 16384) terminate(); });
      child.once("error", () => { clearTimeout(timer); clearInterval(interruption); rejectPromise(Error("backup hook could not start")); });
      child.once("close", code => { clearTimeout(timer); clearInterval(interruption); if (code === 0 && !killed) resolve(result.trim()); else rejectPromise(Error("backup hook failed or was interrupted")); });
    });
    try { return JSON.parse(output); } catch { reject("backup hook returned an invalid receipt"); }
  };
  const readRecord = file => fs.existsSync(file) ? JSON.parse(fs.readFileSync(protectedPath(file), "utf8")) : null;
  const ops = {
    async preflight(selected = runtime) {
      if (fs.existsSync(path.join(state, `${appId}.cutover`))) reject("legacy unfinished cutover requires operator review before stateful deployment");
      containerArguments(context, selected, mode === "deploy" ? context.image : "preflight:unused");
      protectedPath(runtimeFile); protectedPath(runtime.backupHook);
      if (fingerprint(normalizeRuntime(JSON.parse(fs.readFileSync(runtimeFile, "utf8")))) !== fingerprint(runtime)) reject("runtime changed during rollout");
      if (context.envFile) {
        protectedPath(context.envFile);
        if (createHash("sha256").update(fs.readFileSync(context.envFile)).digest("hex") !== context.envHash) reject("environment file changed during rollout");
      }
      const backingPaths = {};
      for (const mount of selected.mounts) {
        if (mount.type === "bind") {
          validateBindSource(mount.source);
        } else {
          // Creation is explicit operator preparation; refuse collision or an
          // unrelated/unlabelled volume rather than adopting it silently.
          const volume = JSON.parse(await docker(["volume", "inspect", "--format", "{{json .}}", mount.source]));
          backingPaths[mount.source] = validateVolume(volume, appId);
          validateBindSource(backingPaths[mount.source]);
        }
      }
      const names = (await docker(["ps", "-a", "--format", "{{.Names}}"])).split("\n").filter(Boolean);
      if (names.length > 256 || names.some(name => !NAME.test(name))) reject("unexpected Docker inventory");
      const containers = [];
      for (const name of names) {
        const data = JSON.parse(await docker(["inspect", "--format", '{"mounts":{{json .Mounts}},"ports":{{json .HostConfig.PortBindings}},"running":{{json .State.Running}}}', name]));
        const mounts = data.mounts.map(mount => ({ ...mount, Source: mount.Source ? fs.realpathSync(mount.Source) : mount.Source }));
        containers.push({ name, mounts, portBindings: data.ports, running: data.running });
      }
      validateLiveMounts(selected, containers, context.containerName, backingPaths);
      const listeningPorts = (await run("ss", ["-H", "-ltn"])).split("\n").map(line => Number(line.trim().split(/\s+/)[3]?.match(/:(\d+)$/)?.[1]));
      validateLivePorts(context, selected, containers, listeningPorts);
    },
    readRecord: () => readRecord(recordFile), writeRecord: value => atomicRecord(recordFile, value),
    readBaseline: () => readRecord(baselineFile), writeBaseline: value => atomicRecord(baselineFile, value),
    installRuntime: value => { atomicRecord(runtimeFile, normalizeRuntime(value)); runtime = normalizeRuntime(value); },
    clearRecord: () => clearRecord(recordFile),
    async requireImage(image) {
      if (!IMAGE_ID.test(image) || await docker(["image", "inspect", "--format", "{{.Id}}", image]) !== image) reject("compatible immutable image must be restored locally before replacing data");
    },
    async inspect() {
      const names = await docker(["ps", "-a", "--format", "{{.Names}}", "--filter", `name=^/${context.containerName}$`]);
      if (!names) return null;
      const data = JSON.parse(await docker(["inspect", "--format", '{"image":{{json .Image}},"running":{{json .State.Running}},"portBindings":{{json .HostConfig.PortBindings}}}', context.containerName]));
      if (!IMAGE_ID.test(data.image)) reject("invalid production image ID");
      return data;
    },
    async stop() {
      if (!(await ops.inspect())) return;
      await docker(["stop", "--time", String(runtime.stopTimeoutSeconds), context.containerName], (runtime.stopTimeoutSeconds + 30) * 1000);
      if ((await ops.inspect())?.running) reject("service stop could not be verified");
    },
    start: () => docker(["start", context.containerName]), remove: () => docker(["rm", context.containerName]),
    async run(image) {
      if (!IMAGE_ID.test(image)) reject("stateful launch requires an immutable image ID");
      await ops.preflight(); ops.checkInterrupted();
      return docker(containerArguments(context, runtime, image));
    },
    async healthy() {
      const healthPath = context.healthPath;
      if (!healthPath.startsWith("/") || healthPath.startsWith("//") || /[\u0000-\u0020\\#]/.test(healthPath)) reject("invalid health path");
      const attempts = Number(process.env.HEALTH_ATTEMPTS ?? 20);
      if (!Number.isInteger(attempts) || attempts < 1 || attempts > 120) reject("invalid health attempts");
      for (let i = 0; i < attempts; i++) {
        try { await run("curl", ["--fail", "--silent", "--max-time", "3", "--output", "/dev/null", `http://127.0.0.1:${context.port}${healthPath}`], 5000); return true; } catch { /* bounded retry */ }
        if (i + 1 < attempts) await new Promise(resolve => setTimeout(resolve, 1000));
      }
      return false;
    },
    async backup() {
      await ops.preflight();
      if ((await ops.inspect())?.running) reject("snapshot requires a verified stopped service");
      return hook("snapshot");
    },
    async restore(snapshot) {
      await ops.preflight();
      if ((await ops.inspect())?.running) reject("restore requires a verified stopped service");
      const receipt = await hook("restore", snapshot);
      if (receipt?.restored !== snapshot || receipt?.verified !== true) reject("restore hook did not confirm restore verification");
    },
    saveSnapshot: value => { const id = randomUUID(); atomicRecord(path.join(snapshots, `${id}.json`), value); return id; },
    readSnapshot: id => { const value = readRecord(path.join(snapshots, `${id}.json`)); if (!value) reject("snapshot receipt not found"); return value; },
    checkInterrupted: () => { if (interrupted) reject("release interrupted"); },
    phase: phase => log(`release_phase=${phase} sha=${sha}`),
    success: snapshot => log(`deploy_success sha=${sha} image=${context.image} snapshot=${snapshot} rollback=explicit-data-restore`),
    rebindSuccess: (snapshot, image) => log(`transport_rebind_success image=${image} snapshot=${snapshot} rollback=explicit-repair`),
  };
  if (mode === "deploy") await deployStateful(context, runtime, ops);
  else if (mode === "recover") log(`release_recovery=${await recoverStateful(context, runtime, ops)}`);
  else if (mode === "restore") { const result = await restoreStateful(context, runtime, ops, sha, expectedImage); log(`explicit_restore_success snapshot=${result.restored} preserved=${result.preserved}`); }
  else if (mode === "rebind") {
    const nextFile = protectedPath(sha);
    if (!nextFile.startsWith("/etc/deploy-manager/runtime/") || path.dirname(nextFile) !== "/etc/deploy-manager/runtime") reject("next runtime must be a protected runtime JSON file");
    const next = normalizeRuntime(JSON.parse(fs.readFileSync(nextFile, "utf8")));
    const result = await rebindStateful(context, runtime, next, ops, expectedImage);
    log(`transport_rebind_success snapshot=${result.snapshot}`);
  }
  else reject("unsupported stateful operation");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch(error => { console.error(`stateful-service: ${error.message}`); process.exitCode = 1; });
}
