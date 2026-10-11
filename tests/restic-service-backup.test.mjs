import assert from "node:assert/strict";
import test from "node:test";
import {EventEmitter} from "node:events";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { normalizeBackupPolicy, validateTomeTransport, probeTomeTransport, validateStoragePaths, treeDigest, snapshotService, restoreService } from "../bin/restic-service-backup.mjs";
import { fingerprint, validateBackupReceipt } from "../bin/stateful-service.mjs";

const policy = { version: 1, appId: "mail", repository: `s3:https://${"a".repeat(32)}.r2.cloudflarestorage.com/mail-backups`, passwordFile: "/etc/deploy-manager/backup/mail.password", credentialsFile: "/etc/deploy-manager/backup/mail.s3.json", resticPath: "/usr/local/bin/restic" };
test("production backup destinations cannot embed credentials or silently become local", () => {
  assert.equal(normalizeBackupPolicy(policy, "mail").offHost, true);
  for (const repository of ["/srv/backups", "s3:http://insecure/bucket", "s3:https://user:password@r2.example/bucket"])
    assert.throws(() => normalizeBackupPolicy({ ...policy, repository }, "mail"));
  const local = normalizeBackupPolicy({ ...policy, repository: "/srv/dm-fixture/mail/repository", testOnly: true }, "mail");
  assert.equal(local.offHost, false);
  assert.throws(() => validateBackupReceipt({ version: 1, snapshotId: "one", verified: true, encrypted: true, offHost: local.offHost }));
});
test("overlapping resolved storage paths fail before backup or restore", () => {
  assert.throws(() => validateStoragePaths([{ source: "/srv/mail" }, { source: "/srv/mail/data" }]), /overlap/);
  assert.throws(() => validateStoragePaths([{ source: "/srv/mail" }, { source: "/srv/mail" }]), /overlap/);
  validateStoragePaths([{ source: "/srv/mail" }, { source: "/srv/mail-other" }]);
});
test("Tome backup accepts only its app-scoped private Unix tunnel, never TCP, credentials or local claims",()=>{
  const value={version:1,appId:"mail",transport:"tome-ssh-unix",socketOwnerUid:1002,repository:"rest:http+unix:///var/lib/deploy-manager-tome/mail/rest.sock:/mail/",passwordFile:policy.passwordFile,resticPath:policy.resticPath};
  const normalized=normalizeBackupPolicy(value,"mail");assert.equal(normalized.offHost,true);
  for(const patch of [{repository:"rest:http://127.0.0.1:3344/mail/"},{repository:"rest:http+unix:///tmp/other.sock:/mail/"},{repository:"rest:http+unix:///var/lib/deploy-manager-tome/other/rest.sock:/mail/"},{credentialsFile:policy.credentialsFile},{socketOwnerUid:0},{testOnly:true},{transport:"unknown"}])assert.throws(()=>normalizeBackupPolicy({...value,...patch},"mail"));
});
test("missing, symlinked, writable or wrong-owner Tome sockets fail closed",()=>{
  const value={appId:"mail",transport:"tome-ssh-unix",socketOwnerUid:1002};
  const entry=(isSocket,uid,mode)=>({uid,mode,isDirectory:()=>!isSocket,isSocket:()=>isSocket,isSymbolicLink:()=>false});
  const mock=target=>target.endsWith("rest.sock")?entry(true,1002,0o600):target.endsWith("/mail")?entry(false,1002,0o700):entry(false,0,0o755);
  assert.doesNotThrow(()=>validateTomeTransport(value,mock));
  for(const patch of [{uid:0},{mode:0o666},{isSocket:()=>false},{isSymbolicLink:()=>true}])assert.throws(()=>validateTomeTransport(value,target=>target.endsWith("rest.sock")?{...mock(target),...patch}:mock(target)));
  assert.throws(()=>validateTomeTransport(value,()=>{throw Error("offline");}));
  assert.throws(()=>validateTomeTransport(value,target=>target==="/var/lib/deploy-manager-tome"?{...mock(target),mode:0o777}:mock(target)));
});
test("Tome availability probe uses only its Unix repository and accepts an existing encrypted config",async()=>{
  let destroyed=false;
  await probeTomeTransport({transport:"tome-ssh-unix",appId:"mail"},(options,reply)=>{
    assert.deepEqual(options,{socketPath:"/var/lib/deploy-manager-tome/mail/rest.sock",path:"/mail/config",method:"HEAD",timeout:3000});
    const request=new EventEmitter();request.end=()=>reply({statusCode:200,destroy:()=>{destroyed=true;}});return request;
  });
  assert.equal(destroyed,true);
});
test("offline, refused, timed-out or uninitialized Tome repositories fail the availability probe",async()=>{
  for(const reason of ["error","timeout",404,503])await assert.rejects(probeTomeTransport({transport:"tome-ssh-unix",appId:"mail"},(_,reply)=>{
    const request=new EventEmitter();request.destroy=()=>{};
    request.end=()=>typeof reason==="number"?reply({statusCode:reason,destroy:()=>{}}):request.emit(reason,Error("fixture failure"));return request;
  }),/unavailable/);
  await probeTomeTransport({transport:"other"},()=>{throw Error("must not probe another transport");});
});
test("content digest changes for bytes and refuses linked writable data", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dm-restic-digest-"));
  try {
    fs.writeFileSync(path.join(root, "mail"), "old"); const before = treeDigest(root);
    fs.writeFileSync(path.join(root, "mail"), "new"); assert.notEqual(treeDigest(root).sha256, before.sha256);
    if (process.platform !== "win32") { fs.symlinkSync("mail", path.join(root, "alias")); assert.throws(() => treeDigest(root), /only directories and regular files/); }
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("successful verification copies are cleaned and a fixture receipt remains local", async () => {
  const source = fs.mkdtempSync(path.join(os.tmpdir(), "dm-restic-snapshot-")); let cleaned = false;
  try {
    fs.writeFileSync(path.join(source, "mail"), "fixture");
    const runtime = { mounts: [{ type: "bind", source, target: "/data" }] };
    const receipt = await snapshotService({ appId: "mail", offHost: false }, runtime, "mail", {
      storage: async () => [{ source }], stopped: async () => {}, image: async () => null,
      saveManifest: async () => "manifest.json", restic: async args => args[0] === "backup" ? JSON.stringify({ message_type: "summary", snapshot_id: "a".repeat(64) }) : "",
      verify: async () => [{ source, staged: "fixture" }], cleanup: async () => { cleaned = true; },
    });
    assert.equal(cleaned, true); assert.equal(receipt.offHost, false); assert.throws(() => validateBackupReceipt(receipt));
  } finally { fs.rmSync(source, { recursive: true, force: true }); }
});
test("cross-service restore and live writers cannot reach installation", async () => {
  const runtime = { mounts: [{ type: "volume", source: "mail", target: "/data" }] };
  let installed = false;
  const ops = { stopped: async () => {}, storage: async () => [], readManifest: async () => ({ version: 1, appId: "other", containerName: "mail", storageFingerprint: fingerprint(runtime.mounts), mounts: [] }), install: async () => { installed = true; } };
  await assert.rejects(restoreService({ appId: "mail" }, runtime, "mail", "a".repeat(64), ops), /identity/);
  ops.stopped = async () => { throw Error("writer running"); };
  await assert.rejects(restoreService({ appId: "mail" }, runtime, "mail", "a".repeat(64), ops), /writer running/);
  assert.equal(installed, false);
});
