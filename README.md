# Maria Levi Photography — marialeviphoto.com

Editorial-first portfolio site for fashion / personal-brand photographer Maria Levi.

**Stack.** Next.js 16 (App Router) · Payload CMS v3 · Postgres (Neon) · Cloudflare R2 + Cloudflare Images · Vercel · Tailwind v4 · Biome · Sentry · Resend.

Single-language (en-US), inquiry-driven (no e-commerce, no online booking).

## Status

**Live on [marialeviphoto.com](https://marialeviphoto.com).** Currently in Phase 2 (Core Pages). Pre-launch — `robots.txt` blocks indexing until Phase 6 polish & launch.

See [Roadmap](#roadmap) below for phase-by-phase status.

## Local setup

Prerequisites:

- Node 25 (pinned via `.nvmrc`; CI reads the same `.nvmrc`). Vercel runtime is Node 22 LTS — `engines.node: ">=22.0.0"` covers both.
- pnpm 10+.
- A reachable Postgres instance — local Docker, or a Neon dev branch.

```bash
pnpm install
cp .env.example .env
# edit .env — at minimum DATABASE_URL and PAYLOAD_SECRET
pnpm seed:admin   # interactive — first time only, creates initial admin user
pnpm seed         # optional — populates demo content (categories, services, FAQ, testimonials, city pages)
pnpm dev
```

Open `http://localhost:3000` for the public site, `http://localhost:3000/admin` for Payload.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Next.js dev server with Payload integrated. |
| `pnpm devsafe` | Same, but wipes `.next/` first (use when caches go bad). |
| `pnpm build` | Production build. |
| `pnpm start` | Run production build. |
| `pnpm lint` | Biome check (lint + format-check). |
| `pnpm lint:fix` | Biome auto-fix. |
| `pnpm typecheck` | `tsc --noEmit`. |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` from collection schemas. |
| `pnpm generate:importmap` | Regenerate Payload admin import map (after adding custom components). |
| `pnpm seed:admin` | Create the initial admin user (refuses if any user exists). |
| `pnpm seed` | Populate demo content into whatever DB `DATABASE_URL` points to. Idempotent — skips collections that already have data. |
| `pnpm db:push` | Push current Drizzle schema to the DB (use sparingly — production should run migrations once schema stabilises). |
| `pnpm user:create` / `user:list` / `user:reset-password` / `user:disable` / `user:enable` / `user:delete` | Admin/editor user management CLIs. |
| `pnpm test` | Vitest integration + Playwright e2e. |
| `pnpm test:int` | Vitest only. |
| `pnpm test:e2e` | Playwright only. |

## Git hooks

Managed by Husky 9 (set up automatically by `pnpm install`'s `prepare` script).

- **pre-commit:** `lint-staged` runs Biome auto-fix on staged files only. Fast (~1–2s); never blocks WIP commits.
- **pre-push:** full `tsc --noEmit` + Vitest integration suite. Tests are skipped automatically if no `.env` file exists. Use `git push --no-verify` only as a last resort.

CI runs the same checks plus the production build, against a Postgres 16 service container.

## Branching

```
feature/* → PR → dev → release PR → master → Vercel production deploy
```

Branch protection is enabled on both `master` and `dev`. Feature branches never target `master` directly. Vercel deploys production from `master`; PR previews build from any branch.

Small focused PRs preferred over large bundles — e.g. `chore/robots-noindex`, `fix/isr-revalidate-and-logout`. Multi-task work splits into separate branches when scopes are independent (CMS schema vs. frontend rendering vs. external integration).

## Project layout

```
src/
  app/
    (frontend)/        — public pages (en-US): /, /about, /portfolio/*
    (payload)/admin/   — Payload admin UI
    (payload)/api/     — Payload REST + GraphQL routes
    api/revalidate/    — ISR webhook (called by Payload afterChange hooks)
    global-error.tsx   — Sentry-wired root error boundary
  admin/components/    — Custom Payload admin UI extensions (logout link, etc.)
  collections/         — Payload collection configs (Pages, Portfolio*, Blog*, Services, FAQ, Leads, etc.)
  globals/             — Payload globals (SiteSettings, Navigation, AboutPage, ContactPage, FaqPage, …)
  blocks/              — Reusable Payload blocks (hero, gallery, testimonial, etc.)
  fields/              — Shared field helpers (access, seo, slug)
  hooks/               — Payload hooks (createRedirect, revalidatePage)
  components/
    primitives/        — Button, Heading, Text, Container, Section
    layout/            — Sidebar, Footer, MobileMenu, StickyInquireCTA
  lib/                 — fonts, payload client, utilities
  styles/
    fonts/             — self-hosted variable woff2 (see docs/fonts.md)
  payload.config.ts    — root Payload configuration
docs/                  — fonts.md, content-editing-guide.md (WIP), etc.
scripts/               — seed, db-push, user management CLIs
tests/                 — int/ (Vitest), e2e/ (Playwright)
```

## ISR & content updates

Public pages are statically generated with `revalidate = 60`. Edits in the Payload admin trigger an immediate revalidation via the `revalidatePage` hook → `POST /api/revalidate` (authenticated with `REVALIDATE_SECRET`). Content changes appear on prod within ~5 seconds.

## Roadmap

8 weeks across 6 phases. Status as of latest update:

| Phase | Scope | Status |
|---|---|---|
| **0** | Foundation — scaffold, design tokens, fonts, Biome, CI, external services | ✅ Done |
| **1** | Content model — 12 collections, 7 globals, 28 block stubs, shared fields, hooks, seed | ✅ Done |
| **2** | Core pages — Home, About, Portfolio (3 levels), Contact, FAQ, Testimonials, error pages | 🟡 In progress (Week 3 live, Week 4 in flight) |
| **3** | Services & Lead Magnet | Planned |
| **4** | Blog | Planned |
| **5** | SEO & City Pages — 5 NYC-metro landings + beta checkpoint | Planned |
| **6** | Polish & Launch — Lighthouse, copy QA, indexing, real content from Maria | Planned |

## External services

| Service | Status | Notes |
|---|---|---|
| GitHub | ✅ | Branch protection on `master` + `dev`. |
| Neon (Postgres) | ✅ | Two branches: `production` + `dev`. |
| Vercel | ✅ | Production deploys from `master`. Custom domain `marialeviphoto.com` (apex primary, www → 308 → apex). |
| Sentry | ✅ | Tunnel route `/monitoring`, source maps wired. |
| Resend | 🟡 | Domain verified; wired into Contact form in Phase 2 Week 4. |
| Cloudflare R2 + Images | ⏳ | Deferred — current media stored via Payload's default storage; migrate before launch. |
| Flodesk | ⏳ | Marketing list — set up in Phase 3 with the lead magnet. |
| GA4 + Meta Pixel | ⏳ | Wired in Phase 5/6. |
