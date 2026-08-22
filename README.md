# ANVESH — Landing Page

The landing page for **ANVESH**, an AI-powered biomedical evidence intelligence platform. It
opens with a one-time, first-load splash animation (particles + DNA/molecular motif), then
presents the marketing page: a hero with an animated evidence-report carousel, product pillars
(Discover / Connect / Verify), a research trust section, a resources library preview, and a
search teaser — all in a premium black/navy/teal/cyan glassmorphic theme.

This repository currently contains the landing experience only — there is no authentication,
dashboard, or backend yet. "Sign In," "Create Account," and the search box open an honest
early-access modal instead of simulating a product that isn't built.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router)
- Vite 7
- Tailwind CSS 4 with a custom design-token theme (no component library)
- TypeScript (strict mode)
- Deployed on Netlify

## Running locally

```bash
npm install
npm run dev
```

Then open the printed local URL. The splash animation plays once per browser session — clear
`sessionStorage` (or open a private window) to see it again.

## Project structure

See [AGENTS.md](./AGENTS.md) for the full directory breakdown and conventions.

## Building the rest of the platform

The full ANVESH product spec (Supabase auth, dashboard, Evidence Query, Evidence Maps, Conflict
Detector, Research Library, AI chat, and their backing database models) is not implemented here
yet. `AGENTS.md` has notes on how that should be layered in — real biomedical data sources only,
Netlify DB for persistence, and no fabricated evidence or exposed API keys.
