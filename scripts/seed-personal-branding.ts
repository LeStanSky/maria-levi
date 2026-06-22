/**
 * Seed the /personal-branding conversion landing page (Pages collection,
 * rendered by the (frontend)/[slug] route).
 *
 * Structure follows the marketer's 8-step direct-response brief, styled in our
 * editorial light skin. `seo.noIndex = true` — this is a paid-traffic landing
 * and must not compete with the organic /services/personal-brand + city pages.
 *
 * Copy here is the marketer's DRAFT — Maria refines it in /admin. Pricing is
 * NOT authored here: the pricing-cards block references the Personal Brand
 * Service and renders its packages (Maria edits prices in Services). The hero
 * `priceText` is left blank for Maria to fill.
 *
 * Idempotent: upserts by slug `personal-branding`. Run: pnpm seed:personal-branding
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const SLUG = 'personal-branding'

// ── minimal lexical helpers ──────────────────────────────────────────────────
type Node = Record<string, unknown> & { type: string; version: number }
function text(s: string): Node {
  return { type: 'text', text: s, format: 0, mode: 'normal', style: '', detail: 0, version: 1 }
}
function p(s: string): Node {
  return {
    type: 'paragraph',
    children: [text(s)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}
function h2(s: string): Node {
  return {
    type: 'heading',
    tag: 'h2',
    children: [text(s)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}
function ul(items: string[]): Node {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    children: items.map((it, i) => ({
      type: 'listitem',
      value: i + 1,
      children: [text(it)],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}
function root(children: Node[]) {
  return {
    root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 },
  }
}

const CTA_LINK = '/contact?session_type=personal-brand&source=personal-branding'

async function main() {
  const payload = await getPayload({ config })

  // Resolve the Personal Brand service — pricing-cards references it, and we
  // reuse its hero image + curated relatedSeries as sensible defaults.
  const svcRes = await payload.find({
    collection: 'services',
    where: { nicheKey: { equals: 'personal-brand' } },
    limit: 1,
    depth: 0,
  })
  const service = svcRes.docs[0]
  if (!service) {
    console.error(
      'No Personal Brand service found (nicheKey="personal-brand"). Run `pnpm services-refresh` first.',
    )
    process.exit(1)
  }

  const heroImageId =
    typeof service.heroImage === 'object' && service.heroImage
      ? service.heroImage.id
      : (service.heroImage ?? undefined)

  let relatedSeriesIds = (service.relatedSeries ?? [])
    .map((s) => (typeof s === 'object' && s ? s.id : s))
    .filter((id): id is number => typeof id === 'number')
    .slice(0, 3)

  // Fill the portfolio teaser + About image with on-brand photos when the
  // service has no curated relatedSeries yet. We pull portfolio series and
  // drop Model Test ones (the brief explicitly excludes them). Maria
  // re-curates in /admin; this just keeps the page from looking half-empty.
  const seriesRes = await payload.find({
    collection: 'portfolio-series',
    limit: 50,
    depth: 0,
    select: { title: true, coverImage: true },
  })
  const onBrandSeries = seriesRes.docs.filter((s) => !/model test/i.test(s.title ?? ''))
  if (relatedSeriesIds.length === 0) {
    relatedSeriesIds = onBrandSeries.slice(0, 3).map((s) => s.id)
  }
  const firstCover = onBrandSeries
    .map((s) => (typeof s.coverImage === 'object' && s.coverImage ? s.coverImage.id : s.coverImage))
    .find((id): id is number => typeof id === 'number')
  const aboutImageId = firstCover ?? heroImageId

  // One testimonial for the social-proof block (optional — skip block if none).
  const testimonialRes = await payload.find({
    collection: 'testimonials',
    limit: 1,
    depth: 0,
  })
  const testimonialId = testimonialRes.docs[0]?.id

  const pageBuilder: Record<string, unknown>[] = [
    {
      blockType: 'campaign-hero',
      eyebrow: 'Personal Branding',
      headline: 'Personal Branding Photography for Entrepreneurs in NYC & New Jersey',
      subheadline:
        'Professional photo & video content that builds trust and helps you attract clients.',
      priceText: 'Sessions from $350',
      ...(heroImageId ? { image: heroImageId } : {}),
      ctaLabel: 'Book a Session',
      ctaLink: CTA_LINK,
    },
    {
      blockType: 'intro-block',
      headline: 'Your clients decide before they ever meet you',
      body: root([
        p(
          'In today’s world, people don’t just buy services — they buy trust. Your photos are often the first impression of your business.',
        ),
      ]),
    },
    {
      blockType: 'rich-text-block',
      content: root([
        h2('What I create'),
        p(
          'I create natural, elegant and professional visuals for women building their personal brand. This includes:',
        ),
        ul([
          'Personal branding portraits',
          'Lifestyle business content',
          'Short video clips for social media and websites',
        ]),
      ]),
    },
    {
      blockType: 'portfolio-teaser',
      headline: 'Work that builds brands',
      ...(relatedSeriesIds.length > 0 ? { series: relatedSeriesIds } : {}),
      viewAllLink: '/portfolio',
    },
    {
      blockType: 'process-steps',
      headline: 'How it works',
      steps: [
        { title: 'Book your session' },
        { title: 'We plan your concept & outfits' },
        { title: 'Shoot in NYC or NJ' },
        { title: 'Receive edited photos & video content' },
      ],
    },
    {
      blockType: 'pricing-cards',
      headline: 'Sessions',
      service: service.id,
    },
    ...(testimonialId ? [{ blockType: 'testimonial-spread', testimonial: testimonialId }] : []),
    {
      blockType: 'about-preview',
      eyebrow: 'About',
      headline: 'About Maria',
      body: root([
        p(
          'I am a photographer specializing in personal branding and portrait photography. My focus is helping women present themselves with confidence and authenticity in their business and personal brand.',
        ),
      ]),
      ...(aboutImageId ? { image: aboutImageId } : {}),
      ctaLabel: 'Read my story',
      ctaLink: '/about',
    },
    {
      blockType: 'cta-banner',
      headline: 'Ready to elevate your brand?',
      ctaLabel: 'Book a Session',
      ctaLink: CTA_LINK,
    },
  ]

  const data = {
    title: 'Personal Branding Photography',
    slug: SLUG,
    isHomepage: false,
    compactSpacing: true,
    _status: 'published',
    seo: {
      // ≤ 60 chars (layout template appends " · Maria Levi Photography").
      metaTitle: 'Personal Branding Photography · NYC & New Jersey',
      metaDescription:
        'Professional personal branding photo & video for women entrepreneurs in NYC and New Jersey. Build trust and attract clients. Book a session.',
      noIndex: true,
    },
    pageBuilder,
  }

  const found = await payload.find({
    collection: 'pages',
    where: { slug: { equals: SLUG } },
    limit: 1,
    depth: 0,
  })
  if (found.docs[0]) {
    await payload.update({ collection: 'pages', id: found.docs[0].id, data: data as never })
    console.info(`  ✓ updated /${SLUG}`)
  } else {
    await payload.create({ collection: 'pages', data: data as never })
    console.info(`  + created /${SLUG}`)
  }

  console.info(
    `\n✓ Personal-branding landing seeded (noindex). Pricing pulled from service "${service.name}".`,
  )
  if (relatedSeriesIds.length === 0) {
    console.info('  ⚠ portfolio-teaser has no series — curate in /admin (Maria).')
  }
  if (!testimonialId) {
    console.info('  ⚠ no testimonial found — testimonial block skipped; add one in /admin.')
  }
  process.exit(0)
}

main().catch((e) => {
  // Surface Payload validation errors (e.data.errors) as readable JSON;
  // otherwise dump the full error.
  console.error(e?.data ? JSON.stringify(e.data, null, 2) : e)
  process.exit(1)
})
