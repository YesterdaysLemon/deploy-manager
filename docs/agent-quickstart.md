# Agent quickstart

This guide is the safest starting point when a coding agent is helping an
operator add an application to Deploy Manager. It is a preparation contract,
not permission to change production.

Deploy Manager fits a deliberately narrow environment: one Linux VPS, several
independently deployed Dockerized web apps, a loopback-facing reverse proxy,
and GitHub Actions as the validation and release initiator. Use a cluster
orchestrator or managed platform when the requirement is multi-node scheduling,
replicas, autoscaling, traffic splitting, or a highly available control plane.

## First prompt

Replace `<app-id>` and give this to the agent from a checkout of this repository:

```text
Use Deploy Manager to prepare <app-id> for release on my single Linux VPS.

Read README.md and docs/agent-quickstart.md first. Inspect the app's Dockerfile,
stable branch, health endpoint, runtime secrets, desired loopback ports, and
reverse-proxy route.

Prepare a version 1 fleet spec from examples/fleet.json, validate it with
`npm run setup:agent -- --from <file> --check`, then generate a review bundle.
Run the repository checks. Do not mutate production, sudoers, systemd, DNS, the
reverse proxy, or credentials until I review the spec, receipt, and exact diff.
```

## Inputs the agent must collect

- a URL-safe app ID;
- the exact GitHub `owner/repository`, stable branch, and VPS checkout path;
- the unprivileged VPS user that owns the checkout;
- image, production-container, and candidate-container names;
- an unused production loopback port, an unused candidate loopback port, and
  the port exposed inside the container;
- a health path that fails when the app is not ready;
- any root-readable runtime env file and optional user-defined Docker network;
- the public hostname and current reverse-proxy owner;
- names for the GitHub URL/secret and VPS secret environment variables.

Do not invent ports, paths, users, repository names, or secret values. Inspect
the target host read-only or ask the operator.

## Preparation sequence

For an existing fleet, use [add-app.md](add-app.md) and its additive registration
command. A one-app setup bundle must not replace the installed fleet files.
The sequence below describes generating a fresh fleet bundle.

1. Copy `examples/fleet.json` outside the repository's tracked files and fill
   it with inspected values. Do not include any secret values.
2. Run `npm run setup:agent -- --from <fleet.json> --check`. Resolve every
   validation error rather than weakening or bypassing the generator.
3. Generate a new review directory with `--output`. The command refuses to
   overwrite a non-empty directory.
4. Review the generated `apps.json` and `apps/<app-id>.env`. The production and
   candidate host ports must be distinct and loopback-only.
5. If the app needs a sidecar, set `dockerNetwork` so both candidate and
   production containers see the same user-defined network. Use
   `runtimeEnvFile` for runtime environment variables rather than putting
   secrets in source control.
6. Replace the generated workflow's intentional `exit 1` with the app's real
   tests and build. Those checks must precede the signed notification step;
   keep the generated receipt-polling loop so CI does not confuse acceptance
   with a completed release.
   Set the repository variable `DEPLOY_ENABLED=true` after those checks and
   webhook secrets are configured. Push and manual dispatch deploy only the
   configured branch; pull requests run validation only. Manual dispatch sends
   the manager's `push` release event using nonreserved `DEPLOY_*` variables.
7. Review the generated Caddy proposal. Do not
   reload the proxy until the operator has verified the port and hostname.
8. Run `npm test` and `npm run check` in this repository. Run the app's own
   build and tests independently.
9. Present the normalized `fleet.json`, `SETUP-RECEIPT.md`, exact configuration
   diff, secret names, commands, health URL,
   expected downtime boundary, rollback behavior, and verification plan.

The signed `POST /deploy/<app-id>` response is an acceptance receipt, not a
completion claim. It returns HTTP `202`, `job.id`, and `receipt`. Poll the
read-only receipt until it reaches `succeeded`, `failed`, `rolled-back`, or
`interrupted`, and preserve that job ID in the operator verification receipt.
Repeating the same semantic app/repository/branch/SHA payload returns the
original job and does not enqueue another deployment.

## Production boundary

The agent should stop before any of these unless the operator explicitly
authorizes the exact action:

- writing under `/etc`, `/opt`, `/usr/local`, or `/var`;
- invoking `sudo`, installing or editing systemd units, or changing sudoers;
- creating or rotating GitHub/VPS secrets;
- changing DNS, Caddy, firewall rules, or a public route;
- starting, stopping, replacing, or deleting production containers;
- running the one-time self-update bootstrap.

The normal rollout intentionally stops and removes the old production container
before binding the new one to the same loopback port. Treat this as a small
cutover window, not a zero-downtime guarantee.

## Operator verification receipt

Before calling the integration complete, record:

- the app ID, repository, branch, and exact deployed SHA;
- the production and candidate health URLs;
- the production container's SHA-tagged image;
- the signed workflow run that requested the deployment;
- the Deploy Manager job ID and terminal `/api/releases/<job-id>` receipt;
- manager and app log excerpts showing successful candidate and production
  health checks;
- public HTTPS health after the reverse proxy;
- the known-good image available for rollback;
- every configuration or privileged file changed.

Never describe a prepared config, passing local test, or simulated city rollout
as a completed production deployment.
