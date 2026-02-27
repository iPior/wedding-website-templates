# Wedding Website Design Showcase

I had some leftover designs when making my wedding website so I figured I would throw them on here for anyone to use. I had Supabase connected for auth and database, Resend for email broadcasting, and my own RSVP system. That's all been striped from the original project to keep this repo as a preview only. 

Originally hosted as a monorepo, but now this repo is now a single Next.js app that showcases three complete wedding website designs in route namespaces:

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
