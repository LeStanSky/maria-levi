# Maria Levi Photography — marialeviphoto.com

Editorial-first portfolio site for fashion / personal-brand photographer Maria Levi.

**Stack.** Next.js 16 (App Router) · Payload CMS v3 · Postgres (Neon) · Cloudflare R2 + Cloudflare Images · Vercel · Tailwind v4 · Biome · Sentry · Resend.

Single-language (en-US), inquiry-driven (no e-commerce, no online booking).

## Status

**Live on [marialeviphoto.com](https://marialeviphoto.com).** Phases 0–2 and the Phase 2.5 copy refresh complete; Phase 3 (Services & Lead Magnet) up next. Pre-launch — `robots.txt` blocks indexing until Phase 6 polish & launch.

The CMS-driven homepage entry is currently in draft (awaiting real photos); the hardcoded fallback hero serves `/` until that publishes.

Lighthouse on production (real device): **mobile 89 · desktop 90–94**.

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
| `pnpm copy-refresh` | Apply the v5 Bio + microcopy to `about-page`, `contact-page`, `lead-magnet-settings` globals via Payload Local API. Non-destructive (`updateGlobal` only) and idempotent. Set `NEXT_PUBLIC_SITE_URL` + `REVALIDATE_SECRET` to fire ISR after the writes. |
| `pnpm payload:migrate` | Apply pending Payload migrations against `DATABASE_URL`. CI + Vercel production deploy invoke this; you usually don't need to call it directly. |
| `pnpm payload:migrate:create` | Generate a new migration from the diff between code-side schema and the DB. Run after touching any collection / global / block / field shape. |
| `pnpm payload:migrate:status` | List which migrations are applied and which are pending. |
| `pnpm db:push` | Legacy — push current Drizzle schema directly (no migration file). Useful for fast local poking, but never run against prod (silently no-ops under `NODE_ENV=production`, and skips the audit trail). |
| `pnpm user:create` / `user:list` / `user:reset-password` / `user:disable` / `user:enable` / `user:delete` | Admin/editor user management CLIs. |
| `pnpm test` | Vitest integration + Playwright e2e. |
| `pnpm test:int` | Vitest only. |
| `pnpm test:e2e` | Playwright only. |

## Git hooks

Managed by Husky 9 (set up automatically by `pnpm install`'s `prepare` script).

- **pre-commit:** `lint-staged` runs Biome auto-fix on staged files only. Fast (~1–2s); never blocks WIP commits.
- **pre-push:** full `tsc --noEmit` + Vitest integration suite. Tests are skipped automatically if no `.env` file exists. Use `git push --no-verify` only as a last resort.

CI runs the same checks plus the production build, against a Postgres 16 service container.

## Schema changes

Schema lives in `src/collections/`, `src/globals/`, `src/blocks/`, and `src/fields/`. Any change to those — new collection, added field, type/index/relation change — needs a migration committed alongside the code.

```bash
# 1. Make your schema change (collection/global/block/field).
# 2. Regenerate types so the rest of the app compiles:
pnpm generate:types

# 3. Generate a migration from the diff against your local DB:
pnpm payload:migrate:create my-change-name
# → writes src/migrations/<timestamp>_my-change-name.{ts,json} and updates src/migrations/index.ts

# 4. Apply it locally to verify it actually runs cleanly:
pnpm payload:migrate

# 5. Commit the migration files along with the schema change.
```

CI runs `pnpm payload:migrate` against a fresh Postgres in the same step, so a broken migration fails the PR check before merge. Vercel production deploys run the same command via the `prebuild` hook ([scripts/maybe-migrate.ts](scripts/maybe-migrate.ts)) — gated to `VERCEL_ENV=production` only so preview deploys (which currently share the prod DATABASE_URL) never touch prod schema.

**`PAYLOAD_DB_PUSH=true` is a local-dev convenience only.** It's a no-op under `NODE_ENV=production` (Drizzle blocks it). Set it on prod and your schema will silently lag the code until something breaks — this killed `/api/users/login` on 2026-05-16 when the lead-magnet `Subscribers` collection shipped without its migration.

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
| **2** | Core pages — Home, About, Portfolio (3 levels), Contact, FAQ, Testimonials, error pages | ✅ Done |
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
| Sentry | ✅ | Tunnel route `/monitoring`, source maps wired. Production-only by default; client-side `replayIntegration` removed to keep the mobile bundle lean (server-side capture unaffected). |
| Resend | ✅ | Domain verified (SPF / DKIM / DMARC). Contact form wired: `POST /api/contact` → `Leads.create` (Payload Local API) → notification email with `Reply-To = lead email`. Email failure is Sentry-captured but non-blocking (Lead is source of truth). |
| Cloudflare R2 + Images | ⏳ | Deferred — current media stored via Payload's default storage; migrate before launch. |
| Flodesk | ⏳ | Marketing list — set up in Phase 3 with the lead magnet. |
| GA4 + Meta Pixel | ⏳ | Wired in Phase 5/6. |
