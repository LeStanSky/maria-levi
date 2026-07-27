/**
 * Launch tool (1.0.0): set `seo.noIndex = true` on the Service niches whose
 * hero / package photos are still placeholders, so their /services/[niche]
 * pages carry `<meta noindex>` and stay out of the sitemap once the site goes
 * public. Commercial is intentionally excluded (its photos are real).
 *
 * Reversible per-service: Maria unchecks SEO → "Hide from search engines" in
 * /admin → Services → <niche> once she uploads the real photos.
 *
 * Run against prod:
 *   DATABASE_URL=$PROD_DATABASE_URL PAYLOAD_DB_PUSH=false pnpm tsx scripts/noindex-placeholder-services.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const NICHES_TO_NOINDEX = ['personal-brand', 'portrait', 'model-tests']

async function main() {
  const payload = await getPayload({ config })

  for (const nicheKey of NICHES_TO_NOINDEX) {
    const res = await payload.find({
      collection: 'services',
      where: { nicheKey: { equals: nicheKey } },
      limit: 1,
      depth: 0,
    })
    const svc = res.docs[0]
    if (!svc) {
      console.warn(`  ⚠ no service for nicheKey="${nicheKey}" — skipped`)
      continue
    }
    await payload.update({
      collection: 'services',
      id: svc.id,
      data: { seo: { ...(svc.seo ?? {}), noIndex: true } } as never,
      depth: 0,
    })
    console.info(`  ✓ noindex set on "${svc.name}" (/services/${svc.slug})`)
  }

  console.info('\n✓ Placeholder niches noindexed. Maria unchecks each in /admin when photos land.')
  process.exit(0)
}

main().catch((e) => {
  console.error(e?.data ? JSON.stringify(e.data, null, 2) : e)
  process.exit(1)
})
