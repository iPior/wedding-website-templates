# Agent Workflows

## 1) Single Theme Change

1. Edit only one route subtree under `src/app/<theme>`.
2. Preserve that theme's visual language.
3. Run:
   - `bun run lint`
   - `bun run build`

## 2) Cross-Theme Change

1. Update shared building blocks in `packages/ui` or `src/components`.
2. Adapt usage in each impacted theme route.
3. Validate with:
   - `bun run lint`
   - `bun run build`

## 3) RSVP Demo Changes

Touch points to check together:

- `src/components/demo-rsvp-flow.tsx`
- `src/app/*/rsvp/page.tsx`

Then verify the interaction in each theme route.

## 4) Mock Admin Changes

Touch points to check together:

- `src/components/admin/mock-admin-page.tsx`
- `src/app/*/admin/page.tsx`
- `src/app/*/admin/guests/page.tsx`
- `src/app/*/admin/emails/page.tsx`

Then verify all themed admin routes and `/admin` redirect behavior.

## 5) Variant Switcher Changes

- Edit `src/components/variant-switcher.tsx`.
- Verify route preservation between variants for both guest pages and admin pages.

## Change Scope Rule

- Theme-specific styling/content -> `src/app/<theme>`
- Shared behavior/components -> `src/components` or `packages/ui`
