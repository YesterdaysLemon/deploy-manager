# Rollback-safe self-update

Deploy Manager can follow its own green `main` branch without letting ordinary
application code replace root-owned deployment controls. A one-time bootstrap
migrates the webhook service from the legacy flat install to immutable,
SHA-named releases selected through an atomic symlink.

This is a service-code update mechanism, not a root control-plane update
mechanism.

## Trust boundary

Automatic updates may change the release behind:

```text
/opt/deploy-manager-current
  -> /opt/deploy-manager-releases/<40-character-main-sha>
```

The active release runs `src/server.mjs` as the unprivileged `deploy-manager`
user. Releases are root-owned and not writable by that user.

These files are installed only by the manual bootstrap and are never copied
from an automatically activated release:

```text
/usr/local/sbin/update-deploy-manager
/usr/local/sbin/deploy-app-run
/usr/local/bin/deploy-manager-sudo
/usr/local/libexec/deploy-manager/deploy-app.sh
/etc/sudoers.d/deploy-manager
/etc/systemd/system/deploy-manager.service
/etc/systemd/system/deploy-manager-update.service
/etc/systemd/system/deploy-manager-update.timer
```

That split matters because `deploy-app.sh`, the wrappers, sudoers, systemd
units, and the updater execute with or can reach root authority. A pull from
`main` must not silently promote changes to that plane.

## Release gate

Every timer run fails closed unless all of these are true:

1. the configured repository's GitHub default branch is `main`;
2. the requested SHA is the current tip of `main`;
3. the `check.yml` push workflow has a successful completed run for that exact
   SHA;
4. the downloaded archive is no larger than the configured limit and contains
   only regular files and directories;
5. the runtime remains dependency-free and the package-free `npm run check`
   passes as the separate, unprivileged `deploy-manager-build` user; CI
   separately runs `npm run check:ci` to rebuild and verify the checked-in
   Three.js browser bundle;
6. the new service starts and its loopback `/healthz` endpoint responds.

Tests run against an expendable extraction. The updater then extracts the exact
archive again before making the release root-owned, so tests cannot accidentally
modify the tree that is activated.

The final symlink replacement is atomic. If restart or health validation fails,
the updater restores the previous symlink, restarts it, verifies its health, and
returns failure for the attempted release.

Immediately before activation, the updater asks GitHub for `main` again and
abandons the prepared release if a newer commit arrived while checks were
running. An older green build therefore cannot overwrite a newer branch tip.

## GitHub prerequisite

Before running the bootstrap:

1. merge the self-update pull request to `main`;
2. change the repository default branch from `master` to `main`;
3. protect `main` and require the `check` job before merging;
4. confirm the latest `main` push workflow is green.

The updater verifies the second and fourth conditions itself. Branch protection
is an owner policy and should be configured before trusting unattended updates.

## One-time VPS bootstrap

Run this from an interactive shell on the VPS. It clones a clean current `main`,
runs a non-mutating preflight, then asks for sudo only for the bootstrap. The
temporary clone is removed only when its path is the directory created by
`mktemp`.

```bash
bootstrap_dir="$(mktemp -d)"
cleanup_bootstrap() {
  case "$bootstrap_dir" in
    /tmp/*) rm -rf -- "$bootstrap_dir" ;;
  esac
}
trap cleanup_bootstrap EXIT
trap 'exit 129' HUP
trap 'exit 130' INT
trap 'exit 143' TERM

git clone --depth 1 --branch main \
  https://github.com/YesterdaysLemon/deploy-manager.git \
  "$bootstrap_dir/repo"

sudo "$bootstrap_dir/repo/install/bootstrap-self-update.sh" \
  --check "$bootstrap_dir/repo"
sudo "$bootstrap_dir/repo/install/bootstrap-self-update.sh" \
  "$bootstrap_dir/repo"
```

The expected final line is:

```text
BOOTSTRAP_OK sha=<40-character-sha> backup=/root/deploy-manager-bootstrap-backups/<timestamp> active=/opt/deploy-manager-current
```

The bootstrap preserves these site-specific paths:

```text
/etc/deploy-manager/deploy-manager.env
/etc/deploy-manager/apps.json
/etc/deploy-manager/apps/*.env
/opt/deploy-manager
```

The old flat `/opt/deploy-manager` install remains available as the migration
fallback. Before changing promoted files, the bootstrap stores their exact
prior state under the reported root-only backup directory. If initial release
activation or timer setup fails, it restores the old systemd unit and promoted
files and restarts the prior service.

## Normal operation

The timer checks after boot and then approximately every 15 minutes with a small
random delay. A manual check is safe and idempotent:

```bash
sudo systemctl start deploy-manager-update.service
sudo journalctl -u deploy-manager-update.service -n 100 --no-pager
```

Inspect the active release and service:

```bash
readlink -f /opt/deploy-manager-current
sudo cat /var/lib/deploy-manager-update/active-sha
sudo systemctl status deploy-manager deploy-manager-update.timer --no-pager
curl --fail http://127.0.0.1:9019/healthz
```

The health command above uses the current production port. On another host, use
the `DEPLOY_MANAGER_PORT` from `/etc/deploy-manager/deploy-manager.env`.

The updater intentionally retains versioned releases. Prune an old release only
after confirming it is neither the active symlink target nor the last known-good
rollback target.

## Updating the privileged plane

Changes under `install/`, the privileged wrappers, `bin/deploy-app.sh`, sudoers,
or systemd units require another deliberate bootstrap. Use the same clean-clone
block above. Each run creates a new root-only backup before promoting anything.

Do not change the timer to copy those files from
`/opt/deploy-manager-current`. That would collapse the privilege boundary this
design exists to preserve.

## Disable automatic checks

Disabling the timer does not stop or alter the running manager:

```bash
sudo systemctl disable --now deploy-manager-update.timer
```

The service stays on the last healthy active release until an operator changes
it or re-enables the timer.
