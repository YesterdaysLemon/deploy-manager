#!/usr/bin/env node
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = process.env.DEPLOY_MANAGER_DEV_PORT ?? "4173";
const host = "127.0.0.1";
const previewSecret = randomBytes(32).toString("hex");

process.stdout.write(`Deploy Manager preview: http://${host}:${port}\n`);
process.stdout.write(`Release city:             http://${host}:${port}/\n`);
process.stdout.write(`Compatibility alias:      http://${host}:${port}/city\n`);
process.stdout.write("Active probes target the loopback ports in config/public-topology.json; apps that are not running locally will correctly appear unreachable.\n");

const child = spawn(process.execPath, [path.join(root, "src", "server.mjs")], {
  cwd: root,
  env: {
    ...process.env,
    DEPLOY_MANAGER_APPS_FILE: path.join(root, "examples", "apps.json"),
    DEPLOY_MANAGER_HOST: host,
    DEPLOY_MANAGER_PORT: port,
    DEPLOY_MANAGER_RELEASE_SHA: "d3adb33",
    DEPLOY_MANAGER_JOURNAL_FILE: path.join(root, ".deploy-manager", "dev-release-journal.jsonl"),
    DEPLOY_MANAGER_PROBE_INTERVAL_MS: "5000",
    DEPLOY_MANAGER_PROBE_TIMEOUT_MS: "800",
    PORTFOLIO_DEPLOY_WEBHOOK_SECRET: previewSecret,
    APP_ONE_DEPLOY_WEBHOOK_SECRET: previewSecret,
    APP_TWO_DEPLOY_WEBHOOK_SECRET: previewSecret,
  },
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (!child.killed) child.kill(signal);
  });
}

child.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
