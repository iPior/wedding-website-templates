# Pre-Handoff Checklist

- Change stays within intended scope (template-specific vs shared).
- No secrets added (`.env`, API keys, tokens, credentials).
- Imports and types resolve.
- Commands run successfully for the scope:
  - `bun run lint`
  - `bun run build` (or focused turbo build for a single template)
- If schema changed: ran `bun run prisma:generate` and migration flow.
- If RSVP flow changed: tested search + submit + modify path.
- If admin changed: tested login and dashboard navigation.
- Docs updated when behavior/commands changed.
