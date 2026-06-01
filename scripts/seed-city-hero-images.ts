/**
 * Phase 5 PR-B follow-up — assign a portrait heroImage to each LocalLandingPage.
 *
 * Dev DB had heroImage=null on all 5 cities, which made the city-grid cards
 * on `/nyc` and `/new-jersey` render as empty grey rectangles. This script
 * resolves each city slug to a `PortfolioSeries.coverImage` and wires that
 * as the city hero.
 *
 * Matching by series slug (NOT raw media filename) was a deliberate switch:
 * prod and dev Media collections have different naming conventions
 * (`-01.jpg` vs `-2.jpg`) because they were uploaded by separate
 * portfolio-upload runs against the shared R2 bucket. PortfolioSeries slugs
 * are stable.
 *
 * **Default is safe** — only fills `heroImage` when it's currently null, so
 * any photo Maria has already picked in /admin (or a future deploy has set)
 * is left alone. Pass `--force` to overwrite existing assignments, which is
 * what you want on a fresh dev DB but never on prod.
 *
 * Idempotent: matches LocalLandingPages by slug; without --force, only
 * updates when the slot is empty.
 *
 * Usage:
 *   pnpm seed:city-heroes                        # fill empty slots only
 *   pnpm seed:city-heroes --force                # overwrite existing too
 *   DATABASE_URL=$PROD_DATABASE_URL PAYLOAD_DB_PUSH=false pnpm seed:city-heroes
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// Each city → a PortfolioSeries slug whose `coverImage` becomes the hero.
// Picked for distinct visual mood across the 5 cities; Maria can swap any
// of these in /admin by clicking a different LocalLandingPages.heroImage.
const ASSIGNMENTS: Array<{ slug: string; seriesSlug: string }> = [
  // Manhattan → NYC fashion / agency energy.
  { slug: 'manhattan', seriesSlug: 'model-tests-series-01' },
  // LIC → downtown polish, distinct from JC (which uses series-01).
  { slug: 'long-island-city', seriesSlug: 'commercial-series-03' },
  // Hoboken → one-on-one therapist/coach energy.
  { slug: 'hoboken', seriesSlug: 'portrait-series-01' },
  // Jersey City → practice / consultant feel.
  { slug: 'jersey-city', seriesSlug: 'commercial-series-01' },
  // Princeton → academic/professional, classic styling.
  { slug: 'princeton', seriesSlug: 'portrait-series-02' },
]

async function main() {
  const force = process.argv.includes('--force')
  if (force) {
    console.info('[seed:city-heroes] --force: will overwrite existing heroImage assignments')
  } else {
    console.info('[seed:city-heroes] safe mode: empty slots only (pass --force to overwrite)')
  }

  const payload = await getPayload({ config: await config })

  let updated = 0
  let skipped = 0
  let missing = 0
  let preserved = 0

  for (const { slug, seriesSlug } of ASSIGNMENTS) {
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

    const seriesRes = await payload.find({
      collection: 'portfolio-series',
      where: { slug: { equals: seriesSlug } },
      limit: 1,
      depth: 1,
    })
    const series = seriesRes.docs[0]
    if (!series) {
      console.warn(`  ⚠ portfolio-series slug="${seriesSlug}" not found — skipping ${slug}`)
      missing++
      continue
    }
    const cover = typeof series.coverImage === 'object' ? series.coverImage : null
    if (!cover) {
      console.warn(`  ⚠ portfolio-series "${seriesSlug}" has no coverImage — skipping ${slug}`)
      missing++
      continue
    }

    const currentHeroId =
      typeof city.heroImage === 'object' && city.heroImage ? city.heroImage.id : city.heroImage
    if (currentHeroId === cover.id) {
      console.info(`  · ${slug.padEnd(20)} already has hero from "${seriesSlug}" — no change`)
      skipped++
      continue
    }

    if (currentHeroId != null && !force) {
      const currentFilename =
        typeof city.heroImage === 'object' && city.heroImage ? city.heroImage.filename : '?'
      console.info(
        `  · ${slug.padEnd(20)} already has a hero (${currentFilename}) — preserving (pass --force to overwrite)`,
      )
      preserved++
      continue
    }

    await payload.update({
      collection: 'local-landing-pages',
      id: city.id,
      data: { heroImage: cover.id as number },
      draft: false,
    })
    console.info(
      `  ✓ ${slug.padEnd(20)} hero ← ${seriesSlug} cover (${cover.filename}, media id=${cover.id})`,
    )
    updated++
  }

  console.info(
    `\nDone — updated=${updated} skipped=${skipped} preserved=${preserved} missing=${missing}`,
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
