# Maria Levi Photography — marialeviphoto.com

Editorial-first portfolio site for fashion / personal-brand photographer Maria Levi.

**Stack.** Next.js 16 (App Router) · Payload CMS v3 · Postgres (Neon) · Cloudflare R2 + Cloudflare Images · Vercel · Tailwind v4 · Biome · Sentry · Resend.

Single-language (en-US), inquiry-driven (no e-commerce, no online booking).

## Status

**🚀 Launched — live on [marialeviphoto.com](https://marialeviphoto.com) (`1.0.0`).** Phases 0–5 complete (core pages, services, lead-magnet trinity + newsletter, blog, SEO city/state pages + sitemap/robots/OG, cookie consent, `/personal-branding` conversion landing). Public indexing enabled via `INDEX_SITE=true` in Vercel Production.

Four pages are held at `noindex` until Maria replaces their placeholder photos: `/testimonials` and the `personal-brand` / `portrait` / `model-tests` service niches. Un-noindex each as real photos land (see CHANGELOG 1.0.0).

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
| `pnpm seed:blog` | Parse `blog-seed-posts.md` into Payload BlogPosts + BlogCategories. Idempotent (matches by slug). Useful when standing up a fresh Neon branch for render testing. |
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

CI runs `pnpm payload:migrate` against a fresh Postgres in the same step, so a broken migration fails the PR check before merge. Vercel production AND preview deploys run the same command via the `prebuild` hook ([scripts/maybe-migrate.ts](scripts/maybe-migrate.ts)). Preview migrates against its own Neon branch (see "Environments" below), so a broken migration breaks the preview build, not prod — making preview an honest rehearsal for the release.

**`PAYLOAD_DB_PUSH=true` is a local-dev convenience only.** It's a no-op under `NODE_ENV=production` (Drizzle blocks it). Set it on prod and your schema will silently lag the code until something breaks — this killed `/api/users/login` on 2026-05-16 when the lead-magnet `Subscribers` collection shipped without its migration.

## Environments

Three Neon branches, each scoped to a single Vercel environment via `DATABASE_URL`:

| Vercel env | Neon branch | Who writes | What for |
|---|---|---|---|
| Production | `main` (prod) | `master` deploys | Live site |
| Preview | `preview` | every PR's preview deploy | Honest rehearsal of prod migrate flow + smoke test before release |
| Development (local) | `dev` | your local `pnpm dev` | Schema iteration before generating migrations |

The `DATABASE_URL` for each environment is set scoped in Vercel project settings. Use the **direct** Neon connection string (not pooled — pooled breaks Drizzle prepared statements). The preview branch is reset/refreshed periodically from prod; treat its data as throwaway.

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
    (frontend)/        — public pages (en-US): /, /about, /portfolio/*, /journal/*, /services/*, ...
      api/             — public endpoints (contact, lead-magnet, newsletter, revalidate)
    (payload)/admin/   — Payload admin UI
    (payload)/api/     — Payload REST + GraphQL routes
    global-error.tsx   — Sentry-wired root error boundary
  admin/components/    — Custom Payload admin UI extensions (logout link, etc.)
  collections/         — Payload collection configs (Pages, Portfolio*, Blog*, Services, FAQ, Subscribers, Leads, ...)
  globals/             — Payload globals (SiteSettings, Navigation, AboutPage, ContactPage, FaqPage, LeadMagnetSettings, ...)
  blocks/              — Reusable Payload blocks
    universal/         — Cross-collection blocks (RichText, MediaBlock, PullQuote, HeroSlider, ...)
    blog/              — Blog-only blocks (BlogQuote, BlogImageGrid, BlogVideoEmbed, BlogTipCallout, BlogResourceLink, BlogLeadMagnetInline)
  fields/              — Shared field helpers (access, seo, slug)
  hooks/               — Payload hooks (createRedirect, revalidatePage)
  migrations/          — Payload migration files + index (one per schema-changing PR)
  components/
    primitives/        — Button, Heading, Text, Container, Section, Breadcrumbs, Image
    layout/            — Sidebar, Footer, MobileMenu, StickyInquireCTA, NewsletterSignup.client
    lead-magnet/       — LeadMagnetMount (popup), FooterLeadMagnet (banner above footer)
    blocks/            — Page-builder + blog block renderers (Blocks.tsx, BlogBlocks.tsx, blog/*)
    sections/          — Page-specific composed sections (SeriesPhotoGrid, Lightbox, ...)
  lib/                 — fonts, payload client, seo/media helpers, email (Resend), marketing (Flodesk/analytics), lead-magnet (settings + token)
  styles/
    fonts/             — self-hosted variable woff2 (see docs/fonts.md)
  payload.config.ts    — root Payload configuration
docs/                  — fonts.md, content-editing-guide.md (WIP), etc.
scripts/               — seed, seed-blog-posts, copy-refresh, db-push, maybe-migrate, baseline-migration, user management CLIs
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
| **3** | Services pages + Lead Magnet popup (PR-B) + signed PDF delivery + Payload migrations + preview Neon branch | ✅ Done |
| **4** | Blog at `/journal` — index + `/journal/[slug]` post pages, 9 body block renderers, related posts/series, inline lead-magnet (PR-B2) | ✅ Done |
|  | Footer lead-magnet banner + newsletter signup form (PR-B3) | ✅ Done |
| **5** | SEO & City Pages — `/photographer-in/[city]` × 5 (PR-A) + state landings `/nyc` `/new-jersey`, dynamic `sitemap.xml`, `app/robots.ts` with `INDEX_SITE` flag, branded OG-image autogen for every dynamic route (PR-B) | 🚧 In progress |
|  | GA4 + Meta Pixel scaffolding (PR-C) + cookie banner + Sentry FATAL filter (PR-D) + beta checkpoint | Up next |
| **6** | Polish & Launch — Lighthouse, copy QA, indexing, real content from Maria | Planned |

**Lead-magnet status on prod.** All three placement surfaces (popup / blog-inline / footer banner) are wired in code and gated on `LeadMagnetSettings.enabled` + `placement[]` + `pdfFile` + `title`. They stay inert until Maria runs the activation checklist in `/admin → Marketing → Lead Magnet`. Newsletter form in the Footer accepts signups immediately and stores them in `Subscribers` with `source: 'newsletter'`; Flodesk sync no-ops until `FLODESK_API_KEY` + `FLODESK_NEWSLETTER_TAG` are set in Vercel env.

## External services

| Service | Status | Notes |
|---|---|---|
| GitHub | ✅ | Branch protection on `master` + `dev`. |
| Neon (Postgres) | ✅ | Three branches: `main` (prod) + `preview` + `dev`. Each scoped to its own Vercel env via `DATABASE_URL`. Direct URLs only (pooled disabled project-wide). |
| Vercel | ✅ | Production deploys from `master`. Custom domain `marialeviphoto.com` (apex primary, www → 308 → apex). |
| Sentry | ✅ | Tunnel route `/monitoring`, source maps wired. Production-only by default; client-side `replayIntegration` removed to keep the mobile bundle lean (server-side capture unaffected). |
| Resend | ✅ | Domain verified (SPF / DKIM / DMARC). Contact form wired: `POST /api/contact` → `Leads.create` (Payload Local API) → notification email with `Reply-To = lead email`. Email failure is Sentry-captured but non-blocking (Lead is source of truth). |
| Cloudflare R2 + Images | ⏳ | Deferred — current media stored via Payload's default storage; migrate before launch. |
| Flodesk | ⏳ | Lead-magnet AND newsletter adapters both wired (no-ops when key absent — write `flodeskSyncStatus: 'skipped'` per subscriber). Set `FLODESK_API_KEY` once Maria opens an account, plus optional `FLODESK_NEWSLETTER_TAG` for segmenting newsletter signups separately from lead-magnet ones. |
| GA4 + Meta Pixel | ⏳ | Wired in Phase 5/6. |
