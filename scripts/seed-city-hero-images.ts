/**
 * Phase 5 PR-B follow-up — assign a portrait heroImage to each LocalLandingPage.
 *
 * Dev DB had heroImage=null on all 5 cities (Manhattan, LIC, Hoboken, JC,
 * Princeton), which made the city-grid cards on `/nyc` and `/new-jersey`
 * render as empty grey rectangles. This script picks 5 visually distinct
 * 2:3 portraits from the existing portfolio and wires each as a city hero.
 *
 * Mapping is by filename (NOT id), so it stays stable if media IDs shift
 * (e.g. after a re-import). If a filename is missing in the target DB the
 * script logs and skips that city — does not abort.
 *
 * Idempotent: matches LocalLandingPages by slug, only updates when
 * heroImage differs from the desired one.
 *
 * Usage:
 *   pnpm seed:city-heroes              # dev DB (default DATABASE_URL)
 *   DATABASE_URL=$PROD_DATABASE_URL PAYLOAD_DB_PUSH=false pnpm seed:city-heroes
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Each city → a single portrait photo filename. Picked for distinct visual
// mood across the 5 cities; Maria can swap any of these in /admin.
// Skipped buckets:
//   - `commercial-milena-*` — brand design mockups, not a person.
//   - `personal-brand-stories-01.jpg` — contact-sheet/mood-board collage,
//     not a single editorial portrait.
//   - `placeholder-*` — Maria's PLACEHOLDER pool.
//   - `about-maria-*` — Maria herself, used on /about.
const ASSIGNMENTS: Array<{ slug: string; filename: string }> = [
  // Manhattan → model test — NYC fashion / agency energy.
  { slug: 'manhattan', filename: 'model-tests-series-01-01.jpg' },
  // LIC → commercial — creator-district polish without overlap with JC.
  { slug: 'long-island-city', filename: 'commercial-series-03-01.jpg' },
  // Hoboken → portrait — quieter, one-on-one therapist/coach energy.
  { slug: 'hoboken', filename: 'portrait-series-01-01.jpg' },
  // Jersey City → commercial series — practice / consultant feel.
  { slug: 'jersey-city', filename: 'commercial-series-01-01.jpg' },
  // Princeton → portrait — academic/professional, classic styling.
  { slug: 'princeton', filename: 'portrait-series-02-01.jpg' },
]

async function main() {
  const payload = await getPayload({ config: await config })

  let updated = 0
  let skipped = 0
  let missing = 0

  for (const { slug, filename } of ASSIGNMENTS) {
    const cityRes = await payload.find({
      collection: 'local-landing-pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    const city = cityRes.docs[0]
    if (!city) {
      console.warn(`  ⚠ city slug="${slug}" not found — skipping`)
      missing++
      continue
    }

    const mediaRes = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
      depth: 0,
    })
    const media = mediaRes.docs[0]
    if (!media) {
      console.warn(`  ⚠ media filename="${filename}" not found — skipping ${slug}`)
      missing++
      continue
    }

    const currentHeroId =
      typeof city.heroImage === 'object' && city.heroImage ? city.heroImage.id : city.heroImage
    if (currentHeroId === media.id) {
      console.info(`  · ${slug.padEnd(20)} already has hero=${filename} — no change`)
      skipped++
      continue
    }

    await payload.update({
      collection: 'local-landing-pages',
      id: city.id,
      data: { heroImage: media.id as number },
      draft: false,
    })
    console.info(`  ✓ ${slug.padEnd(20)} hero ← ${filename} (media id=${media.id})`)
    updated++
  }

  console.info(`\nDone — updated=${updated} skipped=${skipped} missing=${missing}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
