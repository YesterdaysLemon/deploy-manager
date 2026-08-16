#!/usr/bin/env sh
set -eu

# One-time migration from the legacy flat /opt/deploy-manager install to the
# versioned, rollback-safe self-update layout. This script is intentionally
# manual: it promotes the privileged control plane that automatic updates are
# never allowed to replace.

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH

PROGRAM="bootstrap-self-update"
MODE="apply"

if [ "${1:-}" = "--check" ]; then
  MODE="check"
  shift
fi

STAGING_DIR="${1:-$(pwd)}"
REPOSITORY="${DEPLOY_MANAGER_UPDATE_REPOSITORY:-YesterdaysLemon/deploy-manager}"
BRANCH="${DEPLOY_MANAGER_UPDATE_BRANCH:-main}"
CONFIG_DIR="${DEPLOY_MANAGER_CONFIG_DIR:-/etc/deploy-manager}"
MANAGER_ENV="${DEPLOY_MANAGER_ENV_FILE:-${CONFIG_DIR}/deploy-manager.env}"
APPS_FILE="${DEPLOY_MANAGER_APPS_FILE:-${CONFIG_DIR}/apps.json}"
ACTIVE_LINK="${DEPLOY_MANAGER_ACTIVE_LINK:-/opt/deploy-manager-current}"
RELEASE_ROOT="${DEPLOY_MANAGER_RELEASE_ROOT:-/opt/deploy-manager-releases}"
STATE_DIR="${DEPLOY_MANAGER_UPDATE_STATE_DIR:-/var/lib/deploy-manager-update}"
BUILD_HOME="${DEPLOY_MANAGER_BUILD_HOME:-/var/lib/deploy-manager-build}"
BACKUP_ROOT="${DEPLOY_MANAGER_BOOTSTRAP_BACKUP_ROOT:-/root/deploy-manager-bootstrap-backups}"
SERVICE="${DEPLOY_MANAGER_SERVICE:-deploy-manager.service}"

log() {
  printf '%s %s %s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$PROGRAM" "$*"
}

fail() {
  log "failure reason=$*" >&2
  exit 1
}

if [ "$#" -gt 1 ]; then
  echo "usage: $PROGRAM [--check] [staging-directory]" >&2
  exit 64
fi

if [ "$(id -u)" -ne 0 ]; then
  fail "must_run_with_sudo"
fi

for command_name in awk cp curl git grep install mktemp mv node npm readlink runuser sed systemctl useradd visudo; do
  command -v "$command_name" >/dev/null 2>&1 || fail "missing_command_$command_name"
done

[ -d "$STAGING_DIR" ] || fail "staging_directory_not_found path=$STAGING_DIR"
STAGING_DIR="$(cd "$STAGING_DIR" && pwd -P)"

for required_file in \
  package.json \
  src/server.mjs \
  bin/deploy-app.sh \
  bin/deploy-app-run \
  bin/deploy-manager-sudo \
  install/update-deploy-manager \
  install/sudoers/deploy-manager \
  install/systemd/deploy-manager-managed.service \
  install/systemd/deploy-manager-update.service \
  install/systemd/deploy-manager-update.timer \
  examples/self-update.env.example; do
  [ -f "$STAGING_DIR/$required_file" ] || fail "staging_file_missing path=$required_file"
done

source_sha="$(git -C "$STAGING_DIR" rev-parse HEAD 2>/dev/null || true)"
case "$source_sha" in
  *[!0123456789abcdefABCDEF]*|"") fail "staging_source_has_no_git_sha" ;;
esac
[ "${#source_sha}" -eq 40 ] || fail "staging_source_has_no_git_sha"

if [ -n "$(git -C "$STAGING_DIR" status --porcelain --untracked-files=all)" ]; then
  fail "staging_source_is_dirty"
fi

remote_sha="$(git -C "$STAGING_DIR" ls-remote origin "refs/heads/$BRANCH" | awk '{print $1}')"
[ -n "$remote_sha" ] || fail "cannot_resolve_remote_branch branch=$BRANCH"
if [ "$source_sha" != "$remote_sha" ]; then
  fail "staging_source_is_not_current_main source=$source_sha remote=$remote_sha"
fi

[ -r "$MANAGER_ENV" ] || fail "manager_env_not_readable path=$MANAGER_ENV"
[ -r "$APPS_FILE" ] || fail "apps_file_not_readable path=$APPS_FILE"
systemctl cat "$SERVICE" >/dev/null 2>&1 || fail "manager_service_not_installed service=$SERVICE"

DEPLOY_MANAGER_UPDATE_CONFIG=/dev/null \
DEPLOY_MANAGER_UPDATE_REPOSITORY="$REPOSITORY" \
DEPLOY_MANAGER_UPDATE_BRANCH="$BRANCH" \
DEPLOY_MANAGER_UPDATE_WORKFLOW=check.yml \
DEPLOY_MANAGER_REQUIRE_DEFAULT_BRANCH=1 \
  "$STAGING_DIR/install/update-deploy-manager" --preflight --sha "$source_sha"

manager_network="$({
  DEPLOY_MANAGER_HOST="127.0.0.1"
  DEPLOY_MANAGER_PORT="9000"
  # shellcheck disable=SC1090
  . "$MANAGER_ENV"
  printf '%s\n%s\n' "$DEPLOY_MANAGER_HOST" "$DEPLOY_MANAGER_PORT"
})"
DEPLOY_MANAGER_HOST="$(printf '%s\n' "$manager_network" | sed -n '1p')"
DEPLOY_MANAGER_PORT="$(printf '%s\n' "$manager_network" | sed -n '2p')"
case "$DEPLOY_MANAGER_HOST" in
  ""|*[!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:-]*)
    fail "invalid_manager_host"
    ;;
esac
case "$DEPLOY_MANAGER_PORT" in
  ""|*[!0123456789]*) fail "invalid_manager_port" ;;
esac
if [ "$DEPLOY_MANAGER_PORT" -lt 1 ] || [ "$DEPLOY_MANAGER_PORT" -gt 65535 ]; then
  fail "invalid_manager_port"
fi
health_url="http://${DEPLOY_MANAGER_HOST}:${DEPLOY_MANAGER_PORT}/healthz"
curl --fail --silent --show-error --max-time 5 --output /dev/null "$health_url" ||
  fail "current_manager_health_failed url=$health_url"

if [ "$MODE" = "check" ]; then
  log "check_success sha=$source_sha service=$SERVICE health=$health_url"
  echo "BOOTSTRAP_READY sha=$source_sha"
  exit 0
fi

timestamp="$(date -u +'%Y%m%dT%H%M%SZ')"
install -d -o root -g root -m 0700 "$BACKUP_ROOT"
backup_dir="$(mktemp -d "$BACKUP_ROOT/${timestamp}.XXXXXX")"
chmod 0700 "$backup_dir"
missing_manifest="$backup_dir/missing-paths.txt"
: > "$missing_manifest"

managed_paths="
/usr/local/sbin/deploy-app-run
/usr/local/bin/deploy-manager-sudo
/usr/local/libexec/deploy-manager/deploy-app.sh
/usr/local/sbin/update-deploy-manager
/etc/sudoers.d/deploy-manager
/etc/systemd/system/deploy-manager.service
/etc/systemd/system/deploy-manager-update.service
/etc/systemd/system/deploy-manager-update.timer
/etc/deploy-manager/self-update.env
"

for managed_path in $managed_paths; do
  if [ -e "$managed_path" ] || [ -L "$managed_path" ]; then
    install -d -m 0700 "$backup_dir$(dirname "$managed_path")"
    cp -a "$managed_path" "$backup_dir$managed_path"
  else
    echo "$managed_path" >> "$missing_manifest"
  fi
done

old_service_active="0"
if systemctl is-active --quiet "$SERVICE"; then
  old_service_active="1"
fi
old_active_link=""
if [ -L "$ACTIVE_LINK" ]; then
  old_active_link="$(readlink "$ACTIVE_LINK")"
elif [ -e "$ACTIVE_LINK" ]; then
  fail "active_path_exists_and_is_not_symlink path=$ACTIVE_LINK"
fi

bootstrap_restored="0"
bootstrap_complete="0"

restore_bootstrap() {
  if [ "$bootstrap_restored" = "1" ]; then
    return
  fi
  bootstrap_restored="1"
  log "restoring backup=$backup_dir" >&2
  systemctl disable --now deploy-manager-update.timer >/dev/null 2>&1 || true

  for managed_path in $managed_paths; do
    if [ -e "$backup_dir$managed_path" ] || [ -L "$backup_dir$managed_path" ]; then
      install -d -m 0755 "$(dirname "$managed_path")"
      rm -f -- "$managed_path"
      cp -a "$backup_dir$managed_path" "$managed_path"
    elif grep -Fx "$managed_path" "$missing_manifest" >/dev/null 2>&1; then
      rm -f -- "$managed_path"
    fi
  done

  if [ -n "$old_active_link" ]; then
    replacement="${ACTIVE_LINK}.restore.$$"
    rm -f -- "$replacement"
    ln -s "$old_active_link" "$replacement"
    mv -Tf "$replacement" "$ACTIVE_LINK"
  else
    rm -f -- "$ACTIVE_LINK"
  fi

  systemctl daemon-reload
  if [ "$old_service_active" = "1" ]; then
    systemctl restart "$SERVICE" || true
  fi
}

restore_on_failure() {
  status="$?"
  trap - EXIT
  if [ "$status" -ne 0 ] && [ "$bootstrap_complete" != "1" ]; then
    restore_bootstrap || true
  fi
  exit "$status"
}
trap restore_on_failure EXIT
trap 'exit 129' HUP
trap 'exit 130' INT
trap 'exit 143' TERM

if ! id deploy-manager >/dev/null 2>&1; then
  useradd --system --home /nonexistent --shell /usr/sbin/nologin deploy-manager
fi
if ! id deploy-manager-build >/dev/null 2>&1; then
  useradd --system --home "$BUILD_HOME" --create-home --shell /usr/sbin/nologin deploy-manager-build
fi
build_group="$(id -gn deploy-manager-build)"
install -d -o deploy-manager-build -g "$build_group" -m 0750 "$BUILD_HOME"

install -d -o root -g root -m 0755 /usr/local/libexec/deploy-manager
install -d -o root -g root -m 0755 "$RELEASE_ROOT"
install -d -o root -g "$build_group" -m 0750 "$STATE_DIR"
install -d -o root -g root -m 0755 "$CONFIG_DIR"

install -o root -g root -m 0755 "$STAGING_DIR/bin/deploy-app.sh" /usr/local/libexec/deploy-manager/deploy-app.sh
install -o root -g root -m 0755 "$STAGING_DIR/bin/deploy-app-run" /usr/local/sbin/deploy-app-run
install -o root -g root -m 0755 "$STAGING_DIR/bin/deploy-manager-sudo" /usr/local/bin/deploy-manager-sudo
install -o root -g root -m 0755 "$STAGING_DIR/install/update-deploy-manager" /usr/local/sbin/update-deploy-manager
install -o root -g root -m 0440 "$STAGING_DIR/install/sudoers/deploy-manager" /etc/sudoers.d/deploy-manager
install -o root -g root -m 0644 "$STAGING_DIR/install/systemd/deploy-manager-managed.service" /etc/systemd/system/deploy-manager.service
install -o root -g root -m 0644 "$STAGING_DIR/install/systemd/deploy-manager-update.service" /etc/systemd/system/deploy-manager-update.service
install -o root -g root -m 0644 "$STAGING_DIR/install/systemd/deploy-manager-update.timer" /etc/systemd/system/deploy-manager-update.timer

if [ ! -f "$CONFIG_DIR/self-update.env" ]; then
  install -o root -g root -m 0644 "$STAGING_DIR/examples/self-update.env.example" "$CONFIG_DIR/self-update.env"
fi

if ! visudo -cf /etc/sudoers.d/deploy-manager >/dev/null; then
  restore_bootstrap
  fail "sudoers_validation_failed backup=$backup_dir"
fi

systemctl daemon-reload
if ! /usr/local/sbin/update-deploy-manager --sha "$source_sha"; then
  restore_bootstrap
  fail "initial_release_activation_failed backup=$backup_dir"
fi

if ! systemctl enable --now deploy-manager-update.timer; then
  restore_bootstrap
  fail "update_timer_enable_failed backup=$backup_dir"
fi

if ! systemctl is-active --quiet "$SERVICE" ||
   ! curl --fail --silent --show-error --max-time 5 --output /dev/null "$health_url"; then
  restore_bootstrap
  fail "post_bootstrap_health_failed backup=$backup_dir"
fi

bootstrap_complete="1"
log "success sha=$source_sha backup=$backup_dir active_link=$ACTIVE_LINK legacy_install_untouched=/opt/deploy-manager"
echo "BOOTSTRAP_OK sha=$source_sha backup=$backup_dir active=$ACTIVE_LINK"
