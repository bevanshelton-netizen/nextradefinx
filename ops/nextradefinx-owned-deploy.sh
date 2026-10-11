#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="nextradefinx"
REPO_URL="${NEXTRADE_REPO_URL:-https://github.com/bevanshelton-netizen/nextradefinx.git}"
BRANCH="${NEXTRADE_BRANCH:-main}"
ROOT="${NEXTRADE_DEPLOY_ROOT:-$HOME/izakhono-runtime/$APP_NAME}"
PORT="${NEXTRADE_PORT:-3000}"
HEALTH_URL="http://127.0.0.1:${PORT}/api/status"
LOG_FILE="$ROOT/nextrade.log"
PID_FILE="$ROOT/.nextrade.pid"

mkdir -p "$(dirname "$ROOT")"

if [ ! -d "$ROOT/.git" ]; then
  git clone --branch "$BRANCH" --depth 1 "$REPO_URL" "$ROOT"
else
  git -C "$ROOT" fetch origin "$BRANCH" --depth 1
  git -C "$ROOT" reset --hard "origin/$BRANCH"
fi

cd "$ROOT"

export NODE_ENV=production
npm install --no-audit --no-fund
npm run build

if [ -f "$PID_FILE" ]; then
  old_pid="$(cat "$PID_FILE" || true)"
  if [ -n "$old_pid" ] && kill -0 "$old_pid" 2>/dev/null; then
    kill "$old_pid" || true
    for _ in 1 2 3 4 5; do
      kill -0 "$old_pid" 2>/dev/null || break
      sleep 1
    done
  fi
fi

nohup npm start -- -p "$PORT" >"$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

for _ in $(seq 1 30); do
  if curl --fail --silent --show-error "$HEALTH_URL" > /tmp/nextradefinx-status.json; then
    grep -q '"webApp":"live"' /tmp/nextradefinx-status.json
    grep -q '"simulation":true' /tmp/nextradefinx-status.json
    cat /tmp/nextradefinx-status.json
    echo "NexTradeFinX healthy on ${HEALTH_URL}"
    exit 0
  fi
  sleep 2
done

echo "NexTradeFinX failed health check" >&2
tail -n 100 "$LOG_FILE" >&2 || true
exit 1
