import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DEPLOY_SCRIPT = path.join(ROOT, "bin", "deploy-app.sh");
const DEPLOY_APP_RUN = path.join(ROOT, "bin", "deploy-app-run");
const SHA = "0123456789abcdef0123456789abcdef01234567";
const NEW_IMAGE = `test-image:${SHA}`;
const OLD_IMAGE = "test-image:known-good";
const PRODUCTION_RUN = "run -d --name test-app --restart unless-stopped -p 127.0.0.1:3100:8080";

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

// The stub docker keeps an existing production container, records every call,
// and can fail the new production run, report whether production is running,
// or deliver SIGTERM to the rollout from inside a chosen verb, the way a
// systemd stop reaches the whole service cgroup.
const HARNESS = `#!/bin/sh
flock() { [ "\${LOCK_HELD:-0}" != "1" ]; }
curl() { [ "\${HEALTH_OK:-1}" = "1" ]; }
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
if [ -f "$CUTOVER_FILE_UNDER_TEST" ]; then
  printf 'cutover-record %s\\n' "$(sed -n 's/^old_image=//p' "$CUTOVER_FILE_UNDER_TEST")" >> "$DOCKER_LOG"
fi
if [ "$command" = "\${SIGNAL_ON:-none}" ]; then
  kill -TERM $$
fi
case "$command" in
  build|stop|start) return 0 ;;
  ps)
    case " $* " in
      *"name=^/test-app-candidate$"*) return 0 ;;
      *"name=^/test-app$"*) printf '%s\\n' old-container; return 0 ;;
    esac
    ;;
  inspect)
    case " $* " in
      *"State.Running"*) printf '%s\\n' "\${PRODUCTION_RUNNING:-false}"; return 0 ;;
    esac
    printf '%s\\n' test-image:known-good
    return 0
    ;;
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
    if [ "$container_name" = "test-app" ] && [ "$image" = "$NEW_IMAGE" ] && [ "\${FAIL_NEW_RUN:-0}" = "1" ]; then
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
set -- $HARNESS_ARGS
. "$DEPLOY_SCRIPT"
`;

function runRollout({ args = "", cutoverRecord, env = {} } = {}) {
  const shell = findShell();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-manager-test-"));

  try {
    const repo = path.join(tmp, "repo");
    const envFile = path.join(tmp, "app.env");
    const harness = path.join(tmp, "harness.sh");
    const logFile = path.join(tmp, "deploy.log");
    const dockerLog = path.join(tmp, "docker.log");
    const rolloutDir = path.join(tmp, "rollout");
    const cutoverFile = path.join(rolloutDir, "test.cutover");

    fs.mkdirSync(repo);
    fs.writeFileSync(harness, HARNESS);
    if (cutoverRecord !== undefined) {
      fs.mkdirSync(rolloutDir, { mode: 0o700 });
      fs.writeFileSync(cutoverFile, cutoverRecord, { mode: 0o600 });
    }

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
        `ROLLOUT_STATE_DIR=${quote(posix(env.ROLLOUT_STATE_DIR ?? rolloutDir))}`,
        "",
      ].join("\n"),
    );

    const result = spawnSync(shell, [posix(harness)], {
      encoding: "utf8",
      env: {
        ...process.env,
        DEPLOY_SHA: SHA,
        ENV_FILE: posix(envFile),
        DEPLOY_SCRIPT: posix(DEPLOY_SCRIPT),
        DOCKER_LOG: posix(dockerLog),
        CUTOVER_FILE_UNDER_TEST: posix(cutoverFile),
        HARNESS_ARGS: args,
        NEW_IMAGE,
        SHA,
        ...env,
      },
    });

    const log = fs.existsSync(logFile) ? fs.readFileSync(logFile, "utf8") : "<deployment log missing>";
    const calls = fs.existsSync(dockerLog) ? fs.readFileSync(dockerLog, "utf8") : "";
    return {
      status: result.status,
      stdout: result.stdout,
      log,
      calls,
      cutoverLeft: fs.existsSync(cutoverFile),
      detail: `status: ${result.status}\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}\ndocker:\n${calls}\nlog:\n${log}`,
    };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

function lineIndex(calls, text) {
  return calls.split("\n").findIndex((line) => line === text);
}

test("a failed production start restores and health-checks the old image", () => {
  const result = runRollout({ env: { FAIL_NEW_RUN: "1" } });

  assert.notEqual(result.status, 0, `the deployment must report failure after rollback\n${result.detail}`);
  assert.notEqual(result.log, "<deployment log missing>", `the deploy script failed before logging\n${result.detail}`);
  assert.match(result.log, /reason=docker_run_failed_rolled_back/);
  assert.match(result.log, new RegExp(`sha=${SHA}`));

  assert.match(result.calls, new RegExp(`build -t ${NEW_IMAGE}`));
  const failedRun = result.calls.indexOf(`${PRODUCTION_RUN} ${NEW_IMAGE}`);
  const restoredRun = result.calls.indexOf(`${PRODUCTION_RUN} ${OLD_IMAGE}`);
  assert.ok(failedRun >= 0, `new production run was not attempted:\n${result.calls}`);
  assert.ok(restoredRun > failedRun, `old image was not restored after the failed run:\n${result.calls}`);
  assert.equal(result.cutoverLeft, false, "a completed rollback must clear the cutover record");
});

test("the previous image is recorded before production stops and cleared after verification", () => {
  const result = runRollout();

  assert.equal(result.status, 0, result.detail);
  assert.match(result.log, /deploy_success/);
  const stop = lineIndex(result.calls, "stop test-app");
  assert.ok(stop > 0, `production was not stopped:\n${result.calls}`);
  assert.equal(result.calls.split("\n")[stop + 1], `cutover-record ${OLD_IMAGE}`, result.calls);
  assert.ok(!result.calls.slice(0, result.calls.indexOf("stop test-app")).includes("cutover-record"), result.calls);
  assert.equal(result.cutoverLeft, false, "a verified release must clear the cutover record");
});

test("a stop signal during the cutover restores the previous image before exiting", () => {
  const result = runRollout({ env: { SIGNAL_ON: "stop" } });

  assert.notEqual(result.status, 0, result.detail);
  assert.match(result.log, /release_phase=rollback/);
  assert.match(result.log, /reason=stopped_during_cutover_rolled_back/);
  assert.ok(lineIndex(result.calls, `${PRODUCTION_RUN} ${OLD_IMAGE}`) > lineIndex(result.calls, "stop test-app"), result.detail);
  assert.equal(lineIndex(result.calls, `${PRODUCTION_RUN} ${NEW_IMAGE}`), -1, result.detail);
  assert.equal(result.cutoverLeft, false, result.detail);
});

test("a stop signal before the cutover leaves production alone", () => {
  const result = runRollout({ env: { SIGNAL_ON: "build" } });

  assert.notEqual(result.status, 0, result.detail);
  assert.match(result.log, /reason=stopped_by_signal/);
  assert.doesNotMatch(result.log, /release_phase=rollback/);
  assert.doesNotMatch(result.calls, /^(stop|rm -f test-app|run .*--name test-app )/m, result.detail);
  assert.equal(result.cutoverLeft, false);
});

test("an untrusted rollout state path stops the release before production is touched", () => {
  const result = runRollout({ env: { ROLLOUT_STATE_DIR: posix(path.join(ROOT, "package.json")) } });

  assert.notEqual(result.status, 0, result.detail);
  assert.match(result.log, /reason=rollout_state_dir_untrusted/);
  assert.equal(lineIndex(result.calls, "stop test-app"), -1, result.detail);
});

test("recovery without a cutover record changes nothing", () => {
  const result = runRollout({ args: "--recover" });

  assert.equal(result.status, 0, result.detail);
  assert.match(result.stdout, /release_recovery=not-needed/);
  assert.equal(result.calls, "", result.detail);
});

test("recovery restores the recorded previous image when production is down", () => {
  const result = runRollout({
    args: "--recover",
    cutoverRecord: `old_image=${OLD_IMAGE}\nnew_image=${NEW_IMAGE}\nsha=${SHA}\n`,
  });

  assert.equal(result.status, 0, result.detail);
  assert.match(result.stdout, /release_recovery=restored/);
  assert.ok(lineIndex(result.calls, "rm -f test-app") >= 0, result.detail);
  assert.ok(lineIndex(result.calls, `${PRODUCTION_RUN} ${OLD_IMAGE}`) > lineIndex(result.calls, "rm -f test-app"), result.detail);
  assert.equal(result.cutoverLeft, false);
});

test("recovery keeps a running, healthy production container", () => {
  const result = runRollout({
    args: "--recover",
    cutoverRecord: `old_image=${OLD_IMAGE}\nnew_image=${NEW_IMAGE}\nsha=${SHA}\n`,
    env: { PRODUCTION_RUNNING: "true" },
  });

  assert.equal(result.status, 0, result.detail);
  assert.match(result.stdout, /release_recovery=healthy/);
  assert.doesNotMatch(result.calls, /^(rm|run) /m, result.detail);
  assert.equal(result.cutoverLeft, false);
});

test("recovery reports a failed restore", () => {
  const result = runRollout({
    args: "--recover",
    cutoverRecord: `old_image=${OLD_IMAGE}\n`,
    env: { HEALTH_OK: "0" },
  });

  assert.equal(result.status, 1, result.detail);
  assert.match(result.stdout, /release_recovery=failed/);
});

test("recovery refuses a malformed cutover record without starting anything", () => {
  const result = runRollout({ args: "--recover", cutoverRecord: "old_image=--privileged\n" });

  assert.notEqual(result.status, 0, result.detail);
  assert.match(result.log, /reason=cutover_record_invalid/);
  assert.doesNotMatch(result.stdout, /release_recovery=/);
  assert.doesNotMatch(result.calls, /^(rm|run) /m, result.detail);
});

test("recovery defers to a rollout that still holds the app lock", () => {
  const result = runRollout({
    args: "--recover",
    cutoverRecord: `old_image=${OLD_IMAGE}\n`,
    env: { LOCK_HELD: "1" },
  });

  assert.equal(result.status, 0, result.detail);
  assert.match(result.stdout, /release_recovery=busy/);
  assert.equal(result.calls, "", result.detail);
  assert.equal(result.cutoverLeft, true);
});

test("a release first repairs a cutover an earlier run left unfinished", () => {
  const result = runRollout({ cutoverRecord: `old_image=${OLD_IMAGE}\nsha=${"f".repeat(40)}\n` });

  assert.equal(result.status, 0, result.detail);
  assert.match(result.log, /interrupted_cutover_resolved production=previous_image_restored/);
  const repair = lineIndex(result.calls, `${PRODUCTION_RUN} ${OLD_IMAGE}`);
  const build = result.calls.split("\n").findIndex((line) => line.startsWith("build "));
  assert.ok(repair >= 0 && build > repair, `repair must precede the new build:\n${result.calls}`);
  assert.match(result.log, /deploy_success/);
  assert.equal(result.cutoverLeft, false);
});

test("a service stop that signals every rollout process still restores production", {
  skip: process.platform === "win32" ? "needs POSIX process groups" : false,
}, async () => {
  const shell = findShell();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-manager-stop-"));
  try {
    const bin = path.join(tmp, "bin");
    const repo = path.join(tmp, "repo");
    const envFile = path.join(tmp, "app.env");
    const logFile = path.join(tmp, "deploy.log");
    const dockerLog = path.join(tmp, "docker.log");
    const harness = path.join(tmp, "harness.sh");
    fs.mkdirSync(bin);
    fs.mkdirSync(repo);
    // An external docker whose `stop` is still running when the signal lands,
    // as it would be when systemd stops the manager's cgroup mid-cutover.
    fs.writeFileSync(path.join(bin, "docker"), `#!/bin/sh
printf '%s\\n' "$*" >> "$DOCKER_LOG"
case "$1" in
  stop) sleep 30 ;;
  ps) case "$*" in *"name=^/test-app\\$"*) echo old-container ;; esac ;;
  inspect) echo ${OLD_IMAGE} ;;
  run) echo container-id ;;
esac
exit 0
`, { mode: 0o755 });
    fs.writeFileSync(harness, `#!/bin/sh
flock() { return 0; }
curl() { return 0; }
git() {
  case " $* " in
    *" rev-parse HEAD "*) printf '%s\\n' "$SHA" ;;
  esac
  return 0
}
. "$DEPLOY_SCRIPT"
`);
    fs.writeFileSync(envFile, [
      "APP_ID=test", `REPO_DIR=${quote(repo)}`, "REPO_USER=", "BRANCH=main", "IMAGE_NAME=test-image",
      "CONTAINER_NAME=test-app", "APP_PORT=3100", "CANDIDATE_APP_PORT=3101", "CONTAINER_PORT=8080",
      "HEALTH_ATTEMPTS=1", "HEALTH_SLEEP_SECONDS=0", `LOG_FILE=${quote(logFile)}`,
      `LOCK_FILE=${quote(path.join(tmp, "deploy.lock"))}`, `ROLLOUT_STATE_DIR=${quote(path.join(tmp, "rollout"))}`, "",
    ].join("\n"));

    const child = spawn(shell, [harness], {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        PATH: `${bin}:${process.env.PATH}`,
        DEPLOY_SHA: SHA,
        ENV_FILE: envFile,
        DEPLOY_SCRIPT,
        DOCKER_LOG: dockerLog,
        SHA,
      },
    });
    const exited = new Promise((resolve) => child.once("exit", (code, signal) => resolve({ code, signal })));
    for (let attempt = 0; attempt < 200; attempt += 1) {
      if (fs.existsSync(dockerLog) && fs.readFileSync(dockerLog, "utf8").includes("stop test-app")) break;
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    // The manager that read stdout is gone, and every process in the group is
    // signalled at once.
    child.stdout.destroy();
    child.stderr.destroy();
    process.kill(-child.pid, "SIGTERM");
    const outcome = await Promise.race([
      exited,
      new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 20_000)),
    ]);

    const calls = fs.readFileSync(dockerLog, "utf8");
    const log = fs.readFileSync(logFile, "utf8");
    assert.deepEqual(outcome, { code: 1, signal: null }, `calls:\n${calls}\nlog:\n${log}`);
    assert.match(log, /reason=stopped_during_cutover_rolled_back/);
    assert.ok(calls.indexOf(`${PRODUCTION_RUN} ${OLD_IMAGE}`) > calls.indexOf("stop test-app"), calls);
    assert.ok(!calls.includes(`${PRODUCTION_RUN} ${NEW_IMAGE}`), calls);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

function runWrapper(args) {
  const shell = findShell();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-app-run-test-"));
  try {
    const envRoot = path.join(tmp, "apps");
    const script = path.join(tmp, "deploy-app.sh");
    fs.mkdirSync(envRoot);
    fs.writeFileSync(path.join(envRoot, "app-one.env"), "APP_ID=app-one\n");
    fs.writeFileSync(script, "#!/bin/sh\nprintf 'args=%s env=%s\\n' \"$*\" \"${ENV_FILE##*/}\"\n", { mode: 0o755 });
    return spawnSync(shell, [posix(DEPLOY_APP_RUN), ...args], {
      encoding: "utf8",
      env: {
        ...process.env,
        DEPLOY_MANAGER_APP_ENV_ROOT: posix(envRoot),
        DEPLOY_MANAGER_DEPLOY_SCRIPT: posix(script),
      },
    });
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

test("the root wrapper passes recovery through with only an app id", () => {
  const recover = runWrapper(["--recover", "app-one"]);
  assert.equal(recover.status, 0, recover.stderr);
  assert.equal(recover.stdout, "args=--recover env=app-one.env\n");

  const deploy = runWrapper(["app-one", SHA]);
  assert.equal(deploy.status, 0, deploy.stderr);
  assert.equal(deploy.stdout, `args=${SHA} env=app-one.env\n`);

  assert.equal(runWrapper(["--recover", "app-one", SHA]).status, 64);
  assert.equal(runWrapper(["--recover", "--recover"]).status, 64);
  assert.equal(runWrapper(["-app-one", SHA]).status, 64);
  assert.equal(runWrapper(["--recover"]).status, 64);
});
