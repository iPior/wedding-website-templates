# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding website built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, ShadCN UI, Supabase (PostgreSQL + Auth), Prisma 6, and Resend for emails. Full spec in `PROJECT.md`.

## Commands

All commands use **Bun** (not npm):

- `bun run dev` — dev server on localhost:3000
- `bun run build` — production build
- `bun run lint` — ESLint
- `bun run test` — Vitest (unit + integration)
- `bun run test:e2e` — Playwright E2E tests
- `bun run prisma:generate` — generate Prisma client
- `bun run prisma:migrate` — run migrations
- `bun run prisma:seed` — seed dev database
- `bun run email:dev` — React Email preview server

Run a single test: `bunx vitest run tests/unit/smoke.test.ts`

## Architecture

**Routing:** Next.js App Router in `src/app/`. Public pages (home, FAQ, bridal-party, RSVP) behind a shared password gate. Admin pages (`/admin/*`) behind Supabase Auth.

**Data flow:** Server Components by default. All mutations use Server Actions in `src/actions/` (rsvp.ts, guests.ts, emails.ts) — no API routes unless necessary.

**Config-driven content:** Wedding details (couple names, venue, date, colors, FAQ, bridal party, meal options) live in `wedding.config.ts` at project root. Pages read from this config, not hardcoded.

**Database:** Prisma ORM with PostgreSQL via Supabase. Schema in `prisma/schema.prisma`. Models: Household → Guest (1:many), Household → PlusOne (1:many), Guest → MailingListEntry (1:many). Use Prisma client from `src/lib/prisma.ts` singleton.

**Auth:** Two layers — site-wide password gate (cookie-based, checked in middleware via `src/proxy.ts`) and admin auth (Supabase Auth with `src/lib/supabase/server.ts`).

**Email:** React Email templates in `src/emails/`, sent via Resend (`src/lib/resend.ts`).

**Path alias:** `@/*` maps to `src/*`.

## Key Conventions

- Mobile-first design (375px viewport baseline)
- Use ShadCN components (`src/components/ui/`) before building custom ones
- Use Prisma for all DB access — never raw SQL
- Mark components `"use client"` only when they need interactivity
- Validation with Zod
- Guest search uses Fuse.js for fuzzy matching

## Testing

- Unit/integration: Vitest — `tests/unit/` and `tests/integration/`
- E2E: Playwright (Chromium) — `tests/e2e/`, base URL localhost:3000
