# Changelog

All notable changes to this project are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/); versions follow semver.

Pre-launch the project stays on `0.x`. **`1.0.0` marks the public launch**
(indexing enabled + announcement). After that: features → minor, fixes → patch.

## [1.0.3] — 2026-07-29 — fix: retry reads through Neon cold-start failures

### Fixed
- **Cold-start read failures on `GET /`** (Sentry MARIA-LEVI-17 homepage count,
  MARIA-LEVI-18 footer navigation). v1.0.2 killed the *fatal* idle-drop crash,
  but Neon Free scale-to-zero still failed the *in-flight* query on the first
  request after a suspend — the connect timed out or the socket dropped
  mid-query, surfacing as handled `Failed query` errors. New `withDbRetry`
  (`src/lib/db-retry.ts`) retries an idempotent read up to 2× with short
  backoff, but **only** on transient transport errors (`Connection terminated` /
  `connection timeout` / `ECONNRESET`), walking the `DrizzleQueryError.cause`
  chain. The failed first attempt is what wakes the Neon compute, so the retry
  lands on the now-awake pool — a cold-start error becomes a slightly slower
  success. Wrapped the every-request hot reads: homepage lookup + footer
  `navigation` / `site-settings` globals. `connectionTimeoutMillis` stays 15s on
  purpose — with up to 3 attempts a longer per-attempt timeout could push a
  truly-dead-DB request past Vercel's function limit.

### Notes
- **MARIA-LEVI-B ("N+1 Query")** is the same scale-to-zero root, not a code
  N+1: the trace shows ~6s `pg-pool.connect` spans (Neon compute waking) fanned
  out across concurrent RSC fetchers, while the actual SELECTs run in 19–90 ms.
  It resolves once the compute is warm; no separate fix.
- The cold-start **root** (Neon Free scale-to-zero) still needs a Neon Launch
  upgrade to eliminate — deferred. This release makes the failures self-heal.

### Tests
- `tests/unit/lib/db-retry.unit.spec.ts` — transient/non-transient split,
  cause-chain detection, success-without-retry, retry exhaustion.

## [1.0.2] — 2026-07-29 — fix: Neon connection resilience + Sentry noise + Node 24

### Fixed
- **Fatal crash on a dropped idle Postgres connection** (Sentry MARIA-LEVI-16).
  Neon closes idle pooled connections from its side; `@payloadcms/db-postgres`
  never attaches a Pool-level `error` listener, so node-postgres re-emitted the
  drop as an unhandled `error` event → `uncaughtException` killed the serverless
  function. `onInit` now attaches `pool.on('error')` — the drop logs a warning
  and the next query transparently reconnects.
- **Sentry noise filtered:**
  - Instagram / Facebook in-app WebView `window.webkit.messageHandlers` errors
    (MARIA-LEVI-12) — not our code; the injected native-bridge script runs in
    the document context so its frames are flagged `in_app`, which slipped past
    the existing "no app frame" filter. Added an explicit `ignoreErrors` match.
    Expect volume here as the `/personal-branding` ad drives Instagram traffic.
  - Empty `Error: undefined` unhandled rejections that trail a failed Payload
    connect (MARIA-LEVI-14); the real connect error (MARIA-LEVI-15) still
    reports.

### Changed
- **Node aligned to 24** (prod runtime is 24.18). `engines.node` `>=22.0.0` →
  `>=24.0.0` — drops the deprecated Node 22 from the allowed range (removes the
  Vercel deploy deprecation warning); local Node 25 still satisfies it. `.nvmrc`
  `25` → `24` so CI (`node-version-file`) tests on the prod runtime instead of
  non-LTS Node 25.

### Known / deferred
- The **cold-start connect timeout** (MARIA-LEVI-15) root cause is Neon
  Free-tier scale-to-zero (5-min autosuspend, locked on Free). This release
  makes the failure non-fatal but doesn't eliminate it — fixing at the source
  needs a Neon Launch upgrade to disable/extend autosuspend, deferred by choice.

## [1.0.1] — 2026-06-13 — fix: Neon connection pooling

### Fixed
- **Neon "too many connection attempts"** under serverless cold-start bursts
  (surfaced on a preview deploy; Sentry MARIA-LEVI-15). The app connected to
  Neon's DIRECT endpoint with no pooling. Runtime `DATABASE_URL` is now
  expected to point at Neon's POOLED (`-pooler`) endpoint so bursts hit
  PgBouncer, not Postgres. Migrations keep using a direct connection
  (`DATABASE_URL_UNPOOLED`) via `scripts/maybe-migrate.ts` — PgBouncer
  transaction pooling can't do the migrator's session-level advisory locks.
  Falls back to `DATABASE_URL` when the unpooled var is unset (no-op until the
  pooled endpoint is configured in Vercel env). Added pg pool idle /
  connection timeouts for serverless.

## [1.0.0] — 2026-06-13 — 🚀 Public launch

The site is content-complete on its core pages (home, about, portfolio,
services index) and goes public. Indexing is enabled by setting
`INDEX_SITE=true` in Vercel Production env (ops step).

### Added
- **Direct contact methods** on `/contact` — an icon row for Call
  (`tel:`), Text (`sms:`), Email (`mailto:`) and social profiles, all read
  from `SiteSettings` (renders only the methods Maria has filled). Footer
  socials upgraded from text to brand-glyph icons. New inline icon set
  (`src/components/primitives/icons.tsx`) — no icon dependency.

### Changed
- **`noindex` on the pages still showing placeholder photos** so they stay
  out of the index at launch (a photographer's placeholder photos must not
  be what Google caches first):
  - `/testimonials` — `<meta noindex>` (temporary; remove when real
    testimonial photos land) + dropped from `sitemap.xml`.
  - `/services/personal-brand-photography`, `/services/portrait-photography`,
    `/services/model-tests` — data-driven via each Service's
    `seo.noIndex` (set by `scripts/noindex-placeholder-services.ts`); Maria
    unchecks each in `/admin → Services → <niche>` once real photos are up.
    `sitemap.xml` now excludes `noindex` services.
  - `/services/commercial-photography` and the rest of the site index
    normally (real content).

### Launch ops (outside this repo)
1. Set `INDEX_SITE=true` in Vercel → Production env + redeploy.
2. Run `scripts/noindex-placeholder-services.ts` against prod.
3. Maria fills phone + Instagram (and other socials) in
   `/admin → Site Settings`, and replaces the placeholder photos — then
   un-noindexes those four pages.
4. Submit `sitemap.xml` to Google Search Console.

## [0.9.12] — 2026-06-13 — /personal-branding conversion landing

### Added
- **`/personal-branding` landing page** — a long-form, conversion-oriented
  landing for paid traffic, built on the Pages block-builder in the
  editorial light skin, `noindex` (kept out of `sitemap.xml` so it doesn't
  compete with the organic `/services/personal-brand` + city pages).
  Sections: campaign hero → "why it matters" → "what I create" → curated
  portfolio → how it works → pricing → testimonial → about → final CTA.
  CTAs point to `/contact?session_type=personal-brand&source=personal-branding`
  (the `source` lands in the Lead's `pageSubmittedFrom` for ad attribution).
- **`CampaignHero` block** — headline + subhead + price line + single CTA.
  Desktop: headline spans the top (tight, balanced wrapping) with the photo
  and supporting details below; mobile stacks.
- **`PricingCards` block** — references a Service and renders its `packages[]`
  from the CMS, so prices stay single-sourced (Maria edits them in Services).
- **`process-steps` block renderer** — the block existed in the schema but had
  no Pages renderer (only the niche page rendered it bespoke); now available
  to any page.
- **`Pages.compactSpacing` toggle** — tightens inter-block vertical rhythm via
  a `.page-compact` wrapper + unlayered CSS (collapses the editorial section
  padding to ~90px gaps). Reusable on any landing.
- **`pnpm seed:personal-branding`** — idempotent seed for the landing page
  (marketer's draft copy; Maria refines copy / curates series in `/admin`).

### Migration
- `20260622_212529_personal_branding_blocks` — adds the `campaign-hero` +
  `pricing-cards` block tables (on `pages`, `_pages_v`, `local_landing_pages`
  and its version table) and the `compact_spacing` / `version_compact_spacing`
  columns on `pages` / `_pages_v`.

## [0.9.11] — 2026-06-13 — hotfix: admin pencil CSS selector

### Fixed
- **Admin pencil-edit icon is finally actually hidden.** 0.9.10 shipped
  the CSS rule with the wrong selector — I guessed the
  `RelationshipContent` component's BEM `baseClass` from its file path
  (`fields/Upload/RelationshipContent/index.js`) and wrote
  `.relationship-content__edit`. The actual `baseClass` declared at
  line 15 of that file is `'upload-relationship-details'`, so the real
  class on the edit button is `.upload-relationship-details__edit`.
  Rule confirmed: not present in the prod CSS bundle for 0.9.10 in any
  matching form, present in 0.9.11. Cross-verified by reading Payload's
  own emitted styles — `.upload-relationship-details__imageAndDetails`
  / `__thumbnail` etc. ship in the prod admin bundle, proving the
  baseClass is real on every upload-field DOM node.
  - User-visible: pencil now actually disappears from upload field
    cards in `/admin`. The safe workflow (Remove × → drop new file in
    the empty dropzone) was already working in 0.9.10 because the data
    layer is clean; the bug fix from 0.9.10 just wasn't taking effect.

## [0.9.10] — 2026-06-13 — Phase 5 PR-D, Image Optimization quota, admin upload fix, coverage tooling

### Added
- **Phase 5 PR-D — cookie consent banner**
  ([#81](https://github.com/LeStanSky/maria-levi/pull/81)). First-visit
  bottom-left card, US-market two-choice model (**Accept all** /
  **Reject non-essential**) + link to the existing `/cookie-notice`.
  Stores the answer in an `ml-cookie-consent` cookie (365 d, SameSite=Lax)
  and dispatches `window.dispatchEvent('ml-cookie-consent-changed', …)`
  so the PR-C analytics init (GA4 + Meta Pixel, pending Maria's tracking
  IDs) can load only on `'accepted'`. `useCookieConsent()` hook exposes
  the same state to React consumers. Anchored bottom-left so it stays
  out of the StickyInquireCTA's bottom-right slot.
- **Sentry `beforeSend` smart filter** ([#81](https://github.com/LeStanSky/maria-levi/pull/81)).
  Client exceptions whose stacktrace contains no `in_app: true` frame
  are dropped. Browser extensions (crypto wallets, ad-blockers, password
  managers, in-page assistants) inject content scripts whose errors all
  surface via Sentry's global `addEventListener` instrumentation with
  `<anonymous>:N` or `chrome-extension://…` frames — none of them
  flagged `in_app` by the SDK. With this filter we catch the entire
  class, not just the specific wallet probe that motivated it. Subsumes
  the targeted `Error invoking … Method not found` regex from
  [#79](https://github.com/LeStanSky/maria-levi/pull/79) (regex removed
  during rebase as redundant).
- **v8 test coverage reporting + 72 pure-function unit tests** (PR-T1,
  [#82](https://github.com/LeStanSky/maria-levi/pull/82)). New
  `tests/unit/` tier covers `lib/seo` / `lib/jsonld` / `lib/media` /
  `lib/local/series-by-city` / `fields/slug` — `src/lib` group now at
  **85 %** statements. Whole-`src/` baseline went 15.4 % → 18.0 %.
  `vitest.config.mts` gains a `coverage` block; new `pnpm test:coverage`
  script; no CI threshold gate yet (lands in PR-T4 once we hit the 65 %
  target the user set on 2026-05-17).

### Changed
- **`next/image minimumCacheTTL: 60 s → 1 year`**
  ([#80](https://github.com/LeStanSky/maria-levi/pull/80)). Vercel
  free-tier Image Optimization alert hit 75 % (3 750 / 5 000) pre-launch
  with `INDEX_SITE=false`. The 60-second default re-runs the
  transformation every time the variant cache expires, even though the
  underlying photos are immutable (Payload media URLs are id-based;
  replacing a photo in CMS yields a fresh URL → fresh cache key, so
  long TTL is safe). Buys time before the proper Cloudflare Images
  migration.

### Fixed
- **Sentry wallet-extension noise — fast-ship hotfix**
  ([#79](https://github.com/LeStanSky/maria-levi/pull/79)). First
  instance landed in prod on 2026-06-10 13:26 UTC on `/` (Sentry ID
  `e4d92df6`): `Error invoking post: Method not found` from a crypto
  wallet content script probing the page for a web3 provider. Shipped
  as a targeted regex inside `ignoreErrors`, then superseded by the
  broader `beforeSend` filter from
  [#81](https://github.com/LeStanSky/maria-levi/pull/81) in this same
  release.
- **Admin: shared-photo bug on duplicated Services**
  ([#83](https://github.com/LeStanSky/maria-levi/pull/83)). Maria
  reported (2026-06-12): "I duplicate a Service, set a new photo on
  the duplicate, save — and the photo appears on the original too."
  Root cause: the pencil-edit icon on a `type: 'upload'` field opens
  the related Media doc in a drawer; dropping a new file inside that
  drawer REPLACES the file in the shared Media record, and every doc
  that references it (including the source of a duplicate) starts
  rendering the new file. `admin: { allowEdit: false }` is ignored by
  Payload v3 on upload fields (only the relationship field type
  honours it — verified in `HasOne/index.js:53` and
  `config/types.d.ts:933`). Fixed with one CSS rule in
  `src/app/(payload)/custom.scss`:
  `.upload-field-card .relationship-content__edit { display: none !important; }`.
  Trade-off accepted: to edit alt text on a Media doc, users now
  navigate to `/admin/collections/media/<id>` directly rather than
  via the pencil drawer.

### Tooling
- `@vitest/coverage-v8@4.0.18` added as a devDependency (pinned to
  vitest 4.0.18).
- `tests/unit/**/*.unit.spec.ts` glob added to `vitest.config.mts`
  `include`; coverage excludes `payload-types.ts`, `migrations/**`,
  `(payload)/**` generated routes.

## [0.9.9] — 2026-06-02 — tech-debt pass (title dedupe, packageManager, build DX, footer SEO-lock)

### Fixed
- **`<title>` double-suffix**. Layout's
  `template: '%s · Maria Levi Photography'` was being appended to titles
  that already included the brand, producing
  `"X · Maria Levi Photography · Maria Levi Photography"` in SERP across
  city + state pages and a handful of others. `buildMetadata` now strips
  the trailing brand suffix from any `seo.metaTitle` / `fallbackTitle`
  before returning so the template adds it exactly once. Homepage's
  `fallbackTitle` is dropped entirely — layout's `title.default` handles
  it without triggering the template.
- **Local `pnpm build` hung on Payload's dev-push prompt** under
  `PAYLOAD_DB_PUSH=true`. The `(name='dev', batch=-1)` marker that
  `pushDevSchema` inserts trips `migrate()` under `NODE_ENV=production`.
  `scripts/maybe-migrate.ts` now drops that marker via raw `pg` in
  prebuild, before `next build` ever starts. Added `pg` + `@types/pg`
  as direct devDeps for the import.
- **Footer Service-area column** was inside `DEFAULT_COLUMNS`, which is
  overridden completely when Maria sets her own `footerColumns` via
  `/admin → Navigation`. That would silently delete the NYC / NJ /
  Manhattan / Hoboken internal links — load-bearing for local SEO. Now
  rendered as a hardcoded JSX block so any nav customisation leaves
  them intact.

### Changed
- `"packageManager": "pnpm@10.0.0"` added to `package.json` — Vercel
  uses this to pick the pnpm version. The GitHub Actions workflow's
  duplicate `version: 10` on `pnpm/action-setup` removed (action
  errored on the dupe).
- `engines.node` kept at `">=22.0.0"` rather than pinned to `"22.x"` —
  pinning produced a pnpm warning on every local command (local dev
  runs Node 25 per `.nvmrc`) without changing Vercel's runtime, which
  is Node 22 LTS regardless. The `packageManager` hint is what was
  actually missing.

### Removed
- `--drop-orphan-subscribers` flag from `scripts/baseline-migration.ts`.
  It dropped the `subscribers` table — a v0.9.0-era leftover of a
  failed lead-magnet deploy. Subscribers is now an active collection
  (migration `20260517_122022_lead_magnet_subscribers`), so the flag
  was a footgun pointed at production data.

## [0.9.8] — 2026-06-01 — Phase 5 PR-B (state pages, sitemap, robots, OG autogen)

### Added
- **State landing pages** `/nyc` (Manhattan + Long Island City) and
  `/new-jersey` (Hoboken + Jersey City + Princeton). Shared
  `StateLandingPage` component, `BreadcrumbList` JSON-LD, ISR 60 s.
  City-card grid centers on `lg` when there are fewer than 3 cities.
- **Dynamic sitemap** at `/sitemap.xml` (`app/sitemap.ts`) — 60 URLs across
  pages / portfolio categories / series / services / journal / city
  landings + new state routes, regenerates hourly.
- **`app/robots.ts`** with `INDEX_SITE` env flag for one-click launch flip
  (default = noindex, set `INDEX_SITE=true` to allow crawlers). 10
  scraper bots (SemrushBot, AhrefsBot, MJ12bot, …) blocked
  unconditionally. `public/robots.txt` removed — a static file there
  would override `app/robots.ts`.
- **Auto OG images** — file-based `opengraph-image.tsx` on every dynamic
  route + homepage + state pages + legal slug. Shared `renderOgCard` in
  `src/lib/og/`. Cards render with Satori's default sans (our site fonts
  are WOFF2 which `@vercel/og` rejects — TTF copies left for Phase 6
  polish).
- **`metadataBase`** set on the root layout so file-based OG URLs resolve
  to absolute on Vercel.
- **Footer Service-area column** (NYC / NJ / Manhattan / Hoboken). Footer
  grid expanded to `lg:grid-cols-5` so the newsletter column stays in row.
- **`pnpm seed:city-heroes`** — idempotent script assigning a 2:3 portrait
  to each `LocalLandingPage.heroImage`, matched by filename.

### Changed
- **Density pass** across the new + adjacent SEO pages:
  - `/nyc` `/new-jersey` — hero+intro merged into one section, padding
    `md → sm`, `mt-N` tightened across the page.
  - `/photographer-in/[city]` — hero section padding `lg → md` with a 0.6×
    `pb` override (smaller gap under the photo), all `mt-16 → mt-10`, hero
    photo capped at 90 % width on `lg+`, city-card aspect `[4/5] → [2/3]`
    (matches the 1600×2400 portraits → no visible crop).
- **README** roadmap line updated — Phase 5 in progress (PR-A live,
  PR-B merged on `dev`, PR-C/D up next).

### Known follow-ups (not blocking)
- `<title>` double-suffix (`X · Maria Levi Photography · Maria Levi
  Photography`) — the layout's `template: "%s · Maria Levi Photography"`
  is being appended to titles that already include the suffix.
  Pre-existing pattern from PR-A; fix as a small chore alongside PR-C.
- TTF copies of Fraunces / Inter for OG cards if brand-typography fidelity
  on shares becomes important (Phase 6).

## [0.9.7] — 2026-05-25 — instant content revalidation

### Fixed
- Editing a collection doc (portfolio category/series, blog post, testimonial)
  now revalidates the site immediately. The hook previously sent a slug tag that
  no page consumed (pages use time-based ISR), so e.g. reordering categories only
  reflected on `/portfolio` after the 60s window. Now it busts the cache like the
  globals hook.

## [0.9.6] — 2026-05-25 — hero perf (CLS / LCP)

### Fixed
- **Homepage hero CLS** (mobile 0.344 → ~0.016): the filmstrip column count was
  JS-state-driven (`visible` 3 → 1 after hydration), reflowing the strip height.
  Column widths are now CSS-responsive (`basis-full sm:basis-1/2 lg:basis-1/3`)
  so the first paint matches the viewport — no reflow.
- **Hero LCP**: only the first slide is `priority` now (was the first `visible`,
  i.e. 3 eager images competing on slow mobile connections).

## [0.9.5] — 2026-05-25 — homepage hero + services/portfolio polish

### Changed
- **Homepage hero** — replaced the cropped landscape slide with a portrait
  filmstrip (3 / 2 / 1 columns) that steps left on a timer (seamless loop,
  hover-pause, reduced-motion aware), ~6px column separators; the tag/tagline
  moved into a header top-aligned with the sidebar logo for top breathing room.
- **Service pages** — package-card photos use a 4:5 portrait frame (was 4:3);
  the package grid centers when there are fewer than 3 (no left-shift); niche
  sections condensed (md → sm padding, tighter heading→content).
- **Portfolio series** — dropped the lead/hero photo; the page now goes straight
  from the title to the photo grid.

## [0.9.4] — 2026-05-25 — infra: R2 key namespacing + Sentry sampling

### Changed
- **R2 object-key namespacing.** Uploads now carry a per-environment `prefix`
  (`R2_PREFIX` = `dev`/`preview`; prod stays at the bucket root) so dev/preview
  re-uploads can no longer clobber prod media on the shared bucket. The prefix is
  stored per-upload, so existing root files keep resolving; a migration adds the
  `prefix` column (default empty) to `media` and `videos`.
- **Sentry** `tracesSampleRate` 1 → 0.1 (server / edge / client) to fit the
  event budget at production traffic.

### Ops
- Set `R2_PREFIX=dev` on the dev environment and `R2_PREFIX=preview` on Vercel
  Preview; leave it unset on Production.

## [0.9.3] — 2026-05-25 — spacing & density pass

### Changed
- **Tightened vertical rhythm site-wide** — reduced the spacing scale
  (`--spacing-section` 144→96px, `lg` sections 192→112px) and halved the
  hero→content gaps on home, portfolio, category, services, journal, contact,
  about and FAQ pages.
- **FAQ** condensed — narrower category-label column, tighter rows, smaller
  per-category spacing, densified page heading.
- **Home** — hero slider shortened ~15% (airier); quote→intro gap halved.
- **Portfolio series** — title fits one line; heading→hero gap halved.
- **About** — hero photo scaled down ~16%; photo/quote/text gaps halved.
- **Service pages** — tightened the gap below the tagline (unused 16:9 hero
  slot) and the description→divider gap.

## [0.9.2] — 2026-05-25 — portfolio hero crop fix

### Fixed
- **Portfolio series hero no longer crops vertical photos.** The hero was forced
  into a landscape `3:2` frame with `object-cover`, cutting the top/bottom off
  portrait shots (28 of 31 series). It now detects orientation from the image
  dimensions: portrait heroes render at their natural ratio, height-capped to
  `85vh`; landscape heroes keep the full-bleed 3:2 banner.

## [0.9.1] — 2026-05-24 — admin hotfix + favicon

### Fixed
- **Admin was inaccessible** (blank page): the Cloudflare R2 `storage-s3`
  plugin's `S3ClientUploadHandler` client component was missing from the admin
  importMap, so Payload threw `getFromImportMap: PayloadComponent not found`.
  Regenerated via `payload generate:importmap`.
- Pricing **tax note** now reads "All prices include applicable sales tax."
  (field default + seed). The live value is CMS-editable in Site Settings, so
  existing rows still need an admin edit; a migration updates the column default.
- **Site Settings edits now bust the page cache.** The `SiteSettings` global was
  missing the `revalidateGlobal` afterChange hook the other content globals have,
  so editing the tax/travel notes (or footer fields) left cached pages stale.

### Added
- **Favicon**: "ML" serif monogram — `icon.svg` (scalable), `favicon.ico`
  (16/32/48) and `apple-icon.png` (180). `pnpm favicons` regenerates the raster
  assets from the SVG.

## [0.9.0] — 2026-05-24 — pre-launch feature complete

Phase 5 v9: client content, media pipeline, and the legal pages — the full
pre-launch surface, ahead of the launch checklist (real testimonials, FAQ
finalization, analytics, robots open, announcement).

### Added
- **Cloudflare R2 media storage** (`@payloadcms/storage-s3`), served from the
  public R2 URL; `pnpm r2-sync` to push local media to the bucket.
- **Portfolio media pipeline** (`pnpm portfolio-upload`): 31 series / 309 photos
  across the four niches, resized and hosted on R2.
- **Videos collection + About/Site video fields** (Option C scaffold; render TODO).
- **Site content** (`pnpm apply-content`): category + service covers, contact
  image, About hero + image pair, homepage hero slider.
- **Legal pages**: Privacy Policy, Terms of Service, Cookie Notice (templated,
  pending review) + generic `(frontend)/[slug]` page route + footer links.
- City landing pages `/photographer-in/[slug]` + LocalBusiness JSON-LD (PR #53).

### Changed
- **Services pricing/copy** refreshed to Maria's v9 questionnaire (`pnpm services-refresh`).
- Perf: trimmed `generateStaticParams` and the category-page query (id-based selects).

### Notes
- Legal page copy is a starting template — review before launch.
- R2 dev/prod currently share one bucket (filename collisions) — see tech debt.

## [Unreleased]
- Public launch (`1.0.0`): real testimonials, FAQ finalization, GA4 + Meta Pixel,
  legal review, remove `robots.txt` block, announcement.
