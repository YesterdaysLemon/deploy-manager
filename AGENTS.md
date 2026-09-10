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
