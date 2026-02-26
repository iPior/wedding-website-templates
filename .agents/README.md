# Agent Workspace

This folder is a lightweight knowledge pack for coding agents working in this repo.

## Start Here

1. Read `./context.md` for architecture and file map.
2. Read `./workflows.md` for task playbooks.
3. Use `./checklist.md` before handing work back.

## Ground Rules

- Package manager is Bun (`bun`, not `npm` or `pnpm`).
- Monorepo is Turborepo (`packages/*` + `templates/*`).
- Prefer editing shared logic in `packages/*` and keep template-specific look/feel in `templates/*`.
- Do not commit secrets or local env files.

## Useful Commands

- Install deps: `bun install`
- Run one template:
  - `bun run dev:stationery` (3001)
  - `bun run dev:cinematic` (3002)
  - `bun run dev:watercolor` (3003)
- Build all: `bun run build`
- Lint all: `bun run lint`
- Prisma generate: `bun run prisma:generate`
- Prisma migrate: `bun run prisma:migrate`
- Seed sample data: `bun run prisma:seed`

## Related Docs

- Root project guide: `README.md`
- Claude-oriented notes: `.claude/CLAUDE.md`
- Product and architecture spec: `.claude/PROJECT.md`
