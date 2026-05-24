/**
 * Apply Maria's curated site content: category covers, service covers, contact
 * image, About hero + image pair, and the homepage hero slider (published).
 *
 * Idempotent. Run AFTER `services-refresh` + `portfolio-upload`.
 *
 * Picks are referenced by SERIES SLUG + PHOTO INDEX (not media filename) so they
 * resolve the same image on any environment, even if stored filenames differ
 * (e.g. R2 collision-renames). About photos are Maria's own (uploaded here).
 *
 * Run: pnpm apply-content   (DEV by default; for prod set DATABASE_URL to prod)
 *
 * Curation (2026-05-21/22) — [series, photoIndex]:
 *   Category covers : personal-brand=[personal-brand-stories,10], portrait=[portrait-series-02,0],
 *                     model-tests=[model-tests-series-01,0], commercial=[commercial-series-03,0]
 *   Service covers  : personal-brand=[personal-brand-stories,1], portrait=[portrait-series-01,0],
 *                     model-tests=[model-tests-series-03,0], commercial=[commercial-series-10,0]
 *   Contact image   : [portrait-series-09,0]
 *   About hero      : My photos/2A701799.jpg ; imagePair: ML_09914.jpg + ML_09952.jpg
 *   Home slider     : [portrait-series-01,0],[commercial-series-03,0],[portrait-series-06,0],
 *                     [portrait-series-10,0],[model-tests-series-03,0]
 */
import 'dotenv/config'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getPayload } from 'payload'
import sharp from 'sharp'
import config from '../src/payload.config'

const MYPHOTOS = join(process.cwd(), 'internal_docs', 'photo-video', 'для сайта', 'My photos')

type Payload = Awaited<ReturnType<typeof getPayload>>
type Pick = [slug: string, index: number]

async function seriesPhoto(payload: Payload, slug: string, index: number): Promise<number> {
  const r = await payload.find({
    collection: 'portfolio-series',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  const s = r.docs[0]
  if (!s) throw new Error(`series not found: ${slug}`)
  const photos = (s as { photos?: { image?: number | { id: number } }[] }).photos ?? []
  const img = photos[index]?.image
  const id = typeof img === 'object' && img ? img.id : img
  if (typeof id !== 'number') throw new Error(`series ${slug} has no photo at index ${index}`)
  return id
}

async function uploadMaria(payload: Payload, srcName: string, outName: string): Promise<number> {
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: outName } },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) return existing.docs[0].id
  const tmp = join(tmpdir(), outName)
  mkdirSync(tmpdir(), { recursive: true })
  await sharp(join(MYPHOTOS, srcName))
    .rotate()
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(tmp)
  const created = await payload.create({
    collection: 'media',
    data: { alt: 'Maria Levi, photographer — portrait', creditPhotographer: 'Maria Levi' } as never,
    filePath: tmp,
  })
  if (existsSync(tmp)) rmSync(tmp, { force: true })
  return created.id
}

const CATEGORY_COVERS: Record<string, Pick> = {
  'personal-brand': ['personal-brand-stories', 10],
  portrait: ['portrait-series-02', 0],
  'model-tests': ['model-tests-series-01', 0],
  commercial: ['commercial-series-03', 0],
}
const SERVICE_COVERS: Record<string, Pick> = {
  'personal-brand': ['personal-brand-stories', 1],
  portrait: ['portrait-series-01', 0],
  'model-tests': ['model-tests-series-03', 0],
  commercial: ['commercial-series-10', 0],
}
const CONTACT_IMAGE: Pick = ['portrait-series-09', 0]
const SLIDER: Pick[] = [
  ['portrait-series-01', 0],
  ['commercial-series-03', 0],
  ['portrait-series-06', 0],
  ['portrait-series-10', 0],
  ['model-tests-series-03', 0],
]

async function main() {
  const payload = await getPayload({ config })

  // ── Category covers ──
  for (const [slug, [series, idx]] of Object.entries(CATEGORY_COVERS)) {
    const cat = await payload.find({
      collection: 'portfolio-categories',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (!cat.docs[0]) {
      console.warn(`  ! category ${slug} missing`)
      continue
    }
    await payload.update({
      collection: 'portfolio-categories',
      id: cat.docs[0].id,
      data: { coverImage: await seriesPhoto(payload, series, idx) } as never,
    })
    console.info(`  ✓ category cover ${slug}`)
  }

  // ── Service covers ──
  for (const [nicheKey, [series, idx]] of Object.entries(SERVICE_COVERS)) {
    const svc = await payload.find({
      collection: 'services',
      where: { nicheKey: { equals: nicheKey } },
      limit: 1,
      depth: 0,
    })
    if (!svc.docs[0]) {
      console.warn(`  ! service ${nicheKey} missing`)
      continue
    }
    await payload.update({
      collection: 'services',
      id: svc.docs[0].id,
      data: { coverImage: await seriesPhoto(payload, series, idx) } as never,
    })
    console.info(`  ✓ service cover ${nicheKey}`)
  }

  // ── Contact image ──
  await payload.updateGlobal({
    slug: 'contact-page',
    data: { heroImage: await seriesPhoto(payload, CONTACT_IMAGE[0], CONTACT_IMAGE[1]) } as never,
  })
  console.info('  ✓ contact heroImage')

  // ── About hero + image pair (Maria's own photos) ──
  const heroId = await uploadMaria(payload, '2A701799.jpg', 'about-maria-hero.jpg')
  const pair1 = await uploadMaria(payload, 'ML_09914.jpg', 'about-maria-02.jpg')
  const pair2 = await uploadMaria(payload, 'ML_09952.jpg', 'about-maria-03.jpg')
  await payload.updateGlobal({
    slug: 'about-page',
    data: { heroImage: heroId, imagePair: [{ image: pair1 }, { image: pair2 }] } as never,
  })
  console.info('  ✓ About hero + imagePair')

  // ── Home hero slider (fill slides + publish) ──
  const slideIds = await Promise.all(SLIDER.map(([s, i]) => seriesPhoto(payload, s, i)))
  const home = await payload.find({
    collection: 'pages',
    where: { isHomepage: { equals: true } },
    limit: 1,
    depth: 0,
    draft: true,
  })
  const page = home.docs[0]
  if (!page) {
    console.warn('  ! homepage (isHomepage) not found — skipping slider')
  } else {
    type Block = { blockType: string; slides?: unknown[]; tag?: string; tagline?: string }
    const blocks = (page.pageBuilder ?? []) as Block[]
    let touched = false
    const newBlocks = blocks.map((b) => {
      if (b.blockType !== 'hero-slider') return b
      touched = true
      return {
        ...b,
        slides: slideIds.map((id) => ({ image: id })),
        tag: b.tag ?? 'New York & New Jersey',
        tagline: b.tagline ?? 'Aligned. Memorable. Real.',
      }
    })
    if (!touched) {
      newBlocks.unshift({
        blockType: 'hero-slider',
        slides: slideIds.map((id) => ({ image: id })),
        tag: 'New York & New Jersey',
        tagline: 'Aligned. Memorable. Real.',
      } as Block)
    }
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { pageBuilder: newBlocks, _status: 'published' } as never,
    })
    console.info(`  ✓ Home hero slider (${slideIds.length} slides) + published`)
  }

  console.info('\n✓ Site content applied.')
  process.exit(0)
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
