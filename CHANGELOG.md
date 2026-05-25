# Changelog

All notable changes to this project are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/); versions follow semver.

Pre-launch the project stays on `0.x`. **`1.0.0` marks the public launch**
(indexing enabled + announcement). After that: features → minor, fixes → patch.

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
