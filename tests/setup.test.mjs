import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createHmac } from "node:crypto";
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

test("emitted notification signs push/manual payloads and checks terminal receipts", () => {
  const shell = process.platform === "win32"
    ? path.join(process.env.ProgramFiles ?? "C:\\Program Files", "Git", "bin", "bash.exe") : "bash";
  const sha = "a".repeat(40);
  const bundle = generateBundle(exampleFleet());
  const workflow = bundle.files.get("github/notes-deploy.yml");
  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /github.event_name == 'push' \|\| github.event_name == 'workflow_dispatch'/);
  assert.doesNotMatch(workflow, /^\s+GITHUB_\w+:/m);
  const custom = exampleFleet();
  custom.apps[0].branch = "releases/stable";
  const customWorkflow = generateBundle(custom).files.get("github/portfolio-deploy.yml");
  assert.match(customWorkflow, /branches: \["releases\/stable"\]/);
  assert.match(customWorkflow, /github.ref == 'refs\/heads\/releases\/stable'/);
  const script = workflow.split("        run: |\n").at(-1).split("\n").map(line => line.slice(10)).join("\n");
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-workflow-"));
  try {
    const capture = path.join(tmp, "payload.json");
    const signature = path.join(tmp, "signature.txt");
    const curl = `curl() {
      if [ "$#" -gt 6 ] && [ "$7" = "POST" ]; then
        while [ "$#" -gt 0 ]; do
          case "$1" in
            --data) printf '%s' "$2" > "$CAPTURE" ;;
            --header) case "$2" in X-Hub-Signature-256:*) printf '%s' "$2" > "$SIGNATURE" ;; esac ;;
          esac
          shift
        done
        printf '%s' "$ACCEPTANCE"
      else
        printf '%s' "$RECEIPT"
      fi
    }
    `;
    const cases = [
      ["push", { job: { id: "one", sha }, receipt: "/api/releases/one" }, { id: "one", release: sha.slice(0, 7), status: "succeeded" }, 0, /succeeded/],
      ["workflow_dispatch", { duplicate: true, job: { id: "one", sha }, receipt: "/api/releases/one" }, { id: "one", release: sha.slice(0, 7), status: "succeeded" }, 0, /succeeded/],
      ["workflow_dispatch", { skipped: true, reason: "wrong_ref" }, {}, 1, /skipped request/],
      ["push", { ok: true }, {}, 1, /no job receipt/],
      ["push", { job: { id: "one", sha }, receipt: "/api/releases/one" }, { id: "one", release: sha.slice(0, 7), status: "rolled-back" }, 1, /rolled-back/],
      ["push", { job: { id: "one", sha }, receipt: "/api/releases/one" }, { id: "different", release: sha.slice(0, 7), status: "succeeded" }, 1, /identity mismatch/],
    ];
    for (const [event, acceptance, job, exit, expected] of cases) {
      const result = spawnSync(shell, ["-c", curl + script], {
        encoding: "utf8", timeout: 15000,
        env: { ...process.env, GITHUB_EVENT_NAME: event, DEPLOY_EVENT: "push", DEPLOY_BRANCH: "main", DEPLOY_REPOSITORY: "example-org/notes", DEPLOY_SHA: sha,
          DEPLOY_WEBHOOK_SECRET: "fixture-secret", DEPLOY_WEBHOOK_URL: "https://deploy.example.com/deploy/notes",
          ACCEPTANCE: JSON.stringify(acceptance), RECEIPT: JSON.stringify({ job }), CAPTURE: capture.replaceAll("\\", "/"), SIGNATURE: signature.replaceAll("\\", "/") },
      });
      assert.equal(result.status, exit, result.stderr || String(result.error));
      assert.match(result.stdout + result.stderr, expected);
      const payload = fs.readFileSync(capture, "utf8");
      assert.deepEqual(JSON.parse(payload), { event: "push", branch: "main", repo: "example-org/notes", sha });
      assert.equal(fs.readFileSync(signature, "utf8"), "X-Hub-Signature-256: sha256=" + createHmac("sha256", "fixture-secret").update(payload).digest("hex"));
    }
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
});
