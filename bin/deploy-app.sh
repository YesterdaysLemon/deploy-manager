#!/usr/bin/env sh
set -eu

ENV_FILE="${ENV_FILE:-}"

if [ -z "$ENV_FILE" ] || [ ! -r "$ENV_FILE" ]; then
  echo "deploy-app: readable ENV_FILE is required" >&2
  exit 64
fi

set -a
. "$ENV_FILE"
set +a

REQUESTED_SHA="${1:-${DEPLOY_SHA:-}}"

case "$REQUESTED_SHA" in
  ""|*[!0123456789abcdefABCDEF]*)
    echo "deploy-app: expected a 40-character git SHA" >&2
    exit 64
    ;;
esac

if [ "${#REQUESTED_SHA}" -ne 40 ]; then
  echo "deploy-app: expected a 40-character git SHA" >&2
  exit 64
fi

: "${APP_ID:?APP_ID is required}"
: "${REPO_DIR:?REPO_DIR is required}"
: "${IMAGE_NAME:?IMAGE_NAME is required}"
: "${CONTAINER_NAME:?CONTAINER_NAME is required}"
: "${APP_PORT:?APP_PORT is required}"
: "${CANDIDATE_APP_PORT:?CANDIDATE_APP_PORT is required}"
: "${CONTAINER_PORT:?CONTAINER_PORT is required}"

REPO_USER="${REPO_USER:-deploy}"
BRANCH="${DEPLOY_BRANCH:-${BRANCH:-master}}"
CANDIDATE_CONTAINER_NAME="${CANDIDATE_CONTAINER_NAME:-${CONTAINER_NAME}-candidate}"
HEALTH_PATH="${HEALTH_PATH:-/}"
HEALTH_ATTEMPTS="${HEALTH_ATTEMPTS:-20}"
HEALTH_SLEEP_SECONDS="${HEALTH_SLEEP_SECONDS:-1}"
LOG_FILE="${LOG_FILE:-/var/log/deploy-manager/${APP_ID}.log}"
LOCK_FILE="${LOCK_FILE:-/var/lock/deploy-manager-${APP_ID}.lock}"
DOCKER_BUILD_CONTEXT="${DOCKER_BUILD_CONTEXT:-.}"
DOCKERFILE="${DOCKERFILE:-}"
STARTED_AT="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
NEW_IMAGE="${IMAGE_NAME}:${REQUESTED_SHA}"
HEALTH_URL="http://127.0.0.1:${APP_PORT}${HEALTH_PATH}"

mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$(dirname "$LOCK_FILE")"

log() {
  printf '%s app=%s %s\n' "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" "$APP_ID" "$*" | tee -a "$LOG_FILE"
}

emit_phase() {
  log "release_phase=$1 sha=$REQUESTED_SHA"
}

fail() {
  log "failure sha=${REQUESTED_SHA:-unknown} reason=$*"
  exit 1
}

exec 9>"$LOCK_FILE"

if ! flock -n 9; then
  fail "deploy_already_running"
fi

health_check() {
  url="$1"
  attempt=1

  while [ "$attempt" -le "$HEALTH_ATTEMPTS" ]; do
    if curl --fail --silent --output /dev/null "$url"; then
      return 0
    fi

    attempt=$((attempt + 1))
    sleep "$HEALTH_SLEEP_SECONDS"
  done

  return 1
}

run_git() {
  if [ "$(id -u)" -eq 0 ] && [ -n "$REPO_USER" ] && id "$REPO_USER" >/dev/null 2>&1; then
    sudo -u "$REPO_USER" -H git -C "$REPO_DIR" "$@"
    return
  fi

  git -C "$REPO_DIR" "$@"
}

build_image() {
  if [ -n "$DOCKERFILE" ]; then
    docker build -f "$DOCKERFILE" -t "$NEW_IMAGE" "$DOCKER_BUILD_CONTEXT"
    return
  fi

  docker build -t "$NEW_IMAGE" "$DOCKER_BUILD_CONTEXT"
}

run_container() {
  container_name="$1"
  host_port="$2"
  restart_policy="$3"
  image="$4"

  # Optional: attach the container to a user-defined docker network so it
  # can reach sidecars (a database, say) by container name. Unset for every
  # app that does not need one, in which case this expands to nothing and
  # the behaviour below is exactly what it was before.
  #
  # Deliberately unquoted at the call sites: it must split into two words.
  # Docker network names cannot contain whitespace, so that is safe.
  NETWORK_ARG=""
  if [ -n "${DOCKER_NETWORK:-}" ]; then
    NETWORK_ARG="--network ${DOCKER_NETWORK}"
  fi

  if [ -n "${CONTAINER_ENV_FILE:-}" ]; then
    if [ "$restart_policy" = "yes" ]; then
      docker run -d $NETWORK_ARG \
        --name "$container_name" \
        --restart unless-stopped \
        --env-file "$CONTAINER_ENV_FILE" \
        -p "127.0.0.1:${host_port}:${CONTAINER_PORT}" \
        "$image"
      return
    fi

    docker run -d $NETWORK_ARG \
      --name "$container_name" \
      --env-file "$CONTAINER_ENV_FILE" \
      -p "127.0.0.1:${host_port}:${CONTAINER_PORT}" \
      "$image"
    return
  fi

  if [ "$restart_policy" = "yes" ]; then
    docker run -d $NETWORK_ARG \
      --name "$container_name" \
      --restart unless-stopped \
      -p "127.0.0.1:${host_port}:${CONTAINER_PORT}" \
      "$image"
    return
  fi

  docker run -d $NETWORK_ARG \
    --name "$container_name" \
    -p "127.0.0.1:${host_port}:${CONTAINER_PORT}" \
    "$image"
}

restore_old_image() {
  failure_reason="$1"
  emit_phase rollback

  # A failed `docker run` can still leave a stopped container with the production name.
  # Clear it before restoring the last known-good image.
  docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

  if [ -z "${OLD_IMAGE:-}" ]; then
    fail "$failure_reason sha=$CURRENT_SHA no_previous_image"
  fi

  run_container "$CONTAINER_NAME" "$APP_PORT" "yes" "$OLD_IMAGE" >/dev/null ||
    fail "${failure_reason}_rollback_run_failed sha=$CURRENT_SHA old_image=$OLD_IMAGE"

  if health_check "$HEALTH_URL"; then
    fail "${failure_reason}_rolled_back sha=$CURRENT_SHA old_image=$OLD_IMAGE"
  fi

  fail "${failure_reason}_rollback_health_check_failed sha=$CURRENT_SHA url=$HEALTH_URL old_image=$OLD_IMAGE"
}

log "deploy_start branch=$BRANCH requested_sha=$REQUESTED_SHA started_at=$STARTED_AT"

cd "$REPO_DIR" || fail "repo_dir_not_found"

emit_phase fetch
run_git fetch origin "$BRANCH" || fail "git_fetch_failed"
run_git checkout "$BRANCH" || fail "git_checkout_failed"
run_git reset --hard "origin/$BRANCH" || fail "git_reset_failed"

CURRENT_SHA="$(run_git rev-parse HEAD)"

if [ "$CURRENT_SHA" != "$REQUESTED_SHA" ]; then
  fail "sha_mismatch current=$CURRENT_SHA requested=$REQUESTED_SHA"
fi

emit_phase build
build_image || fail "docker_build_failed sha=$CURRENT_SHA"

OLD_CONTAINER_ID="$(docker ps -aq -f "name=^/${CONTAINER_NAME}$" || true)"
OLD_IMAGE=""

if [ -n "$OLD_CONTAINER_ID" ]; then
  OLD_IMAGE="$(docker inspect "$CONTAINER_NAME" --format "{{.Config.Image}}" || true)"
fi

STALE_CANDIDATE_ID="$(docker ps -aq -f "name=^/${CANDIDATE_CONTAINER_NAME}$" || true)"

if [ -n "$STALE_CANDIDATE_ID" ]; then
  docker rm -f "$CANDIDATE_CONTAINER_NAME" >/dev/null 2>&1 || fail "candidate_cleanup_failed sha=$CURRENT_SHA"
fi

run_container "$CANDIDATE_CONTAINER_NAME" "$CANDIDATE_APP_PORT" "no" "$NEW_IMAGE" >/dev/null ||
  fail "candidate_run_failed sha=$CURRENT_SHA"

CANDIDATE_HEALTH_URL="http://127.0.0.1:${CANDIDATE_APP_PORT}${HEALTH_PATH}"

if ! health_check "$CANDIDATE_HEALTH_URL"; then
  docker logs "$CANDIDATE_CONTAINER_NAME" 2>&1 | tail -n 80 | tee -a "$LOG_FILE" || true
  docker rm -f "$CANDIDATE_CONTAINER_NAME" >/dev/null 2>&1 || true
  fail "candidate_health_check_failed sha=$CURRENT_SHA url=$CANDIDATE_HEALTH_URL"
fi

emit_phase candidate
docker rm -f "$CANDIDATE_CONTAINER_NAME" >/dev/null 2>&1 || fail "candidate_rm_failed sha=$CURRENT_SHA"

emit_phase promote
if [ -n "$OLD_CONTAINER_ID" ]; then
  docker stop "$CONTAINER_NAME" || fail "docker_stop_failed sha=$CURRENT_SHA"
  if ! docker rm "$CONTAINER_NAME"; then
    if docker start "$CONTAINER_NAME" >/dev/null 2>&1 && health_check "$HEALTH_URL"; then
      fail "docker_rm_failed_old_restarted sha=$CURRENT_SHA old_image=$OLD_IMAGE"
    fi

    fail "docker_rm_failed_old_restore_failed sha=$CURRENT_SHA old_image=$OLD_IMAGE"
  fi
fi

if ! run_container "$CONTAINER_NAME" "$APP_PORT" "yes" "$NEW_IMAGE" >/dev/null; then
  restore_old_image "docker_run_failed"
fi

emit_phase verify
if ! health_check "$HEALTH_URL"; then
  docker logs "$CONTAINER_NAME" 2>&1 | tail -n 80 | tee -a "$LOG_FILE" || true
  restore_old_image "health_check_failed"
fi

ENDED_AT="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

docker image ls "$IMAGE_NAME" --format "{{.Repository}}:{{.Tag}}" |
  while IFS= read -r image; do
    if [ "$image" != "$NEW_IMAGE" ] && [ "$image" != "$OLD_IMAGE" ]; then
      docker image rm "$image" >/dev/null 2>&1 || true
    fi
  done

log "deploy_success sha=$CURRENT_SHA image=$NEW_IMAGE started_at=$STARTED_AT ended_at=$ENDED_AT"
