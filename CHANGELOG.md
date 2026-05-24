# Changelog

All notable changes to this project are documented here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/); versions follow semver.

Pre-launch the project stays on `0.x`. **`1.0.0` marks the public launch**
(indexing enabled + announcement). After that: features → minor, fixes → patch.

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
