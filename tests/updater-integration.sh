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
# One word per manager /api/releases request, in order; the last one repeats.
LANE_SCRIPT="$TEST_ROOT/lane-script"
LANE_CALLS="$TEST_ROOT/lane-calls"
SERVICE_STATE="$TEST_ROOT/service-state"

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
  "http://127.0.0.1:9000/api/releases?limit=50")
    call=$(( $(cat "$FAKE_LANE_CALLS") + 1 ))
    echo "$call" > "$FAKE_LANE_CALLS"
    lane="$(tr ' ' '\n' < "$FAKE_LANE_SCRIPT" | sed -n "${call}p")"
    [ -n "$lane" ] || lane="$(tr ' ' '\n' < "$FAKE_LANE_SCRIPT" | sed -n '$p')"
    case "$lane" in
      idle) printf '%s\n' '{"cursor":3,"lane":{"busy":false,"running":0,"queued":0,"recovering":0},"releases":[]}' ;;
      busy) printf '%s\n' '{"cursor":4,"lane":{"busy":true,"running":1,"queued":1,"recovering":0},"releases":[]}' ;;
      *) exit 7 ;;
    esac
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
  is-active)
    [ "$(cat "$FAKE_SERVICE_STATE")" = "active" ]
    ;;
  restart)
    basename "$(readlink -f "$FAKE_ACTIVE_LINK")" >> "$FAKE_RESTART_LOG"
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

RESTART_LOG="$TEST_ROOT/restarts"

export FAKE_ACTIVE_LINK="$ACTIVE_LINK"
export FAKE_ARCHIVE="$ARCHIVE"
export FAKE_HEALTH_STATE="$HEALTH_STATE"
export FAKE_SYSTEMCTL_MODE="$SYSTEMCTL_MODE"
export FAKE_TARGET_SHA="$TARGET_SHA"
export FAKE_LANE_SCRIPT="$LANE_SCRIPT"
export FAKE_LANE_CALLS="$LANE_CALLS"
export FAKE_SERVICE_STATE="$SERVICE_STATE"
export FAKE_RESTART_LOG="$RESTART_LOG"
export DEPLOY_MANAGER_UPDATE_CONFIG="$CONFIG_FILE"
export DEPLOY_MANAGER_UPDATE_PATH="$FAKE_BIN:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# $1: the manager's lane answers, e.g. "idle" or "idle busy" or "down".
activate_previous() {
  rm -f -- "$ACTIVE_LINK"
  ln -s "$RELEASE_ROOT/$PREVIOUS_SHA" "$ACTIVE_LINK"
  echo ok > "$HEALTH_STATE"
  echo "${1:-idle}" > "$LANE_SCRIPT"
  echo 0 > "$LANE_CALLS"
  echo active > "$SERVICE_STATE"
  : > "$RESTART_LOG"
}

assert_previous_restored() {
  [ "$(readlink -f "$ACTIVE_LINK")" = "$RELEASE_ROOT/$PREVIOUS_SHA" ]
  [ ! -e "$RELEASE_ROOT/$TARGET_SHA" ]
  [ "$(cat "$HEALTH_STATE")" = "ok" ]
}

# A skipped or refused update leaves no staged release, archive, or restart.
assert_untouched() {
  assert_previous_restored
  [ "$(ls -A "$RELEASE_ROOT")" = "$PREVIOUS_SHA" ]
  [ -z "$(find "$STATE_DIR" -name 'archive.*' -print 2>/dev/null)" ]
  [ ! -s "$RESTART_LOG" ]
}

expect_output() {
  case "$1" in
    *"$2"*) ;;
    *)
      echo "updater-integration: expected '$2' in:" >&2
      printf '%s\n' "$1" >&2
      exit 1
      ;;
  esac
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
assert_untouched

echo success > "$SYSTEMCTL_MODE"

# A release in flight when the timer fires: skip before any work.
activate_previous busy
output="$("$REPOSITORY_ROOT/install/update-deploy-manager" --sha "$TARGET_SHA" 2>&1)"
expect_output "$output" "skip reason=release_lane_busy checkpoint=before_download"
assert_untouched

# A release accepted while the update was being checked: skip at the last
# moment, before the link swap and restart.
activate_previous "idle busy"
output="$("$REPOSITORY_ROOT/install/update-deploy-manager" --sha "$TARGET_SHA" 2>&1)"
expect_output "$output" "skip reason=release_lane_busy checkpoint=before_activation"
[ "$(cat "$LANE_CALLS")" = "2" ]
assert_untouched

# The manager runs but its lane cannot be read: fail closed.
activate_previous down
if output="$("$REPOSITORY_ROOT/install/update-deploy-manager" --sha "$TARGET_SHA" 2>&1)"; then
  echo "updater-integration: unreadable lane unexpectedly allowed activation" >&2
  exit 1
fi
expect_output "$output" "release_lane_unknown checkpoint=before_download"
assert_untouched

# No running manager (for example a crash loop): nothing is in flight, so a
# green release may still replace it.
activate_previous down
echo inactive > "$SERVICE_STATE"
output="$("$REPOSITORY_ROOT/install/update-deploy-manager" --sha "$TARGET_SHA" 2>&1)"
expect_output "$output" "release_lane=inactive"
[ "$(readlink -f "$ACTIVE_LINK")" = "$RELEASE_ROOT/$TARGET_SHA" ]
[ "$(cat "$RESTART_LOG")" = "$TARGET_SHA" ]

echo "updater-integration: activation, rollback, and release-lane scenarios passed"
