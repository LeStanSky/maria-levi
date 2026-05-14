/**
 * Phase 2.5 v5 copy refresh — populates Payload globals with Maria's new Bio + copy.
 * Covers Thread A from maria_v1 v5 memory §11.
 *
 * Usage:
 *   DATABASE_URL=<prod or dev URL> pnpm copy-refresh
 *
 * Behaviour:
 *   - Updates only the fields listed below; other fields on each global are preserved.
 *   - Idempotent — re-running overwrites with the same values, no duplicates.
 *   - The `revalidateGlobal` afterChange hook fires `/api/revalidate` for each global,
 *     so ISR picks up the new copy on prod within ~5s (requires NEXT_PUBLIC_SITE_URL
 *     and REVALIDATE_SECRET in the env).
 *
 * Source of truth: maria_v1/maria-levi-project-memory.md §7 (v5 Bio + pull-quotes + microcopy).
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

function paragraph(text: string) {
  return {
    type: 'paragraph',
    version: 1,
    children: [{ type: 'text', version: 1, text }],
  }
}

function richText(...paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map(paragraph),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

// ── Bio paragraphs (Maria, 2026-05-13) ──────────────────────────────────────
const BIO = {
  // bodyPart1 — intro + background
  p1: "I'm a photographer based in New York & New Jersey, working across the U.S. — both independently and as part of creative teams.",
  p2: 'My background in art, and over a decade of international experience, shaped the way I approach photography: not just as visuals, but as storytelling with emotion, atmosphere, and intention.',
  // bodyPart2 — what I do + who I help
  p3: 'I work with portraits, personal branding, model tests, and commercial projects, helping people and brands create images that feel aligned, memorable, and real.',
  p4: 'Whether you need stronger personal presence, editorial content, a portfolio that stands out, or visuals that build trust with your audience — my goal is always the same: to create images people connect with emotionally, not just visually.',
  // bodyPart3 — process
  p5: "From concept development and styling to posing guidance and creative direction, I help shape the entire process so you feel confident, prepared, and fully part of the story we're creating.",
  // signoff — separate field
  signoff: "I don't just create images. I care about the people behind them.",
  // central pull-quote on About page
  pullQuote: 'To create images people connect with emotionally — not just visually.',
}

const CREDITS = [
  { label: 'Based in', value: 'New York · New Jersey' },
  { label: 'Working', value: 'Across the U.S.' },
  { label: 'Background', value: 'Art · Editorial' },
  { label: 'Specializing in', value: 'Portraits · Personal Brand · Commercial' },
]

const CONTACT_INTRO_LINE = 'Concept development. Styling. Posing guidance. Creative direction.'

// Newsletter / lead-magnet hook (Phase 3 surface — global already exists from Phase 1).
const LEAD_MAGNET_SUBTITLE =
  'Notes on personal brand, presence, and the craft of editorial photography.'

async function main() {
  const payload = await getPayload({ config })

  // ── AboutPage ────────────────────────────────────────────────────────────
  console.info('Updating AboutPage…')
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      bodyPart1: richText(BIO.p1, BIO.p2),
      pullQuote: BIO.pullQuote,
      bodyPart2: richText(BIO.p3, BIO.p4),
      bodyPart3: richText(BIO.p5),
      signoff: BIO.signoff,
      credits: CREDITS,
    } as never,
  })
  console.info('  ✓ bodyPart1 / pullQuote / bodyPart2 / bodyPart3 / signoff / credits updated.')

  // ── ContactPage ──────────────────────────────────────────────────────────
  console.info('Updating ContactPage…')
  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      intro: richText(CONTACT_INTRO_LINE),
    } as never,
  })
  console.info('  ✓ intro updated.')

  // ── LeadMagnetSettings (Phase 3 surface, soft set) ───────────────────────
  console.info('Updating LeadMagnetSettings (subtitle only — Phase 3 surface)…')
  await payload.updateGlobal({
    slug: 'lead-magnet-settings',
    data: {
      subtitle: LEAD_MAGNET_SUBTITLE,
    } as never,
  })
  console.info('  ✓ subtitle updated.')

  console.info('\n✓ Copy refresh complete.')
  console.info(
    process.env.REVALIDATE_SECRET
      ? '  revalidateGlobal hook fired /api/revalidate — prod ISR should be fresh within ~5s.'
      : '  REVALIDATE_SECRET not set — hook skipped revalidation; trigger ISR manually if needed.',
  )
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
