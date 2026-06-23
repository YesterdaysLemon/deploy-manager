#!/usr/bin/env sh
set -eu

STAGING_DIR="${1:-$(pwd)}"
INSTALL_DIR="${INSTALL_DIR:-/opt/deploy-manager}"
CONFIG_DIR="${CONFIG_DIR:-/etc/deploy-manager}"
APP_CONFIG_DIR="${APP_CONFIG_DIR:-${CONFIG_DIR}/apps}"
RUNTIME_ENV_DIR="${RUNTIME_ENV_DIR:-${CONFIG_DIR}/runtime-env}"
LOG_DIR="${LOG_DIR:-/var/log/deploy-manager}"

if [ "$(id -u)" -ne 0 ]; then
  echo "install-on-vps: run with sudo" >&2
  exit 77
fi

if [ ! -d "$STAGING_DIR" ]; then
  echo "install-on-vps: staging directory not found: $STAGING_DIR" >&2
  exit 66
fi

random_secret() {
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 32
    return
  fi

  head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n'
}

install -d -o root -g root -m 0755 "$INSTALL_DIR"
tar -C "$STAGING_DIR" -cf - . | tar --no-same-owner -C "$INSTALL_DIR" -xf -
chown -R root:root "$INSTALL_DIR"
chmod -R go-w "$INSTALL_DIR"

install -o root -g root -m 0755 "$INSTALL_DIR/bin/deploy-app-run" /usr/local/sbin/deploy-app-run
install -o root -g root -m 0755 "$INSTALL_DIR/bin/deploy-manager-sudo" /usr/local/bin/deploy-manager-sudo

if ! id deploy-manager >/dev/null 2>&1; then
  useradd --system --home /nonexistent --shell /usr/sbin/nologin deploy-manager
fi

install -d -o root -g root -m 0755 "$CONFIG_DIR"
install -d -o root -g root -m 0755 "$APP_CONFIG_DIR"
install -d -o root -g root -m 0750 "$RUNTIME_ENV_DIR"
install -d -o root -g root -m 0755 "$LOG_DIR"

if [ ! -f "$CONFIG_DIR/apps.json" ]; then
  install -o root -g root -m 0644 "$INSTALL_DIR/examples/apps.json" "$CONFIG_DIR/apps.json"
fi

if [ ! -f "$CONFIG_DIR/deploy-manager.env" ]; then
  umask 077
  {
    echo "DEPLOY_MANAGER_APPS_FILE=$CONFIG_DIR/apps.json"
    echo "DEPLOY_MANAGER_HOST=127.0.0.1"
    echo "DEPLOY_MANAGER_PORT=9000"
    echo "DEPLOY_MANAGER_SCRIPT=/usr/local/bin/deploy-manager-sudo"
    echo "DEPLOY_MANAGER_MAX_BYTES=65536"
    echo
    echo "PORTFOLIO_DEPLOY_WEBHOOK_SECRET=$(random_secret)"
    echo "APP_ONE_DEPLOY_WEBHOOK_SECRET=$(random_secret)"
    echo "APP_TWO_DEPLOY_WEBHOOK_SECRET=$(random_secret)"
  } > "$CONFIG_DIR/deploy-manager.env"
fi

for app_env in "$INSTALL_DIR"/examples/apps/*.env; do
  app_name="$(basename "$app_env")"
  if [ ! -f "$APP_CONFIG_DIR/$app_name" ]; then
    install -o root -g root -m 0644 "$app_env" "$APP_CONFIG_DIR/$app_name"
  fi
done

install -o root -g root -m 0440 "$INSTALL_DIR/install/sudoers/deploy-manager" /etc/sudoers.d/deploy-manager
visudo -cf /etc/sudoers.d/deploy-manager >/dev/null

install -o root -g root -m 0644 "$INSTALL_DIR/install/systemd/deploy-manager.service" /etc/systemd/system/deploy-manager.service
systemctl daemon-reload
systemctl enable --now deploy-manager
systemctl restart deploy-manager

echo "deploy-manager installed at $INSTALL_DIR"
echo "config installed at $CONFIG_DIR"
echo "service status:"
systemctl --no-pager --lines=0 status deploy-manager
