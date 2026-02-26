# Repository Context

## What This Repo Is

Open-source wedding website templates built as a monorepo:

- 3 template apps: `templates/stationery`, `templates/cinematic`, `templates/watercolor`
- Shared internal packages: `packages/config`, `packages/database`, `packages/auth`, `packages/actions`, `packages/email-templates`, `packages/ui`

## Core Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4 + ShadCN UI
- Supabase (Postgres + admin auth)
- Prisma ORM
- Resend + React Email
- Turborepo + Bun workspaces

## High-Level Architecture

- Template apps own routes and theme-specific presentation.
- Shared packages own reusable business logic and UI primitives.
- `wedding.config.ts` is template-local and drives content.
- Guest pages are behind a shared password gate.
- Admin pages use Supabase Auth.

## Key Paths

- Shared business logic: `packages/actions/src`
- Shared UI and flows: `packages/ui/src`
- Database schema/client/seed: `packages/database`
- Auth and email clients: `packages/auth/src`
- Template pages: `templates/*/src/app`
- Template server actions (thin wrappers): `templates/*/src/actions`
- Example env vars: `.env.example`

## Route Model (Per Template)

- Public (password-gated): `/`, `/our-story`, `/details`, `/faq`, `/bridal-party`, `/rsvp`
- Token route: `/rsvp/modify/[token]`
- Admin: `/admin`, `/admin/login`, `/admin/(dashboard)/*`

## Data Model Pointers

- Household -> Guest (1:N)
- Household -> PlusOne (1:N)
- Guest -> MailingListEntry (1:N)

See `packages/database/prisma/schema.prisma` for source of truth.
