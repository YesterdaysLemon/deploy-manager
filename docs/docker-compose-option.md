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
  website:
    build:
      context: /opt/website/app
    image: website-app
    container_name: website-app
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"

  aquarium:
    build:
      context: /opt/aquarium/app
    image: aquarium-app
    container_name: aquarium-app
    restart: unless-stopped
    ports:
      - "127.0.0.1:3010:3000"

  birds:
    build:
      context: /opt/birdoftheday/app
    image: birdoftheday-app
    container_name: birdoftheday-app
    restart: unless-stopped
    ports:
      - "127.0.0.1:3020:3000"
```

The manager in this repo intentionally uses direct Docker commands so it can
preserve the candidate-container health check before production replacement.
