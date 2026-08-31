import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DEPLOY_SCRIPT = path.join(ROOT, "bin", "deploy-app.sh");

function findShell() {
  const candidates = [
    process.env.DEPLOY_MANAGER_TEST_SHELL,
    "sh",
    process.platform === "win32"
      ? path.join(process.env.ProgramFiles ?? "C:\\Program Files", "Git", "bin", "sh.exe")
      : null,
    process.platform === "win32"
      ? path.join(process.env.ProgramFiles ?? "C:\\Program Files", "Git", "usr", "bin", "sh.exe")
      : null,
  ].filter(Boolean);

  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ["-c", "exit 0"]);
    if (probe.status === 0) return candidate;
  }

  throw new Error("deploy-app tests require a POSIX shell (sh or Git Bash)");
}

function posix(value) {
  return value.replaceAll("\\", "/");
}

function quote(value) {
  return `'${String(value).replaceAll("'", `'"'"'`)}'`;
}

/**
 * Runs a full deploy against a stubbed docker and returns everything the
 * stub was asked to do.
 */
function deployWith({ dockerNetwork, containerEnvFile }) {
  const shell = findShell();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-manager-network-"));

  try {
    const repo = path.join(tmp, "repo");
    const envFile = path.join(tmp, "app.env");
    const harness = path.join(tmp, "harness.sh");
    const logFile = path.join(tmp, "deploy.log");
    const dockerLog = path.join(tmp, "docker.log");
    const sha = "0123456789abcdef0123456789abcdef01234567";

    fs.mkdirSync(repo);

    // Every docker verb succeeds; we only care what `run` was invoked with.
    fs.writeFileSync(
      harness,
      `#!/bin/sh
flock() { return 0; }
curl() { return 0; }
git() {
  case " $* " in
    *" rev-parse HEAD "*) printf '%s\\n' "$SHA" ;;
    *) return 0 ;;
  esac
}
docker() {
printf '%s\\n' "$*" >> "$DOCKER_LOG"
command="$1"
case "$command" in
  ps) return 0 ;;
  inspect) printf '%s\\n' test-image:known-good; return 0 ;;
  run) printf '%s\\n' container-id; return 0 ;;
esac
return 0
}
. "$DEPLOY_SCRIPT"
`,
    );

    const lines = [
      "APP_ID=test",
      `REPO_DIR=${quote(posix(repo))}`,
      "REPO_USER=",
      "BRANCH=main",
      "IMAGE_NAME=test-image",
      "CONTAINER_NAME=test-app",
      "CANDIDATE_CONTAINER_NAME=test-app-candidate",
      "APP_PORT=3100",
      "CANDIDATE_APP_PORT=3101",
      "CONTAINER_PORT=8080",
      "HEALTH_PATH=/healthz",
      "HEALTH_ATTEMPTS=1",
      "HEALTH_SLEEP_SECONDS=0",
      `LOG_FILE=${quote(posix(logFile))}`,
      `LOCK_FILE=${quote(posix(path.join(tmp, "deploy.lock")))}`,
    ];
    if (dockerNetwork) lines.push(`DOCKER_NETWORK=${dockerNetwork}`);
    if (containerEnvFile) {
      const runtimeEnv = path.join(tmp, "runtime.env");
      fs.writeFileSync(runtimeEnv, "EXAMPLE=1\n");
      lines.push(`CONTAINER_ENV_FILE=${quote(posix(runtimeEnv))}`);
    }
    lines.push("");
    fs.writeFileSync(envFile, lines.join("\n"));

    const result = spawnSync(shell, [posix(harness)], {
      encoding: "utf8",
      env: {
        ...process.env,
        DEPLOY_SHA: sha,
        ENV_FILE: posix(envFile),
        DEPLOY_SCRIPT: posix(DEPLOY_SCRIPT),
        DOCKER_LOG: posix(dockerLog),
        SHA: sha,
      },
    });

    return {
      status: result.status,
      stderr: result.stderr,
      calls: fs.existsSync(dockerLog) ? fs.readFileSync(dockerLog, "utf8") : "",
    };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

test("DOCKER_NETWORK unset leaves the run command byte-identical", () => {
  const { status, calls, stderr } = deployWith({});
  assert.equal(status, 0, `deploy failed\nstderr:\n${stderr}\ndocker:\n${calls}`);

  // The exact command line apps relied on before the option existed. If this
  // ever gains a stray argument, every existing app has silently changed.
  assert.ok(
    calls.includes("run -d --name test-app --restart unless-stopped -p 127.0.0.1:3100:8080 test-image:" + "0123456789abcdef0123456789abcdef01234567"),
    `production run should be unchanged when DOCKER_NETWORK is unset:\n${calls}`,
  );
  assert.ok(!calls.includes("--network"), `no --network flag expected:\n${calls}`);
});

test("DOCKER_NETWORK attaches both the candidate and production containers", () => {
  const { status, calls, stderr } = deployWith({ dockerNetwork: "sidecar-net" });
  assert.equal(status, 0, `deploy failed\nstderr:\n${stderr}\ndocker:\n${calls}`);

  // The candidate must join the network too, or its health check fails for a
  // reason that has nothing to do with the code being deployed.
  assert.ok(
    calls.includes("run -d --network sidecar-net --name test-app-candidate"),
    `candidate should join the network:\n${calls}`,
  );
  assert.ok(
    calls.includes("run -d --network sidecar-net --name test-app --restart unless-stopped"),
    `production should join the network:\n${calls}`,
  );
});

test("DOCKER_NETWORK composes with CONTAINER_ENV_FILE", () => {
  const { status, calls, stderr } = deployWith({
    dockerNetwork: "sidecar-net",
    containerEnvFile: true,
  });
  assert.equal(status, 0, `deploy failed\nstderr:\n${stderr}\ndocker:\n${calls}`);
  assert.ok(
    calls.includes("run -d --network sidecar-net --name test-app --restart unless-stopped --env-file"),
    `network and env-file should both be applied:\n${calls}`,
  );
});
