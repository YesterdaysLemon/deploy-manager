# Deploy Manager

Central webhook and Docker rollout manager for small VPS-hosted web apps.

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

## Architecture

```text
GitHub Actions
  POST /deploy/app-one
        |
        v
Central webhook, unprivileged deploy-manager user
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

## Files

- `src/server.mjs`: central signed webhook server.
- `bin/deploy-app.sh`: generic Docker deployment script.
- `bin/deploy-app-run`: root-side wrapper that maps app IDs to env files.
- `bin/deploy-manager-sudo`: unprivileged wrapper used by the webhook process.
- `scripts/deploy-app-now.sh`: optional manual deploy helper for an app ID.
- `examples/apps.json`: allowlisted apps and GitHub repo names.
- `examples/apps/*.env`: per-app deployment settings.
- `examples/github-actions/deploy.yml`: workflow template for app repos.
- `examples/caddy/Caddyfile`: public app and deploy webhook routing example.
- `install/install-on-vps.sh`: simple installer for a fresh VPS setup.
- `install/systemd/deploy-manager.service`: systemd unit example.
- `install/sudoers/deploy-manager`: narrow sudoers example.

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
/usr/local/sbin/deploy-app-run
/usr/local/bin/deploy-manager-sudo
/etc/systemd/system/deploy-manager.service
/etc/sudoers.d/deploy-manager
```

Edit `/etc/deploy-manager/apps.json`, `/etc/deploy-manager/apps/*.env`, and
`/etc/deploy-manager/deploy-manager.env` for the real domains, repos, ports,
branches, and webhook secrets.

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
