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

test("a failed production start restores and health-checks the old image", () => {
  const shell = findShell();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-manager-test-"));

  try {
    const repo = path.join(tmp, "repo");
    const envFile = path.join(tmp, "app.env");
    const harness = path.join(tmp, "harness.sh");
    const logFile = path.join(tmp, "deploy.log");
    const dockerLog = path.join(tmp, "docker.log");
    const failMarker = path.join(tmp, "new-run-failed");
    const sha = "0123456789abcdef0123456789abcdef01234567";
    const newImage = `test-image:${sha}`;

    fs.mkdirSync(repo);

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
shift
case "$command" in
  build|stop|start) return 0 ;;
  ps)
    case " $* " in
      *"name=^/test-app-candidate$"*) return 0 ;;
      *"name=^/test-app$"*) printf '%s\\n' old-container; return 0 ;;
    esac
    ;;
  inspect) printf '%s\\n' test-image:known-good; return 0 ;;
  rm) return 0 ;;
  run)
    container_name=""
    image=""
    while [ "$#" -gt 0 ]; do
      if [ "$1" = "--name" ]; then
        shift
        container_name="$1"
      fi
      image="$1"
      shift
    done
    if [ "$container_name" = "test-app" ] && [ "$image" = "$NEW_IMAGE" ] && [ ! -e "$FAIL_MARKER" ]; then
      : > "$FAIL_MARKER"
      return 125
    fi
    printf '%s\\n' container-id
    return 0
    ;;
  logs) return 0 ;;
  image) return 0 ;;
esac
return 0
}
. "$DEPLOY_SCRIPT" "$SHA"
`,
    );

    fs.writeFileSync(
      envFile,
      [
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
        "",
      ].join("\n"),
    );

    const result = spawnSync(shell, [posix(harness)], {
      encoding: "utf8",
      env: {
        ...process.env,
        ENV_FILE: posix(envFile),
        DEPLOY_SCRIPT: posix(DEPLOY_SCRIPT),
        DOCKER_LOG: posix(dockerLog),
        FAIL_MARKER: posix(failMarker),
        NEW_IMAGE: newImage,
        SHA: sha,
      },
    });

    const deploymentLog = fs.existsSync(logFile)
      ? fs.readFileSync(logFile, "utf8")
      : "<deployment log missing>";
    const calls = fs.existsSync(dockerLog)
      ? fs.readFileSync(dockerLog, "utf8")
      : "<docker log missing>";
    assert.notEqual(
      result.status,
      0,
      `the deployment must report failure after rollback\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}\ndocker:\n${calls}\nlog:\n${deploymentLog}`,
    );
    assert.notEqual(
      deploymentLog,
      "<deployment log missing>",
      `the deploy script failed before logging\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}\ndocker:\n${calls}`,
    );
    assert.match(deploymentLog, /reason=docker_run_failed_rolled_back/);
    assert.match(deploymentLog, new RegExp(`sha=${sha}`));

    assert.match(calls, new RegExp(`build -t ${newImage}`));
    const failedRun = calls.indexOf(`run -d --name test-app --restart unless-stopped -p 127.0.0.1:3100:8080 ${newImage}`);
    const restoredRun = calls.indexOf("run -d --name test-app --restart unless-stopped -p 127.0.0.1:3100:8080 test-image:known-good");
    assert.ok(failedRun >= 0, `new production run was not attempted:\n${calls}`);
    assert.ok(restoredRun > failedRun, `old image was not restored after the failed run:\n${calls}`);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
