# Migration Plan

This manager can be introduced beside an existing single-app deployment before
the original path is retired.

## Safe rollout order

1. Install the manager on the VPS at `/opt/deploy-manager`.
2. Run it on a local webhook port that does not conflict with any existing
   webhook.
3. Add Caddy routing for a dedicated deploy subdomain, such as
   `deploy.example.com`, to the manager port.
4. Configure one low-risk app first:
   - clone the repo into `/opt/<app>/app`
   - add `/etc/deploy-manager/apps/<app>.env`
   - add the app entry in `/etc/deploy-manager/apps.json`
   - add GitHub secrets in the app repo
5. Push a harmless change and confirm:
   - the manager accepts the webhook
   - the candidate container passes health checks
   - the app subdomain resolves through Caddy
6. Repeat for the remaining apps.
7. Migrate any existing single-app webhook last.

## Rollback during migration

If the central manager misbehaves, leave the existing deployment service in
place until the new path is proven. Roll back by restoring the previous Caddy
config and pointing GitHub Actions back at the old webhook.
