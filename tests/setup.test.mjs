import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { generateBundle, normalizeFleetSpec, writeBundle } from "../scripts/setup.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

function exampleFleet() {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "examples", "fleet.json"), "utf8"));
}

test("fleet setup generates one reviewable, secret-free bundle", () => {
  const generatedAt = "2026-09-02T20:00:00.000Z";
  const bundle = generateBundle(exampleFleet(), generatedAt);

  assert.equal(bundle.spec.apps.length, 2);
  assert.equal(bundle.files.size, 10);
  assert.ok(bundle.files.has("apps/portfolio.env"));
  assert.ok(bundle.files.has("github/notes-deploy.yml"));

  const apps = JSON.parse(bundle.files.get("apps.json"));
  assert.equal(apps.apps.portfolio.repo, "example-org/portfolio");
  assert.equal(apps.apps.notes.secretEnv, "NOTES_DEPLOY_WEBHOOK_SECRET");
  assert.doesNotMatch(JSON.stringify(apps), /64_HEX|actual-secret/i);

  const topology = JSON.parse(bundle.files.get("public-topology.json"));
  assert.equal(topology.generatedBy, "deploy-manager setup");
  assert.equal(topology.auditedAt, generatedAt);
  assert.equal(topology.routes.length, 2);
  assert.equal(topology.datastores[0].connectedTo[0], "notes");
  assert.deepEqual(topology.routes[0].plot, { x: 0.5, z: -1.5 });
  assert.notDeepEqual(topology.routes[0].plot, topology.routes[1].plot);

  assert.match(bundle.files.get("apps/notes.env"), /DOCKER_NETWORK='notes-private'/);
  assert.match(bundle.files.get("github/notes-deploy.yml"), /exit 1/);
  assert.match(bundle.files.get("github/notes-deploy.yml"), /Deploy Manager accepted job/);
  assert.match(bundle.files.get("github/notes-deploy.yml"), /for attempt in \$\(seq 1 600\)/);
  assert.match(bundle.files.get("github/notes-deploy.yml"), /failed\|rolled-back\|interrupted/);
  assert.match(bundle.files.get("deploy-manager.env"), /REPLACE_WITH_A_RANDOM_64_HEX_SECRET/);
  assert.match(bundle.files.get("deploy-manager.env"), /DEPLOY_MANAGER_STATE_DIR=\/var\/lib\/deploy-manager/);
  assert.match(bundle.files.get("SETUP-RECEIPT.md"), /No production files were changed/);

  const exampleWorkflow = fs.readFileSync(path.join(ROOT, "examples", "github-actions", "deploy.yml"), "utf8");
  assert.match(exampleWorkflow, /Deploy Manager accepted job/);
  assert.match(exampleWorkflow, /for attempt in \$\(seq 1 600\)/);
  assert.match(exampleWorkflow, /failed\|rolled-back\|interrupted/);
});

test("fleet setup refuses ambiguous ports, identities, and output overwrites", () => {
  const duplicatePort = exampleFleet();
  duplicatePort.apps[1].candidatePort = duplicatePort.apps[0].publicPort;
  assert.throws(() => normalizeFleetSpec(duplicatePort), /port 3000 is shared/);

  const duplicateSecret = exampleFleet();
  duplicateSecret.apps[1].secretEnv = duplicateSecret.apps[0].secretEnv;
  assert.throws(() => normalizeFleetSpec(duplicateSecret), /duplicate secret environment name/);

  const unsafeBranch = exampleFleet();
  unsafeBranch.apps[0].branch = "--oops";
  assert.throws(() => normalizeFleetSpec(unsafeBranch), /not a safe Git branch name/);

  const conflictingId = exampleFleet();
  conflictingId.apps[0].id = conflictingId.datastores[0].id;
  assert.throws(() => normalizeFleetSpec(conflictingId), /app id conflicts with datastore id/);

  const offGridPlot = exampleFleet();
  offGridPlot.apps[0].plot = { x: 0, z: 0 };
  assert.throws(() => normalizeFleetSpec(offGridPlot), /half-integer x and z/);

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-manager-setup-"));
  try {
    const output = path.join(tmp, "bundle");
    const bundle = generateBundle(exampleFleet());
    const written = writeBundle(bundle, output);
    assert.equal(written, path.resolve(output));
    assert.ok(fs.existsSync(path.join(output, "SETUP-RECEIPT.md")));
    assert.throws(() => writeBundle(bundle, output), /output directory is not empty/);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("fleet setup assigns omitted plots by identity, independent of input order", () => {
  const forward = normalizeFleetSpec(exampleFleet());
  const reversedInput = exampleFleet();
  reversedInput.apps.reverse();
  const reversed = normalizeFleetSpec(reversedInput);
  const positions = (spec) => new Map(
    [...spec.apps, ...spec.datastores].map(({ id, plot }) => [id, plot]),
  );
  assert.deepEqual(positions(reversed), positions(forward));

  const withReservedFuturePlot = exampleFleet();
  withReservedFuturePlot.apps[1].plot = { x: -1.5, z: -1.5 };
  const reserved = normalizeFleetSpec(withReservedFuturePlot);
  assert.deepEqual(reserved.apps[1].plot, { x: -1.5, z: -1.5 });
  assert.notDeepEqual(reserved.apps[0].plot, reserved.apps[1].plot);
});
