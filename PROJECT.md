# 💍 Open-Source Wedding Website Template

## Project Overview

An open-source, developer-friendly wedding website template built with **Next.js 16, Tailwind CSS, ShadCN UI, Supabase, Prisma, and Resend**. Designed to replace expensive wedding website builders with a self-hosted, fully customizable, mobile-first solution that any developer can fork, configure, and deploy for their own wedding.

The system provides password-protected guest access, a pre-loaded RSVP system with household/family support, automated confirmation emails via Resend + React Email, a mailing list for ongoing communications, and a private admin dashboard for the couple.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Server Actions) |
| Styling | Tailwind CSS + ShadCN UI |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Auth | Supabase Auth (admin only) |
| Email | Resend + React Email |
| Deployment | Vercel (recommended) |
| Testing | Vitest + Playwright |

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Site password | Single shared password (e.g. "smith2026") stored as env var | Simple, matches how couples share info on physical invites. Not auth — just a gate. |
| RSVP lookup | Search by first + last name, fuzzy matched | Low friction for guests. No codes to lose. |
| RSVP modifications | Allowed until a configurable deadline | Prevents last-minute chaos for catering/seating while giving guests flexibility. |
| Guest data model | Household-based (groups) | One person RSVPs for their household. Plus-one count is pre-set by the couple in the import. |
| Admin auth | Supabase Auth (email/password) | Only 2 users. Hidden route, real auth. No role system needed. |
| Email service | Resend + React Email | React components for email templates. Same JSX/Tailwind patterns as the site. Testable locally. |
| Open-source model | Config file for wedding details + admin panel for guest management | Fork → edit config → import guests → deploy. |

---

## Data Model

### Household

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | String | Household label (e.g. "The Johnson Family") |
| max_plus_ones | Int | Number of plus-ones allowed (set on import) |
| created_at | DateTime | Auto |

### Guest

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| household_id | UUID | FK → Household |
| first_name | String | Guest first name |
| last_name | String | Guest last name |
| email | String? | Collected during RSVP |
| is_primary | Boolean | The person who looks up and submits the RSVP for the household |
| is_plus_one | Boolean | Whether this guest is a plus-one (confirmed by primary guest) |
| attending | Enum? | YES / NO / PENDING |
| meal_preference | String? | e.g. chicken, fish, vegetarian |
| dietary_restrictions | String? | Free text |
| song_request | String? | Optional |
| rsvp_submitted_at | DateTime? | Timestamp of submission |
| rsvp_token | String? | Unique token for modify-RSVP link |
| created_at | DateTime | Auto |
| updated_at | DateTime | Auto |

### PlusOne

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| household_id | UUID | FK → Household |
| confirmed_by | UUID | FK → Guest (primary guest who confirmed them) |
| first_name | String | |
| last_name | String | |
| meal_preference | String? | |
| dietary_restrictions | String? | |
| created_at | DateTime | Auto |

### MailingListEntry

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| guest_id | UUID | FK → Guest |
| email | String | |
| subscribed | Boolean | Default true |
| created_at | DateTime | Auto |

### AdminUser

Handled entirely by Supabase Auth. No custom table needed. Only 2 accounts, created manually.

---

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Password gate | Home / landing page — wedding details, hero, countdown |
| `/rsvp` | Password gate | RSVP lookup and form |
| `/rsvp/modify/[token]` | Public (token-based) | Modify a submitted RSVP via unique link from confirmation email |
| `/faq` | Password gate | Frequently asked questions |
| `/bridal-party` | Password gate | Bridal party photos, names, and roles |
| `/admin` | Supabase Auth | Dashboard — hidden route, not linked anywhere in the UI |
| `/admin/guests` | Supabase Auth | Guest list management, CSV import |
| `/admin/emails` | Supabase Auth | Send mailing list emails, preview templates |

---

## User Stories

### Epic 1: Site Access & Password Gate

**US-1.1** — As a **guest**, when I visit the site, I see a password entry screen. After entering the correct password, I can browse all guest-facing pages for the duration of my session.

**US-1.2** — As a **guest**, if I enter the wrong password, I see a friendly error message and can try again. There is no account creation.

**US-1.3** — As the **couple**, we can change the site password by updating a single environment variable.

**Acceptance Criteria:**
- Password stored as `SITE_PASSWORD` env var
- Password check sets a session cookie (httpOnly, secure)
- All guest routes (`/`, `/rsvp`, `/faq`, `/bridal-party`) are protected by middleware
- `/rsvp/modify/[token]` is NOT behind the password gate (guests access it from email)
- Mobile-optimized password entry screen

---

### Epic 2: Guest Data Import

**US-2.1** — As the **couple**, I can upload a CSV/Excel file through the admin panel to bulk-import our guest list. The import creates households and guests with pre-set plus-one allowances.

**US-2.2** — As the **couple**, I can manually add, edit, or remove guests and households from the admin panel.

**Expected CSV format:**
```
household_name, first_name, last_name, is_primary, max_plus_ones
"The Johnson Family", "Marcus", "Johnson", true, 2
"The Johnson Family", "Lisa", "Johnson", false, 0
"Solo Invite", "Derek", "Chen", true, 1
```

**Acceptance Criteria:**
- CSV import parses and validates before writing to DB
- Duplicate detection (by first + last name within household)
- Import preview screen showing what will be created
- Errors surfaced clearly (missing fields, bad format)
- Rollback on partial failure — all or nothing

---

### Epic 3: RSVP Flow

**US-3.1** — As a **guest**, I can search for my name on the RSVP page. I type my first and last name, and the system finds my record with fuzzy matching.

**US-3.2** — As a **primary guest**, after finding my name, I see an RSVP form pre-populated with all members of my household. I can mark each person as attending or not attending and fill in their details (meal preference, dietary restrictions, optional song request).

**US-3.3** — As a **primary guest** with plus-one allowances, I see additional fields to add plus-one names and their details, up to the pre-set limit for my household.

**US-3.4** — As a **guest** who is NOT the primary in my household, I see a message telling me that [Primary Guest Name] is managing the RSVP for my household, along with instructions to contact them.

**US-3.5** — As a **guest**, after submitting the RSVP, I see a confirmation screen and receive a confirmation email with a unique "Modify RSVP" link.

**US-3.6** — As a **guest**, I can click the modify link from my email to update my RSVP. If the deadline has passed, I see a friendly message that modifications are closed and to contact the couple directly.

**US-3.7** — As a **guest**, my email is collected during the RSVP process and I am automatically added to the wedding mailing list.

**Acceptance Criteria:**
- Fuzzy name search (handles typos, partial names)
- Form validates all required fields before submission
- RSVP token generated on submit (UUID), stored on guest record
- Confirmation email sent via Resend with modify link
- RSVP deadline configurable via env var (`RSVP_DEADLINE`)
- Plus-one fields only visible to households with `max_plus_ones > 0`
- Mobile-first form design — large tap targets, clear flow
- Cannot submit twice without using modify link

---

### Epic 4: Email System

**US-4.1** — As a **guest**, I receive a styled confirmation email after RSVPing that includes a summary of my responses and a modify link.

**US-4.2** — As the **couple**, I can send a broadcast email to everyone on the mailing list from the admin panel (e.g. schedule changes, reminders).

**US-4.3** — As the **couple**, I can preview email templates before sending them.

**US-4.4** — As a **developer** forking this template, I can test email templates locally using React Email's preview server.

**Acceptance Criteria:**
- All email templates are React components (`/emails/*.tsx`)
- Confirmation email includes: guest name, attending status, meal choice, modify link
- Broadcast emails use Resend's batch API
- Mailing list respects `subscribed` flag
- `npx react-email dev` works for local template preview
- Emails render well on mobile (Gmail, Apple Mail, Outlook)

---

### Epic 5: Admin Dashboard

**US-5.1** — As the **couple**, I can log in to a hidden admin route using Supabase Auth (email/password).

**US-5.2** — As the **couple**, I see a dashboard with at-a-glance stats: total guests, confirmed attending, declined, pending, % response rate, total meal counts by type.

**US-5.3** — As the **couple**, I can view and filter the full guest list with RSVP status, search by name, and export the data as CSV.

**US-5.4** — As the **couple**, I can manage the mailing list and compose/send broadcast emails.

**US-5.5** — As the **couple**, I can view charts: RSVP responses over time, attendance breakdown (pie chart), meal preference distribution.

**Acceptance Criteria:**
- Admin route is not linked anywhere in the guest-facing UI
- Supabase Auth with only 2 whitelisted accounts
- Dashboard loads stats via server components (no client-side data fetching for sensitive data)
- CSV export includes all guest fields
- Charts built with Recharts (already available in the stack)
- Fully responsive admin panel

---

### Epic 6: Guest-Facing Pages

**US-6.1** — As a **guest**, the **Home** page shows the couple's names, wedding date with countdown timer, venue, and a hero section. It sets the tone for the wedding.

**US-6.2** — As a **guest**, the **FAQ** page answers common questions (dress code, parking, accommodations, registry, etc.). Content is configurable.

**US-6.3** — As a **guest**, the **Bridal Party** page shows photos, names, and roles of the wedding party. Content is configurable.

**US-6.4** — As a **guest**, the site is fully responsive and optimized for mobile. Navigation is clean and intuitive.

**Acceptance Criteria:**
- All content driven by a config file (`/config/wedding.ts`)
- Mobile-first layouts, tested on iPhone SE and up
- Smooth animations, fast page loads (target < 2s LCP)
- Navigation: simple top nav on desktop, hamburger/drawer on mobile

---

### Epic 7: Open-Source Template

**US-7.1** — As a **developer**, I can fork the repo, update a single config file with my wedding details (names, date, venue, colors, FAQ content, bridal party info), and deploy to Vercel.

**US-7.2** — As a **developer**, I have clear documentation for setup: Supabase project creation, Prisma migration, Resend API key, environment variables, and CSV import.

**US-7.3** — As a **developer**, the codebase is well-structured, typed, and tested.

**Acceptance Criteria:**
- `wedding.config.ts` at project root controls all wedding-specific content
- Theme colors configurable (maps to Tailwind + ShadCN theme)
- Comprehensive README with setup guide
- `.env.example` with all required variables documented
- Seed script for local development with fake data
- MIT License

---

## Config File Shape (Draft)

```ts
// wedding.config.ts
export const weddingConfig = {
  couple: {
    person1: { firstName: "Jordan", lastName: "Smith" },
    person2: { firstName: "Alex", lastName: "Rivera" },
  },
  date: "2026-10-10T16:00:00",
  venue: {
    ceremony: { name: "St. Mary's Chapel", address: "123 Main St, Toronto, ON" },
    reception: { name: "The Grand Hall", address: "456 Oak Ave, Toronto, ON" },
  },
  rsvpDeadline: "2026-09-01T23:59:59",
  theme: {
    primaryColor: "#8B7355",
    accentColor: "#D4C5A9",
    fontFamily: "Playfair Display",
  },
  faq: [
    { question: "What is the dress code?", answer: "Semi-formal / cocktail attire." },
    { question: "Is there parking?", answer: "Yes, free parking is available at the venue." },
    // ...
  ],
  bridalParty: [
    { name: "Sam Taylor", role: "Best Man", image: "/images/bridal-party/sam.jpg", bio: "..." },
    // ...
  ],
  mealOptions: ["Chicken", "Fish", "Vegetarian", "Vegan"],
} as const;
```

---

## Testing Strategy

| Layer | Tool | What |
|-------|------|------|
| Unit | Vitest | Config parsing, fuzzy search logic, RSVP validation, token generation |
| Integration | Vitest + Prisma (test DB) | RSVP submission flow, guest import, mailing list ops |
| E2E | Playwright | Full RSVP flow (search → fill → submit → confirm), password gate, admin login, modify flow |
| Email | React Email Dev Server | Visual preview of all templates in browser |
| Manual | Resend Test Mode | Send real test emails to yourself before going live |

**Critical paths that MUST have E2E coverage:**
1. Password gate → RSVP search → form fill → submit → confirmation screen
2. Confirmation email → modify link → update RSVP → re-confirmation
3. Admin login → view dashboard → export CSV
4. CSV import → guests appear in admin → guests findable in RSVP search

---

## Environment Variables

```env
# Site
SITE_PASSWORD=yourweddingpassword
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Database (Supabase connection string for Prisma)
DATABASE_URL=postgresql://...

# Resend
RESEND_API_KEY=re_xxx
EMAIL_FROM=Your Wedding <wedding@yourdomain.com>

# Config
RSVP_DEADLINE=2026-09-01T23:59:59
```

---

## Folder Structure (Proposed)

```
wedding-template/
├── wedding.config.ts            # All wedding-specific content
├── prisma/
│   ├── schema.prisma
│   └── seed.ts                  # Dev seed data
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Home
│   │   ├── password/
│   │   │   └── page.tsx         # Password gate
│   │   ├── rsvp/
│   │   │   ├── page.tsx         # RSVP search + form
│   │   │   └── modify/
│   │   │       └── [token]/
│   │   │           └── page.tsx # Modify RSVP
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   ├── bridal-party/
│   │   │   └── page.tsx
│   │   └── admin/
│   │       ├── layout.tsx       # Supabase auth guard
│   │       ├── page.tsx         # Dashboard + charts
│   │       ├── guests/
│   │       │   └── page.tsx     # Guest list + import
│   │       └── emails/
│   │           └── page.tsx     # Compose + send
│   ├── components/
│   │   ├── ui/                  # ShadCN components
│   │   ├── rsvp/                # RSVP form components
│   │   ├── admin/               # Admin components
│   │   └── layout/              # Nav, footer, password gate
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── resend.ts
│   │   └── utils.ts
│   ├── actions/                 # Server actions
│   │   ├── rsvp.ts
│   │   ├── guests.ts
│   │   └── emails.ts
│   └── emails/                  # React Email templates
│       ├── rsvp-confirmation.tsx
│       ├── rsvp-modified.tsx
│       └── broadcast.tsx
├── public/
│   └── images/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example
├── README.md
└── package.json
```

---

## Implementation Priority

| Phase | What | Why |
|-------|------|-----|
| **1 — Foundation** | Project setup, Prisma schema, Supabase config, password gate middleware, basic layout + nav | Everything else depends on this |
| **2 — Guest Import** | Admin auth, CSV import, guest list view in admin | Need data in the DB before RSVP works |
| **3 — RSVP Core** | Name search, RSVP form, submission, database writes | The heart of the project |
| **4 — Email** | Resend integration, confirmation email, modify RSVP flow | Completes the RSVP loop |
| **5 — Admin Dashboard** | Stats, charts, CSV export, broadcast emails | Couple needs visibility |
| **6 — Guest Pages** | Home, FAQ, Bridal Party — all config-driven | Content pages, lowest risk |
| **7 — Polish & Test** | E2E tests, mobile QA, performance, README, open-source prep | Ship it |

---

## Non-Functional Requirements

- **Mobile-first**: All pages designed for mobile viewport first, scaled up for desktop
- **Performance**: < 2s Largest Contentful Paint on 4G
- **Reliability**: RSVP submissions must never be lost — server-side validation, database transactions, error handling with retry
- **Accessibility**: WCAG 2.1 AA compliance (form labels, focus management, contrast)
- **Security**: Admin routes behind Supabase Auth, RSVP tokens are UUID v4 (unguessable), rate limiting on RSVP search to prevent scraping
- **Deployability**: One-click Vercel deploy with environment variable prompts