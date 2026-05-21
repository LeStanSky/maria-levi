/**
 * Phase 5 — Portfolio media batch upload (Maria's Drive content, 2026-05-21).
 *
 * Reads internal_docs/photo-video/"для сайта"/<folder>/<series>/*.jpg, resizes 4K
 * originals down, uploads to Media (Payload Local API), and upserts PortfolioSeries
 * mapped to the right niche category.
 *
 * Mapping (confirmed by Stanislav 2026-05-21):
 *   Brands         → commercial    (series = numbered sub-folders + "Milena")
 *   Individuals    → portrait       (series = numbered sub-folders)
 *   Models         → model-tests    (series = numbered sub-folders)
 *   PERSONAL BRAND → personal-brand (flat → one series "Personal Brand Stories")
 *   My photos      → NOT portfolio (Maria herself: About hero + BTS video) — skipped here
 *
 * Series titles are PLACEHOLDERS ("Commercial — Series 01") — Maria renames in admin.
 *
 * Storage: Payload DEFAULT (local ./media). This is the "test locally first" pass.
 *   When R2/Vercel Blob is wired, re-run with the adapter to re-host the same files.
 *
 * Idempotent:
 *   - Media matched by deterministic filename "<seriesSlug>-NN.jpg" → reused, not re-uploaded.
 *   - Series matched by slug → updated in place (photos[] replaced).
 *
 * Usage:
 *   pnpm portfolio-upload                 # full run (all folders, up to 12/series)
 *   pnpm portfolio-upload --folder=Models # one source folder only
 *   pnpm portfolio-upload --series-limit=2 --per=4   # quick smoke test
 */
import 'dotenv/config'
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getPayload } from 'payload'
import sharp from 'sharp'
import config from '../src/payload.config'

const SOURCE_ROOT = join(process.cwd(), 'internal_docs', 'photo-video', 'для сайта')
const TMP_DIR = join(tmpdir(), 'maria-portfolio-upload')
const IMG_RE = /\.(jpe?g|png)$/i
const LONG_EDGE = 2400
const JPEG_QUALITY = 82

type Niche = 'personal-brand' | 'portrait' | 'model-tests' | 'commercial'

type Mapping = {
  folder: string
  niche: Niche
  categorySlug: string
  label: string // placeholder series label, e.g. "Commercial"
  mode: 'series-subfolders' | 'flat-single'
  flatTitle?: string
}

const MAPPINGS: Mapping[] = [
  {
    folder: 'Brands',
    niche: 'commercial',
    categorySlug: 'commercial',
    label: 'Commercial',
    mode: 'series-subfolders',
  },
  {
    folder: 'Individuals',
    niche: 'portrait',
    categorySlug: 'portrait',
    label: 'Portrait',
    mode: 'series-subfolders',
  },
  {
    folder: 'Models',
    niche: 'model-tests',
    categorySlug: 'model-tests',
    label: 'Model Test',
    mode: 'series-subfolders',
  },
  {
    folder: 'PERSONAL BRAND',
    niche: 'personal-brand',
    categorySlug: 'personal-brand',
    label: 'Personal Brand',
    mode: 'flat-single',
    flatTitle: 'Personal Brand Stories',
  },
]

// ── arg parsing ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
function arg(name: string): string | undefined {
  const hit = args.find((a) => a.startsWith(`--${name}=`))
  return hit ? hit.split('=')[1] : undefined
}
const ONLY_FOLDER = arg('folder')
const SERIES_LIMIT = arg('series-limit') ? Number(arg('series-limit')) : Infinity
const PER_SERIES = arg('per') ? Number(arg('per')) : 12

// ── helpers ───────────────────────────────────────────────────────────────────
function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

/** Recursively collect image file paths under a directory. */
function collectImages(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...collectImages(full))
    else if (IMG_RE.test(entry)) out.push(full)
  }
  return out
}

type SeriesJob = {
  title: string
  slug: string
  niche: Niche
  categorySlug: string
  label: string
  files: string[]
}

function buildJobs(m: Mapping): SeriesJob[] {
  const root = join(SOURCE_ROOT, m.folder)
  if (!existsSync(root)) {
    console.warn(`  ! source folder missing: ${root}`)
    return []
  }

  if (m.mode === 'flat-single') {
    const files = collectImages(root).sort(naturalSort).slice(0, PER_SERIES)
    const title = m.flatTitle ?? m.label
    return [
      {
        title,
        slug: slugify(title),
        niche: m.niche,
        categorySlug: m.categorySlug,
        label: m.label,
        files,
      },
    ]
  }

  // series-subfolders: each immediate sub-directory is one series
  const subdirs = readdirSync(root)
    .filter((e) => statSync(join(root, e)).isDirectory())
    .sort(naturalSort)
    .slice(0, SERIES_LIMIT)

  const jobs: SeriesJob[] = []
  for (const sub of subdirs) {
    const numeric = /^\d+$/.test(sub)
    const title = numeric
      ? `${m.label} — Series ${sub.padStart(2, '0')}`
      : sub.replace(/_+/g, ' ').trim()
    const slug = numeric
      ? `${m.niche}-series-${sub.padStart(2, '0')}`
      : `${m.niche}-${slugify(sub)}`
    const files = collectImages(join(root, sub)).sort(naturalSort).slice(0, PER_SERIES)
    if (files.length === 0) continue
    jobs.push({ title, slug, niche: m.niche, categorySlug: m.categorySlug, label: m.label, files })
  }
  return jobs
}

async function main() {
  if (!existsSync(SOURCE_ROOT)) {
    console.error(`Source root not found: ${SOURCE_ROOT}`)
    process.exit(1)
  }
  mkdirSync(TMP_DIR, { recursive: true })
  const payload = await getPayload({ config })

  // resolve category ids by slug
  const catBySlug = new Map<string, number>()
  for (const slug of new Set(MAPPINGS.map((m) => m.categorySlug))) {
    const res = await payload.find({
      collection: 'portfolio-categories',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    if (!res.docs[0]) {
      console.error(`Category "${slug}" not found — run \`pnpm seed\` first.`)
      process.exit(1)
    }
    catBySlug.set(slug, res.docs[0].id)
  }

  let totalPhotos = 0
  let totalSeries = 0

  for (const m of MAPPINGS) {
    if (ONLY_FOLDER && m.folder !== ONLY_FOLDER) continue
    const jobs = buildJobs(m)
    console.info(`\n=== ${m.folder} → ${m.niche} (${jobs.length} series) ===`)

    for (let s = 0; s < jobs.length; s++) {
      const job = jobs[s]
      const mediaIds: number[] = []

      for (let i = 0; i < job.files.length; i++) {
        const src = job.files[i]
        const fname = `${job.slug}-${String(i + 1).padStart(2, '0')}.jpg`

        // idempotent: reuse if already uploaded
        const existing = await payload.find({
          collection: 'media',
          where: { filename: { equals: fname } },
          limit: 1,
          depth: 0,
        })
        if (existing.docs[0]) {
          mediaIds.push(existing.docs[0].id)
          continue
        }

        const tmp = join(TMP_DIR, fname)
        try {
          await sharp(src)
            .rotate() // honour EXIF orientation
            .resize({
              width: LONG_EDGE,
              height: LONG_EDGE,
              fit: 'inside',
              withoutEnlargement: true,
            })
            .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
            .toFile(tmp)

          const created = await payload.create({
            collection: 'media',
            data: {
              alt: `${job.title} — ${job.label} photography by Maria Levi`,
              creditPhotographer: 'Maria Levi',
            } as never,
            filePath: tmp,
          })
          mediaIds.push(created.id)
        } catch (err) {
          console.warn(`    ! failed ${src}: ${(err as Error).message}`)
        } finally {
          if (existsSync(tmp)) rmSync(tmp, { force: true })
        }
      }

      if (mediaIds.length === 0) {
        console.warn(`  - ${job.title}: no images uploaded, skipping series`)
        continue
      }

      const data = {
        title: job.title,
        slug: job.slug,
        category: catBySlug.get(job.categorySlug),
        eyebrow: job.label,
        coverImage: mediaIds[0],
        photos: mediaIds.map((id) => ({ image: id })),
        displayOrder: s + 1,
        _status: 'published',
      }

      const found = await payload.find({
        collection: 'portfolio-series',
        where: { slug: { equals: job.slug } },
        limit: 1,
        depth: 0,
      })
      if (found.docs[0]) {
        await payload.update({
          collection: 'portfolio-series',
          id: found.docs[0].id,
          data: data as never,
        })
        console.info(`  ✓ ${job.title} (${mediaIds.length} photos) — updated`)
      } else {
        await payload.create({ collection: 'portfolio-series', data: data as never })
        console.info(`  + ${job.title} (${mediaIds.length} photos) — created`)
      }
      totalPhotos += mediaIds.length
      totalSeries += 1
    }
  }

  console.info(`\n✓ Done. ${totalSeries} series, ${totalPhotos} photos.`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
