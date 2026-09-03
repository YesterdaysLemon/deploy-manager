import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  ReleaseCoordinator,
  ReleaseJournal,
  publicReleaseJob,
  releaseReplayKey,
} from "../src/release-journal.mjs";

const SHA_A = "a".repeat(40);
const SHA_B = "b".repeat(40);

async function waitFor(predicate) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (predicate()) return;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  throw new Error("condition did not become true");
}

test("release journal persists receipts and rejects semantic webhook replays", () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-manager-journal-"));
  const file = path.join(directory, "releases.jsonl");
  try {
    const payload = { event: "push", branch: "main", repo: "example/app", sha: SHA_A };
    const replayKey = releaseReplayKey("app", payload);
    const journal = new ReleaseJournal(file, { idFactory: () => "00000000-0000-4000-8000-000000000001" });
    const accepted = journal.accept({ appId: "app", sha: SHA_A, replayKey });
    journal.transition(accepted.job.id, { status: "running", phase: "build" });
    journal.transition(accepted.job.id, { status: "succeeded", phase: "complete" });

    const reopened = new ReleaseJournal(file);
    const duplicate = reopened.accept({ appId: "app", sha: SHA_A, replayKey });
    assert.equal(duplicate.duplicate, true);
    assert.equal(duplicate.job.id, accepted.job.id);
    assert.equal(duplicate.job.status, "succeeded");
    assert.equal(reopened.list()[0].events.length, 3);
    assert.equal(publicReleaseJob(duplicate.job).sha, undefined);
    assert.equal(publicReleaseJob(duplicate.job).release, "aaaaaaa");
    assert.equal(publicReleaseJob(duplicate.job, { includeSha: true }).sha, SHA_A);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("global release coordinator runs one deployment at a time", async () => {
  const journal = new ReleaseJournal(":memory:", {
    idFactory: (() => {
      let index = 0;
      return () => `00000000-0000-4000-8000-${String(++index).padStart(12, "0")}`;
    })(),
  });
  const started = [];
  const releases = [];
  let active = 0;
  let maximumActive = 0;
  const coordinator = new ReleaseCoordinator({
    journal,
    runner: async (item, onPhase) => {
      started.push(item.appId);
      active += 1;
      maximumActive = Math.max(maximumActive, active);
      onPhase("build");
      await new Promise((resolve) => releases.push(resolve));
      active -= 1;
    },
  });

  const first = coordinator.submit({ appId: "one", sha: SHA_A, replayKey: "one", context: {} });
  const duplicate = coordinator.submit({ appId: "one", sha: SHA_A, replayKey: "one", context: {} });
  const second = coordinator.submit({ appId: "two", sha: SHA_B, replayKey: "two", context: {} });
  assert.equal(duplicate.duplicate, true);
  assert.equal(duplicate.job.id, first.job.id);
  assert.equal(second.duplicate, false);

  await waitFor(() => started.length === 1);
  assert.deepEqual(started, ["one"]);
  assert.equal(coordinator.stateForApp("one"), "running");
  assert.equal(coordinator.stateForApp("two"), "queued");
  releases.shift()();
  await waitFor(() => started.length === 2);
  assert.deepEqual(started, ["one", "two"]);
  releases.shift()();
  await coordinator.waitForIdle();
  assert.equal(maximumActive, 1);
  assert.deepEqual(coordinator.publicJobs().map(({ status }) => status), ["succeeded", "succeeded"]);
});

test("unfinished receipts become interrupted after a manager restart", () => {
  const journal = new ReleaseJournal(":memory:", { idFactory: () => "00000000-0000-4000-8000-000000000009" });
  const accepted = journal.accept({ appId: "app", sha: SHA_A, replayKey: "unfinished" });
  new ReleaseCoordinator({ journal, runner: async () => {} });
  const recovered = journal.get(accepted.job.id);
  assert.equal(recovered.status, "interrupted");
  assert.equal(recovered.phase, "interrupted");
  assert.equal(recovered.error, "manager-restarted");
});
