# Wedding Website Templates

Open-source, self-hosted wedding website templates built with **Next.js 16**, **Tailwind CSS 4**, **ShadCN UI**, **Supabase**, **Prisma**, and **Resend**. Choose a design, edit one config file, and deploy.

## Templates

| Template | Style | Fonts | Preview Port |
|----------|-------|-------|-------------|
| **Watercolor** | Soft pink watercolor blobs, elegant serif | Playfair Display + Lato | 3003 |
| **Stationery** | Warm parchment, ornamental stars, invitation-card feel | Cormorant + Lora | 3001 |
| **Cinematic** | Full-width sections, bold type, border dividers | Italiana + Outfit | 3002 |

Each template includes:

- Password-protected guest pages (home, our story, details, FAQ, bridal party)
- RSVP flow with fuzzy name search, household support, and plus-ones
- RSVP modification via unique email link
- Confirmation and broadcast emails via Resend + React Email
- Admin dashboard with stats, guest management, CSV import/export, and mailing list

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) (package manager + runtime)
- [Supabase](https://supabase.com) project (free tier works)
- [Resend](https://resend.com) account (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/your-username/wedding-website-templates.git
cd wedding-website-templates
bun install
```

### 2. Set up environment variables

Copy the example env file into your chosen template:

```bash
cp .env.example templates/watercolor/.env.local
```

Fill in the values:

```env
DATABASE_URL=postgresql://...          # Supabase connection string (Transaction mode)
DIRECT_URL=postgresql://...            # Supabase connection string (Session mode)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_SITE_URL=http://localhost:3003
RESEND_API_KEY=re_xxx
EMAIL_FROM=Your Wedding <wedding@yourdomain.com>
SITE_PASSWORD=yourweddingpassword
```

### 3. Set up the database

Generate the Prisma client and run migrations:

```bash
DIRECT_URL=your_direct_url DATABASE_URL=your_database_url bunx prisma generate --schema=prisma/schema.prisma
bun run prisma:migrate
```

Optionally seed with sample data:

```bash
bun run prisma:seed
```

### 4. Customize your wedding details

Edit `templates/<your-template>/wedding.config.ts`:

```ts
export const weddingConfig = {
  couple: {
    person1: { firstName: "Emma", lastName: "Whitfield" },
    person2: { firstName: "James", lastName: "Harrington" },
  },
  date: "2026-09-12T15:00:00",
  tagline: "We're getting married!",
  venue: {
    ceremony: { name: "St. Andrew's Chapel", address: "142 Elm St, Maplewood, NJ" },
    reception: { name: "The Lakeview Estate", address: "88 Shoreline Dr, Maplewood, NJ" },
  },
  rsvpDeadline: "2026-08-01T23:59:59",
  schedule: [
    { time: "3:00 PM", event: "Ceremony" },
    { time: "5:30 PM", event: "Cocktail Hour" },
    { time: "6:30 PM", event: "Reception" },
  ],
  faq: [
    { question: "What is the dress code?", answer: "Formal attire." },
    // ...
  ],
  ourStory: {
    title: "Our Story",
    milestones: [
      { year: "2018", title: "Where it all began", description: "...", image: "" },
      // ...
    ],
  },
  bridalParty: [
    { name: "Daniel Moretti", role: "Best Man", image: "", bio: "" },
    // ...
  ],
} as const;
```

### 5. Run the dev server

```bash
# Pick one:
bun run dev:watercolor    # http://localhost:3003
bun run dev:stationery    # http://localhost:3001
bun run dev:cinematic     # http://localhost:3002
```

### 6. Deploy

Each template is a standard Next.js app. Deploy to [Vercel](https://vercel.com):

1. Push your repo to GitHub
2. Import in Vercel, set the **Root Directory** to `templates/<your-template>`
3. Add all environment variables
4. Deploy

## Project Structure

```
wedding-website-templates/
├── packages/                    # Shared internal packages
│   ├── config/                  # WeddingConfig TypeScript type
│   ├── database/                # Prisma client, schema, seed
│   ├── auth/                    # Cookie constants, Supabase clients, Resend
│   ├── actions/                 # Business logic (RSVP, guests, emails)
│   ├── email-templates/         # React Email templates
│   └── ui/                      # ShadCN components, RSVP flow, admin UI
├── templates/
│   ├── watercolor/              # Watercolor theme app
│   ├── stationery/              # Stationery theme app
│   └── cinematic/               # Cinematic theme app
├── prisma/
│   └── schema.prisma            # Database schema
├── wedding.config.ts            # Default example config
├── turbo.json                   # Turborepo config
└── package.json                 # Workspace root
```

Each template follows the same structure:

```
templates/<name>/
├── package.json
├── next.config.ts
├── wedding.config.ts            # Your wedding details
├── src/
│   ├── proxy.ts                 # Password gate middleware
│   ├── actions/                 # Server action thin wrappers
│   └── app/
│       ├── layout.tsx           # Root layout (fonts, metadata)
│       ├── globals.css          # Tailwind + ShadCN theme
│       ├── (main)/              # Guest-facing pages
│       │   ├── layout.tsx       # Theme shell (nav, footer)
│       │   ├── page.tsx         # Home
│       │   ├── our-story/
│       │   ├── details/
│       │   ├── faq/
│       │   ├── bridal-party/
│       │   └── rsvp/
│       ├── password/            # Password gate
│       ├── auth/unlock/         # Password verification
│       └── admin/               # Admin dashboard
│           ├── login/
│           └── (dashboard)/
```

## Admin Setup

The admin dashboard is at `/admin` (not linked in the guest UI). It uses Supabase Auth:

1. Go to your [Supabase dashboard](https://supabase.com/dashboard) > Authentication > Users
2. Create user accounts for you and your partner
3. Sign in at `your-site.com/admin/login`

From the admin dashboard you can:

- View RSVP stats and charts
- Manage the guest list (add, delete, search, filter)
- Import guests via CSV (`household_name, first_name, last_name, is_primary, max_plus_ones`)
- Export guest data as CSV
- Send broadcast emails to the mailing list

## Guest Flow

1. Guest visits the site and enters the shared password
2. Browses pages: home (with countdown), our story, details, FAQ, bridal party
3. Goes to RSVP, searches by name (fuzzy matched)
4. Fills out RSVP for their household (attendance, dietary restrictions, plus-ones)
5. Receives confirmation email with a unique modify link
6. Can update their RSVP via the modify link until the deadline

## Commands

```bash
bun run dev:watercolor           # Dev server (port 3003)
bun run dev:stationery           # Dev server (port 3001)
bun run dev:cinematic            # Dev server (port 3002)
bun run build                    # Production build (all templates)
bun run lint                     # ESLint (all templates)
bun run prisma:generate          # Generate Prisma client
bun run prisma:migrate           # Run database migrations
bun run prisma:seed              # Seed database with sample data
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Server Actions) |
| Build System | Turborepo |
| Package Manager | Bun |
| Styling | Tailwind CSS 4 + ShadCN UI |
| Database | PostgreSQL via Supabase |
| ORM | Prisma 7 |
| Auth | Supabase Auth (admin) + cookie-based password gate (guests) |
| Email | Resend + React Email |

## License

MIT
