#!/usr/bin/env sh
set -eu

# Exercise the real updater as root without touching systemd, the network, or
# paths outside a unique /tmp tree. GitHub/API responses and service health are
# deterministic fixtures; extraction, privilege dropping, npm checks, atomic
# link replacement, and rollback use the production implementation.

PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
export PATH

if [ "$(id -u)" -ne 0 ]; then
  echo "updater-integration: run as root (CI uses sudo)" >&2
  exit 77
fi

REPOSITORY_ROOT="$(CDPATH='' cd -- "$(dirname "$0")/.." && pwd -P)"
TEST_ROOT="$(mktemp -d /tmp/deploy-manager-updater-test.XXXXXX)"

cleanup() {
  case "$TEST_ROOT" in
    /tmp/deploy-manager-updater-test.*) rm -rf -- "$TEST_ROOT" ;;
  esac
}
trap cleanup EXIT
trap 'exit 129' HUP
trap 'exit 130' INT
trap 'exit 143' TERM

TARGET_SHA="1111111111111111111111111111111111111111"
PREVIOUS_SHA="0000000000000000000000000000000000000000"
RELEASE_ROOT="$TEST_ROOT/releases"
ACTIVE_LINK="$TEST_ROOT/current"
STATE_DIR="$TEST_ROOT/state"
BUILD_HOME="$TEST_ROOT/build-home"
FAKE_BIN="$TEST_ROOT/bin"
FIXTURE_ROOT="$TEST_ROOT/fixture"
ARCHIVE="$TEST_ROOT/release.tar.gz"
MANAGER_ENV="$TEST_ROOT/deploy-manager.env"
CONFIG_FILE="$TEST_ROOT/self-update.env"
HEALTH_STATE="$TEST_ROOT/health-state"
SYSTEMCTL_MODE="$TEST_ROOT/systemctl-mode"

BUILD_USER=nobody
BUILD_GROUP="$(id -gn "$BUILD_USER")"

chown root:"$BUILD_GROUP" "$TEST_ROOT"
chmod 0750 "$TEST_ROOT"
install -d -m 0755 "$FAKE_BIN" "$FIXTURE_ROOT/release/src" "$RELEASE_ROOT/$PREVIOUS_SHA"
install -d -o "$BUILD_USER" -g "$BUILD_GROUP" -m 0750 "$BUILD_HOME"

cat > "$FIXTURE_ROOT/release/package.json" <<'EOF'
{
  "name": "deploy-manager",
  "private": true,
  "scripts": { "check": "node check.mjs" }
}
EOF
cat > "$FIXTURE_ROOT/release/check.mjs" <<'EOF'
if (process.getuid?.() === 0) throw new Error("release checks ran as root");
EOF
cat > "$FIXTURE_ROOT/release/src/server.mjs" <<'EOF'
// Minimal fixture required by validate_release.
EOF
tar -czf "$ARCHIVE" -C "$FIXTURE_ROOT" release

cat > "$MANAGER_ENV" <<'EOF'
DEPLOY_MANAGER_HOST=127.0.0.1
DEPLOY_MANAGER_PORT=9000
EOF

cat > "$CONFIG_FILE" <<EOF
DEPLOY_MANAGER_UPDATE_REPOSITORY=example/deploy-manager
DEPLOY_MANAGER_UPDATE_BRANCH=main
DEPLOY_MANAGER_UPDATE_WORKFLOW=check.yml
DEPLOY_MANAGER_REQUIRE_DEFAULT_BRANCH=1
DEPLOY_MANAGER_RELEASE_ROOT=$RELEASE_ROOT
DEPLOY_MANAGER_ACTIVE_LINK=$ACTIVE_LINK
DEPLOY_MANAGER_UPDATE_STATE_DIR=$STATE_DIR
DEPLOY_MANAGER_UPDATE_LOCK_FILE=$TEST_ROOT/update.lock
DEPLOY_MANAGER_ENV_FILE=$MANAGER_ENV
DEPLOY_MANAGER_SERVICE=deploy-manager.service
DEPLOY_MANAGER_BUILD_USER=$BUILD_USER
DEPLOY_MANAGER_BUILD_HOME=$BUILD_HOME
DEPLOY_MANAGER_GITHUB_API_ROOT=https://api.invalid
DEPLOY_MANAGER_UPDATE_HEALTH_ATTEMPTS=1
DEPLOY_MANAGER_UPDATE_HEALTH_SLEEP_SECONDS=0
EOF

cat > "$FAKE_BIN/curl" <<'EOF'
#!/usr/bin/env sh
set -eu

url=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --output) shift 2 ;;
    http://*|https://*) url="$1"; shift ;;
    *) shift ;;
  esac
done

case "$url" in
  */repos/example/deploy-manager)
    printf '%s\n' '{"default_branch":"main"}'
    ;;
  */repos/example/deploy-manager/commits/main)
    printf '{"sha":"%s"}\n' "$FAKE_TARGET_SHA"
    ;;
  */repos/example/deploy-manager/actions/workflows/check.yml/runs*)
    printf '{"workflow_runs":[{"head_sha":"%s","status":"completed","conclusion":"success"}]}\n' "$FAKE_TARGET_SHA"
    ;;
  */repos/example/deploy-manager/tarball/*)
    cat "$FAKE_ARCHIVE"
    ;;
  http://127.0.0.1:9000/healthz)
    [ "$(cat "$FAKE_HEALTH_STATE")" = "ok" ]
    ;;
  *)
    echo "fake curl: unexpected URL: $url" >&2
    exit 2
    ;;
esac
EOF
chmod 0755 "$FAKE_BIN/curl"

cat > "$FAKE_BIN/systemctl" <<'EOF'
#!/usr/bin/env sh
set -eu

case "${1:-}" in
  daemon-reload)
    [ "$(cat "$FAKE_SYSTEMCTL_MODE")" != "daemon-fail" ]
    ;;
  restart)
    active_target="$(readlink -f "$FAKE_ACTIVE_LINK")"
    if [ "$(basename "$active_target")" = "$FAKE_TARGET_SHA" ] &&
       [ "$(cat "$FAKE_SYSTEMCTL_MODE")" = "health-fail" ]; then
      echo fail > "$FAKE_HEALTH_STATE"
    else
      echo ok > "$FAKE_HEALTH_STATE"
    fi
    ;;
  *)
    echo "fake systemctl: unexpected invocation: $*" >&2
    exit 2
    ;;
esac
EOF
chmod 0755 "$FAKE_BIN/systemctl"

export FAKE_ACTIVE_LINK="$ACTIVE_LINK"
export FAKE_ARCHIVE="$ARCHIVE"
export FAKE_HEALTH_STATE="$HEALTH_STATE"
export FAKE_SYSTEMCTL_MODE="$SYSTEMCTL_MODE"
export FAKE_TARGET_SHA="$TARGET_SHA"
export DEPLOY_MANAGER_UPDATE_CONFIG="$CONFIG_FILE"
export DEPLOY_MANAGER_UPDATE_PATH="$FAKE_BIN:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

activate_previous() {
  rm -f -- "$ACTIVE_LINK"
  ln -s "$RELEASE_ROOT/$PREVIOUS_SHA" "$ACTIVE_LINK"
  echo ok > "$HEALTH_STATE"
}

assert_previous_restored() {
  [ "$(readlink -f "$ACTIVE_LINK")" = "$RELEASE_ROOT/$PREVIOUS_SHA" ]
  [ ! -e "$RELEASE_ROOT/$TARGET_SHA" ]
  [ "$(cat "$HEALTH_STATE")" = "ok" ]
}

activate_previous
echo success > "$SYSTEMCTL_MODE"
"$REPOSITORY_ROOT/install/update-deploy-manager" --sha "$TARGET_SHA"
[ "$(readlink -f "$ACTIVE_LINK")" = "$RELEASE_ROOT/$TARGET_SHA" ]
[ "$(cat "$STATE_DIR/active-sha")" = "$TARGET_SHA" ]

activate_previous
echo health-fail > "$SYSTEMCTL_MODE"
if "$REPOSITORY_ROOT/install/update-deploy-manager" --sha "$TARGET_SHA"; then
  echo "updater-integration: unhealthy activation unexpectedly succeeded" >&2
  exit 1
fi
assert_previous_restored

activate_previous
echo daemon-fail > "$SYSTEMCTL_MODE"
if "$REPOSITORY_ROOT/install/update-deploy-manager" --sha "$TARGET_SHA"; then
  echo "updater-integration: daemon-reload failure unexpectedly succeeded" >&2
  exit 1
fi
assert_previous_restored

echo "updater-integration: activation and rollback scenarios passed"
