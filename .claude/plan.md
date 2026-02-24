# Monorepo Migration Plan

## Overview

Converting a single Next.js 16 wedding website (with 4 route trees: `(main)`, `/1`, `/2`, `/3`) into a Turborepo monorepo with 3 independently deployable template apps and 6 shared internal packages.

- Package manager: **Bun**
- Build system: **Turborepo**
- Templates: **Watercolor** (from `(main)`), **Stationery** (from `/1`), **Cinematic** (from `/2`)

---

## What's Done

### Root Config
- [x] `package.json` — workspaces: `["packages/*", "templates/*"]`, turbo scripts
- [x] `turbo.json` — build/dev/lint/prisma:generate tasks
- [x] `.env.example` — all required env vars

### Shared Packages (all 6 complete)

| Package | Location | Status | Description |
|---------|----------|--------|-------------|
| `@wedding/config` | `packages/config/` | **Done** | `WeddingConfig` TypeScript type |
| `@wedding/database` | `packages/database/` | **Done** | Prisma client singleton, schema, seed |
| `@wedding/auth` | `packages/auth/` | **Done** | Cookie constants, Supabase clients, Resend |
| `@wedding/email-templates` | `packages/email-templates/` | **Done** | 3 React Email templates (props-based, no config import) |
| `@wedding/actions` | `packages/actions/` | **Done** | `*Impl` functions (no `"use server"`, config via params) |
| `@wedding/ui` | `packages/ui/` | **Done** | ShadCN, RSVP flow, admin components, countdown, lazy-map |

### Templates (none started)

| Template | Source Route | Status |
|----------|-------------|--------|
| Watercolor | `(main)` | **Not started** |
| Stationery | `/1` | **Not started** |
| Cinematic | `/2` | **Not started** |

---

## Config Injection Pattern

`wedding.config.ts` lives **per-template**. Shared packages never import it directly.

| Layer | How it gets config |
|---|---|
| Template pages/layouts | Direct import from `../../wedding.config` |
| Template `src/actions/*.ts` | `"use server"` thin wrappers that import config and pass to shared `*Impl` |
| `@wedding/actions` | Receives config as function parameter (no `"use server"` directive) |
| `@wedding/email-templates` | Receives couple names/initials as React props |
| `@wedding/ui` components | Receives data as React props (`targetDate`, action callbacks, etc.) |
| `@wedding/database`, `@wedding/auth` | No config dependency |

---

## What's Left: Build 3 Template Apps

Each template is a standalone Next.js 16 app with this structure:

```
templates/<name>/
├── package.json              # @wedding/template-<name>
├── next.config.ts            # transpilePackages for @wedding/*
├── tsconfig.json             # paths: { "@/*": ["./src/*"] }
├── postcss.config.mjs        # @tailwindcss/postcss
├── wedding.config.ts          # Template-specific defaults
├── src/
│   ├── proxy.ts              # Password gate (uses @wedding/auth constants)
│   ├── actions/              # "use server" thin wrappers
│   │   ├── rsvp.ts           # Imports config, calls *Impl from @wedding/actions
│   │   ├── guests.ts         # Re-exports (no config needed)
│   │   ├── emails.ts         # Imports config, calls *Impl
│   │   └── auth.ts           # Re-exports (no config needed)
│   └── app/
│       ├── layout.tsx         # Root: theme fonts, CSS vars, metadata
│       ├── globals.css        # Tailwind CSS 4 + ShadCN vars
│       ├── (main)/
│       │   ├── layout.tsx     # Theme shell (background, footer, nav)
│       │   ├── _nav.tsx       # Navigation (links WITHOUT /1, /2, /3 prefix)
│       │   ├── page.tsx       # Home
│       │   ├── rsvp/page.tsx
│       │   ├── rsvp/modify/[token]/page.tsx
│       │   ├── our-story/page.tsx
│       │   ├── details/page.tsx
│       │   ├── faq/page.tsx
│       │   └── bridal-party/page.tsx
│       ├── password/page.tsx
│       ├── auth/unlock/route.ts
│       └── admin/
│           ├── layout.tsx     # Pass-through
│           ├── login/page.tsx
│           └── (dashboard)/
│               ├── layout.tsx # Auth guard + AdminNav
│               ├── page.tsx   # Stats dashboard
│               ├── guests/page.tsx
│               └── emails/page.tsx
```

### Template-specific details

**Watercolor** (`templates/watercolor/`) — from `(main)` route
- Fonts: Playfair Display + Lato
- Bg: `#fff8f8` with watercolor blob overlays
- Has `_page-transition.tsx` component
- Has `LazyMap` with screenshot placeholders in details page
- Dev port: 3003

**Stationery** (`templates/stationery/`) — from `/1` route
- Fonts: Cormorant + Lora
- Bg: `#FDFBF7` (warm parchment)
- Uses CSS var `--font-display` / `--font-body` pattern
- Ornamental star dividers
- RSVP page has custom CSS overrides (`.rsvp-v1`)
- Needs RSVP modify page (copy from watercolor, adapt styling)
- Fix nav links: remove `/1/` prefix
- Dev port: 3001

**Cinematic** (`templates/cinematic/`) — from `/2` route
- Fonts: Italiana + Outfit
- Bg: `#fff8f8` (romantic pink)
- Full-width section layout with border-t dividers
- RSVP page has custom CSS overrides (`.rsvp-v2`)
- Needs RSVP modify page (copy from watercolor, adapt styling)
- Fix nav links: remove `/2/` prefix
- Dev port: 3002

### Key changes when creating template files

1. **Nav links**: Remove route prefix (`/1/rsvp` → `/rsvp`, `/2/details` → `/details`)
2. **Config imports**: Change `../../../../wedding.config` → `../../wedding.config` (or appropriate relative path)
3. **Component imports**: Change `@/components/...` → `@wedding/ui` for shared components
4. **Action imports**: Change `@/actions/...` → `@/actions/...` (local thin wrappers)
5. **Prisma imports**: Change `@/lib/prisma` → `@wedding/database`
6. **Auth imports**: Change `@/lib/supabase/...` → `@wedding/auth`
7. **CountdownTimer**: Pass `targetDate={weddingConfig.date}` prop
8. **RsvpFlow**: Pass action functions as props (`searchGuests`, `getHouseholdForRsvp`, `submitRsvp`, `modifyRsvp`)
9. **AdminNav**: Pass `coupleInitials` and `logoutAction` as props
10. **Admin components** (AddGuestForm, BroadcastForm, etc.): Pass action functions as props

### Template `src/actions/` thin wrappers example

```ts
// templates/watercolor/src/actions/rsvp.ts
"use server";

import { weddingConfig } from "../../wedding.config";
import {
  searchGuestsImpl,
  getHouseholdForRsvpImpl,
  submitRsvpImpl,
  getHouseholdByTokenImpl,
  modifyRsvpImpl,
  type SubmitRsvpInput,
  type ModifyRsvpInput,
} from "@wedding/actions";

const rsvpConfig = {
  rsvpDeadline: weddingConfig.rsvpDeadline,
  person1Initial: weddingConfig.couple.person1.firstName[0],
  person2Initial: weddingConfig.couple.person2.firstName[0],
};

export async function searchGuests(firstName: string, lastName: string) {
  return searchGuestsImpl(firstName, lastName);
}

export async function getHouseholdForRsvp(householdId: string) {
  return getHouseholdForRsvpImpl(householdId);
}

export async function submitRsvp(input: SubmitRsvpInput) {
  return submitRsvpImpl(input, rsvpConfig);
}

export async function getHouseholdByToken(token: string) {
  return getHouseholdByTokenImpl(token);
}

export async function modifyRsvp(input: ModifyRsvpInput) {
  return modifyRsvpImpl(input, rsvpConfig);
}
```

---

## Phase 4: Wire Up & Verify

After all 3 templates are created:

1. Each template's `next.config.ts` needs `transpilePackages` for all `@wedding/*`
2. Assign dev ports: stationery=3001, cinematic=3002, watercolor=3003
3. Run `bun install` at root
4. Run `turbo build` to verify all 3 build
5. Delete old root-level source: `src/`, `wedding.config.ts`, `next.config.ts`, `postcss.config.mjs`, `prisma/`, `prisma.config.ts`, `components.json`, `eslint.config.mjs`, root `tsconfig.json`

### Verification checklist
- [ ] `bun install` — workspace resolution succeeds
- [ ] `turbo build --filter=@wedding/template-watercolor` — builds
- [ ] `turbo build --filter=@wedding/template-stationery` — builds
- [ ] `turbo build --filter=@wedding/template-cinematic` — builds
- [ ] `turbo build` — all 3 build
- [ ] Dev servers start on correct ports
- [ ] Password gate works
- [ ] Pages render correctly
