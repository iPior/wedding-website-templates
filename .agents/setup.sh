#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE="${1:-watercolor}"
ENV_SRC="$ROOT_DIR/.env.example"
ENV_DEST="$ROOT_DIR/templates/$TEMPLATE/.env.local"

if [[ ! -f "$ROOT_DIR/package.json" ]]; then
  echo "Error: run from a repo with package.json at root."
  exit 1
fi

if [[ ! -d "$ROOT_DIR/templates/$TEMPLATE" ]]; then
  echo "Error: template '$TEMPLATE' not found under templates/."
  echo "Available templates:"
  ls -1 "$ROOT_DIR/templates"
  exit 1
fi

echo "==> Installing workspace dependencies (bun install)"
bun install

if [[ -f "$ENV_DEST" ]]; then
  echo "==> Keeping existing env file: templates/$TEMPLATE/.env.local"
else
  echo "==> Creating env file from .env.example"
  cp "$ENV_SRC" "$ENV_DEST"
fi

echo "==> Next steps"
echo "1) Fill in templates/$TEMPLATE/.env.local"
echo "2) Start dev server: bun run dev:$TEMPLATE"
echo "3) If DB env vars are set, run: bun run prisma:generate"
