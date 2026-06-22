# Deploy Manager

Central webhook and Docker rollout manager for small VPS-hosted webapps.

It lets one VPS run independent Dockerized apps on separate subdomains:

```text
alirezaafshan.com        -> 127.0.0.1:3000  website
fish.alirezaafshan.com   -> 127.0.0.1:3010  aquarium
birds.alirezaafshan.com  -> 127.0.0.1:3020  birdoftheday
```

Each app keeps its own Git repo and Dockerfile. This repo provides the central
webhook, the shared Docker rollout script, systemd/sudo examples, Caddy examples,
and a GitHub Actions workflow template.

## Architecture

```text
GitHub Actions
  POST /deploy/aquarium
        |
        v
Central webhook, unprivileged deploy-manager user
        |
        v
sudo /usr/local/sbin/deploy-app-run aquarium <sha>
        |
        v
/etc/deploy-manager/apps/aquarium.env
        |
        v
docker build, candidate health check, production swap, rollback on failure
```

The public app traffic still goes through Caddy to local-only Docker ports. The
deploy webhook should also be proxied by Caddy to a loopback-only manager port.

## Files

- `src/server.mjs`: central signed webhook server.
- `bin/deploy-app.sh`: generic Docker deployment script.
- `bin/deploy-app-run`: root-side wrapper that maps app IDs to env files.
- `bin/deploy-manager-sudo`: unprivileged wrapper used by the webhook process.
- `examples/apps.json`: allowlisted apps and their GitHub repo names.
- `examples/apps/*.env`: per-app deployment settings.
- `examples/github-actions/deploy.yml`: workflow template for app repos.
- `examples/caddy/Caddyfile`: public app and deploy webhook routing example.
- `install/systemd/deploy-manager.service`: systemd unit example.
- `install/sudoers/deploy-manager`: narrow sudoers example.

## VPS Configuration

Install the repo somewhere root-owned, usually:

```bash
sudo mkdir -p /opt/deploy-manager
sudo rsync -a ./ /opt/deploy-manager/
```

Install wrappers:

```bash
sudo install -o root -g root -m 0755 /opt/deploy-manager/bin/deploy-app-run /usr/local/sbin/deploy-app-run
sudo install -o root -g root -m 0755 /opt/deploy-manager/bin/deploy-manager-sudo /usr/local/bin/deploy-manager-sudo
```

Create the service user:

```bash
sudo useradd --system --home /nonexistent --shell /usr/sbin/nologin deploy-manager
```

Create config directories:

```bash
sudo mkdir -p /etc/deploy-manager/apps
sudo mkdir -p /var/log/deploy-manager
```

Copy and edit the central config:

```bash
sudo cp /opt/deploy-manager/examples/apps.json /etc/deploy-manager/apps.json
sudo cp /opt/deploy-manager/examples/deploy-manager.env.example /etc/deploy-manager/deploy-manager.env
sudo chmod 0600 /etc/deploy-manager/deploy-manager.env
```

Copy and edit app configs:

```bash
sudo cp /opt/deploy-manager/examples/apps/aquarium.env /etc/deploy-manager/apps/aquarium.env
sudo cp /opt/deploy-manager/examples/apps/birds.env /etc/deploy-manager/apps/birds.env
sudo chmod 0644 /etc/deploy-manager/apps/*.env
```

Install systemd and sudoers files:

```bash
sudo cp /opt/deploy-manager/install/systemd/deploy-manager.service /etc/systemd/system/deploy-manager.service
sudo cp /opt/deploy-manager/install/sudoers/deploy-manager /etc/sudoers.d/deploy-manager
sudo chmod 0440 /etc/sudoers.d/deploy-manager
sudo visudo -cf /etc/sudoers.d/deploy-manager
```

Start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now deploy-manager
sudo systemctl status deploy-manager --no-pager
```

## App Config

Every app has two config entries.

The central allowlist in `/etc/deploy-manager/apps.json` controls which webhook
paths exist and which GitHub repo is allowed:

```json
{
  "apps": {
    "aquarium": {
      "repo": "your-github-user/aquarium",
      "branch": "master",
      "event": "push",
      "secretEnv": "AQUARIUM_DEPLOY_WEBHOOK_SECRET"
    }
  }
}
```

The root-side app env file controls deployment behavior:

```bash
APP_ID=aquarium
REPO_DIR=/opt/aquarium/app
REPO_USER=codex
BRANCH=master

IMAGE_NAME=aquarium-app
CONTAINER_NAME=aquarium-app
CANDIDATE_CONTAINER_NAME=aquarium-app-candidate

APP_PORT=3010
CANDIDATE_APP_PORT=3011
CONTAINER_PORT=3000
HEALTH_PATH=/healthz

LOG_FILE=/opt/aquarium/deploy.log
```

The app ID in the URL maps to `/etc/deploy-manager/apps/<app-id>.env`. For
example, `/deploy/aquarium` maps to `/etc/deploy-manager/apps/aquarium.env`.

## App Repo Requirements

Each app repo should have:

- a Dockerfile
- a stable branch, usually `master` or `main`
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
rollback to old image if production health fails
```

## GitHub Actions Secrets

In each app repo, configure:

```text
DEPLOY_WEBHOOK_URL=https://deploy.alirezaafshan.com/deploy/aquarium
DEPLOY_WEBHOOK_SECRET=<same value as AQUARIUM_DEPLOY_WEBHOOK_SECRET on the VPS>
```

For birds:

```text
DEPLOY_WEBHOOK_URL=https://deploy.alirezaafshan.com/deploy/birds
DEPLOY_WEBHOOK_SECRET=<same value as BIRDS_DEPLOY_WEBHOOK_SECRET on the VPS>
```

## Caddy

Use Caddy to route public traffic to each app's local-only Docker port:

```caddyfile
fish.alirezaafshan.com {
  reverse_proxy 127.0.0.1:3010
}

birds.alirezaafshan.com {
  reverse_proxy 127.0.0.1:3020
}

deploy.alirezaafshan.com {
  reverse_proxy 127.0.0.1:9000
}
```

The app containers should bind only to `127.0.0.1`, not the public interface.

## Manual Checks

Check the manager:

```bash
curl -I http://127.0.0.1:9000/healthz
systemctl status deploy-manager --no-pager
```

Check deployed apps:

```bash
curl -I https://fish.alirezaafshan.com/healthz
curl -I https://birds.alirezaafshan.com/healthz
sudo docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
```

Check logs:

```bash
sudo journalctl -u deploy-manager -n 100 --no-pager
sudo tail -n 100 /opt/aquarium/deploy.log
sudo tail -n 100 /opt/birdoftheday/deploy.log
```

## Migration Recommendation

Keep the existing website deploy service running while this is introduced.
Deploy `aquarium` first, then `birds`, and migrate `website` last. See
`docs/migration-plan.md`.
