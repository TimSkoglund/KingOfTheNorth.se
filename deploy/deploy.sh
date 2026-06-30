#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/var/www/kingofthenorth}"
BRANCH="${BRANCH:-main}"

cd "$APP_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

mkdir -p data deploy

if [ ! -f deploy/.env.production ]; then
  echo "Missing deploy/.env.production. Copy deploy/.env.production.example and set real secrets." >&2
  exit 1
fi

docker compose up -d --build
docker image prune -f
