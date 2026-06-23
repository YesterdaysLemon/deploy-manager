#!/usr/bin/env sh
set -eu

APP_ID="${1:-}"
ENV_ROOT="${DEPLOY_MANAGER_APP_ENV_ROOT:-/etc/deploy-manager/apps}"

case "$APP_ID" in
  ""|*[!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-]*)
    echo "deploy-app-now: invalid app id" >&2
    exit 64
    ;;
esac

if [ "$(id -u)" -ne 0 ]; then
  echo "deploy-app-now: run with sudo" >&2
  exit 77
fi

ENV_FILE="$ENV_ROOT/$APP_ID.env"

if [ ! -r "$ENV_FILE" ]; then
  echo "deploy-app-now: missing app env file: $ENV_FILE" >&2
  exit 66
fi

REPO_DIR="$(awk -F= '$1 == "REPO_DIR" { print $2 }' "$ENV_FILE" | tail -n 1)"
REPO_USER="$(awk -F= '$1 == "REPO_USER" { print $2 }' "$ENV_FILE" | tail -n 1)"
BRANCH="$(awk -F= '$1 == "BRANCH" { print $2 }' "$ENV_FILE" | tail -n 1)"

REPO_USER="${REPO_USER:-deploy}"
BRANCH="${BRANCH:-master}"

if [ -z "$REPO_DIR" ]; then
  echo "deploy-app-now: REPO_DIR is required in $ENV_FILE" >&2
  exit 66
fi

sudo -u "$REPO_USER" -H git -C "$REPO_DIR" fetch origin "$BRANCH"
SHA="$(sudo -u "$REPO_USER" -H git -C "$REPO_DIR" rev-parse "origin/$BRANCH")"

echo "Deploying $APP_ID at $SHA"
exec /usr/local/sbin/deploy-app-run "$APP_ID" "$SHA"
