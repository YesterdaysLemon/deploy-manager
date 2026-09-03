import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
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
  assert.match(
    updater,
    /if systemctl daemon-reload && systemctl restart "\$SERVICE" && health_check/,
  );
  assert.match(updater, /activation_failed_rolled_back/);
  assert.ok(
    updater.indexOf('mv -Tf "$rollback_link" "$ACTIVE_LINK"') <
      updater.indexOf('activation_failed_rolled_back'),
  );
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

test("bootstrap preserves site config and backs up promoted files first", () => {
  const bootstrap = read("install/bootstrap-self-update.sh");

  assert.doesNotMatch(bootstrap, /install[^\n]+deploy-manager\.env/);
  assert.doesNotMatch(bootstrap, /install[^\n]+apps\.json/);
  assert.match(bootstrap, /legacy_install_untouched=\/opt\/deploy-manager/);

  const backup = bootstrap.indexOf('cp -a "$managed_path"');
  const failureTrap = bootstrap.indexOf("trap restore_on_failure EXIT");
  const firstPromotion = bootstrap.indexOf(
    'install -o root -g root -m 0755 "$STAGING_DIR/bin/deploy-app.sh"',
  );
  assert.ok(backup >= 0 && firstPromotion > backup);
  assert.ok(failureTrap > backup && firstPromotion > failureTrap);
});
