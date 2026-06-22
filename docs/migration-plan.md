# Migration Plan

This manager is designed to run beside the existing website deployment first.
Do not point the current website workflow at it until another app has deployed
successfully.

## Safe rollout order

1. Install the manager on the VPS at `/opt/deploy-manager`.
2. Run it on a new local webhook port that does not conflict with the current
   website webhook. Port `9000` is fine only if the existing website webhook is
   stopped or moved. Otherwise use something like `9019` during testing.
3. Add Caddy routing for `deploy.alirezaafshan.com` to the manager port.
4. Configure only `aquarium` first:
   - clone the repo into `/opt/aquarium/app`
   - add `/etc/deploy-manager/apps/aquarium.env`
   - add the app entry in `/etc/deploy-manager/apps.json`
   - add GitHub secrets in the aquarium repo
5. Push a harmless change to aquarium and confirm:
   - the manager accepts the webhook
   - the candidate container passes health checks
   - `fish.alirezaafshan.com` resolves through Caddy
6. Repeat for `birds`.
7. Migrate `website` last by changing its GitHub `DEPLOY_WEBHOOK_URL` to the
   central manager endpoint.

## Rollback during migration

If the central manager misbehaves, leave the existing website deploy service
untouched and remove only the new Caddy route and systemd service for the
manager. The current website container and old webhook can keep running.
