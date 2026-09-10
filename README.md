# Deploy Manager

**A small, rollback-aware release control plane for Dockerized apps on one
Linux VPS.**

[Interactive release city](https://deploy.alirezaafshan.com/) ·
[Manual setup](docs/manual-setup.md) ·
[Agent quickstart](docs/agent-quickstart.md) ·
[Machine-readable overview](https://deploy.alirezaafshan.com/llms.txt) ·
[MIT license](LICENSE)

Deploy Manager sits between a pile of per-app SSH scripts and a cluster
orchestrator. It gives several independently deployed apps one signed release
inlet, a persistent job receipt, exact-SHA provenance, candidate health checks,
production proof, and restoration of the previous image when cutover fails.
One global release lane prevents several Docker builds from overwhelming the
same small host.

It is not a scheduler or a smaller Kubernetes. There are no replicas,
autoscaling, service discovery, traffic splitting, or multi-node placement.
That narrowness is useful when one understandable server is already the
platform you want.

The manager lets one server run independent Dockerized apps on separate
subdomains while keeping deployment logic in one place:

```text
example.com         -> 127.0.0.1:3000  portfolio
app-one.example.com -> 127.0.0.1:3010  app-one
app-two.example.com -> 127.0.0.1:3020  app-two
deploy.example.com  -> 127.0.0.1:9000  deploy manager
```

Each app keeps its own Git repo and Dockerfile. This repo provides the central
signed webhook, the shared Docker rollout script, systemd/sudo examples, Caddy
examples, and a GitHub Actions workflow template.

## Why not Docker Swarm or Kubernetes?

Swarm and Kubernetes can express broader and more sophisticated rollout
behavior. Deploy Manager's advantage is not a feature those platforms cannot
reproduce; it is a smaller operational surface and an opinionated release path
for a single Docker host.

| | Deploy Manager | Docker / Compose + SSH | Swarm / Kubernetes |
| --- | --- | --- | --- |
| Primary job | release choreography | run containers | schedule and reconcile services |
| Host model | one Linux host | usually one host | one or more nodes |
| Signed CI inlet | included | build it yourself | choose CI or GitOps tooling |
| Pre-cutover check | candidate on a spare loopback port | build it yourself | health-aware rollout mechanisms |
| Failed cutover | restore the prior image | build it yourself | platform rollback mechanisms |
| Deliberately absent | scheduler, cluster API, overlay, replicas | release control plane | very little; breadth is the point |

Use a cluster orchestrator or managed platform when you need multi-node
placement, replicas, autoscaling, declarative reconciliation, traffic shaping,
or a highly available control plane. The normal Deploy Manager swap includes a
small stop/remove/start cutover window; it is not a zero-downtime guarantee.

## Prepare a setup bundle

Adding to an installed fleet? Use the [additive registration workflow](docs/add-app.md)
to inspect conflicts, review the diff, back up and apply one app's configuration.

The same validated fleet specification drives the webhook allowlist, per-app
runtime settings, Caddy proposal, CI starters, public topology, active health
targets, and procedural Three.js city. It has two front ends:

```bash
# Human-guided questionnaire
npm run setup

# Agent-friendly validation with machine-readable output
npm run setup:agent -- --from examples/fleet.json --check
```

Both commands stop at a local staging bundle. They do not use sudo, write to
`/etc`, change DNS or Caddy, create secrets, or touch running containers. See
[`docs/manual-setup.md`](docs/manual-setup.md) for the human path and
[`docs/agent-quickstart.md`](docs/agent-quickstart.md) for the agent boundary.

The manager itself can optionally follow an exact, green `main` SHA through a
separate root-owned updater. Releases are versioned and activated atomically;
the updater rolls back on failed restart or health validation. Root deployment
scripts and sudo/systemd policy remain manual. See
[`docs/self-update.md`](docs/self-update.md).

## Architecture

```text
GitHub Actions
  POST /deploy/app-one
        |
        v
accept + persist job receipt (HTTP 202)
        |
        v
one global release queue, unprivileged deploy-manager user
        |
        v
sudo /usr/local/sbin/deploy-app-run app-one <sha>
        |
        v
/etc/deploy-manager/apps/app-one.env
        |
        v
docker build, candidate health check, production swap, rollback on failure
```

The public app traffic should go through a reverse proxy such as Caddy to
local-only Docker ports. The deploy webhook should also be proxied to a
loopback-only manager port.

## Public Release City and Route Boundaries

The deploy hostname is both the public explanation of the system and the
machine-facing webhook inlet. HTTP method and exact path keep those surfaces
separate:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET`, `HEAD` | `/` | interactive VPS and rollout visualizer |
| `GET`, `HEAD` | `/city`, `/city/` | compatibility alias for the release city |
| `GET`, `HEAD` | `/api/topology` | display-safe manager and fleet state |
| `GET`, `HEAD` | `/api/releases` | recent sanitized release receipts and phase events |
| `GET`, `HEAD` | `/api/releases/<job-id>` | one sanitized release receipt |
| `GET`, `HEAD` | `/healthz` | service health probe |
| `GET`, `HEAD` | `/llms.txt` | machine-readable product and safety overview |
| `GET`, `HEAD` | static asset paths | public page and visualizer assets |
| `POST` | `/deploy/<app-id>` | signed deployment request |

A valid deployment request is durably accepted with HTTP `202`, a job ID, and
a receipt URL before Docker work begins. Semantically identical signed requests
return the original job instead of running twice. Jobs execute one at a time;
unfinished receipts are marked interrupted after a manager restart rather than
silently pretending to have completed.

The included GitHub Actions workflow keeps the CI job open after acceptance,
polls that receipt for up to 20 minutes, and fails unless the terminal state is
`succeeded`. A queued request is never reported as a completed release.

A browser request to `/` never enters deployment handling. Conversely, a
`GET` to `/deploy/<app-id>` is a JSON `404`; deployment requires an exact
`POST` route and a valid signature. Unknown paths and wrong methods fail
closed.

Caddy can proxy the whole hostname to the manager without rewriting paths:

```caddyfile
deploy.example.com {
  reverse_proxy 127.0.0.1:9000
}
```

If one exact deployment path has a dedicated inlet, match it before the
shared-manager fallback and preserve the original request path:

```caddyfile
deploy.example.com {
  handle /deploy/special-app {
    reverse_proxy 127.0.0.1:9020
  }

  handle {
    reverse_proxy 127.0.0.1:9000
  }
}
```

The public map comes from `config/public-topology.json` by default. An
operator-maintained file can be selected with
`DEPLOY_MANAGER_PUBLIC_TOPOLOGY_FILE`. Only allowlisted display fields are
returned; extra keys are discarded. `DEPLOY_MANAGER_RELEASE_SHA` may be set
explicitly, otherwise SHA-named VPS releases are detected from the active
release path.

By default the manager actively sends bounded HTTP requests to every declared
loopback port and health path. `/api/topology` exposes only the resulting state,
timestamp, latency, and HTTP status—not its internal target URL. Configure the
loop with `DEPLOY_MANAGER_PROBES_ENABLED`,
`DEPLOY_MANAGER_PROBE_INTERVAL_MS`, and
`DEPLOY_MANAGER_PROBE_TIMEOUT_MS`. The defaults are enabled, 30 seconds, and
2.5 seconds; only a direct 2xx response is healthy, and redirects are not
followed. The browser assigns the sanitized topology to collision-free square
plots and loads a curated local set of CC0 Kenney GLB models through Three.js,
so fleet additions do not require manual scene editing. Roads occupy the gaps
between plots. A tiled highway, a raised continuous railway carrying Kenney
rolling stock, and an open shader-driven coastline frame the city without
crossing. Rotated
multi-octave noise shapes the entire land domain while keeping the city and
transport beds level, and both land and sea dissolve into a soft world-edge
haze. Cars, a mixed-freight train, coastal watercraft,
status packets, three explicitly ambient delivery loops, and the demonstration
release crew provide motion. Factual release animations come from the persisted
phase journal emitted by the deployment script. Declared half-step plot
addresses remain stable as the fleet expands. Asset versions, licenses, and
archive checksums live in
[`public/assets/kenney/README.md`](public/assets/kenney/README.md).

## Files

- `src/server.mjs`: central signed webhook server and asynchronous release API.
- `src/release-journal.mjs`: durable JSONL receipts, replay protection, and the
  single-host release queue.
- `client/plot-layout.js`: stable outward-growing plot addresses.
- `client/city3d.js`, `public/index.html`, `public/styles.css`,
  `public/app.js`: procedural Three.js release city and live public-status
  sampling.
- `scripts/build-city3d.mjs`: bundles Three.js and its GLTF/UI helpers for the
  self-hosted browser build.
- `playwright.config.mjs`, `tests/visual/`: reduced-motion desktop/mobile visual
  contracts (`npm run test:visual`).
- `public/assets/kenney/`: curated CC0 model, texture, license, and provenance
  bundle used by the city.
- `public/llms.txt`: machine-readable fit, release contract, and agent route.
- `config/public-topology.json`: public-safe VPS inventory displayed by the map.
- `bin/deploy-app.sh`: generic Docker deployment script.
- `bin/deploy-app-run`: root-side wrapper that maps app IDs to env files.
- `bin/deploy-manager-sudo`: unprivileged wrapper used by the webhook process.
- `scripts/deploy-app-now.sh`: optional manual deploy helper for an app ID.
- `scripts/setup.mjs`: interactive and agent-friendly staging bundle generator.
- `scripts/dev.mjs`: local release-city preview with explicit fake release
  identity.
- `examples/fleet.json`: complete, secret-free setup input example.
- `examples/apps.json`: allowlisted apps and GitHub repo names.
- `examples/apps/*.env`: per-app deployment settings.
- `examples/github-actions/deploy.yml`: workflow template for app repos.
- `examples/caddy/Caddyfile`: public app and deploy webhook routing example.
- `install/install-on-vps.sh`: simple installer for a fresh VPS setup.
- `install/systemd/deploy-manager.service`: systemd unit example.
- `install/sudoers/deploy-manager`: narrow sudoers example.
- `install/bootstrap-self-update.sh`: one-time migration to versioned releases.
- `install/update-deploy-manager`: root-owned exact-SHA release updater.
- `install/systemd/deploy-manager-managed.service`: service using the atomic
  active-release link.
- `install/systemd/deploy-manager-update.*`: periodic update check and timer.
- `docs/self-update.md`: trust boundary, bootstrap, rollback, and operations.
- `docs/agent-quickstart.md`: bounded integration workflow for coding agents.
- `docs/manual-setup.md`: human-guided setup, review, and installation boundary.

## VPS Configuration

Install the repo somewhere root-owned, usually:

```bash
sudo mkdir -p /opt/deploy-manager
sudo rsync -a ./ /opt/deploy-manager/
```

Or run the installer from a checked-out/staged copy:

```bash
sudo ./install/install-on-vps.sh "$PWD"
```

The installer creates:

```text
/opt/deploy-manager
/etc/deploy-manager
/etc/deploy-manager/apps
/etc/deploy-manager/deploy-manager.env
/var/lib/deploy-manager/release-journal.jsonl
/usr/local/sbin/deploy-app-run
/usr/local/bin/deploy-manager-sudo
/etc/systemd/system/deploy-manager.service
/etc/sudoers.d/deploy-manager
```

Edit `/etc/deploy-manager/apps.json`, `/etc/deploy-manager/apps/*.env`, and
`/etc/deploy-manager/deploy-manager.env` for the real domains, repos, ports,
branches, and webhook secrets.

For an existing production installation, do not overlay this repository onto
the live directory merely to enable self-update. Follow the migration in
[`docs/self-update.md`](docs/self-update.md); it preserves the site-specific
configuration and legacy flat install while creating a root-only backup.

## App Config

Every app has two config entries.

The central allowlist in `/etc/deploy-manager/apps.json` controls which webhook
paths exist and which GitHub repo is allowed:

```json
{
  "apps": {
    "app-one": {
      "repo": "example-org/app-one",
      "branch": "main",
      "event": "push",
      "secretEnv": "APP_ONE_DEPLOY_WEBHOOK_SECRET"
    }
  }
}
```

The root-side app env file controls deployment behavior:

```bash
APP_ID=app-one
REPO_DIR=/opt/app-one/app
REPO_USER=deploy
BRANCH=main

IMAGE_NAME=app-one
CONTAINER_NAME=app-one
CANDIDATE_CONTAINER_NAME=app-one-candidate

APP_PORT=3010
CANDIDATE_APP_PORT=3011
CONTAINER_PORT=3000
HEALTH_PATH=/healthz

LOG_FILE=/opt/app-one/deploy.log
```

The app ID in the URL maps to `/etc/deploy-manager/apps/<app-id>.env`. For
example, `/deploy/app-one` maps to `/etc/deploy-manager/apps/app-one.env`.

## App Repo Requirements

Each app repo should have:

- a Dockerfile
- a stable deploy branch, usually `main` or `master`
- a health endpoint, preferably `/healthz`
- a GitHub Actions workflow based on `examples/github-actions/deploy.yml`

The deploy script runs:

```bash
git fetch origin <branch>
git reset --hard origin/<branch>
docker build ...
docker run candidate on 127.0.0.1:<candidate-port>
curl candidate health URL
replace production container
curl production health URL
rollback to old image if production start or health fails
```

Built images are tagged with the exact requested Git SHA, so the running container and
rollback target retain source provenance after the deployment log rotates.
The manager also appends every accepted job and phase transition to
`/var/lib/deploy-manager/release-journal.jsonl`. Treat that file as operational
state: keep it writable only by the manager service and include it in host
backups.

## GitHub Actions Secrets

In each app repo, configure:

```text
DEPLOY_WEBHOOK_URL=https://deploy.example.com/deploy/app-one
DEPLOY_WEBHOOK_SECRET=<same value as APP_ONE_DEPLOY_WEBHOOK_SECRET on the VPS>
```

## Caddy

Use Caddy to route public traffic to each app's local-only Docker port:

```caddyfile
app-one.example.com {
  reverse_proxy 127.0.0.1:3010
}

app-two.example.com {
  reverse_proxy 127.0.0.1:3020
}

deploy.example.com {
  reverse_proxy 127.0.0.1:9000
}
```

The app containers should bind only to `127.0.0.1`, not the public interface.

## Manual Checks

Check the manager:

```bash
curl http://127.0.0.1:9000/healthz
curl http://127.0.0.1:9000/api/releases
systemctl status deploy-manager --no-pager
```

Check deployed apps:

```bash
curl -I https://app-one.example.com/healthz
curl -I https://app-two.example.com/healthz
sudo docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
```

Check logs:

```bash
sudo journalctl -u deploy-manager -n 100 --no-pager
sudo tail -n 100 /opt/app-one/deploy.log
sudo tail -n 100 /opt/app-two/deploy.log
```
