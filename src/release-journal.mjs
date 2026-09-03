import { createHash, randomUUID } from "node:crypto";
import {
  closeSync,
  existsSync,
  fsyncSync,
  mkdirSync,
  openSync,
  readFileSync,
  writeSync,
} from "node:fs";
import path from "node:path";

const TERMINAL_STATUSES = new Set(["succeeded", "failed", "rolled-back", "interrupted"]);
const VALID_STATUSES = new Set(["queued", "running", ...TERMINAL_STATUSES]);
const PHASE_PATTERN = /^[a-z][a-z0-9-]{0,31}$/;

function cleanPhase(value, fallback) {
  return typeof value === "string" && PHASE_PATTERN.test(value) ? value : fallback;
}

function cloneJob(job) {
  return job ? { ...job, events: job.events.map((event) => ({ ...event })) } : null;
}

export function releaseReplayKey(appId, payload) {
  const identity = [
    appId,
    payload?.event ?? "",
    payload?.branch ?? "",
    payload?.repo ?? "",
    payload?.sha ?? "",
  ].join("\0");
  return createHash("sha256").update(identity).digest("hex");
}

export class ReleaseJournal {
  constructor(filePath, options = {}) {
    if (!filePath) throw new Error("release journal path is required");
    this.filePath = filePath;
    this.clock = options.clock ?? (() => new Date());
    this.idFactory = options.idFactory ?? randomUUID;
    this.jobs = new Map();
    this.replays = new Map();
    this.sequence = 0;
    this.memoryOnly = filePath === ":memory:";
    this.load();
  }

  load() {
    if (this.memoryOnly || !existsSync(this.filePath)) return;
    const contents = readFileSync(this.filePath, "utf8");
    for (const line of contents.split(/\r?\n/)) {
      if (!line.trim()) continue;
      try {
        const record = JSON.parse(line);
        if (record?.version === 1 && Number.isSafeInteger(record.sequence)) this.apply(record);
      } catch {
        // A torn final line must not make the manager forget earlier receipts.
      }
    }
  }

  append(record) {
    const complete = {
      version: 1,
      sequence: this.sequence + 1,
      at: this.clock().toISOString(),
      ...record,
    };
    const encoded = Buffer.from(`${JSON.stringify(complete)}\n`, "utf8");
    if (!this.memoryOnly) {
      mkdirSync(path.dirname(this.filePath), { recursive: true, mode: 0o750 });
      const handle = openSync(this.filePath, "a", 0o640);
      try {
        let offset = 0;
        while (offset < encoded.length) {
          const written = writeSync(handle, encoded, offset, encoded.length - offset);
          if (written <= 0) throw new Error("release journal write made no progress");
          offset += written;
        }
        fsyncSync(handle);
      } finally {
        closeSync(handle);
      }
    }
    this.apply(complete);
    return complete;
  }

  apply(record) {
    this.sequence = Math.max(this.sequence, record.sequence);
    if (record.type === "accepted") {
      const job = {
        id: record.jobId,
        appId: record.appId,
        sha: record.sha,
        replayKey: record.replayKey,
        source: record.source ?? "signed-webhook",
        status: "queued",
        phase: "accepted",
        createdAt: record.at,
        updatedAt: record.at,
        sequence: record.sequence,
        events: [],
      };
      job.events.push({
        sequence: record.sequence,
        at: record.at,
        status: job.status,
        phase: job.phase,
      });
      this.jobs.set(job.id, job);
      this.replays.set(job.replayKey, job.id);
      return;
    }

    const job = this.jobs.get(record.jobId);
    if (!job || record.type !== "transition") return;
    job.status = VALID_STATUSES.has(record.status) ? record.status : job.status;
    job.phase = cleanPhase(record.phase, job.phase);
    job.updatedAt = record.at;
    job.sequence = record.sequence;
    if (record.error) job.error = record.error;
    job.events.push({
      sequence: record.sequence,
      at: record.at,
      status: job.status,
      phase: job.phase,
      ...(record.error ? { error: record.error } : {}),
    });
  }

  accept({ appId, sha, replayKey, source = "signed-webhook" }) {
    const existingId = this.replays.get(replayKey);
    if (existingId) return { duplicate: true, job: cloneJob(this.jobs.get(existingId)) };
    const jobId = this.idFactory();
    this.append({ type: "accepted", jobId, appId, sha, replayKey, source });
    return { duplicate: false, job: this.get(jobId) };
  }

  transition(jobId, { status = "running", phase, error } = {}) {
    const current = this.jobs.get(jobId);
    if (!current) throw new Error(`unknown release job: ${jobId}`);
    if (!VALID_STATUSES.has(status)) throw new Error(`invalid release status: ${status}`);
    const nextPhase = cleanPhase(phase, current.phase);
    if (current.status === status && current.phase === nextPhase && current.error === error) return cloneJob(current);
    this.append({
      type: "transition",
      jobId,
      status,
      phase: nextPhase,
      ...(error ? { error: String(error).slice(0, 80) } : {}),
    });
    return this.get(jobId);
  }

  recoverInterrupted() {
    const recovered = [];
    for (const job of this.jobs.values()) {
      if (TERMINAL_STATUSES.has(job.status)) continue;
      recovered.push(this.transition(job.id, {
        status: "interrupted",
        phase: "interrupted",
        error: "manager-restarted",
      }));
    }
    return recovered;
  }

  get(jobId) {
    return cloneJob(this.jobs.get(jobId));
  }

  list(limit = 12) {
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 12));
    return [...this.jobs.values()]
      .sort((left, right) => right.sequence - left.sequence)
      .slice(0, safeLimit)
      .map(cloneJob);
  }

  get latestSequence() {
    return this.sequence;
  }
}

export function publicReleaseJob(job, options = {}) {
  if (!job) return null;
  return {
    id: job.id,
    appId: job.appId,
    release: job.sha.slice(0, 7).toLowerCase(),
    ...(options.includeSha ? { sha: job.sha.toLowerCase() } : {}),
    source: job.source,
    status: job.status,
    phase: job.phase,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    sequence: job.sequence,
    events: job.events.slice(-24).map(({ sequence, at, status, phase, error }) => ({
      sequence,
      at,
      status,
      phase,
      ...(error ? { error } : {}),
    })),
  };
}

export class ReleaseCoordinator {
  constructor({ journal, runner }) {
    if (!journal || typeof runner !== "function") throw new Error("release coordinator needs a journal and runner");
    this.journal = journal;
    this.runner = runner;
    this.queue = [];
    this.active = null;
    this.idleWaiters = [];
    this.journal.recoverInterrupted();
  }

  submit(details) {
    const accepted = this.journal.accept(details);
    if (!accepted.duplicate) {
      this.queue.push({
        jobId: accepted.job.id,
        appId: details.appId,
        sha: details.sha,
        context: details.context,
      });
      queueMicrotask(() => void this.drain());
    }
    return accepted;
  }

  async drain() {
    if (this.active || this.queue.length === 0) return;
    const item = this.queue.shift();
    this.active = item;
    this.journal.transition(item.jobId, { status: "running", phase: "starting" });
    try {
      await this.runner(item, (phase) => {
        this.journal.transition(item.jobId, { status: "running", phase });
      });
      this.journal.transition(item.jobId, { status: "succeeded", phase: "complete" });
    } catch {
      const current = this.journal.get(item.jobId);
      const rolledBack = current?.events.some((event) => event.phase === "rollback");
      this.journal.transition(item.jobId, {
        status: rolledBack ? "rolled-back" : "failed",
        phase: rolledBack ? "rollback" : "failed",
        error: rolledBack ? "production-restored" : "deploy-failed",
      });
    } finally {
      this.active = null;
      if (this.queue.length > 0) queueMicrotask(() => void this.drain());
      else this.resolveIdle();
    }
  }

  publicJobs(limit = 12) {
    const queuedPositions = new Map(this.queue.map((item, index) => [item.jobId, index + 1]));
    return this.journal.list(limit).map((job) => ({
      ...publicReleaseJob(job),
      queuePosition: job.id === this.active?.jobId ? 0 : queuedPositions.get(job.id) ?? null,
    }));
  }

  job(jobId, options) {
    const job = this.journal.get(jobId);
    return job ? publicReleaseJob(job, options) : null;
  }

  liveAppIds() {
    return [...new Set([
      ...(this.active ? [this.active.appId] : []),
      ...this.queue.map((item) => item.appId),
    ])];
  }

  stateForApp(appId) {
    if (this.active?.appId === appId) return "running";
    if (this.queue.some((item) => item.appId === appId)) return "queued";
    return null;
  }

  waitForIdle() {
    if (!this.active && this.queue.length === 0) return Promise.resolve();
    return new Promise((resolve) => this.idleWaiters.push(resolve));
  }

  resolveIdle() {
    for (const resolve of this.idleWaiters.splice(0)) resolve();
  }
}
