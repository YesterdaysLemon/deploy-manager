# Rollback-safe self-update

Deploy Manager can follow its own green `main` branch without letting ordinary
application code replace root-owned deployment controls. The service runs from
immutable, SHA-named releases selected through an atomic symlink. A manual
bootstrap installs the root-owned plane and switches a host to that layout;
re-running it is also how that plane is updated.

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

The updater also never restarts the manager while an app release is queued,
running, or being recovered; see [Release lane and restarts](#release-lane-and-restarts).

## Release lane and restarts

Restarting `deploy-manager.service` stops everything in its cgroup, including
a root `deploy-app.sh` rollout that the manager started through
`deploy-app-run`. A rollout stopped between `docker stop` and a verified new
container leaves the app down. The updater therefore asks the running manager
for its release lane:

```text
GET http://<DEPLOY_MANAGER_HOST>:<DEPLOY_MANAGER_PORT>/api/releases?limit=50
{"cursor":…,"lane":{"busy":false,"running":0,"queued":0,"recovering":0},"releases":[…]}
```

It checks twice: once before downloading anything, and again after the
release is prepared, immediately before the atomic link swap and restart
(`daemon-reload` runs before that check, so only the swap separates it from
the restart).

| Lane answer | Updater behaviour |
| --- | --- |
| `lane.busy` is `false` | continue |
| `lane.busy` is `true` | `skip reason=release_lane_busy checkpoint=before_download` or `checkpoint=before_activation`, exit 0, nothing changed; the next timer run retries |
| unreadable while the service is active | `failure reason=release_lane_unknown`, nothing changed |
| unreadable and the service is not active | `release_lane=inactive`, continue, so a crash-looping manager can still be replaced by a green release |

A manager that predates the `lane` field is treated as busy while any listed
receipt is `queued` or `running`. The restart that rolls back a failed
activation is not gated: the manager that would answer is the one that failed.

The updater reads only the manager's loopback API, never the journal file the
unprivileged service writes. A compromised manager can at most postpone
updates; it cannot make the root updater act.

A request that arrives in the instant between the final check and the restart
can still be cut short. Two root-side safeguards cover that case and any other
stop, such as a manual restart or a reboot:

- **Stop during a rollout.** The unit keeps `KillMode=control-group` and sets
  `TimeoutStopSec=90s`. On `SIGTERM`, `deploy-app.sh` exits if it has not
  started the swap, and otherwise restores the previous image through its
  existing rollback path before exiting. systemd waits for that before it
  starts the manager again. `KillMode=process` or `none` would instead leave
  an orphaned root rollout that outlives its receipt, writes into a closed
  pipe, and can overlap the next manager's release lane.
- **Recovery after a hard stop.** Before stopping production, `deploy-app.sh`
  records the previous image in a root-only file,
  `/var/lib/deploy-manager-rollout/<app-id>.cutover`, and removes it once the
  new container is verified or the old one is restored. If a rollout is killed
  outright (a stop timeout, host crash, or power loss), the record remains. On
  start, the manager runs `deploy-app-run --recover <app-id>` for each job that
  was interrupted after it had started; the next release of that app runs the
  same repair first. Recovery keeps production if it is running and healthy,
  and otherwise starts the recorded previous image. The caller supplies only
  the app ID; the root-owned record selects the image, and without a record
  nothing is touched.

Recovery holds the release lane, so the updater waits for it too. Its outcome
is appended to the interrupted receipt, which stays `interrupted` because the
requested SHA was not released:

| Receipt phase | Meaning |
| --- | --- |
| `recovery-not-needed` | no unfinished swap; production was not left mid-cutover |
| `production-healthy` | the swap had finished and production is running and healthy |
| `production-restored` | the previous image was started and is healthy |
| `recovery-skipped` | another rollout for the app holds its lock |
| `recovery-failed` | the previous image could not be started or is unhealthy |
| `recovery-unavailable` | the root wrapper has no `--recover` mode, or could not run |

To release the interrupted SHA, re-run the same workflow. A signed request
whose earlier job ended `interrupted` starts a fresh job, whose receipt names
the old one in `retryOf`; no new commit is needed.

### Installing these safeguards

The lane check, the stop handler, the cutover record, `--recover`, and the
unit settings live in the root plane: `update-deploy-manager`,
`deploy-app-run`, `deploy-app.sh`, and the systemd units. The timer never
installs those files, so a VPS whose updater was bootstrapped before this
change keeps restarting the manager without checking the lane until an
operator re-runs the bootstrap (see
[Updating the privileged plane](#updating-the-privileged-plane)). Until then a
new manager release records `recovery-unavailable` for interrupted rollouts.

The bootstrap applies the same lane check before it changes anything, in both
`--check` and apply modes, and fails with `release_lane_not_idle` while a
release is in flight. If the updater skips activation because a release
arrived after that check, the bootstrap logs `activation_deferred` and the
timer activates the SHA once the lane is idle; on a first migration, which has
no earlier release to keep running, it restores the backup instead.

## Repository requirements

The repository's default branch is `main`, and the `check.yml` push workflow
for the current `main` SHA is green; the updater verifies both. Protecting
`main` and requiring the `check` job before merging is an owner policy to set
before trusting unattended updates.

## VPS bootstrap

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

Run it while the release lane is idle; both commands stop with
`release_lane_not_idle` otherwise. An `activation_deferred` line before
`BOOTSTRAP_OK` means the root plane was promoted but a release arrived before
the manager could be restarted; the timer activates the SHA once the lane is
idle.

The bootstrap preserves these site-specific paths:

```text
/etc/deploy-manager/deploy-manager.env
/etc/deploy-manager/apps.json
/etc/deploy-manager/apps/*.env
/opt/deploy-manager
```

Before changing promoted files, the bootstrap stores their exact prior state
under the reported root-only backup directory. If release activation or timer
setup fails, it restores the old systemd unit and promoted files and restarts
the prior service. On a host still running the flat install from
`install-on-vps.sh`, the bootstrap leaves that directory alone; remove it once
the versioned service is healthy.

## Normal operation

### Observed city-release receipts

Versions with the manager-observation feature append a receipt after a SHA-named
installed server is listening and its own loopback `/healthz` responds successfully.
These records use `source: manager-observation`, `phase: serving`, and evidence
`running-release-local-health`. They are observations of a running release, not
invented build, activation, or rollback-attempt events.

The first observed SHA establishes a baseline. Restarting that same version does
not duplicate the receipt; a change of SHA records the previous observed version.
Returning to an earlier supported version records another observed transition.
Ordinary local previews do not generate these records, even if a display SHA is
configured. They persist in the existing journal and never enter the deploy queue.

This does not modify the privileged updater. Failed attempts that never serve,
or a rollback to code predating the observation feature, remain visible only in
the updater's own logs. History before the first observation is not backfilled.
The city gives a recent observation a brief confirmation stamp and keeps its
receipt available in the manager's selection details.

### Promotion timer

The timer checks after boot and then approximately every 15 minutes with a small
random delay. A manual check is safe and idempotent, and it skips while a
release is in flight:

```bash
sudo systemctl start deploy-manager-update.service
sudo journalctl -u deploy-manager-update.service -n 100 --no-pager
```

Check the release lane before restarting the manager by hand:

```bash
curl --fail 'http://127.0.0.1:9019/api/releases?limit=1'
```

Restart only while the response has `"lane":{"busy":false,…}`.

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
block above, with operator authorization and while the release lane is idle.
Each run creates a new root-only backup before promoting anything. The
existing sudoers rule (`deploy-app-run *`) already permits `--recover`.

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
