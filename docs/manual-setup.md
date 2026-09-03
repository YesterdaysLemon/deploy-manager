# Manual setup

Deploy Manager now has one setup path with two front ends:

- a human can answer an interactive questionnaire with `npm run setup`;
- an agent can prepare a versioned fleet JSON file and run the same generator
  non-interactively with `npm run setup:agent`.

Both paths produce a reviewable staging bundle. Neither path writes to `/etc`,
uses `sudo`, changes Caddy or DNS, creates GitHub secrets, or touches a running
container.

## Requirements

- Node.js 20 or newer on the workstation used to prepare the bundle;
- one Linux host with Docker, systemd, `curl`, `flock`, Git, and a reverse
  proxy such as Caddy;
- for every app: a dedicated checkout, Dockerfile, stable branch, and health
  endpoint that represents readiness;
- two unused loopback ports per app: production and candidate.

The deploy script resets the configured checkout to the remote branch tip.
Never point `REPO_DIR` at a working copy that contains uncommitted work.

## Human-guided setup

From a clean Deploy Manager checkout:

```bash
npm test
npm run setup
```

The questionnaire writes `.deploy-manager/setup/`. If that directory already
contains anything, setup fails instead of overwriting it.

For a reproducible non-interactive rehearsal, start from the example:

```bash
npm run setup -- \
  --from examples/fleet.json \
  --output .deploy-manager/manual-preview
```

Inspect `.deploy-manager/manual-preview/SETUP-RECEIPT.md` first. The bundle
contains:

```text
fleet.json                 normalized source of truth
apps.json                  public webhook allowlist
apps/<app-id>.env          root-side rollout settings
deploy-manager.env         service settings plus secret placeholders
public-topology.json       display-safe generated city inventory
caddy/Caddyfile            proposed routes, not an applied configuration
github/*-deploy.yml        fail-closed workflow starters
SETUP-RECEIPT.md           exact review boundary and next steps
```

Generated workflows intentionally contain an `exit 1`. Replace it with the
app repository's real test and build commands before enabling deployment. The
notification step then waits on the returned job receipt and fails the workflow
if the release fails, rolls back, is interrupted, or exceeds 20 minutes.

## Review and installation

Treat the bundle as a proposal. Verify the following against the VPS before
copying anything:

1. every hostname, repository, branch, checkout path, owner, and health path;
2. that every production and candidate port is unused and loopback-only;
3. that optional runtime env files and Docker networks already exist;
4. that Caddy has no conflicting hostname or route;
5. that the app checkout is dedicated and safe to hard-reset;
6. that the app health endpoint is meaningful and bounded.

For a fresh server, install the base service from the reviewed checkout as
described in the README. Back up `/etc/deploy-manager` before replacing the
example configuration with the reviewed bundle. On the VPS, replace every
`REPLACE_WITH_A_RANDOM_64_HEX_SECRET` value with an independently generated
secret, for example:

```bash
openssl rand -hex 32
```

Copy the corresponding secret into the app repository's
`DEPLOY_WEBHOOK_SECRET` GitHub Actions secret, and set
`DEPLOY_WEBHOOK_URL` to the exact `/deploy/<app-id>` URL. Never commit the
edited `deploy-manager.env` or a real runtime env file.

Apply Caddy, systemd, GitHub secrets, and production container changes only as
separate operator-approved actions. After restarting the manager, verify:

```bash
curl --fail http://127.0.0.1:9000/healthz
curl --fail http://127.0.0.1:9000/api/topology
curl --fail http://127.0.0.1:9000/api/releases
sudo systemctl status deploy-manager --no-pager
```

Use the configured manager port if it is not `9000`. Wait for the topology API
to report a current probe cycle, then verify each app through both its loopback
health URL and public HTTPS hostname.

The systemd unit creates `/var/lib/deploy-manager` for the append-only release
journal. Verify it is owned by `deploy-manager:deploy-manager`; back it up with
the rest of the host's operational state. A deployment POST returning `202`
means queued, not complete—follow the returned receipt URL to a terminal state.

## Agent-led setup

An agent should edit a copy of `examples/fleet.json`, not production files. The
operator can validate it without writing output:

```bash
npm run setup:agent -- \
  --from path/to/fleet.json \
  --check
```

Then generate a review bundle:

```bash
npm run setup:agent -- \
  --from path/to/fleet.json \
  --output .deploy-manager/agent-review
```

The command returns one JSON result on stdout. Agents must treat `wrote: true`
as “staging bundle created,” never as “installed” or “deployed.” Continue with
the boundary in `docs/agent-quickstart.md`.
