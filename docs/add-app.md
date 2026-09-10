# Add one app to an existing fleet

Use `scripts/register-app.mjs` on the Linux VPS from a reviewed checkout. It
plans and applies additive Deploy Manager configuration without installing a
privileged entrypoint. The webhook and automatic updater never invoke it.
Node 22, Git, Docker, `id`, `runuser` (when root) and `ss` are required.

Prepare a version 1 spec with **one app** using `examples/fleet.json`. Use the
installed manager port and hostname. Inspect the fleet, Caddy configuration,
listening ports and checkout ownership. Clone the intended app repository as
its unprivileged owner before planning. New datastore relationships remain a
separate configuration task. The checkout's absolute real path, owner and
GitHub origin must match the spec.

Within the operator's existing authorization, generate the plan:

```bash
sudo node scripts/register-app.mjs --from /root/new-app.json \
  --config /etc/deploy-manager --output /root/new-app-review
git diff --no-index /root/new-app-review/before /root/new-app-review/after
```

The diff command returns 1 for expected differences. Planning reads the
existing allowlist, topology, manager settings and **all** per-app env files,
including entries absent from the allowlist. It never sources shell config or
copies manager secrets into the review bundle. Keep the bundle private: it
contains site configuration and repository paths. Literal env assignments are
required; dynamic shell settings fail with the setting name only.

Review the exact additions and reported SHA256. The tool rejects conflicting
IDs, repositories, overlapping checkout paths, secret variable names, image and
container names, hostnames, production/candidate ports and city plots. It checks
live listeners, stopped containers, checkout ownership and origin at planning
and again at apply. It pins previously inferred city plots to their existing
positions before assigning the new app, preserving other fields and entities.
The rest of the existing fleet need not be converted to a new spec.

```bash
sudo node scripts/register-app.mjs \
  --apply /root/new-app-review/plan.json --expect <reviewed-sha256>
```

Apply reconstructs the plan and checks hashes, ownership and permissions of
every inspected file. Changed configuration or a modified proposal requires a
fresh plan. It serializes registration commands with `.registration-lock`,
backs up changed files under `/etc/deploy-manager/.registration-backups/`,
then writes the new app env, topology, and allowlist in that order with atomic
file replacements. Existing ownership and modes are preserved; the new env
is mode 0600. It verifies written bytes and restores previous files if a write
fails. Release journals and unrelated env files are untouched.

This is a configuration transaction, not a deployment or a cross-service
transaction. Serialize other operator configuration edits too. After process
termination or power loss, inspect the reported backup and `receipt.json`,
restore the two previous JSON files with the recorded ownership/modes, remove
the newly created app env if rolling back, and remove a stale registration lock
only after confirming no registration process is running. Backups are retained.

## Activate and verify

1. Provision the named webhook secret through the approved credential path in
   the manager environment and app repository. Do not print secret values.
2. Review `Caddyfile.addition` against the **complete** active Caddy configuration,
   including imported routes and wildcard hosts. It is an addition, never a
   replacement for the existing Caddyfile. Validate with `caddy validate`
   before reloading. Configure DNS within the authorized publishing task.
3. Confirm the release lane is idle before restarting the manager to load its
   new environment. Verify manager health and all existing route probes. The
   helper does not restart services, edit Caddy/DNS/secrets, clone repositories,
   change sudoers, install root scripts or start containers.
4. Put the reviewed `deploy.yml` into the app repository, replace its deliberate
   validation failure with real checks, set webhook secrets and
   `DEPLOY_ENABLED=true`, and run the configured branch's release workflow.
5. Record the exact requested SHA, successful workflow, terminal manager receipt,
   candidate/production health, SHA-tagged image, public HTTPS health and public
   build/version SHA. Acceptance or a registered config alone is incomplete.

Keep root-owned deployment wrappers outside automatic releases as described
in [self-update.md](self-update.md). Existing generic wrapper authorization
usually already covers registered app IDs; inspect it instead of copying a
new per-app sudoers recipe. For a failed release, follow the existing rollout
receipt and rollback path; configuration rollback is a separate operator action.
