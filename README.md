# Wedding Website Design Showcase

This repo is now a single Next.js app that showcases three complete wedding website designs in route namespaces:

- `/watercolor`
- `/stationery`
- `/cinematic`

Each design includes:

- Home
- Our Story
- Details
- FAQ
- Bridal Party
- RSVP (static interactive demo)
- Admin dashboard (mock data)

Admin entrypoint:

- `/admin` redirects to `/watercolor/admin`
- themed admin routes are available under each variant, including `/guests` and `/emails`

A floating variant switcher is overlaid on every page so you can jump between designs quickly while keeping route context when possible.

## Why this structure

For demos, browsing designs as routes in one app is simpler than running separate template repos/apps.

## Quick Start

```bash
bun install
bun run dev
```

Open `http://localhost:3000`.

## Commands

```bash
bun run dev
bun run build
bun run lint
```

## Project Structure

```text
src/app/
  page.tsx                 # Showcase home
  watercolor/*             # Watercolor design pages
  stationery/*             # Stationery design pages
  cinematic/*              # Cinematic design pages
src/components/
  demo-rsvp-flow.tsx       # Static RSVP interaction used in demos
  variant-switcher.tsx      # Floating cross-variant route switcher
  admin/mock-admin-page.tsx # Themed mock admin dashboard pages
packages/ui/               # Shared UI primitives + reusable components
src/lib/wedding-config.ts  # Shared content for names/date/faq/etc.
```

## Important Note

The original full-stack version of this project used Supabase, Prisma, Resend, admin routes, and a production RSVP pipeline. This showcase intentionally strips those backend systems so the focus stays on visual design exploration.

## License

MIT
