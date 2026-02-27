# Repository Context

## What This Repo Is

Route-based wedding design showcase in a single Next.js app.

- `/watercolor`
- `/stationery`
- `/cinematic`

## Core Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Bun workspaces

## High-Level Architecture

- `src/app/page.tsx` is the showcase landing page.
- Each theme has its own route subtree under `src/app/<theme>/`.
- Shared visual primitives/components live in `packages/ui`.
- `src/lib/wedding-config.ts` provides shared sample content.
- RSVP pages are static demo interactions (no backend).
- Admin pages are static mock dashboards under each theme route.
- `src/components/variant-switcher.tsx` provides a global design switcher overlay.

## Key Paths

- Showcase home: `src/app/page.tsx`
- Theme routes: `src/app/watercolor`, `src/app/stationery`, `src/app/cinematic`
- Themed admin routes: `src/app/*/admin`, `src/app/*/admin/guests`, `src/app/*/admin/emails`
- Shared config bridge: `src/lib/wedding-config.ts`
- Shared demo component: `src/components/demo-rsvp-flow.tsx`
- Shared admin mock UI: `src/components/admin/mock-admin-page.tsx`
- Shared UI package: `packages/ui/src`
