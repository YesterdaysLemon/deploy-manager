<!-- al-stack:project:start -->
## Al-stack project

Project: deploy-manager. Profile: web. Status: experimental.

Release control plane for Dockerized apps on one Linux VPS

`al-stack.toml` records this project's setup and dependencies. Work from the checkout selected for the task; other branches/worktrees are optional history. Use `al-stack register .` once when starting work here. Local registration does not change the project's lifecycle.

Project commands:
- test: `npm test`
- check: `npm run check:ci`

Edit project guidance outside this managed section. Use `al-stack configure` for its fields and `al-stack check .` for setup checks. Run the actual project checks for behavioral validation.
<!-- al-stack:project:end -->

Read README.md and docs/agent-quickstart.md before release changes. Preserve the root-owned control boundary in docs/self-update.md. Runtime and package-free checks must not require installed dependencies. Run npm test and npm run check:ci for implementation changes.

Restarting the manager stops any rollout in its cgroup. The root updater and bootstrap read `lane.busy` from `/api/releases` and restart only when it is `false`; keep that field stable, and keep every root-plane change (updater, `deploy-app-run`, `deploy-app.sh`, units) documented as needing a bootstrap re-run (docs/self-update.md, "Release lane and restarts"). `tests/updater-integration.sh` runs as root in CI only.
