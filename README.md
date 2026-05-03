# Maria Levi Photography — marialeviphoto.com

Editorial-first portfolio site for fashion / personal-brand photographer Maria Levi.

**Stack.** Next.js 16 (App Router) · Payload CMS v3 · Postgres (Neon) · Cloudflare R2 + Cloudflare Images · Vercel · Tailwind v4 · Biome.

Single-language (en-US), inquiry-driven (no e-commerce, no online booking). Full technical specification lives in `maria_v1/maria-levi-tz-v1.md`.

## Status

**Phase 0 — Foundation.** Repo scaffolded, design tokens for Concept C (white background, Fraunces light + Inter), self-hosted variable fonts, basic Sidebar + Footer + primitives. Not yet deployed.

See TZ §11 for the full 8-week roadmap.

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
| `pnpm seed:admin` | Create the initial admin user (refuses if any user exists). |
| `pnpm user:create` etc. | User management — placeholders, wired up in Phase 1. |
| `pnpm test` | Vitest integration + Playwright e2e (Phase 1+). |

## Project layout

```
src/
  app/
    (frontend)/        — public pages (en-US)
    (payload)/admin/   — Payload admin UI
    (payload)/api/     — Payload REST + GraphQL routes
  collections/         — Payload collection configs
  components/
    primitives/        — Button, Heading, Text, Container, Section
    layout/            — Sidebar, Footer
  lib/                 — fonts, payload client, utilities
  styles/
    fonts/             — self-hosted variable woff2 (see docs/fonts.md)
  payload.config.ts    — root Payload configuration
docs/                  — fonts.md, future content-editing-guide.md, etc.
scripts/users/         — admin/editor user management CLIs
maria_v1/              — project brief, TZ v1, design moodboard
```

## Phase 0 deliverables — done locally

- Next.js 16 + Payload v3 + TypeScript scaffold.
- Postgres adapter wired (Neon-ready).
- Tailwind v4 with Concept C tokens via `@theme`.
- Self-hosted Fraunces + Inter variable woff2; SHA-256 checksums in `docs/fonts.md`.
- Biome 2 for lint + format.
- Sidebar / Footer / primitives — minimal but on-brand.
- Initial admin seed script (`pnpm seed:admin`).
- GitHub Actions: lint + typecheck + build on PR.
- `.env.example` with all required keys for the project lifetime.

## Phase 0 deliverables — Stanislav's external-services side

- [ ] Create GitHub repo (private), push, enable branch protection.
- [ ] Neon project — dev branch + production project. Paste `DATABASE_URL` into `.env` and Vercel.
- [ ] Cloudflare R2 buckets: `marialeviphoto-media`, `-media-dev`, `-backups`. Generate access key.
- [ ] Cloudflare Images — enable, get account hash + token.
- [ ] Vercel project — link to repo, set env vars, first preview deploy.
- [ ] Sentry project — install via `npx @sentry/wizard@latest -i nextjs` (it edits `next.config.ts`, adds configs, adds `@sentry/nextjs` dep). Paste DSN.
- [ ] Resend — verify `marialeviphoto.com` (needs DNS access from Maria), set up SPF/DKIM/DMARC.

## Phase 0 exit criteria (TZ §11.1)

- [ ] Preview deploy on Vercel renders homepage with Fraunces + Inter loaded.
- [ ] `/admin` reachable and Stanislav can log in.
- [x] `pnpm lint && pnpm typecheck && pnpm build` passes locally.
- [x] `pnpm dev` runs hot-reload locally.
