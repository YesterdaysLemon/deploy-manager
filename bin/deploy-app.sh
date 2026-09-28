#!/usr/bin/env sh
set -eu

# When the manager stops, its end of stdout/stderr closes. Writes there must
# fail quietly instead of killing this rollout before stop_requested (below)
# can restore production; the root log file keeps every line.
trap '' PIPE

ENV_FILE="${ENV_FILE:-}"

if [ -z "$ENV_FILE" ] || [ ! -r "$ENV_FILE" ]; then
  echo "deploy-app: readable ENV_FILE is required" >&2
  exit 64
fi

set -a
. "$ENV_FILE"
set +a

MODE="deploy"
REQUESTED_SHA=""

if [ "${1:-}" = "--recover" ]; then
  MODE="recover"
else
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
# Root-only record of an unfinished production swap. It must never live in the
# manager's writable state directory: its contents choose the image a recovery
# starts.
ROLLOUT_STATE_DIR="${ROLLOUT_STATE_DIR:-/var/lib/deploy-manager-rollout}"
CUTOVER_FILE="${ROLLOUT_STATE_DIR}/${APP_ID}.cutover"
CUTOVER_ACTIVE="0"
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
  if [ "$MODE" = "recover" ]; then
    # A rollout for this app still owns its cutover and restores it itself.
    log "release_recovery=busy reason=deploy_already_running"
    exit 0
  fi
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

prepare_rollout_state_dir() {
  if [ ! -e "$ROLLOUT_STATE_DIR" ] && [ ! -L "$ROLLOUT_STATE_DIR" ]; then
    (umask 077 && mkdir -p "$ROLLOUT_STATE_DIR") ||
      fail "rollout_state_dir_create_failed path=$ROLLOUT_STATE_DIR"
  fi

  if [ -L "$ROLLOUT_STATE_DIR" ] || [ ! -d "$ROLLOUT_STATE_DIR" ] || [ ! -O "$ROLLOUT_STATE_DIR" ]; then
    fail "rollout_state_dir_untrusted path=$ROLLOUT_STATE_DIR"
  fi

  chmod 0700 "$ROLLOUT_STATE_DIR" || fail "rollout_state_dir_chmod_failed path=$ROLLOUT_STATE_DIR"
}

# Called before production stops; failing here leaves production untouched.
record_cutover() {
  prepare_rollout_state_dir
  cutover_temp="${CUTOVER_FILE}.new.$$"
  rm -f -- "$cutover_temp"
  (
    umask 077
    printf 'old_image=%s\nnew_image=%s\nsha=%s\nrecorded_at=%s\n' \
      "$OLD_IMAGE" "$NEW_IMAGE" "$CURRENT_SHA" "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" > "$cutover_temp"
  ) || fail "cutover_record_write_failed sha=$CURRENT_SHA"
  mv -f -- "$cutover_temp" "$CUTOVER_FILE" || fail "cutover_record_write_failed sha=$CURRENT_SHA"
}

clear_cutover() {
  rm -f -- "$CUTOVER_FILE"
}

valid_image_ref() {
  case "$1" in
    ""|-*|*[!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._/:@-]*) return 1 ;;
  esac
}

# Replace whatever holds the production name with OLD_IMAGE. Returns 0 when it
# is healthy, 1 when it could not start, and 2 when it started but is unhealthy.
start_previous_image() {
  # A failed `docker run` can still leave a stopped container with the production name.
  docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
  run_container "$CONTAINER_NAME" "$APP_PORT" "yes" "$OLD_IMAGE" >/dev/null || return 1
  CUTOVER_ACTIVE="0"
  clear_cutover
  health_check "$HEALTH_URL" || return 2
}

restore_old_image() {
  failure_reason="$1"
  emit_phase rollback

  if [ -z "${OLD_IMAGE:-}" ]; then
    docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
    fail "$failure_reason sha=$CURRENT_SHA no_previous_image"
  fi

  restore_status=0
  start_previous_image || restore_status=$?

  case "$restore_status" in
    0) fail "${failure_reason}_rolled_back sha=$CURRENT_SHA old_image=$OLD_IMAGE" ;;
    1) fail "${failure_reason}_rollback_run_failed sha=$CURRENT_SHA old_image=$OLD_IMAGE" ;;
    *) fail "${failure_reason}_rollback_health_check_failed sha=$CURRENT_SHA url=$HEALTH_URL old_image=$OLD_IMAGE" ;;
  esac
}

# Finish a production swap an earlier run left behind (SIGKILL, host crash, or
# a stop that outlived systemd's timeout). Only the root-owned cutover record
# selects the image, so a caller can at most trigger this repair.
repair_interrupted_cutover() {
  if [ ! -e "$CUTOVER_FILE" ] && [ ! -L "$CUTOVER_FILE" ]; then
    RECOVERY_OUTCOME="not-needed"
    return 0
  fi

  prepare_rollout_state_dir
  if [ -L "$CUTOVER_FILE" ] || [ ! -f "$CUTOVER_FILE" ] || [ ! -O "$CUTOVER_FILE" ]; then
    fail "cutover_record_untrusted path=$CUTOVER_FILE"
  fi

  OLD_IMAGE="$(sed -n 's/^old_image=//p' "$CUTOVER_FILE" | head -n 1)"
  CURRENT_SHA="$(sed -n 's/^sha=//p' "$CUTOVER_FILE" | head -n 1)"
  if ! valid_image_ref "$OLD_IMAGE"; then
    fail "cutover_record_invalid path=$CUTOVER_FILE"
  fi

  log "interrupted_cutover_found sha=${CURRENT_SHA:-unknown} old_image=$OLD_IMAGE"
  production_running="$(docker inspect --format '{{.State.Running}}' "$CONTAINER_NAME" 2>/dev/null || true)"
  if [ "$production_running" = "true" ] && health_check "$HEALTH_URL"; then
    clear_cutover
    log "interrupted_cutover_resolved production=running_healthy"
    RECOVERY_OUTCOME="healthy"
    return 0
  fi

  restore_status=0
  start_previous_image || restore_status=$?
  case "$restore_status" in
    0)
      log "interrupted_cutover_resolved production=previous_image_restored old_image=$OLD_IMAGE"
      RECOVERY_OUTCOME="restored"
      return 0
      ;;
    1) log "interrupted_cutover_restore_failed reason=run_failed old_image=$OLD_IMAGE" ;;
    *) log "interrupted_cutover_restore_failed reason=health_check_failed url=$HEALTH_URL old_image=$OLD_IMAGE" ;;
  esac
  RECOVERY_OUTCOME="failed"
  return 1
}

# Stopping deploy-manager.service signals its whole cgroup, including this root
# rollout. A stop before the swap just ends the run; a stop during the swap
# restores the previous image first, within the unit's TimeoutStopSec.
stop_requested() {
  trap '' HUP INT TERM
  # The manager reading stdout is stopping too; write only to the root log.
  exec >/dev/null 2>&1
  if [ "$CUTOVER_ACTIVE" = "1" ]; then
    restore_old_image "stopped_during_cutover"
  fi
  fail "stopped_by_signal"
}
trap stop_requested HUP INT TERM

if [ "$MODE" = "recover" ]; then
  if repair_interrupted_cutover; then
    log "release_recovery=$RECOVERY_OUTCOME"
    exit 0
  fi
  log "release_recovery=failed"
  exit 1
fi

log "deploy_start branch=$BRANCH requested_sha=$REQUESTED_SHA started_at=$STARTED_AT"

# Put production back first if an earlier swap never finished, so the running
# container is the rollback target below. A restore that fails is logged and
# this rollout continues with its own candidate check and rollback; an
# untrusted or malformed cutover record stops it.
if ! repair_interrupted_cutover; then
  log "interrupted_cutover_unresolved continuing_with_release"
fi

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
if [ -n "$OLD_IMAGE" ]; then
  # Recorded before production stops, so the stop handler above, or a later
  # `--recover`, can put the previous image back.
  record_cutover
  CUTOVER_ACTIVE="1"
fi

if [ -n "$OLD_CONTAINER_ID" ]; then
  docker stop "$CONTAINER_NAME" || fail "docker_stop_failed sha=$CURRENT_SHA"
  if ! docker rm "$CONTAINER_NAME"; then
    if docker start "$CONTAINER_NAME" >/dev/null 2>&1 && health_check "$HEALTH_URL"; then
      CUTOVER_ACTIVE="0"
      clear_cutover
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

CUTOVER_ACTIVE="0"
clear_cutover

ENDED_AT="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

docker image ls "$IMAGE_NAME" --format "{{.Repository}}:{{.Tag}}" |
  while IFS= read -r image; do
    if [ "$image" != "$NEW_IMAGE" ] && [ "$image" != "$OLD_IMAGE" ]; then
      docker image rm "$image" >/dev/null 2>&1 || true
    fi
  done

log "deploy_success sha=$CURRENT_SHA image=$NEW_IMAGE started_at=$STARTED_AT ended_at=$ENDED_AT"
