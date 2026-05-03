# Fonts

Self-hosted variable web fonts. We do not load anything from Google Fonts CDN at runtime — files live in `src/styles/fonts/` and are served by Next.js via `next/font/local` (see `src/lib/fonts.ts`).

## Files

| File | Family | Variable axes | Subset | Source |
|---|---|---|---|---|
| `fraunces-latin-wght-normal.woff2` | Fraunces | `wght` (full range, 100–900) | latin | fontsource via jsDelivr |
| `inter-latin-wght-normal.woff2` | Inter | `wght` (full range, 100–900) | latin | fontsource via jsDelivr |

Italic variants are intentionally **not bundled** — Concept C (see TZ §7.1) uses Fraunces light without italic. If a future page needs italic, re-download from the same source and update this file.

## Source URLs

- `https://cdn.jsdelivr.net/fontsource/fonts/fraunces:vf@latest/latin-wght-normal.woff2`
- `https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2`

The `@latest` tag pins to the most recent fontsource release at download time. To pin a specific version, replace `@latest` with `@x.y.z` and update the table below.

## Checksums (SHA-256)

Last refreshed: **2026-05-03**.

```
7f9d191d999336d3b9790afa72e1358e50a13b06d4f289341e92a311967a80f9  fraunces-latin-wght-normal.woff2
3100e775e8616cd2611beecfa23a4263d7037586789b43f035236a2e6fbd4c62  inter-latin-wght-normal.woff2
```

To verify locally:

```bash
sha256sum src/styles/fonts/*.woff2
```

## Update procedure

1. Download replacement woff2 files from the source URLs above (or vendor's official mirror).
2. Replace the existing files in `src/styles/fonts/`.
3. Run `sha256sum src/styles/fonts/*.woff2` and update the checksum block above.
4. Update the "Last refreshed" date.
5. Run `pnpm dev` and verify both faces render (homepage hero shows both).
6. Commit `src/styles/fonts/*.woff2` and this file together.

`.woff2` files are marked as binary in `.gitattributes` — git will not attempt text diffs.

## Why this matters

- **No third-party dependency at runtime.** Google Fonts CDN can change subset definitions, deprecate URLs, or be blocked by user firewalls. Self-hosting removes that surface.
- **Deterministic builds.** Checksums let us catch silent file changes (corruption, accidental swap, supply-chain tampering).
- **Performance.** `next/font/local` inlines a CSS variable and preloads the file; no extra DNS / TLS roundtrip.
