# Agent Workspace

This folder is a lightweight knowledge pack for coding agents working in this repo.

## Start Here

1. Read `./context.md` for architecture and file map.
2. Read `./workflows.md` for task playbooks.
3. Use `./checklist.md` before handing work back.

## Ground Rules

- Package manager is Bun (`bun`, not `npm` or `pnpm`).
- This repo is a single Next.js showcase app.
- Keep each theme's visual language distinct (`/watercolor`, `/stationery`, `/cinematic`).
- Themed mock admin exists under `/<theme>/admin` and `/admin` redirects to `/watercolor/admin`.
- Do not commit secrets or local env files.

## Useful Commands

- Install deps: `bun install`
- Dev server: `bun run dev`
- Build: `bun run build`
- Lint: `bun run lint`

## Related Docs

- Root project guide: `README.md`
