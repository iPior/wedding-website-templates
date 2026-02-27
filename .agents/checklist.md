# Pre-Handoff Checklist

- Change stays within intended scope (theme-specific vs shared).
- No secrets added (`.env`, API keys, tokens, credentials).
- Imports and types resolve.
- Commands run successfully:
  - `bun run lint`
  - `bun run build`
- If RSVP demo changed: tested search -> form -> confirmation flow.
- If mock admin changed: tested dashboard, guests, and emails pages in all themes.
- If variant switcher changed: tested cross-theme route preservation.
- Docs updated when behavior/commands changed.
