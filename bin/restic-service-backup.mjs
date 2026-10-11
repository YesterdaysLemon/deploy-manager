#!/usr/bin/env node
// Operator-owned hook. No init, signup, retention deletion, credential creation,
// service start, image pruning or repo scripts. Local fixture receipts are never offHost.
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import { normalizeRuntime, validateBindSource, validateVolume, validateLiveMounts, protectedPath, atomicRecord, fingerprint } from "./stateful-service.mjs";

const ID = /^[a-z0-9][a-z0-9_-]{0,63}$/, SNAP = /^[a-f0-9]{64}$/, IMAGE = /^sha256:[a-f0-9]{64}$/;
const fail = message => { throw Error(message); };
export function validateStoragePaths(storage) {
  for (let i = 0; i < storage.length; i++) for (let j = i + 1; j < storage.length; j++) {
    const a = storage[i].source, b = storage[j].source;
    if (a === b || a.startsWith(`${b}/`) || b.startsWith(`${a}/`)) fail("writable storage backing paths overlap");
  }
}
const syncPath = value => { const fd = fs.openSync(value, "r"); try { fs.fsyncSync(fd); } finally { fs.closeSync(fd); } };
export function syncTree(root) {
  const stat = fs.lstatSync(root);
  if (stat.isDirectory()) for (const name of fs.readdirSync(root)) syncTree(path.join(root, name));
  else if (!stat.isFile()) fail("restore tree includes unsafe entries");
  syncPath(root);
}
export function preflightStaging(mounts, needsAllocation = true) {
  validateStoragePaths(mounts);
  const needed = new Map();
  for (const mount of mounts) {
    validateBindSource(mount.source);
    const parent = path.dirname(mount.source), device = fs.statSync(mount.source).dev;
    if (fs.statSync(parent).dev !== device) fail("storage mountpoint needs an explicitly designed same-filesystem staging location");
    const count = Number(mount.digest.files), bytes = Number(mount.digest.bytes);
    if (!Number.isSafeInteger(count) || count < 0 || !Number.isSafeInteger(bytes) || bytes < 0) fail("invalid snapshot size metadata");
    const prior = needed.get(device) ?? { parent, bytes: 67108864 };
    prior.bytes += bytes + 8192 * (count + 1); needed.set(device, prior);
  }
  for (const value of needsAllocation ? needed.values() : []) {
    const space = fs.statfsSync(value.parent, { bigint: true });
    if (space.bavail * space.bsize < BigInt(value.bytes)) fail("insufficient free space for verified restore staging and retained originals");
  }
}

// flock attaches to an open file description. Keep this descriptor alive until
// all hook children exit; a manager invocation inherits its already-held fd 9.
export function acquireAppLock(appId) {
  if (!ID.test(appId)) fail("invalid lock identity");
  const directory = "/var/lib/deploy-manager-locks", target = `${directory}/${appId}.lock`;
  protectedPath("/var/lib", true);
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { mode: 0o700 });
  protectedPath(directory, true);
  let inherited = false;
  try { inherited = fs.readlinkSync("/proc/self/fd/9") === target; } catch { /* direct invocation */ }
  if (!fs.existsSync(target)) { const created = fs.openSync(target, "wx", 0o600); fs.closeSync(created); syncPath(directory); }
  protectedPath(target);
  const fd = inherited ? 9 : fs.openSync(target, fs.constants.O_RDWR | fs.constants.O_NOFOLLOW);
  const stat = fs.fstatSync(fd), current = fs.statSync(target);
  if (!stat.isFile() || stat.uid !== 0 || stat.nlink !== 1 || (stat.mode & 0o077) || stat.ino !== current.ino || stat.dev !== current.dev) fail("untrusted shared app lock");
  const stdio = Array(10).fill("ignore"); stdio[9] = fd;
  if (spawnSync("flock", ["-n", "9"], { stdio }).status !== 0) { if (!inherited) fs.closeSync(fd); fail("deployment or another backup holds the shared app lock"); }
  const release = () => { if (!inherited) fs.closeSync(fd); };
  release.fd = fd;
  return release;
}
export function normalizeBackupPolicy(value, appId) {
  if (!ID.test(appId) || value?.version !== 1 || value.appId !== appId) fail("invalid backup policy identity");
  const supported = new Set(["version", "appId", "repository", "passwordFile", "credentialsFile", "resticPath", "testOnly", "transport", "socketOwnerUid"]);
  if (Object.keys(value).some(key => !supported.has(key))) fail("unsupported backup policy field");
  const local = value.testOnly === true;
  const tome = value.transport === "tome-ssh-unix";
  if (value.transport !== undefined && !tome) fail("unsupported backup transport");
  if (tome && (local || value.credentialsFile !== undefined || !Number.isSafeInteger(value.socketOwnerUid) || value.socketOwnerUid < 1 || value.socketOwnerUid > 65535)) fail("Tome transport needs a pinned nonroot SSH socket owner and no S3 credentials");
  if (!tome && value.socketOwnerUid !== undefined) fail("socket owner is only valid for Tome transport");
  if (value.testOnly !== undefined && typeof value.testOnly !== "boolean") fail("invalid fixture policy flag");
  if (local) {
    if (!/^\/srv\/dm-fixture\/[a-z0-9_-]+\/repository$/.test(value.repository ?? "")) fail("local fixture repository must be under its dedicated fixture directory");
  } else if (tome) {
    if (value.repository !== `rest:http+unix:///var/lib/deploy-manager-tome/${appId}/rest.sock:/${appId}/`) fail("Tome repository must use its exact app-scoped SSH Unix socket");
  } else if (!/^s3:https:\/\/[a-f0-9]{32}\.r2\.cloudflarestorage\.com\/[a-z0-9][a-z0-9.-]{1,61}[a-z0-9](?:\/[a-z0-9_-]+)?$/.test(value.repository ?? "")) fail("production backup requires a supported explicit encrypted offhost transport");
  for (const key of ["passwordFile", "credentialsFile"]) {
    if (key === "credentialsFile" && (local || tome) && !value[key]) continue;
    if (typeof value[key] !== "string" || path.posix.dirname(value[key]) !== "/etc/deploy-manager/backup" || !/^[a-z0-9_.-]+$/.test(path.posix.basename(value[key]))) fail("backup credentials must stay in the protected backup configuration directory");
  }
  if (value.resticPath !== "/usr/local/bin/restic") fail("backup requires the operator-installed fixed restic binary");
  return { ...value, testOnly: local, offHost: !local };
}
export function validateTomeTransport(policy, lstat = fs.lstatSync) {
  if (policy.transport !== "tome-ssh-unix") return;
  for (const directory of ["/", "/var", "/var/lib", "/var/lib/deploy-manager-tome"]) {
    const stat = lstat(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink() || stat.uid !== 0 || (stat.mode & 0o022)) fail("unprotected Tome socket ancestor");
  }
  const directory = `/var/lib/deploy-manager-tome/${policy.appId}`, owner = policy.socketOwnerUid;
  const parent = lstat(directory), socket = lstat(`${directory}/rest.sock`);
  if (!parent.isDirectory() || parent.isSymbolicLink() || parent.uid !== owner || (parent.mode & 0o077) || !socket.isSocket() || socket.isSymbolicLink() || socket.uid !== owner || (socket.mode & 0o077)) fail("Tome tunnel unavailable or untrusted; no offhost backup can be claimed");
}

// Digest content plus POSIX ownership/modes. Refuse links/devices/FIFOs rather
// than restoring a path that might escape an application mount.
export function treeDigest(root) {
  const hash = createHash("sha256"); let files = 0, bytes = 0;
  function walk(current, relative) {
    const stat = fs.lstatSync(current);
    if (!stat.isDirectory() && !stat.isFile()) fail("writable backup trees must contain only directories and regular files");
    hash.update(JSON.stringify([relative, stat.isDirectory() ? "directory" : "file", stat.uid, stat.gid, stat.mode & 0o7777]));
    if (stat.isDirectory()) { for (const name of fs.readdirSync(current).sort()) walk(path.join(current, name), `${relative}/${name}`); }
    else {
      const fd = fs.openSync(current, fs.constants.O_RDONLY | (fs.constants.O_NOFOLLOW ?? 0)), content = createHash("sha256");
      try {
        const actual = fs.fstatSync(fd); if (!actual.isFile() || actual.ino !== stat.ino || actual.dev !== stat.dev) fail("backup file changed during inspection");
        const buffer = Buffer.alloc(65536); let count;
        while ((count = fs.readSync(fd, buffer, 0, buffer.length, null))) content.update(buffer.subarray(0, count));
      } finally { fs.closeSync(fd); }
      hash.update(JSON.stringify([stat.size, content.digest("hex")])); files++; bytes += stat.size;
    }
  }
  walk(root, ""); return { sha256: hash.digest("hex"), files, bytes };
}
export function snapshotFromOutput(output) {
  const summary = output.split("\n").filter(Boolean).map(line => JSON.parse(line)).find(value => value.message_type === "summary");
  if (!SNAP.test(summary?.snapshot_id ?? "")) fail("restic did not return a full snapshot ID");
  return summary.snapshot_id;
}
export async function snapshotService(policy, runtime, containerName, ops) {
  const storage = await ops.storage();
  validateStoragePaths(storage);
  await ops.stopped();
  const manifest = { version: 1, appId: policy.appId, containerName,
    storageFingerprint: fingerprint(runtime.mounts.filter(mount => !mount.readOnly)),
    mounts: storage.map(mount => { const stat = fs.statSync(mount.source); return { ...mount,
      rootMetadata: { uid: stat.uid, gid: stat.gid, mode: stat.mode & 0o7777 }, digest: treeDigest(mount.source) }; }), image: await ops.image() };
  if (manifest.image) manifest.imageSnapshot = await ops.backupImage(manifest.image);
  const metadataFile = await ops.saveManifest(manifest);
  const snapshotId = snapshotFromOutput(await ops.restic(["backup", "--json", "--tag", `dm:${policy.appId}:data`, ...storage.map(mount => mount.source), metadataFile]));
  await ops.restic(["check", "--read-data"]);
  let prepared;
  try { prepared = await ops.verify(snapshotId, manifest); }
  finally { if (prepared) await ops.cleanup(prepared); }
  return { version: 1, snapshotId, verified: true, encrypted: true, offHost: policy.offHost };
}
export async function restoreService(policy, runtime, containerName, snapshotId, ops) {
  if (!SNAP.test(snapshotId)) fail("restore needs a full snapshot ID, never latest");
  await ops.stopped(); const storage = await ops.storage();
  const manifest = await ops.readManifest(snapshotId);
  if (manifest?.version !== 1 || manifest.appId !== policy.appId || manifest.containerName !== containerName
    || manifest.storageFingerprint !== fingerprint(runtime.mounts.filter(mount => !mount.readOnly))
    || fingerprint(manifest.mounts.map(({ digest, rootMetadata, ...mount }) => mount)) !== fingerprint(storage)) fail("snapshot storage identity differs from this service");
  validateStoragePaths(storage);
  await ops.restic(["check", "--read-data"]);
  const prepared = await ops.verify(snapshotId, manifest);
  try { await ops.stopped(); await ops.storage(); await ops.install(prepared, manifest); }
  finally { await ops.cleanup(prepared); }
  return { restored: snapshotId, verified: true };
}

export function filesystemOperations({ restic, work, journal, appId, snapshotId }) {
  const ownership = path.join(work, "verification-stages.json");
  const owned = () => {
    if (!fs.existsSync(ownership)) return [];
    const record = JSON.parse(fs.readFileSync(protectedPath(ownership), "utf8"));
    if (record.version !== 1 || record.appId !== appId || !Array.isArray(record.mounts)) fail("invalid verification ownership record");
    return record.mounts;
  };
  const recordOwned = mounts => atomicRecord(ownership, { version: 1, appId, mounts: mounts.map(({ source, staged }) => ({ source, staged })) });
  const ops = {
    async reclaim() { if (fs.existsSync(journal)) fail("unfinished restore owns its staging trees; operator recovery required"); await ops.cleanup(owned()); },
    async verify(id, manifest) {
      await ops.reclaim();
      preflightStaging(manifest.mounts);
      const prepared = [];
      try {
      for (const mount of manifest.mounts) {
        validateBindSource(mount.source);
        const directory = path.join(path.dirname(mount.source), `.dm-restic-stage-${randomUUID()}`);
        const target = path.join(directory, "data");
        prepared.push({ ...mount, staged: target });
        recordOwned(prepared); // durable ownership before allocating plaintext
        fs.mkdirSync(directory, { mode: 0o700 }); syncPath(path.dirname(directory));
        await restic(["restore", `${id}:${mount.source}`, "--verify", "--target", target]);
        // A subtree restore does not preserve the source directory itself.
        // Its metadata is part of the authenticated encrypted manifest.
        const metadata = mount.rootMetadata;
        if (!metadata || ![metadata.uid, metadata.gid, metadata.mode].every(Number.isInteger)
          || metadata.uid < 0 || metadata.uid > 4294967294 || metadata.gid < 0 || metadata.gid > 4294967294
          || metadata.mode < 0 || metadata.mode > 0o7777 || (metadata.mode & 0o022)) fail("invalid source directory metadata");
        const targetStat = fs.lstatSync(target); if (!targetStat.isDirectory() || targetStat.isSymbolicLink()) fail("unsafe restored directory root");
        fs.chownSync(target, metadata.uid, metadata.gid); fs.chmodSync(target, metadata.mode);
        if (fingerprint(treeDigest(target)) !== fingerprint(mount.digest)) fail("restored content or ownership digest differs");
      }
      return prepared;
      } catch (error) { await ops.cleanup(prepared); throw error; }
    },
    async cleanup(prepared) {
      if (fs.existsSync(journal)) return; // operator recovery owns these paths now
      let remaining = owned();
      for (const mount of prepared) {
        const directory = path.dirname(mount.staged);
        if (path.basename(mount.staged) !== "data" || path.dirname(directory) !== path.dirname(mount.source) || !/^\.dm-restic-stage-[a-f0-9-]{36}$/.test(path.basename(directory)) || !remaining.some(value => value.source === mount.source && value.staged === mount.staged)) fail("unsafe verification cleanup path");
        protectedPath(path.dirname(directory), true);
        if (fs.existsSync(directory)) { protectedPath(directory, true); fs.rmSync(directory, { recursive: true }); syncPath(path.dirname(directory)); }
        remaining = remaining.filter(value => value.staged !== mount.staged); recordOwned(remaining);
      }
      if (!remaining.length && fs.existsSync(ownership)) { fs.unlinkSync(ownership); syncPath(work); }
    },
    async install(prepared, manifest) {
      const record = { version: 1, appId, snapshotId, phase: "prepared", mounts: [] };
      preflightStaging(prepared, false); // copies already allocated by verify
      for (const mount of prepared) {
        validateBindSource(mount.source);
        const quarantine = fs.mkdtempSync(path.join(path.dirname(mount.source), ".dm-restic-quarantine-")); fs.chmodSync(quarantine, 0o700);
        syncTree(mount.staged); syncTree(mount.source); syncPath(quarantine); syncPath(path.dirname(quarantine));
        record.mounts.push({ source: mount.source, staged: mount.staged, quarantine, oldEntries: fs.readdirSync(mount.source), newEntries: fs.readdirSync(mount.staged) });
      }
      atomicRecord(journal, record);
      // Rename within each mount's filesystem: no original file is deleted.
      // A crash leaves a durable journal plus old/new trees for operator repair.
      for (const mount of record.mounts) {
        for (const name of mount.oldEntries) fs.renameSync(path.join(mount.source, name), path.join(mount.quarantine, name));
        syncPath(mount.source); syncPath(mount.quarantine);
        for (const name of mount.newEntries) fs.renameSync(path.join(mount.staged, name), path.join(mount.source, name));
        syncPath(mount.staged); syncPath(mount.source);
        const stat = fs.statSync(mount.staged); fs.chownSync(mount.source, stat.uid, stat.gid); fs.chmodSync(mount.source, stat.mode & 0o7777);
        const expected = manifest.mounts.find(value => value.source === mount.source);
        if (fingerprint(treeDigest(mount.source)) !== fingerprint(expected.digest)) fail("installed restore digest differs; original data remains quarantined");
        const fd = fs.openSync(mount.source, "r"); try { fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
      }
      atomicRecord(path.join(work, `quarantine-${randomUUID()}.json`), { ...record, phase: "installed-originals-retained" });
      fs.unlinkSync(journal); const fd = fs.openSync(work, "r"); try { fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
    },
  };
  return ops;
}

async function main(args) {
  if (process.platform !== "linux" || process.getuid() !== 0) fail("backup hook runs only as root on Linux");
  protectedPath(fileURLToPath(import.meta.url));
  const [operation, appId, runtimeFile, containerName, snapshotId = ""] = args;
  if (!ID.test(appId ?? "") || !ID.test(containerName ?? "") || runtimeFile !== `/etc/deploy-manager/runtime/${appId}.json`) fail("invalid backup hook arguments");
  const releaseLock = acquireAppLock(appId);
  try {
  const policyFile = protectedPath(`/etc/deploy-manager/backup/${appId}.json`);
  const policy = normalizeBackupPolicy(JSON.parse(fs.readFileSync(policyFile, "utf8")), appId);
  validateTomeTransport(policy);
  const runtime = normalizeRuntime(JSON.parse(fs.readFileSync(protectedPath(runtimeFile), "utf8")));
  protectedPath(policy.resticPath); protectedPath(policy.passwordFile);
  if (fs.statSync(policy.passwordFile).mode & 0o077) fail("backup password file must be private to root");
  const env = { PATH: "/usr/local/bin:/usr/bin:/bin", HOME: "/root", RESTIC_REPOSITORY: policy.repository, RESTIC_PASSWORD_FILE: policy.passwordFile, RESTIC_CACHE_DIR: `/var/cache/deploy-manager-backup/${appId}` };
  if (policy.credentialsFile) {
    protectedPath(policy.credentialsFile);
    if (fs.statSync(policy.credentialsFile).mode & 0o077) fail("backup credential file must be private to root");
    const credentials = JSON.parse(fs.readFileSync(policy.credentialsFile, "utf8"));
    if (Object.keys(credentials).sort().join(",") !== "AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY" || Object.values(credentials).some(value => typeof value !== "string" || !value || /[\r\n\0]/.test(value))) fail("invalid scoped S3 credentials");
    Object.assign(env, credentials);
  }
  const work = `/var/lib/deploy-manager-backup/${appId}`;
  for (const directory of ["/var/lib/deploy-manager-backup", work, "/var/cache/deploy-manager-backup", env.RESTIC_CACHE_DIR]) {
    if (!fs.existsSync(directory)) fs.mkdirSync(directory, { mode: 0o700 }); protectedPath(directory, true);
  }
  const journal = path.join(work, "restore.json");
  if (fs.existsSync(journal)) fail("unfinished restore journal requires operator recovery; all data retained");
  const children = new Set(), deadline = Date.now() + 840000;
  let cancelled = false;
  const cancel = () => { cancelled = true; for (const child of children) child.kill("SIGKILL"); };
  for (const signal of ["SIGTERM", "SIGINT", "SIGHUP"]) process.on(signal, cancel);
  const timer = setTimeout(cancel, 840000);
  const launch = (command, argv, stdio) => {
    if (cancelled || Date.now() >= deadline) fail("backup deadline or interruption reached");
    const child = spawn(command, argv, { env, stdio }); children.add(child); child.once("close", () => children.delete(child)); return child;
  };
  const completion = child => new Promise((resolve, reject) => { child.once("error", reject); child.once("close", code => code === 0 && !cancelled ? resolve() : reject(Error("backup child failed"))); });
  const run = async (command, argv) => {
    const child = launch(command, argv, ["ignore", "pipe", "ignore"]); let output = "";
    child.stdout.on("data", chunk => { output += chunk; if (output.length > 8388608) child.kill("SIGKILL"); });
    try { await completion(child); return output.trim(); } catch { fail(`${path.basename(command)} failed; service must remain stopped`); }
  };
  const docker = argv => run("docker", argv), restic = argv => run(policy.resticPath, argv);
  const inspect = async () => {
    const names = await docker(["ps", "-a", "--format", "{{.Names}}", "--filter", `name=^/${containerName}$`]);
    if (!names) return null;
    return JSON.parse(await docker(["inspect", "--format", '{"image":{{json .Image}},"running":{{json .State.Running}}}', containerName]));
  };
  const ops = {
    restic,
    async stopped() { if ((await inspect())?.running) fail("backup/restore requires a verified stopped service"); },
    async image() { const value = (await inspect())?.image ?? null; if (value && !IMAGE.test(value)) fail("invalid image ID"); return value; },
    async storage() {
      const backing = {}, storage = [];
      for (const mount of runtime.mounts) {
        let source = mount.source;
        if (mount.type === "volume") { source = validateVolume(JSON.parse(await docker(["volume", "inspect", "--format", "{{json .}}", mount.source])), appId); backing[mount.source] = source; }
        validateBindSource(source); if (!mount.readOnly) storage.push({ type: mount.type, declaredSource: mount.source, target: mount.target, source });
      }
      const names = (await docker(["ps", "-a", "--format", "{{.Names}}"])).split("\n").filter(Boolean);
      if (names.length > 256 || names.some(name => !/^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,127}$/.test(name))) fail("unexpected container inventory");
      const containers = [];
      for (const name of names) {
        const mounts = JSON.parse(await docker(["inspect", "--format", "{{json .Mounts}}", name]));
        for (const mount of mounts) if (mount.Source) mount.Source = fs.realpathSync(mount.Source);
        containers.push({ name, mounts });
      }
      validateLiveMounts(runtime, containers, containerName, backing);
      validateStoragePaths(storage);
      return storage;
    },
    async saveManifest(manifest) {
      const directory = path.join(work, randomUUID()); fs.mkdirSync(directory, { mode: 0o700 });
      const file = path.join(directory, "manifest.json"); atomicRecord(file, manifest); return file;
    },
    async backupImage(image) {
      const saving = launch("docker", ["save", image], ["ignore", "pipe", "ignore"]);
      const backup = launch(policy.resticPath, ["backup", "--json", "--stdin", "--stdin-filename", "image.tar", "--tag", `dm:${appId}:image`], ["pipe", "pipe", "ignore"]);
      let output = ""; backup.stdout.on("data", chunk => { output += chunk; if (output.length > 1048576) backup.kill(); });
      const pending = [completion(saving), completion(backup), pipeline(saving.stdout, backup.stdin)];
      try { await Promise.all(pending); return snapshotFromOutput(output); }
      catch { saving.kill("SIGKILL"); backup.kill("SIGKILL"); await Promise.allSettled(pending); fail("encrypted image export failed"); }
    },
    async readManifest(id) {
      const snapshots = JSON.parse(await restic(["snapshots", "--json", id]));
      if (snapshots.length !== 1 || snapshots[0].id !== id || !snapshots[0].tags?.includes(`dm:${appId}:data`)) fail("snapshot is not this app's exact data snapshot");
      const files = snapshots[0].paths.filter(value => value.startsWith(`${work}/`) && path.basename(value) === "manifest.json");
      if (files.length !== 1) fail("snapshot manifest missing or ambiguous");
      return JSON.parse(await restic(["dump", id, files[0]]));
    },
    ...filesystemOperations({ restic, work, journal, appId, snapshotId }),
  };
  let result;
  try {
  await ops.reclaim();
  if (operation === "preflight") {await ops.storage();await restic(["snapshots", "--json"]);result={ready:true,encrypted:true,offHost:policy.offHost};}
  else if (operation === "snapshot") result = await snapshotService(policy, runtime, containerName, ops);
  else if (operation === "restore") result = await restoreService(policy, runtime, containerName, snapshotId, ops);
  else fail("unsupported backup operation");
  process.stdout.write(`${JSON.stringify(result)}\n`);
  } finally {
    clearTimeout(timer); cancel();
    await Promise.allSettled([...children].map(child => new Promise(resolve => child.once("close", resolve))));
    for (const signal of ["SIGTERM", "SIGINT", "SIGHUP"]) process.removeListener(signal, cancel);
  }
  } finally { releaseLock(); }
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv.slice(2)).catch(error => { console.error(`restic-service-backup: ${error.message}`); process.exitCode = 1; });
