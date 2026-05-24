/**
 * Phase 5 — Services pricing/copy refresh (Maria's 2026-05-21 questionnaire).
 * Source of truth: internal_docs/maria_v9/services-pages-copy.md
 *
 * Usage:
 *   DATABASE_URL=<dev URL> pnpm services-refresh
 *
 * Behaviour:
 *   - Matches each niche by `nicheKey` (stable enum) and UPDATES in place.
 *   - Payload `update` is a partial merge: fields not listed here (processSteps,
 *     heroImage, relatedSeries/testimonials/faqs, seo, displayOrder) are preserved.
 *   - Replaces `tagline`, `description`, and the full `packages[]` array per niche;
 *     Commercial gets `commercialNote` instead (hasPackages=false).
 *   - Idempotent — re-running overwrites with the same values, no duplicates.
 *   - The `revalidateCollection` afterChange hook fires /api/revalidate so ISR picks
 *     up new copy (needs NEXT_PUBLIC_SITE_URL + REVALIDATE_SECRET in env).
 *
 * NOTE: Per-tier bullets are kept verbatim from Maria, including the shared
 *   "Studio rent…" / "A deposit…" lines. Consolidating those into SiteSettings
 *   disclaimers (services-pages-copy.md §5) is an optional follow-up — intentionally
 *   NOT done here to keep this change scoped to the `services` collection only.
 *
 * TODO (Maria intros — placeholders below, flagged in services-pages-copy.md):
 *   - Portrait: tagline + intro paragraph
 *   - Model Tests: intro paragraph
 *   - Commercial: tagline
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// ── Lexical builders (same node shapes as scripts/seed-blog-posts.ts) ─────────
type LexicalNode = Record<string, unknown> & { type: string; version: number }
type LexicalRoot = { root: LexicalNode }

function text(s: string, format = 0): LexicalNode {
  return { type: 'text', text: s, format, mode: 'normal', style: '', detail: 0, version: 1 }
}

function paragraph(...children: LexicalNode[]): LexicalNode {
  return {
    type: 'paragraph',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
  }
}

function heading(s: string, tag: 'h2' | 'h3'): LexicalNode {
  return {
    type: 'heading',
    tag,
    children: [text(s)],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

function bulletList(items: string[]): LexicalNode {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    children: items.map((item, i) => ({
      type: 'listitem',
      value: i + 1,
      children: [text(item)],
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

function richText(...children: LexicalNode[]): LexicalRoot {
  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } }
}

const BOLD = 1

// ── Shared per-tier disclaimer lines (kept verbatim in features) ──────────────
const STUDIO = 'Studio rent is not included (from $50 an hour)'
const DEPOSIT = 'A deposit is required to secure your date'

type Pkg = {
  name: string
  tier: 'essential' | 'professional' | 'premium'
  priceFrom: number
  subtitle?: string
  popular?: boolean
  features: string[]
}

type NicheDef = {
  nicheKey: 'personal-brand' | 'portrait' | 'model-tests' | 'commercial'
  name: string
  slug: string
  displayOrder: number
  tagline: string
  description: LexicalRoot
  hasPackages: boolean
  packages?: Pkg[]
  commercialNote?: LexicalRoot
}

const NICHES: NicheDef[] = [
  // ── 1. Personal Brand ──────────────────────────────────────────────────────
  {
    nicheKey: 'personal-brand',
    name: 'Personal Brand Photography',
    slug: 'personal-brand-photography',
    displayOrder: 1,
    tagline:
      'Strategic visuals that help you look confident, build trust, and attract the right clients.',
    description: richText(
      paragraph(
        text(
          "Whether you're a realtor, creative, entrepreneur, coach, or personal brand — your audience connects with you before anything else. I create elevated, intentional imagery that feels professional without looking stiff or generic.",
        ),
      ),
      paragraph(
        text(
          'From planning outfits and locations to guiding you during the shoot, the entire process is designed to help you feel confident on camera and leave with versatile content that actually works for your brand.',
        ),
      ),
    ),
    hasPackages: true,
    packages: [
      {
        name: 'Essential',
        tier: 'essential',
        priceFrom: 450,
        subtitle: 'Perfect for a quick content refresh or updated online presence.',
        features: [
          'Up to 60-minute session',
          '1 location',
          '1–2 outfits',
          '7 fully retouched images',
          '20 color-edited images',
          'Posing guidance throughout the shoot',
          'Private online gallery',
          'Delivery time up to 10 days',
          STUDIO,
          DEPOSIT,
        ],
      },
      {
        name: 'Professional',
        tier: 'professional',
        priceFrom: 650,
        popular: true,
        subtitle: 'For professionals who need consistent, versatile content across platforms.',
        features: [
          'Up to 2-hour session',
          '1–2 locations',
          'Up to 4 outfits',
          '15 fully retouched images',
          '30 color-edited images',
          'Pre-shoot consultation (outfits, locations, visual direction)',
          '5 short-form vertical videos without editing for your social media',
          'Private online gallery',
          'Delivery time up to 7 days',
          STUDIO,
          DEPOSIT,
        ],
      },
      {
        name: 'Premium Branding',
        tier: 'premium',
        priceFrom: 900,
        subtitle: 'A complete visual experience designed around your brand identity.',
        features: [
          'Up to 3-hour session',
          'Multiple locations',
          'Unlimited outfit changes',
          'Full creative direction & concept development (moodboard, styling, locations, recommendations)',
          '25 fully retouched images',
          '40 color-edited images',
          '8 short-form vertical videos without editing for your social media',
          '1 edited social media video up to 30 sec',
          'Priority editing 1–3 days',
          'Private online gallery',
          STUDIO,
          DEPOSIT,
        ],
      },
    ],
  },
  // ── 2. Portrait ────────────────────────────────────────────────────────────
  {
    nicheKey: 'portrait',
    name: 'Portrait Photography',
    slug: 'portrait-photography',
    displayOrder: 2,
    // TODO(Maria): real tagline — placeholder per services-pages-copy.md
    tagline: 'Portraits that capture who you are — confident, present, and real.',
    description: richText(
      // TODO(Maria): real intro — placeholder per services-pages-copy.md
      paragraph(
        text(
          'A portrait session is a moment to see yourself the way others see you at your best. Whether for a new chapter, a milestone, or simply because it’s time, my approach is editorial and unhurried — designed to feel like a creative collaboration rather than a transaction.',
        ),
      ),
    ),
    hasPackages: true,
    packages: [
      {
        name: 'Mini Session',
        tier: 'essential',
        priceFrom: 550,
        features: [
          'Pre-shoot consultation on outfits and locations',
          'Up to 60-minute session',
          '1 location',
          'Up to 3 outfits',
          '10 fully retouched images',
          '30 color-edited images',
          'Posing guidance throughout the shoot',
          'Private online gallery',
          'Delivery time up to 10 days',
          STUDIO,
          DEPOSIT,
        ],
      },
      {
        name: 'Signature Session',
        tier: 'professional',
        priceFrom: 650,
        popular: true,
        features: [
          'Pre-shoot consultation on outfits and locations',
          'Up to 2 hours',
          '2–4 outfits',
          '1–3 locations',
          '20 fully retouched images',
          '40 color-edited images',
          '1 edited short-form vertical video for your social media',
          'Posing guidance throughout the shoot',
          'Private online gallery',
          'Delivery time up to 7 days',
          STUDIO,
          DEPOSIT,
        ],
      },
      {
        name: 'TOP Experience',
        tier: 'premium',
        priceFrom: 850,
        features: [
          'Pre-shoot consultation',
          'Full creative direction (moodboard, outfits & location planning, all recommendations)',
          'Up to 2.5 hours',
          'Multiple looks',
          '2–4 locations',
          '25 fully retouched images',
          '50 color-edited images',
          'Priority editing 1–3 days',
          '5 unedited short-form vertical videos for your social media',
          '1 edited short-form vertical video for your social media',
          'Guided posing',
          'Online gallery',
          STUDIO,
          DEPOSIT,
        ],
      },
    ],
  },
  // ── 3. Model Tests ─────────────────────────────────────────────────────────
  {
    nicheKey: 'model-tests',
    name: 'Model Tests',
    slug: 'model-tests',
    displayOrder: 3,
    tagline: 'Clean, agency-ready images that highlight your natural look and versatility.',
    description: richText(
      // TODO(Maria): real intro — placeholder per services-pages-copy.md
      paragraph(
        text(
          'Model tests are a foundational tool for new and developing models — agency-ready images that show editors, agencies, and clients exactly what you can do on camera. My tests are shot in a clean, editorial style that lets you show range without distraction.',
        ),
      ),
    ),
    hasPackages: true,
    packages: [
      {
        name: 'Mini Test',
        tier: 'essential',
        priceFrom: 450,
        features: [
          'Up to 60-minute session',
          '1 location',
          'Up to 3 outfits',
          '10 fully retouched images',
          '20 color-edited images',
          'Posing guidance throughout the shoot',
          'Private online gallery',
          'Delivery time up to 10 days',
          STUDIO,
          DEPOSIT,
        ],
      },
      {
        name: 'Standard Test',
        tier: 'professional',
        priceFrom: 650,
        popular: true,
        features: [
          'Pre-shoot consultation on outfits and locations',
          'Up to 2 hours',
          '2–4 outfits',
          '1–3 locations',
          '20 fully retouched images',
          '40 color-edited images',
          '1 edited short-form vertical video for your social media',
          'Posing guidance throughout the shoot',
          'Private online gallery',
          'Delivery time up to 7 days',
          STUDIO,
          DEPOSIT,
        ],
      },
    ],
  },
  // ── 4. Commercial ──────────────────────────────────────────────────────────
  {
    nicheKey: 'commercial',
    name: 'Commercial Photography',
    slug: 'commercial-photography',
    displayOrder: 4,
    // TODO(Maria): real tagline — placeholder per services-pages-copy.md
    tagline: 'Brand, product, and editorial commissions tailored to your specific use case.',
    description: richText(
      paragraph(
        text(
          "Each project is tailored to your brand's needs — from e-commerce to full-scale campaigns.",
        ),
      ),
    ),
    hasPackages: false,
    commercialNote: richText(
      paragraph(text('Rates start at $300 per hour. Minimum duration 3 hours.', BOLD)),
      heading('Editing & Delivery', 'h3'),
      bulletList([
        'Professional color correction of a curated selection of images',
        '10 fully retouched final images per hour',
        'Commercial usage for brand marketing (web & social) included',
        'Additional retouched images: $15 per photo',
      ]),
      heading('Creative direction & production support', 'h3'),
      bulletList([
        'Shoot preparation',
        'Location, model, stylist & makeup artist recommendations',
        'Moodboard and concept development',
        'On-set creative guidance and posing',
        'Studio sessions include the option of real-time image preview on a computer',
      ]),
      heading('Booking details', 'h3'),
      bulletList([
        'Studio rental is not included and is booked separately',
        'A deposit is required to secure your date',
      ]),
      paragraph(
        text(
          'Commercial work is project-based rather than tiered. For specific quotes, please get in touch with details about your project.',
        ),
      ),
    ),
  },
]

async function main() {
  const payload = await getPayload({ config })

  for (const niche of NICHES) {
    const existing = await payload.find({
      collection: 'services',
      where: { nicheKey: { equals: niche.nicheKey } },
      limit: 1,
      depth: 0,
    })

    const data: Record<string, unknown> = {
      name: niche.name,
      nicheKey: niche.nicheKey,
      tagline: niche.tagline,
      description: niche.description,
      hasPackages: niche.hasPackages,
      displayOrder: niche.displayOrder,
    }
    if (niche.hasPackages) {
      data.packages = (niche.packages ?? []).map((p) => ({
        name: p.name,
        tier: p.tier,
        priceFrom: p.priceFrom,
        subtitle: p.subtitle,
        popular: Boolean(p.popular),
        ctaLabel: 'Inquire',
        features: p.features.map((t) => ({ text: t })),
      }))
    } else {
      data.commercialNote = niche.commercialNote
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: 'services',
        id: existing.docs[0].id,
        data: data as never,
      })
      console.info(`  ✓ Updated "${niche.name}" (id=${existing.docs[0].id}).`)
    } else {
      await payload.create({
        collection: 'services',
        data: { ...data, slug: niche.slug } as never,
      })
      console.info(`  + Created "${niche.name}".`)
    }
  }

  console.info('\n✓ Services refresh complete.')
  console.info(
    process.env.REVALIDATE_SECRET
      ? '  revalidateCollection hook fired /api/revalidate — ISR should be fresh within ~5s.'
      : '  REVALIDATE_SECRET not set — trigger ISR manually if needed.',
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
