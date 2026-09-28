import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

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
    if (spawnSync(candidate, ["-c", "exit 0"]).status === 0) return candidate;
  }

  throw new Error("self-update tests require a POSIX shell (sh or Git Bash)");
}

test("all promoted shell entrypoints parse as POSIX shell", () => {
  const shell = findShell();
  for (const relativePath of [
    "bin/deploy-app-run",
    "install/install-on-vps.sh",
    "install/bootstrap-self-update.sh",
    "install/update-deploy-manager",
    "tests/updater-integration.sh",
  ]) {
    const result = spawnSync(shell, ["-n", path.join(ROOT, relativePath)], {
      encoding: "utf8",
    });
    assert.equal(
      result.status,
      0,
      `${relativePath} is not valid POSIX shell:\n${result.stderr}`,
    );
  }
});

test("automatic releases cannot replace the privileged deployment plane", () => {
  const wrapper = read("bin/deploy-app-run");
  const updater = read("install/update-deploy-manager");
  const bootstrap = read("install/bootstrap-self-update.sh");

  assert.match(
    wrapper,
    /DEPLOY_MANAGER_DEPLOY_SCRIPT:-\/usr\/local\/libexec\/deploy-manager\/deploy-app\.sh/,
  );
  assert.doesNotMatch(wrapper, /\/opt\/deploy-manager-current\/bin\/deploy-app\.sh/);

  for (const protectedPath of [
    "/usr/local/sbin/deploy-app-run",
    "/usr/local/bin/deploy-manager-sudo",
    "/usr/local/libexec/deploy-manager/deploy-app.sh",
    "/etc/sudoers.d/deploy-manager",
    "/etc/systemd/system/deploy-manager.service",
  ]) {
    assert.doesNotMatch(
      updater,
      new RegExp(protectedPath.replaceAll("/", "\\/")),
      `the automatic updater must not install ${protectedPath}`,
    );
    assert.match(
      bootstrap,
      new RegExp(protectedPath.replaceAll("/", "\\/")),
      `the manual bootstrap should own ${protectedPath}`,
    );
  }
});

test("updater proves current default-main CI before staging a release", () => {
  const updater = read("install/update-deploy-manager");
  const defaultBranchCheck = updater.indexOf(
    'default_branch" != "$BRANCH"',
  );
  const requestedShaCheck = updater.indexOf(
    'requested_sha_is_not_current_main',
  );
  const successfulRunCheck = updater.indexOf(
    'run.status === "completed" && run.conclusion === "success"',
  );
  const archiveDownload = updater.indexOf(
    'tarball/$target_sha',
  );

  assert.ok(defaultBranchCheck >= 0);
  assert.ok(requestedShaCheck > defaultBranchCheck);
  assert.ok(successfulRunCheck > requestedShaCheck);
  assert.ok(archiveDownload > successfulRunCheck);
  assert.doesNotMatch(updater, /--header "Authorization: Bearer \$token"/);
  assert.match(updater, /--config - "\$url"/);
});

test("pulled code is checked unprivileged and activation has health rollback", () => {
  const updater = read("install/update-deploy-manager");

  assert.match(updater, /runuser -u "\$BUILD_USER" -- tar/);
  assert.match(
    updater,
    /runuser -u "\$BUILD_USER" --[\s\\]+\n\s*env HOME="\$BUILD_HOME" sh -c/,
  );
  assert.match(updater, /Re-extract the exact archive/);
  assert.ok(
    updater.indexOf("release_checks_failed") <
      updater.indexOf("main_moved_during_update"),
  );
  assert.ok(
    updater.indexOf("main_moved_during_update") <
      updater.indexOf('mv -Tf "$link_temp" "$ACTIVE_LINK"'),
  );
  assert.ok(
    updater.indexOf("manager_env_not_readable") <
      updater.indexOf('mv -Tf "$link_temp" "$ACTIVE_LINK"'),
  );
  assert.match(updater, /mv -Tf "\$link_temp" "\$ACTIVE_LINK"/);
  assert.match(updater, /if systemctl restart "\$SERVICE" && health_check/);
  assert.match(updater, /activation_failed_rolled_back/);
  assert.ok(
    updater.indexOf('mv -Tf "$rollback_link" "$ACTIVE_LINK"') <
      updater.indexOf('activation_failed_rolled_back'),
  );
});

test("updater restarts the manager only after the release lane reads idle", () => {
  const updater = read("install/update-deploy-manager");
  const position = (text) => {
    const index = updater.indexOf(text);
    assert.ok(index >= 0, `missing from updater: ${text}`);
    return index;
  };

  const alreadyCurrent = position("skip reason=already_current");
  const firstCheck = position("require_idle_release_lane before_download");
  const download = position('github_get "$API_ROOT/repos/$REPOSITORY/tarball/$target_sha"');
  const reload = position('systemctl daemon-reload || fail "daemon_reload_failed');
  const finalCheck = position("require_idle_release_lane before_activation");
  const swap = position('mv -Tf "$link_temp" "$ACTIVE_LINK"');
  const restart = position('if systemctl restart "$SERVICE" && health_check');

  assert.ok(alreadyCurrent < firstCheck && firstCheck < download);
  assert.ok(download < reload && reload < finalCheck && finalCheck < swap && swap < restart);
  // Only the atomic swap may stand between the final check and the restart.
  assert.doesNotMatch(updater.slice(finalCheck, restart), /github_get|runuser|health_check\(\)|sleep/);

  assert.match(updater, /busy\)\n\s+log "skip reason=release_lane_busy checkpoint=\$checkpoint/);
  assert.match(updater, /\*\) fail "release_lane_unknown/);
  assert.doesNotMatch(updater, /release-journal/, "the root updater must not parse the manager's writable journal");
});

function shellPath(value) {
  if (process.platform !== "win32") return value;
  return value.replace(/^([A-Za-z]):[\\/]/, (_, drive) => `/${drive.toLowerCase()}/`).replaceAll("\\", "/");
}

function laneStatus({ body, down = false, serviceActive = true }) {
  const shell = findShell();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "deploy-manager-lane-"));
  try {
    const bin = path.join(tmp, "bin");
    const curlLog = path.join(tmp, "curl.log");
    const managerEnv = path.join(tmp, "deploy-manager.env");
    const bodyFile = path.join(tmp, "releases.json");
    fs.mkdirSync(bin);
    fs.writeFileSync(managerEnv, "DEPLOY_MANAGER_HOST=127.0.0.1\nDEPLOY_MANAGER_PORT=9019\n");
    fs.writeFileSync(bodyFile, body ?? "");
    fs.writeFileSync(path.join(bin, "curl"), `#!/bin/sh
for argument in "$@"; do case "$argument" in http://*|https://*) printf '%s\\n' "$argument" >> '${shellPath(curlLog)}' ;; esac; done
[ "${down ? 1 : 0}" = "0" ] || exit 7
cat '${shellPath(bodyFile)}'
`, { mode: 0o755 });
    fs.writeFileSync(path.join(bin, "systemctl"), `#!/bin/sh
[ "$1" = "is-active" ] || exit 2
[ "${serviceActive ? 1 : 0}" = "1" ]
`, { mode: 0o755 });

    const searchPath = [
      shellPath(bin),
      shellPath(path.dirname(process.execPath)),
      "/usr/local/sbin", "/usr/local/bin", "/usr/sbin", "/usr/bin", "/sbin", "/bin",
    ].join(":");
    const result = spawnSync(shell, [shellPath(path.join(ROOT, "install", "update-deploy-manager")), "--lane-status"], {
      encoding: "utf8",
      env: {
        ...process.env,
        DEPLOY_MANAGER_UPDATE_CONFIG: "/dev/null",
        DEPLOY_MANAGER_UPDATE_TEST_MODE: "1",
        DEPLOY_MANAGER_UPDATE_PATH: searchPath,
        DEPLOY_MANAGER_ENV_FILE: shellPath(managerEnv),
      },
    });
    return {
      status: result.status,
      output: `${result.stdout}${result.stderr}`,
      urls: fs.existsSync(curlLog) ? fs.readFileSync(curlLog, "utf8") : "",
    };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}

test("lane status reads the manager API and fails closed", () => {
  const cases = [
    [{ body: '{"lane":{"busy":false,"running":0,"queued":0,"recovering":0},"releases":[]}' }, 0, "idle"],
    [{ body: '{"lane":{"busy":true,"running":0,"queued":0,"recovering":1},"releases":[]}' }, 75, "busy"],
    [{ body: '{"cursor":4,"releases":[{"status":"succeeded"},{"status":"interrupted"}]}' }, 0, "idle"],
    [{ body: '{"cursor":4,"releases":[{"status":"succeeded"},{"status":"queued"}]}' }, 75, "busy"],
    [{ body: "<html>proxy error</html>" }, 1, "unknown"],
    [{ down: true, serviceActive: true }, 1, "unknown"],
    [{ down: true, serviceActive: false }, 0, "inactive"],
  ];
  for (const [input, status, state] of cases) {
    const result = laneStatus(input);
    const label = `${JSON.stringify(input)}\n${result.output}`;
    assert.equal(result.status, status, label);
    assert.match(result.output, new RegExp(`release_lane=${state} `), label);
    assert.equal(result.urls, "http://127.0.0.1:9019/api/releases?limit=50\n", label);
  }
});

test("bootstrap waits for an idle lane and confirms activation", () => {
  const bootstrap = read("install/bootstrap-self-update.sh");
  const laneCheck = bootstrap.indexOf("--lane-status");
  assert.ok(laneCheck > bootstrap.indexOf("current_manager_health_failed"));
  assert.ok(laneCheck < bootstrap.indexOf('if [ "$MODE" = "check" ]'), "--check must report a busy lane too");
  assert.ok(laneCheck < bootstrap.indexOf('cp -a "$managed_path"'));
  const activation = bootstrap.indexOf('/usr/local/sbin/update-deploy-manager --sha "$source_sha"');
  assert.ok(bootstrap.indexOf("initial_release_not_activated") > activation);
  assert.ok(bootstrap.indexOf("activation_deferred") > activation);
});

test("promoted release checks stay dependency-free", () => {
  const pkg = JSON.parse(read("package.json"));

  for (const key of ["dependencies", "optionalDependencies", "peerDependencies"]) {
    assert.equal(
      Object.keys(pkg[key] ?? {}).length,
      0,
      `${key} must stay empty because the VPS release does not install packages`,
    );
  }

  assert.match(pkg.scripts.check, /npm run test:release/);
  assert.doesNotMatch(pkg.scripts.check, /build:city|npm test(?:\s|$)/);
  assert.equal(pkg.scripts.prestart, undefined);
  assert.match(pkg.scripts["check:ci"], /npm run build:city/);
});

test("managed service follows only the atomic active link", () => {
  const service = read("install/systemd/deploy-manager-managed.service");
  const timer = read("install/systemd/deploy-manager-update.timer");

  assert.match(service, /^WorkingDirectory=\/opt\/deploy-manager-current$/m);
  assert.match(
    service,
    /^ExecStart=\/usr\/bin\/node \/opt\/deploy-manager-current\/src\/server\.mjs$/m,
  );
  assert.match(timer, /^OnUnitActiveSec=15min$/m);
  assert.match(timer, /^RandomizedDelaySec=2min$/m);
  assert.match(timer, /^Persistent=true$/m);
});

test("a service stop keeps the root rollout inside the unit and bounds its restore", () => {
  for (const unit of ["deploy-manager-managed.service", "deploy-manager.service"]) {
    const service = read(`install/systemd/${unit}`);
    assert.match(service, /^KillMode=control-group$/m, unit);
    assert.match(service, /^TimeoutStopSec=90s$/m, unit);
  }
  const rollout = read("bin/deploy-app.sh");
  assert.match(rollout, /^trap '' PIPE$/m);
  assert.match(rollout, /^trap stop_requested HUP INT TERM$/m);
  assert.ok(rollout.indexOf("record_cutover\n") < rollout.indexOf('docker stop "$CONTAINER_NAME"'));
});

test("bootstrap preserves site config and backs up promoted files first", () => {
  const bootstrap = read("install/bootstrap-self-update.sh");

  assert.doesNotMatch(bootstrap, /install[^\n]+deploy-manager\.env/);
  assert.doesNotMatch(bootstrap, /install[^\n]+apps\.json/);
  assert.doesNotMatch(
    bootstrap,
    /^(?!\s*#).*\b(rm|install|cp|mv|tar)\b[^\n]*\/opt\/deploy-manager(?![-\w])/m,
    "the bootstrap must not modify a flat install it replaces",
  );

  const backup = bootstrap.indexOf('cp -a "$managed_path"');
  const failureTrap = bootstrap.indexOf("trap restore_on_failure EXIT");
  const firstPromotion = bootstrap.indexOf(
    'install -o root -g root -m 0755 "$STAGING_DIR/bin/deploy-app.sh"',
  );
  assert.ok(backup >= 0 && firstPromotion > backup);
  assert.ok(failureTrap > backup && firstPromotion > failureTrap);
});
