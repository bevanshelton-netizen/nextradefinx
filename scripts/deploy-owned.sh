#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="nextradefinx"
REPO_ROOT="${NEXTRADE_DEPLOY_ROOT:-$HOME/izakhono-runtime/$APP_NAME}"
PORT="${NEXTRADE_PORT:-3000}"
SERVICE="${NEXTRADE_SERVICE:-$APP_NAME}"

mkdir -p "$REPO_ROOT"
rsync -a --delete --exclude='.git' --exclude='node_modules' ./ "$REPO_ROOT/"
cd "$REPO_ROOT"

npm install --no-audit --no-fund
npm run build

if command -v systemctl >/dev/null 2>&1 && systemctl --user is-enabled "$SERVICE" >/dev/null 2>&1; then
  systemctl --user restart "$SERVICE"
else
  if [ -f .nextrade.pid ]; then
    old_pid="$(cat .nextrade.pid || true)"
    if [ -n "$old_pid" ] && kill -0 "$old_pid" 2>/dev/null; then kill "$old_pid" || true; fi
  fi
  nohup env NODE_ENV=production PORT="$PORT" npm start -- -p "$PORT" >nextrade.log 2>&1 &
  echo $! > .nextrade.pid
fi

for i in $(seq 1 30); do
  if curl --fail --silent --show-error "http://127.0.0.1:${PORT}/api/status" > /tmp/nextrade-status.json; then
    grep -q '"webApp":"live"' /tmp/nextrade-status.json
    grep -q '"simulation":true' /tmp/nextrade-status.json
    cat /tmp/nextrade-status.json
    echo "NexTradeFinX owned runtime healthy on localhost:${PORT}"
    exit 0
  fi
  sleep 2
done

echo "NexTradeFinX health check failed" >&2
[ -f nextrade.log ] && tail -100 nextrade.log >&2 || true
exit 1
