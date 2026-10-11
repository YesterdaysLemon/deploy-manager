# Stateful services

The optional `runtime` object in a version 1 fleet app declares persistent
Docker named volumes or dedicated bind directories, additional TCP ports,
resource limits and a `stateful` deployment strategy. Existing web apps keep
their candidate rollout and image rollback behavior.

```json
{
  "version": 1,
  "deployment": "stateful",
  "mounts": [
    {"type": "volume", "source": "mail-data", "target": "/var/lib/stalwart"},
    {"type": "bind", "source": "/srv/stalwart/config", "target": "/etc/stalwart"},
    {"type": "bind", "source": "/srv/stalwart/tls", "target": "/run/stalwart-tls", "readOnly": true}
  ],
  "ports": [
    {"host": "107.172.137.190", "hostPort": 25, "containerPort": 25},
    {"host": "127.0.0.1", "hostPort": 3342, "containerPort": 8443}
  ],
  "backupHook": "/etc/deploy-manager/hooks/mail-backup",
  "ipv4Address": "172.30.0.10",
  "memory": "1536m",
  "cpus": 1.5,
  "stopTimeoutSeconds": 60,
  "exposeHttp": false
}
```

The existing production HTTP port remains bound to `127.0.0.1` and supplies a
health endpoint. `exposeHttp: false` generates a certificate-only Caddy site
that returns 404, keeping administration private. Additional ports require
explicit IPv4 bindings. Setup and registration reserve every host port; existing
runtime records also protect writable storage from accidental sharing.

Registration writes `/etc/deploy-manager/runtime/<app-id>.json` and a reference
in the existing app env file. It still uses the one existing manager, signed
inlet and release lane. The candidate port remains reserved for compatibility,
but a stateful release never runs a second process against the same data.

Create named volumes explicitly with `deploy-manager.app=<app-id>` labels;
prepare bind directories with the image's correct UID and permissions. Bind
directory ancestors must be root owned and not group/other writable; the source
itself may be image-owned, with no group/other write. Named volumes must use the
plain local driver without options. The
runner refuses missing or unrelated volumes, missing/symlinked bind sources,
and backup hooks outside `/etc/deploy-manager/hooks`. Runtime JSON, hooks and
their parent directories must be root owned and not writable by another user.
No firewall, volume, directory, credential or backup service is provisioned
implicitly by a webhook.

Runtime checks inspect Docker-published TCP ports as well as listening sockets,
and resolve bind/volume backing paths to reject cross-type aliases and nested
writers. Storage and configuration checks repeat before mounting or backup.
Stateful releases use root-protected `/var/lib/deploy-manager-locks/<app-id>.lock`
files. The helper prepares and validates them before the shell opens them, and
the rollout retains the per-app `flock` through its exec into Node. The original
web-app lock paths remain unchanged.

An update builds the exact requested Git SHA before touching production. It
then resolves the built tag to its immutable `sha256:` image ID and records a
durable cutover receipt, stops and verifies the sole writer, obtains a
verified encrypted off-host backup, records its receipt, and replaces only the
container. Snapshot and health verification are fail-closed. Backup failure
restarts the same previous container. After a new image may have written to
live state, failure stops that service and retains its data, container, images
and snapshot receipts. It does not start an older binary automatically or
remove any volume. The mail service is unavailable until explicit restoration
or reviewed repair succeeds.

This strategy has a maintenance window including backup time. SMTP senders
normally retry transient unavailability; the phone may temporarily fail to
connect. A functioning nightly encrypted off-host backup and a separate restore
test are also required operationally; the pre-update hook is not that schedule.

## Backup hook contract

The operator installs one executable root-owned helper after choosing the
encrypted destination, credentials and retention. The manager passes five
literal arguments: operation (`snapshot` or `restore`), app ID, root runtime
JSON path, container name, and external snapshot ID (empty for a new
snapshot). Never source repository scripts or dump logs/credentials. Include
every writable mount; exclude only independently replaceable read-only TLS
material. Snapshot runs with the service stopped and must exit nonzero on any
failure. On stdout return exactly one bounded JSON receipt:

```json
{"version":1,"snapshotId":"opaque-backup-id","verified":true,"encrypted":true,"offHost":true}
```

The helper must verify encryption, successful remote storage and integrity.
These receipt booleans are assertions from the trusted operator-owned hook,
not independent evidence that any backup exists. Unit-test mocks do not satisfy
the operational backup requirement. Exercise a real isolated restore before
mail cutover, and retain its evidence separately.
The manager stores only this receipt and image/configuration metadata. It
never creates plaintext archive copies or invents a backup destination.
For restore, fetch and verify the requested encrypted snapshot, safely restore
the same writable mounts with ownership preserved, and return:

```json
{"restored":"opaque-backup-id","verified":true}
```

Retain each snapshot's exact immutable image locally and include an encrypted
image export/manifest in the off-host disaster-recovery design. Never prune
snapshot-associated images while their receipts are retained. An explicit
restore checks local image availability before replacing any data; recover a
missing image first and prove its ID matches. A data backup alone is not a
complete rebuild plan.

## Bundled restic hook

The bundled `restic-service-backup.mjs` is a root-plane helper. Install restic
separately at `/usr/local/bin/restic`, after approving its verified upstream
release and the backup destination. A root-owned executable hook under
`/etc/deploy-manager/hooks/` can exec this fixed helper with the five literal
arguments. The policy is `/etc/deploy-manager/backup/<app-id>.json`:

```json
{"version":1,"appId":"mail","repository":"s3:https://<account-id>.r2.cloudflarestorage.com/<bucket>","passwordFile":"/etc/deploy-manager/backup/mail.password","credentialsFile":"/etc/deploy-manager/backup/mail.s3.json","resticPath":"/usr/local/bin/restic"}
```

Credential files are root-only, with exact S3 keys `AWS_ACCESS_KEY_ID` and
`AWS_SECRET_ACCESS_KEY`. Provision them through an approved private handoff;
do not commit them. The existing HTTPS R2 transport remains available to other
apps; the Tome transport below needs no S3 credentials. The helper never
initializes repositories or creates credentials.
`testOnly` permits a confined local fixture repository and reports
`offHost:false`, which the manager refuses as an update gate.

The hook retains the same per-app flock as the manager; direct operations take
that lock too. It checks stopped status, competing Docker mounts, canonical
storage, free space and same-filesystem staging. Writable trees must contain
only regular files/directories. It streams the stopped image export into
encrypted storage, saves a data/ownership manifest, reads all repository packs
for integrity, then performs and hashes a real isolated restore. Full-history
verification has a 14-minute overall budget and will eventually require a
measured retention/check-window decision. Do not assume remote latency or
operation cost from local fixture results.

Verification copies have durable app-scoped ownership records before
allocation. Normal cleanup removes them; a later locked operation reclaims
copies left by a hard kill. A durable restore journal owns its copies instead
and blocks automatic cleanup until operator recovery. Before data replacement,
the helper flushes both trees and creates same-filesystem quarantines; each
rename's source and destination directories are flushed. Original files are
retained, with a quarantine audit after successful installation. They consume
space until explicit reviewed reconciliation/cleanup; there is no implicit
deletion or retention pruning. A source that is itself a separate filesystem
mountpoint is refused because sibling staging would cross devices.

Actual remote repository init, recovery-key custody, scheduled cold backups,
retention and disaster-recovery restore/image-load evidence remain operator
deployment tasks. A passing local encrypted restore is useful evidence but
does not establish any off-host backup.

## Tome backup over the existing SSH connection

For an operator-owned machine running `rest-server` on loopback, the bundled
hook also accepts this app-scoped policy. The example UID must be replaced
with the inspected authorized SSH user's nonroot UID:

```json
{"version":1,"appId":"mail","transport":"tome-ssh-unix","socketOwnerUid":1002,"repository":"rest:http+unix:///var/lib/deploy-manager-tome/mail/rest.sock:/mail/","passwordFile":"/etc/deploy-manager/backup/mail.password","resticPath":"/usr/local/bin/restic"}
```

Create `/var/lib/deploy-manager-tome` as root mode 0755 and its `mail` child as
the authorized SSH user mode 0700. That user may then establish an SSH reverse
Unix socket, with `StreamLocalBindMask=0177`, to the operator's loopback
rest-server. The exact socket must be owned by the pinned UID, with no group
or other permissions. All ancestors above the user-owned app directory must
be protected root directories. TCP URLs, arbitrary Unix sockets, embedded
credentials and local fixture repositories cannot claim this transport.

Keep rest-server loopback-only, append-only, and confined to the persistent
encrypted repository directory on Tome. The SSH key remains in its existing
authorized storage. Provision the recovery password privately; initialize
the encrypted repository explicitly. An empty repository or a trusted socket
alone does not prove an offhost backup: run a real snapshot and restore,
including an isolated mailbox/image restart, and retain its receipt.

The root-only `cold-service-backup.mjs <app-id>` helper is suitable for an
operator-installed timer. It uses only the registered container and hook,
retains the shared per-app lock, tests repository availability before stopping
the writer, and records a recovery journal before the stop. After snapshot
verification it restarts only the same immutable container image. Transfer or
stop failures also attempt that restart. A changed image or failed restart
leaves the journal for explicit recovery. Its next invocation first recovers
an interrupted stop before attempting another backup.

The last verified receipt is in
`/var/lib/deploy-manager-backup/<app-id>/freshness.json`. Failed or skipped
backups cannot advance its timestamp; a verified backup may have a receipt
while service recovery is still pending. Report both states. While Tome is
offline no new offhost backup exists, and preflight must fail before stopping
the writer. Scheduling, machine availability, retention and owner recovery-key
custody are separate operational tasks. No timer or host listener is created
by the manager.

## Trial-to-production port transition

Do not edit runtime ports before an ordinary update; that invalidates the
baseline. The operator-only `--rebind` mode accepts a root-owned next-runtime
file directly under `/etc/deploy-manager/runtime/` and the exact approved
`before:after` configuration fingerprints:

```sh
sudo ENV_FILE=/etc/deploy-manager/apps/<app-id>.env \
  /usr/local/libexec/deploy-manager/deploy-app.sh \
  --rebind /etc/deploy-manager/runtime/<app-id>-next.json <before>:<after>
```

Only host addresses/ports can change; storage, image, environment, health
mapping, network and container ports must remain identical. The operation
stops the writer, obtains a verified encrypted off-host snapshot, durably
installs the reviewed runtime and recreates the same immutable image. Health
and actual Docker bindings must match before recording the new baseline.
Before promotion it can restart the original transport. After the replacement
may accept mail it stops on failure and requires explicit repair, preserving
both existing data and the backup. Recovery verifies bindings as well as image
identity, including interrupted configuration installs. Firewall approval and
live ingress tests are separate prerequisites for public exposure.

## Recovery and explicit restore

`deploy-app-run --recover <app-id>` repairs an interrupted pre-promotion stop
by restarting the same recorded container. It keeps a healthy new image after
a completed swap. A potentially migrated, unhealthy state requires operator
review; recovery never downgrades that database.

An explicit restore is an operator-only direct invocation of the root script,
not a webhook operation. Stop the failed service first, review the recorded
snapshot and exact current immutable `sha256:` image ID, then use:

```sh
sudo ENV_FILE=/etc/deploy-manager/apps/<app-id>.env \
  /usr/local/libexec/deploy-manager/deploy-app.sh \
  --restore <local-snapshot-receipt-id> <reviewed-current-image>
```

The runner validates a configuration fingerprint including container identity,
network, health mapping and the protected environment-file hash, and the
recorded compatible immutable image ID. Changing these settings requires an
explicit compatibility plan rather than reusing an old snapshot. If a failed
promotion left no container, the operator can pass `absent` in place of the
current image only when the durable failed-rollout record refers to the same
snapshot and configuration. It first creates another verified encrypted off-host backup of the
current stopped state, so mail accepted by the failed release is retained.
Then it calls the restore helper, recreates the recorded compatible image and
checks health. Restore failure retains the recovery record and stops acceptance
where possible. Reconcile retained newer mail before discarding any snapshot.

Every healthy stateful deployment/restore records a durable root-owned
configuration baseline. A later update must match that previous image and
configuration before stopping its writer. Editing environment contents or
runtime/network mappings before an ordinary update is refused; it needs a
reviewed migration workflow. Adopting an already existing container without a
proved baseline is also refused. New dedicated services start with no existing
container, and establish their baseline after first health verification.

## Privileged rollout boundary

`bin/deploy-app.sh`, `bin/stateful-service.mjs`, `bin/restic-service-backup.mjs`,
`bin/cold-service-backup.mjs` and bootstrap installation are
root-plane changes. The self-updater does not install them. Review the diff,
verify `lane.busy: false`, and explicitly re-run the manual bootstrap after
approval. Configure the new app additively and commit only its config under
`/etc/deploy-manager`. Keep firewall, TLS, DNS, credential, relay and backup
choices in the mail deployment approval bundle. Do not replace fleet-wide
configuration with a one-app example.
