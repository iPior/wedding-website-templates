# Agent Workflows

## 1) Small UI or Copy Change (single template)

1. Edit only target template under `templates/<name>/src`.
2. Keep visual language consistent with that template.
3. Run:
   - `bun run lint`
   - Optional focused build: `bunx turbo run build --filter=@wedding/template-<name>`

## 2) Shared Feature Change (multiple templates affected)

1. Update shared logic in `packages/*` first.
2. Wire or adapt in each impacted template.
3. Validate with:
   - `bun run lint`
   - `bun run build`

## 3) RSVP Flow Changes

Touch points to check together:

- `packages/actions` (search, submit, modify impl)
- `packages/ui` RSVP flow components
- `templates/*/src/actions/rsvp.ts` wrappers
- `templates/*/src/app/(main)/rsvp/*` pages

Then verify at least one template end-to-end in dev.

## 4) Database or Prisma Changes

1. Update schema in `packages/database/prisma/schema.prisma`.
2. Regenerate client: `bun run prisma:generate`.
3. Create/apply migration: `bun run prisma:migrate`.
4. If needed, update seeds: `packages/database/prisma/seed.ts`.

## 5) Email Template Changes

1. Edit shared templates in `packages/email-templates`.
2. Confirm action payloads in `packages/actions` still match.
3. Validate by running affected RSVP/email flows locally.

## Change Scope Rule

- Template-specific styling/content -> `templates/*`
- Shared behavior/types/components -> `packages/*`

When unsure, prefer shared package changes only if at least 2 templates benefit.
