import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { execFileSync, spawnSync } from "node:child_process";
import { generateBundle } from "../scripts/setup.mjs";
import { applyRegistration, planDigest, planRegistration, readSettings, snapshotConfig, validateHost } from "../scripts/register-app.mjs";

function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dm-register-"));
  const existing = JSON.parse(fs.readFileSync(new URL("../examples/fleet.json", import.meta.url), "utf8"));
  const bundle = generateBundle(existing);
  for (const [name, contents] of bundle.files) {
    if (!["apps.json", "public-topology.json", "deploy-manager.env"].includes(name) && !name.startsWith("apps/")) continue;
    fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    fs.writeFileSync(path.join(root, name), contents, { mode: 0o640 });
  }
  const topology = JSON.parse(fs.readFileSync(path.join(root, "public-topology.json")));
  delete topology.routes[0].plot;
  topology.extra = { retain: "operator metadata" };
  fs.writeFileSync(path.join(root, "public-topology.json"), JSON.stringify(topology));
  fs.mkdirSync(path.join(root, "state"));
  fs.writeFileSync(path.join(root, "state", "journal.jsonl"), "untouched-history\n");
  const input = { ...existing, datastores: [], apps: [{ ...existing.apps[0], id: "aaa-new", name: "New app", repository: "example-org/new", repoDir: "/opt/new/app", hostname: "new.example.com", publicPort: 3030, candidatePort: 3031, secretEnv: "NEW_DEPLOY_WEBHOOK_SECRET", imageName: "new", containerName: "new", candidateContainerName: "new-candidate" }] };
  try { run(root, input); }
  finally { fs.rmSync(root, { recursive: true, force: true }); }
}

test("additive registration preserves fleet, inferred plots, settings, modes and history", () => fixture((root, input) => {
  const snapshot = snapshotConfig(root);
  const plan = planRegistration(input, snapshot);
  const before = JSON.parse(snapshot.contents["public-topology.json"]);
  const after = JSON.parse(plan.files["public-topology.json"]);
  assert.deepEqual(after.extra, before.extra);
  assert.deepEqual(after.host, before.host);
  assert.deepEqual(after.datastores, before.datastores);
  assert.equal(after.routes.length, before.routes.length + 1);
  assert.deepEqual(plan.pinned, ["portfolio"]);
  assert.deepEqual(after.routes[0], { ...before.routes[0], plot: { x: 0.5, z: -1.5 } });
  assert.notDeepEqual(after.routes.at(-1).plot, after.routes[0].plot);
  assert.deepEqual(after.routes[1], before.routes[1]);
  const digest = planDigest(plan);
  assert.equal(planDigest(planRegistration(plan.input, snapshot)), digest);
  const result = applyRegistration(plan, digest);
  assert.equal(result.deploymentStarted, false);
  for (const name of ["apps.json", "public-topology.json"]) {
    assert.equal(fs.readFileSync(path.join(result.backup, name), "utf8"), snapshot.contents[name]);
    assert.equal(fs.statSync(path.join(root, name)).mode & 0o777, snapshot.fingerprints[name].mode);
  }
  for (const [name, contents] of Object.entries(snapshot.contents).filter(([name]) => name.includes(".env"))) assert.equal(fs.readFileSync(path.join(root, name), "utf8"), contents);
  assert.equal(fs.readFileSync(path.join(root, "state", "journal.jsonl"), "utf8"), "untouched-history\n");
  assert.throws(() => applyRegistration(plan, digest), /already exists/);
}));

test("registration rejects fleet identity, path, port, hostname, container and plot collisions", () => fixture((root, input) => {
  const snapshot = snapshotConfig(root);
  const collisions = [
    [{ id: "portfolio" }, /app id already exists/],
    [{ repository: "EXAMPLE-ORG/PORTFOLIO" }, /repository already registered/],
    [{ repoDir: "/opt/portfolio/app/subdir" }, /directory overlaps/],
    [{ repoDir: "/opt/new/../portfolio/app" }, /canonical/],
    [{ publicPort: 3001 }, /port is already reserved/],
    [{ candidatePort: 3010 }, /port is already reserved/],
    [{ hostname: "PORTFOLIO.EXAMPLE.COM" }, /hostname already registered/],
    [{ secretEnv: "NOTES_DEPLOY_WEBHOOK_SECRET" }, /secret environment name/],
    [{ containerName: "notes-candidate" }, /container name/],
    [{ imageName: "notes" }, /image name/],
    [{ plot: { x: 0.5, z: -1.5 } }, /plot is occupied/],
  ];
  for (const [change, error] of collisions) assert.throws(() => planRegistration({ ...input, apps: [{ ...input.apps[0], ...change }] }, snapshot), error);
  fs.writeFileSync(path.join(root, "apps", "orphan.env"), snapshot.contents["apps/portfolio.env"].replaceAll("3001", "3031"));
  assert.throws(() => planRegistration(input, snapshotConfig(root)), /port is already reserved/);
}));

test("host checks reject wrong ownership, symlinked checkout, origin, listeners and stopped containers", () => fixture((root, input) => {
  const { app } = planRegistration(input, snapshotConfig(root));
  const host = { ownerUid: 1001, repoUid: 1001, repoRealpath: app.repoDir, repository: `git@github.com:${app.repository}.git`, listeningPorts: [], containers: [] };
  validateHost(app, host);
  for (const [change, error] of [
    [{ ownerUid: 0 }, /unprivileged/], [{ repoUid: 1002 }, /owner/], [{ repoRealpath: "/opt/other" }, /real path/],
    [{ repository: "example-org/different" }, /origin/], [{ listeningPorts: [3031] }, /listening/], [{ containers: ["new-candidate"] }, /container already exists/],
  ]) assert.throws(() => validateHost(app, { ...host, ...change }), error);
}));

test("stale or modified plans fail before writes, including unrelated env changes", () => fixture((root, input) => {
  const plan = planRegistration(input, snapshotConfig(root));
  assert.throws(() => applyRegistration(plan, "0".repeat(64)), /digest/);
  const modified = structuredClone(plan);
  modified.files["../outside"] = "do not write";
  assert.throws(() => applyRegistration(modified, planDigest(modified)), /configuration or plan changed/);
  fs.appendFileSync(path.join(root, "apps", "notes.env"), "# changed after review\n");
  assert.throws(() => applyRegistration(plan, planDigest(plan)), /configuration or plan changed/);
  assert.equal(fs.existsSync(path.join(root, "apps", "aaa-new.env")), false);
  assert.equal(fs.existsSync(path.join(root, ".registration-backups")), false);
}));

test("partial write failure restores exact files and removes the new app", () => fixture((root, input) => {
  const snapshot = snapshotConfig(root);
  const plan = planRegistration(input, snapshot);
  let writes = 0;
  assert.throws(() => applyRegistration(plan, planDigest(plan), { write(file, contents) {
    if (++writes === 3) throw new Error("fixture disk error");
    fs.writeFileSync(file, contents);
  } }), /fixture disk error/);
  for (const [name, contents] of Object.entries(snapshot.contents)) assert.equal(fs.readFileSync(path.join(root, name), "utf8"), contents);
  assert.equal(fs.existsSync(path.join(root, "apps", "aaa-new.env")), false);
  assert.equal(fs.existsSync(path.join(root, ".registration-lock")), false);
}));

test("env inspection never evaluates shell and rejects duplicate or dynamic settings", () => {
  assert.equal(readSettings("REPO_DIR='/opt/app'\nSECRET=ignored\n", "fixture").REPO_DIR, "/opt/app");
  assert.throws(() => readSettings("REPO_DIR=$(touch /tmp/should-not-exist)", "fixture"), /without shell expansion/);
  assert.throws(() => readSettings("REPO_DIR=/opt/one\nREPO_DIR=/opt/two", "fixture"), /duplicate/);
});

test("symlinked configuration is rejected before reading it", { skip: process.platform === "win32" }, () => fixture((root, input) => {
  fs.renameSync(path.join(root, "apps.json"), path.join(root, "saved.json"));
  fs.symlinkSync("saved.json", path.join(root, "apps.json"));
  assert.throws(() => snapshotConfig(root), /regular, unlinked file/);
}));

test("Linux CLI plans and explicitly applies a reviewed fixture with real checkout ownership", { skip: process.platform !== "linux" || process.getuid?.() === 0 }, () => fixture((root, input) => {
  const repo = path.join(root, "repo");
  fs.mkdirSync(repo);
  execFileSync("git", ["init", "--quiet", repo]);
  execFileSync("git", ["-C", repo, "remote", "add", "origin", "https://github.com/example-org/new.git"]);
  input.apps[0].repoDir = repo;
  input.apps[0].repoUser = execFileSync("id", ["-un"], { encoding: "utf8" }).trim();
  const bin = path.join(root, "fixture-bin");
  fs.mkdirSync(bin);
  // Only external Docker/listener inventory is simulated; CLI, Git, ownership,
  // config parsing, plan digest, backup and filesystem application are real.
  for (const name of ["docker", "ss"]) fs.writeFileSync(path.join(bin, name), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
  const spec = path.join(root, "input.json");
  fs.writeFileSync(spec, JSON.stringify(input));
  const cli = new URL("../scripts/register-app.mjs", import.meta.url);
  const run = args => spawnSync(process.execPath, [cli.pathname, ...args], { encoding: "utf8", env: { ...process.env, PATH: `${bin}:${process.env.PATH}` } });
  const output = path.join(root, "review");
  const planned = run(["--from", spec, "--config", root, "--output", output]);
  assert.equal(planned.status, 0, planned.stderr);
  assert.equal(fs.existsSync(path.join(root, "apps", "aaa-new.env")), false);
  const receipt = JSON.parse(planned.stdout);
  const applied = run(["--apply", path.join(output, "plan.json"), "--expect", receipt.digest]);
  assert.equal(applied.status, 0, applied.stderr);
  assert.equal(JSON.parse(applied.stdout).registered, "aaa-new");
  assert.ok(JSON.parse(fs.readFileSync(path.join(root, "apps.json"))).apps["aaa-new"]);
}));
