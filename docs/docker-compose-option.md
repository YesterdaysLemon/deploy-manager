# Docker Compose Option

Docker Compose can be useful as a runtime inventory, but it is not required for
this manager.

The current deploy script starts and health-checks a candidate container before
replacing production. Plain `docker compose up -d --build app` is simpler, but
does not provide the same candidate check and rollback behavior.

If you prefer Compose later, use it for the steady-state services and keep the
webhook manager as the entrypoint:

```yaml
services:
  portfolio:
    build:
      context: /opt/portfolio/app
    image: portfolio-app
    container_name: portfolio-app
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"

  app-one:
    build:
      context: /opt/app-one/app
    image: app-one
    container_name: app-one
    restart: unless-stopped
    ports:
      - "127.0.0.1:3010:3000"

  app-two:
    build:
      context: /opt/app-two/app
    image: app-two
    container_name: app-two
    restart: unless-stopped
    ports:
      - "127.0.0.1:3020:3000"
```

The manager in this repo intentionally uses direct Docker commands so it can
preserve the candidate-container health check before production replacement.
