# AGENTS.md

This document orients AI agents and developers working on this codebase.

## Project Overview

ANVESH is the landing page for an AI-powered biomedical evidence intelligence platform. This
repository currently contains **only the marketing/landing experience** — a first-load splash
animation, navbar, hero with an evidence carousel, product/research/resources sections, and a
search teaser. There is no authentication, dashboard, or backend yet; "Sign In" / "Create
Account" / search actions honestly present an early-access modal instead of pretending to be
wired to a real product, since that product doesn't exist in this codebase yet.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (custom theme via CSS variables, no component library) |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public/                       # favicon, static assets
├── src
│   ├── components
│   │   ├── Logo.tsx              # ANVESH logomark (SVG) + wordmark
│   │   ├── Navbar.tsx            # Sticky nav, scroll-aware glass background, mobile menu
│   │   ├── Splash.tsx            # First-load-only 4s splash (SplashGate + Splash), sessionStorage gated
│   │   ├── EvidenceCarousel.tsx  # Auto-advancing 3D card carousel (reports/trials/evidence)
│   │   ├── NetworkVisual.tsx     # Decorative SVG evidence-network graph + DNA strand
│   │   └── AccessModal.tsx       # Honest "not open yet" modal for Sign In / Create Account / Search
│   ├── hooks
│   │   └── useReveal.ts          # IntersectionObserver-based scroll-reveal hook
│   ├── routes
│   │   ├── __root.tsx            # Root document: fonts, meta, HTML shell
│   │   └── index.tsx             # The landing page — composes all sections
│   ├── router.tsx
│   └── styles.css                # Theme tokens (--anv-*), glass/glow utilities, keyframes
├── netlify.toml
├── package.json
├── tsconfig.json                 # @/* → ./src/*
└── vite.config.ts
```

## Key Concepts

### Splash gate

`SplashGate` (in `src/components/Splash.tsx`) wraps the page content. On mount it checks
`sessionStorage['anvesh:splash-shown']`; if absent, it shows the 4s particle/DNA splash once per
browser session and then reveals the landing page. Refreshing within the same tab session skips
the splash — this is intentional ("first-load-only").

### No fake functionality

Sign In, Create Account, and the search form all open `AccessModal`, which is explicit that the
full platform isn't live yet and offers a real `mailto:` early-access capture — nothing pretends
to authenticate, search literature, or return evidence that doesn't exist.

### Styling system

All theme colors are CSS custom properties defined in `:root` in `styles.css`
(`--anv-black`, `--anv-navy`, `--anv-teal`, `--anv-cyan`, etc.). Reusable visual utilities:
`.glass` (frosted card), `.glow-border` / `.glow-text` (teal/cyan glow), `.reveal` +
`useReveal()` (scroll-in animation), `.shimmer-text` (animated gradient text).

## Development Commands

```bash
npm run dev      # Start dev server (vite dev --port 3000)
npm run build    # Production build
```

## Conventions

- Components: PascalCase, one component family per file in `src/components/`.
- Hooks: camelCase, `useX` naming, in `src/hooks/`.
- Routes: TanStack Router file-based routing under `src/routes/`.
- Import paths use the `@/` alias for `src/`.
- Strict TypeScript; avoid `any` — the one custom-CSS-property style object is cast to
  `React.CSSProperties` rather than suppressed with `@ts-ignore`.

## Extending this into the full ANVESH platform

The original product spec includes Supabase auth, a dashboard (Evidence Query, Evidence Maps,
Conflict Detector, Research Library, Saved Evidence, History, Settings), a floating AI chat, and
Postgres-backed models for profiles/queries/evidence/sources/saved items/history/resources/
feedback/chat/evidence-map graphs. None of that exists yet in this repo. When building it:

- Use Netlify DB (Postgres via `@netlify/database` + Drizzle) for all persistent models —
  do not use in-memory stores or local JSON files.
- Real evidence data must come from live PubMed/NCBI, ChEMBL, and ClinicalTrials.gov APIs;
  never fabricate citations, trial IDs, or conflicts.
- Route AI calls through environment-variable-configured backend endpoints — never ship API
  keys to the client.
- Replace `AccessModal`'s "not open yet" messaging and wire Sign In/Create Account to real
  Supabase auth once that backend exists.
