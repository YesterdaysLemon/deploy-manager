import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { normalizeRuntime, containerArguments, deployStateful, recoverStateful, restoreStateful, validateBackupReceipt, validateLiveMounts, validateLivePorts, validateVolume, configurationFingerprint, rebindStateful, validateTransportTransition } from "../bin/stateful-service.mjs";
import { generateBundle, normalizeFleetSpec } from "../scripts/setup.mjs";
import { snapshotConfig, planRegistration, planDigest, applyRegistration, validateHost } from "../scripts/register-app.mjs";

const runtime = normalizeRuntime({ version: 1, deployment: "stateful", backupHook: "/etc/deploy-manager/hooks/mail-backup",
  mounts: [{ type: "volume", source: "mail-data", target: "/var/lib/mail" }, { type: "bind", source: "/srv/mail/tls", target: "/etc/mail/tls", readOnly: true }],
  ports: [{ host: "107.172.137.190", hostPort: 25, containerPort: 25 }, { host: "107.172.137.190", hostPort: 993, containerPort: 993 }],
  ipv4Address: "172.30.0.10", memory: "1536m", cpus: 1.5 });
const OLD_IMAGE = `sha256:${"a".repeat(64)}`, NEW_IMAGE = `sha256:${"b".repeat(64)}`, OTHER_IMAGE = `sha256:${"c".repeat(64)}`;
const context = { appId: "mail", containerName: "mail", port: 3300, containerPort: 8080, network: "afshan-mail-net", image: NEW_IMAGE, sha: "0".repeat(40) };

function harness(options = {}) {
  const bindings = selected => Object.fromEntries([{ host: "127.0.0.1", hostPort: context.port, containerPort: context.containerPort }, ...selected.ports].map(binding => [`${binding.containerPort}/tcp`, [{ HostIp: binding.host, HostPort: String(binding.hostPort) }]]));
  const state = { container: { image: OLD_IMAGE, running: true }, data: "v1", record: null, calls: [], snapshots: new Map(), external: new Map() };
  state.container.portBindings = bindings(runtime);
  state.baseline = { version: 1, image: OLD_IMAGE, configurationFingerprint: configurationFingerprint(context, runtime) };
  let externalId = 0;
  const ops = {
    preflight: async () => {}, readRecord: async () => state.record,
    readBaseline: async () => state.baseline, writeBaseline: async value => { state.baseline = structuredClone(value); },
    installRuntime: async value => { state.runtime = structuredClone(value); },
    requireImage: async () => {},
    writeRecord: async record => { state.record = structuredClone(record); }, clearRecord: async () => { state.record = null; },
    inspect: async () => state.container && { ...state.container },
    stop: async () => { state.calls.push("stop"); if (state.container) state.container.running = false; },
    start: async () => { state.calls.push("start-old"); state.container.running = true; },
    remove: async () => { state.calls.push("remove-container"); state.container = null; },
    run: async image => { state.calls.push(`run:${image}`); state.container = { image, running: true, portBindings: bindings(state.runtime ?? runtime) }; if (image === NEW_IMAGE) state.data = "v2"; if (options.failRun) throw Error("run failed"); },
    healthy: async () => !(options.unhealthyNew && state.container?.image === NEW_IMAGE),
    backup: async () => { state.calls.push("backup"); if (options.backupFails) throw Error("backup unavailable"); assert.equal(state.container?.running ?? false, false); const snapshotId = `external-${++externalId}`; state.external.set(snapshotId, state.data); return { version: 1, snapshotId, verified: true, encrypted: true, offHost: true }; },
    restore: async id => { state.calls.push(`restore:${id}`); state.data = state.external.get(id); },
    saveSnapshot: async snapshot => { const id = `receipt-${state.snapshots.size + 1}`; state.snapshots.set(id, structuredClone(snapshot)); return id; },
    readSnapshot: async id => state.snapshots.get(id),
    checkInterrupted: () => { if (options.interrupted) throw Error("interrupted"); },
    phase: phase => state.calls.push(`phase:${phase}`), success: () => state.calls.push("success"),
    rebindSuccess: () => state.calls.push("rebind-success"),
  };
  return { state, ops };
}

test("persistent Docker arguments include named volumes, readonly bind TLS, loopback admin and explicit TCP ports", () => {
  const args = containerArguments(context, runtime, context.image);
  assert.ok(args.includes("type=volume,source=mail-data,target=/var/lib/mail"));
  assert.ok(args.includes("type=bind,source=/srv/mail/tls,target=/etc/mail/tls,readonly"));
  assert.ok(args.includes("127.0.0.1:3300:8080")); assert.ok(args.includes("107.172.137.190:993:993"));
  assert.ok(args.includes("172.30.0.10")); assert.equal(args.at(-1), context.image);
  assert.throws(() => containerArguments({ ...context, network: undefined }, runtime, context.image), /named network/);
});
test("unsafe mount and port declarations fail closed", () => {
  for (const change of [{ ports: [{ host: "0.0.0.0", hostPort: 25, containerPort: 25 }] },
    { mounts: [{ type: "bind", source: "/etc", target: "/data" }] },
    { mounts: [{ type: "bind", source: "/srv/mail/../other", target: "/data" }] },
    { mounts: [{ type: "volume", source: "a,b", target: "/data" }] },
    { mounts: [{ type: "volume", source: "one", target: "/data" }, { type: "volume", source: "two", target: "/data/child" }] },
    { backupHook: "/opt/app/untrusted-hook" }, { ipv4Address: "8.8.8.8" }]) assert.throws(() => normalizeRuntime({ ...runtime, ...change }));
});
test("a claimed successful local or unencrypted backup does not pass the update gate", () => {
  for (const change of [{ offHost: false }, { encrypted: false }, { verified: false }, { snapshotId: "../../other" }])
    assert.throws(() => validateBackupReceipt({ version: 1, snapshotId: "one", verified: true, encrypted: true, offHost: true, ...change }));
});
test("live storage checks reject a second writer and omission of existing persistent state", () => {
  const mount = { Type: "volume", Name: "mail-data", Destination: "/var/lib/mail", RW: true };
  validateLiveMounts(runtime, [{ name: "mail", mounts: [mount] }], "mail");
  assert.throws(() => validateLiveMounts(runtime, [{ name: "other", mounts: [mount] }], "mail"), /another container/);
  assert.throws(() => validateLiveMounts(runtime, [{ name: "mail", mounts: [{ ...mount, Name: "missing-data" }] }], "mail"), /absent/);
});
test("named volume backing paths cannot bypass the single-writer guard through bind aliases", () => {
  const mount = { Type: "bind", Source: "/var/lib/docker/volumes/mail-data/_data/sub", RW: true };
  assert.throws(() => validateLiveMounts(runtime, [{ name: "other", mounts: [mount] }], "mail", { "mail-data": "/var/lib/docker/volumes/mail-data/_data" }), /another container/);
  const volume = { Driver: "local", Options: null, Labels: { "deploy-manager.app": "mail" }, Mountpoint: "/var/lib/docker/volumes/mail-data/_data" };
  assert.equal(validateVolume(volume, "mail"), volume.Mountpoint);
  for (const change of [{ Driver: "nfs" }, { Options: { device: "/srv/other" } }, { Labels: {} }]) assert.throws(() => validateVolume({ ...volume, ...change }, "mail"));
});
test("runtime port checks detect Docker NAT reservations even without listening sockets", () => {
  const bindings = { "25/tcp": [{ HostIp: "0.0.0.0", HostPort: "25" }] };
  assert.throws(() => validateLivePorts(context, runtime, [{ name: "other", portBindings: bindings }], []), /another container/);
  validateLivePorts(context, runtime, [{ name: "mail", running: true, portBindings: bindings }], [25]);
  assert.throws(() => validateLivePorts(context, runtime, [{ name: "mail", running: false, portBindings: bindings }], [25]), /already listening/);
  assert.throws(() => validateLivePorts({ ...context, port: 25 }, runtime, [], []), /overlap/);
});
test("stateful promotion refuses mutable image tags before stopping the writer", async () => {
  const { state, ops } = harness();
  await assert.rejects(deployStateful({ ...context, image: "mail:latest" }, runtime, ops), /immutable/);
  assert.equal(state.calls.length, 0); assert.equal(state.container.running, true);
});
test("configuration drift and adoption without a proved baseline fail before stopping existing storage", async () => {
  for (const changed of [{ envHash: "new-settings" }, { network: "new-network" }, {}]) {
    const { state, ops } = harness();
    if (!Object.keys(changed).length) state.baseline = null;
    await assert.rejects(deployStateful({ ...context, ...changed }, runtime, ops), /baseline/);
    assert.equal(state.container.running, true); assert.deepEqual(state.calls, []);
  }
});
test("a missing established container cannot silently become a new service with changed configuration", async () => {
  const { state, ops } = harness(); state.container = null;
  await assert.rejects(deployStateful({ ...context, envHash: "new-settings" }, runtime, ops), /explicit recovery review/);
  assert.deepEqual(state.calls, []); assert.equal(state.data, "v1"); assert.equal(state.record, null);
});
test("reviewed transport rebind uses the same immutable image after backup and rejects storage or environment changes", async () => {
  const next = normalizeRuntime({ ...runtime, ports: runtime.ports.map(binding => ({ ...binding, host: "127.0.0.1", hostPort: binding.hostPort + 10000 })) });
  const approval = `${configurationFingerprint(context, runtime)}:${configurationFingerprint(context, next)}`;
  const { state, ops } = harness();
  await rebindStateful(context, runtime, next, ops, approval);
  assert.equal(state.container.image, OLD_IMAGE); assert.equal(state.data, "v1");
  assert.deepEqual(state.runtime, next); assert.equal(state.baseline.configurationFingerprint, configurationFingerprint(context, next));
  assert.ok(state.calls.indexOf("backup") < state.calls.indexOf(`run:${OLD_IMAGE}`));
  assert.throws(() => validateTransportTransition(context, runtime, next, "unreviewed"), /fingerprints/);
  const changed = normalizeRuntime({ ...next, mounts: [{ type: "volume", source: "other", target: "/var/lib/mail" }] });
  assert.throws(() => validateTransportTransition(context, runtime, changed, `${configurationFingerprint(context, runtime)}:${configurationFingerprint(context, changed)}`), /only change/);
});
test("rebind backup failure restarts the same old transport without changing persistent data", async () => {
  const next = normalizeRuntime({ ...runtime, ports: runtime.ports.map(binding => ({ ...binding, hostPort: binding.hostPort + 10000 })) });
  const { state, ops } = harness({ backupFails: true });
  await assert.rejects(rebindStateful(context, runtime, next, ops, `${configurationFingerprint(context, runtime)}:${configurationFingerprint(context, next)}`), /before promotion/);
  assert.equal(state.container.running, true); assert.equal(state.data, "v1"); assert.deepEqual(state.runtime, runtime);
});
for (const installed of ["old", "next"]) test(`interrupted rebind configuration with ${installed} runtime restores the old transport without replacing data`, async () => {
  const next = normalizeRuntime({ ...runtime, ports: runtime.ports.map(binding => ({ ...binding, host: "127.0.0.1", hostPort: binding.hostPort + 10000 })) });
  const { state, ops } = harness();
  const previousBaseline = structuredClone(state.baseline), previousBindings = structuredClone(state.container.portBindings);
  const installedRuntime = installed === "old" ? runtime : next;
  state.runtime = installedRuntime; state.container.running = false;
  state.record = { version: 2, appId: context.appId, operation: "transport-rebind", phase: "rebind-configuring",
    oldImage: OLD_IMAGE, newImage: OLD_IMAGE, configurationFingerprint: configurationFingerprint(context, runtime),
    oldRuntime: runtime, nextRuntime: next, nextFingerprint: configurationFingerprint(context, next), snapshot: "receipt-interrupted" };
  const install = ops.installRuntime;
  ops.installRuntime = async value => { state.calls.push("restore-old-runtime"); await install(value); };

  assert.equal(await recoverStateful(context, installedRuntime, ops), "restored");
  assert.deepEqual(state.runtime, runtime); assert.deepEqual(state.container.portBindings, previousBindings);
  assert.equal(state.container.image, OLD_IMAGE); assert.equal(state.container.running, true);
  assert.equal(state.data, "v1"); assert.equal(state.record, null); assert.deepEqual(state.baseline, previousBaseline);
  assert.deepEqual(state.calls, ["restore-old-runtime", "start-old"]);
  assert.equal(state.snapshots.size, 0); assert.equal(state.external.size, 0);
});
test("promoting rebind recovery rejects a healthy same-image instance still using old port bindings", async () => {
  const next = normalizeRuntime({ ...runtime, ports: runtime.ports.map(binding => ({ ...binding, hostPort: binding.hostPort + 10000 })) });
  const { state, ops } = harness();
  const previousBaseline = structuredClone(state.baseline);
  state.runtime = next; state.data = "v1 plus mail accepted on old bindings";
  state.record = { version: 2, appId: context.appId, operation: "transport-rebind", phase: "promoting",
    oldImage: OLD_IMAGE, newImage: OLD_IMAGE, configurationFingerprint: configurationFingerprint(context, next),
    oldRuntime: runtime, nextRuntime: next, nextFingerprint: configurationFingerprint(context, next), snapshot: "receipt-interrupted" };

  await assert.rejects(recoverStateful(context, next, ops), /explicit compatible restore/);
  assert.equal(state.container.image, OLD_IMAGE); assert.equal(state.container.running, false);
  assert.equal(state.data, "v1 plus mail accepted on old bindings"); assert.equal(state.record.phase, "promoting");
  assert.deepEqual(state.baseline, previousBaseline); assert.deepEqual(state.calls, ["stop"]);
});
test("promoting rebind recovery accepts a healthy same-image instance with the reviewed new bindings", async () => {
  const next = normalizeRuntime({ ...runtime, ports: runtime.ports.map(binding => ({ ...binding, hostPort: binding.hostPort + 10000 })) });
  const { state, ops } = harness();
  await ops.installRuntime(next); await ops.run(OLD_IMAGE); state.calls.length = 0;
  state.data = "v1 plus mail accepted on new bindings";
  state.record = { version: 2, appId: context.appId, operation: "transport-rebind", phase: "promoting",
    oldImage: OLD_IMAGE, newImage: OLD_IMAGE, configurationFingerprint: configurationFingerprint(context, next),
    oldRuntime: runtime, nextRuntime: next, nextFingerprint: configurationFingerprint(context, next), snapshot: "receipt-interrupted" };

  assert.equal(await recoverStateful(context, next, ops), "healthy");
  assert.equal(state.container.running, true); assert.equal(state.data, "v1 plus mail accepted on new bindings");
  assert.equal(state.record, null); assert.deepEqual(state.calls, []);
  assert.deepEqual(state.baseline, { version: 1, image: OLD_IMAGE, configurationFingerprint: configurationFingerprint(context, next) });
});
for (const failure of ["lost-launch-response", "unhealthy-launch"]) test(`rebind ${failure} retains newly accepted mail and requires explicit recovery`, async () => {
  const next = normalizeRuntime({ ...runtime, ports: runtime.ports.map(binding => ({ ...binding, hostPort: binding.hostPort + 10000 })) });
  const { state, ops } = harness();
  const previousBaseline = structuredClone(state.baseline), run = ops.run;
  ops.run = async image => {
    await run(image); state.data = "v1 plus mail accepted after rebind";
    if (failure === "lost-launch-response") throw Error("Docker response lost after service accepted mail");
  };
  if (failure === "unhealthy-launch") ops.healthy = async () => false;

  await assert.rejects(rebindStateful(context, runtime, next, ops, `${configurationFingerprint(context, runtime)}:${configurationFingerprint(context, next)}`), /transport promotion failed/);
  assert.equal(state.container.image, OLD_IMAGE); assert.equal(state.container.running, false);
  assert.deepEqual(state.runtime, next); assert.deepEqual(state.baseline, previousBaseline);
  assert.equal(state.data, "v1 plus mail accepted after rebind");
  assert.equal(state.record.phase, "manual-restore-required"); assert.equal(state.record.stopVerified, true);
  assert.equal(state.record.configurationFingerprint, configurationFingerprint(context, next));
  const saved = state.snapshots.get(state.record.snapshot);
  assert.equal(saved.configurationFingerprint, configurationFingerprint(context, next));
  assert.equal(state.external.get(saved.backup.snapshotId), "v1");
  assert.equal(state.calls.filter(call => call === `run:${OLD_IMAGE}`).length, 1);
  assert.equal(state.calls.includes("start-old"), false); assert.equal(state.calls.some(call => call.startsWith("restore:")), false);

  await assert.rejects(recoverStateful(context, next, ops), /explicit compatible restore/);
  assert.equal(state.data, "v1 plus mail accepted after rebind"); assert.equal(state.record.phase, "manual-restore-required");
});
test("successful stateful update stops the sole writer and verifies backup before promotion", async () => {
  const { state, ops } = harness();
  const result = await deployStateful(context, runtime, ops);
  assert.equal(result.succeeded, true); assert.equal(state.data, "v2"); assert.equal(state.record, null);
  assert.ok(state.calls.indexOf("stop") < state.calls.indexOf("backup"));
  assert.ok(state.calls.indexOf("backup") < state.calls.indexOf(`run:${NEW_IMAGE}`));
  assert.equal(state.calls.some(call => /candidate|volume.*rm/.test(call)), false);
});
test("backup failure restarts the same old container without replacing data", async () => {
  const { state, ops } = harness({ backupFails: true });
  await assert.rejects(deployStateful(context, runtime, ops), /before promotion/);
  assert.equal(state.data, "v1"); assert.equal(state.container.image, OLD_IMAGE); assert.equal(state.container.running, true);
  assert.equal(state.calls.includes("remove-container"), false); assert.equal(state.record, null);
});
test("stop request before promotion leaves the old data usable and no new process launched", async () => {
  const { state, ops } = harness({ interrupted: true });
  await assert.rejects(deployStateful(context, runtime, ops), /before promotion/);
  assert.equal(state.container.running, true); assert.equal(state.data, "v1"); assert.equal(state.calls.includes(`run:${NEW_IMAGE}`), false);
});
for (const failure of [{ unhealthyNew: true }, { failRun: true }]) test(`failure after live data changes never launches old binary or removes data (${JSON.stringify(failure)})`, async () => {
  const { state, ops } = harness(failure);
  await assert.rejects(deployStateful(context, runtime, ops), /explicit compatible restore/);
  assert.equal(state.data, "v2"); assert.equal(state.container.running, false);
  assert.equal(state.record.phase, "manual-restore-required"); assert.equal(state.calls.includes(`run:${OLD_IMAGE}`), false);
  await assert.rejects(recoverStateful(context, runtime, ops), /explicit compatible restore/);
  assert.equal(state.data, "v2");
});
test("hard-stop recovery keeps a healthy new instance and its new data", async () => {
  const { state, ops } = harness({ unhealthyNew: true });
  await assert.rejects(deployStateful(context, runtime, ops));
  state.record.phase = "promoting"; state.container.running = true; ops.healthy = async () => true;
  assert.equal(await recoverStateful(context, runtime, ops), "healthy"); assert.equal(state.data, "v2"); assert.equal(state.record, null);
});
test("explicit restore rejects running or changed targets, and preserves newer writes before restoring compatible data", async () => {
  const { state, ops } = harness({ unhealthyNew: true });
  await assert.rejects(deployStateful(context, runtime, ops));
  const snapshot = state.record.snapshot;
  state.container.running = true;
  await assert.rejects(restoreStateful(context, runtime, ops, snapshot, NEW_IMAGE), /stop/);
  state.container.running = false;
  await assert.rejects(restoreStateful(context, runtime, ops, snapshot, OTHER_IMAGE), /current image changed/);
  const result = await restoreStateful(context, runtime, ops, snapshot, NEW_IMAGE);
  assert.equal(state.data, "v1"); assert.equal(state.container.image, OLD_IMAGE); assert.equal(state.container.running, true);
  assert.equal(state.external.get(state.snapshots.get(result.preserved).backup.snapshotId), "v2");
});
test("restore launch uncertainty always stops the new writer and retains both snapshots", async () => {
  const { state, ops } = harness({ unhealthyNew: true });
  await assert.rejects(deployStateful(context, runtime, ops));
  const snapshot = state.record.snapshot;
  const run = ops.run; ops.run = async image => { await run(image); throw Error("lost Docker response after create"); };
  state.calls.length = 0;
  await assert.rejects(restoreStateful(context, runtime, ops, snapshot, NEW_IMAGE), /explicit restore failed/);
  assert.equal(state.container.running, false); assert.equal(state.record.stopVerified, true);
  assert.equal(state.calls.at(-1), "stop"); assert.equal(state.snapshots.size, 2);
});
test("explicitly reviewed missing-container recovery requires the matching durable snapshot record", async () => {
  const { state, ops } = harness({ unhealthyNew: true });
  await assert.rejects(deployStateful(context, runtime, ops));
  const snapshot = state.record.snapshot; state.container = null;
  await assert.rejects(restoreStateful(context, runtime, ops, snapshot, NEW_IMAGE), /current image changed/);
  await restoreStateful(context, runtime, ops, snapshot, "absent");
  assert.equal(state.container.image, OLD_IMAGE); assert.equal(state.data, "v1");
});
test("recovery and restore reject changed network, admin port or environment contents", async () => {
  const { state, ops } = harness({ unhealthyNew: true });
  await assert.rejects(deployStateful(context, runtime, ops));
  const snapshot = state.record.snapshot;
  for (const change of [{ network: "different-net" }, { port: 3400 }, { envHash: "changed" }]) {
    await assert.rejects(recoverStateful({ ...context, ...change }, runtime, ops), /configuration changed/);
    await assert.rejects(restoreStateful({ ...context, ...change }, runtime, ops, snapshot, NEW_IMAGE), /does not match/);
  }
});
test("missing compatible image fails before any data backup or replacement", async () => {
  const { state, ops } = harness({ unhealthyNew: true });
  await assert.rejects(deployStateful(context, runtime, ops));
  const snapshot = state.record.snapshot; state.calls.length = 0;
  ops.requireImage = async () => { throw Error("compatible image missing"); };
  await assert.rejects(restoreStateful(context, runtime, ops, snapshot, NEW_IMAGE), /image missing/);
  assert.deepEqual(state.calls, []); assert.equal(state.data, "v2");
});
test("setup and additive registration preserve private admin and reserve additional service ports", () => {
  const fleet = JSON.parse(fs.readFileSync(new URL("../examples/fleet.json", import.meta.url)));
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dm-stateful-"));
  try {
    for (const [name, contents] of generateBundle(fleet).files) {
      if (!["apps.json", "public-topology.json", "deploy-manager.env"].includes(name) && !name.startsWith("apps/")) continue;
      fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true }); fs.writeFileSync(path.join(root, name), contents);
    }
    const app = { ...fleet.apps[0], id: "mail", repository: "example/mail", repoDir: "/opt/mail/app", imageName: "mail", containerName: "mail", candidateContainerName: "mail-candidate",
      hostname: "mail.example.com", secretEnv: "MAIL_DEPLOY_WEBHOOK_SECRET", publicPort: 3300, candidatePort: 3301, runtime };
    const input = { ...fleet, datastores: [], apps: [app] };
    fs.mkdirSync(path.join(root, "runtime"));
    fs.writeFileSync(path.join(root, "runtime", "mail.json"), JSON.stringify(runtime));
    assert.throws(() => planRegistration(input, snapshotConfig(root)), /runtime already exists/);
    fs.unlinkSync(path.join(root, "runtime", "mail.json"));
    const plan = planRegistration(input, snapshotConfig(root));
    assert.match(plan.files["apps/mail.env"], /STATEFUL_RUNTIME_FILE='\/etc\/deploy-manager\/runtime\/mail.json'/);
    assert.match(plan.caddy, /respond 404/); assert.doesNotMatch(plan.caddy, /reverse_proxy/);
    assert.throws(() => normalizeFleetSpec({ ...input, apps: [{ ...app, publicPort: 25 }] }), /port 25 is shared/);
    const host = { ownerUid: 1001, repoUid: 1001, repoRealpath: app.repoDir, repository: app.repository, listeningPorts: [993], containers: [] };
    assert.throws(() => validateHost(plan.app, host), /already listening/);
    assert.throws(() => validateHost(plan.app, { ...host, listeningPorts: [], publishedPorts: [25] }), /Docker-published/);
    applyRegistration(plan, planDigest(plan));
    const snapshot = snapshotConfig(root);
    assert.ok(snapshot.contents["runtime/mail.json"]);
    const newApp = { ...app, id: "mail2", repository: "example/mail2", repoDir: "/opt/mail2/app", imageName: "mail2", containerName: "mail2", candidateContainerName: "mail2-candidate", hostname: "mail2.example.com", secretEnv: "MAIL2_DEPLOY_WEBHOOK_SECRET", publicPort: 3400, candidatePort: 3401 };
    assert.throws(() => planRegistration({ ...input, apps: [newApp] }, snapshot), /storage overlaps|port is already reserved/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
