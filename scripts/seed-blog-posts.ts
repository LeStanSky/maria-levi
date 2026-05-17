/**
 * Seed script — populates BlogPosts + BlogCategories from blog-seed-posts.md.
 * Run: pnpm seed:blog
 * Safe to re-run: skips categories and posts that already exist (matched by name/slug).
 *
 * Parses the .md as light frontmatter-per-section, splits the body by paragraph
 * / blockquote / heading / bullet-list, and emits a mix of `rich-text-block` and
 * `pull-quote` blocks. Niche tags filtered to the schema enum.
 */
import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const NICHE_ENUM = ['personal-brand', 'portrait', 'model-tests', 'commercial'] as const

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

type LexicalNode = Record<string, unknown> & { type: string; version: number }
type LexicalRoot = { root: LexicalNode }

type BodyBlock =
  | { blockType: 'rich-text-block'; content: LexicalRoot }
  | { blockType: 'pull-quote'; quote: string; style: 'bordered' }

type ParsedPost = {
  title: string
  slug: string
  category: string
  tags: string[]
  excerpt: string
  publishedAt: string
  body: BodyBlock[]
}

function text(s: string): LexicalNode {
  return {
    type: 'text',
    text: s,
    format: 0,
    mode: 'normal',
    style: '',
    detail: 0,
    version: 1,
  }
}

function paragraph(s: string): LexicalNode {
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

function lexicalRoot(children: LexicalNode[]): LexicalRoot {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function parseBody(md: string): BodyBlock[] {
  const lines = md.split('\n')
  const blocks: BodyBlock[] = []
  let buffer: LexicalNode[] = []

  const flush = () => {
    if (buffer.length === 0) return
    blocks.push({ blockType: 'rich-text-block', content: lexicalRoot(buffer) })
    buffer = []
  }

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.trim() === '') {
      i++
      continue
    }
    if (line.startsWith('> ')) {
      flush()
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2).trim())
        i++
      }
      blocks.push({ blockType: 'pull-quote', quote: quoteLines.join(' '), style: 'bordered' })
      continue
    }
    if (line.startsWith('### ')) {
      buffer.push(heading(line.slice(4).trim(), 'h3'))
      i++
      continue
    }
    if (line.startsWith('## ')) {
      buffer.push(heading(line.slice(3).trim(), 'h2'))
      i++
      continue
    }
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2).trim())
        i++
      }
      buffer.push(bulletList(items))
      continue
    }
    buffer.push(paragraph(line.trim()))
    i++
  }
  flush()
  return blocks
}

function parseSeedFile(md: string): ParsedPost[] {
  const sections = md.split(/^## Post \d+ — /m).slice(1)
  const posts: ParsedPost[] = []

  for (const section of sections) {
    const endIdx = section.indexOf('\n---\n')
    const content = endIdx > -1 ? section.slice(0, endIdx) : section
    const pick = (re: RegExp) => content.match(re)?.[1]?.trim() ?? ''

    const title = pick(/\*\*title:\*\*\s*(.+)/)
    const slug = pick(/\*\*slug:\*\*\s*(.+)/)
    const category = pick(/\*\*category:\*\*\s*(.+)/)
    const tagsRaw = pick(/\*\*tags:\*\*\s*(.+)/)
    const excerpt = pick(/\*\*excerpt:\*\*\s*(.+)/)
    const publishedAt = pick(/\*\*publishedAt:\*\*\s*(.+)/)

    const bodyMarker = '**body:**'
    const bodyIdx = content.indexOf(bodyMarker)
    const bodyMd = bodyIdx > -1 ? content.slice(bodyIdx + bodyMarker.length).trim() : ''

    posts.push({
      title,
      slug,
      category,
      tags: tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      excerpt,
      publishedAt,
      body: parseBody(bodyMd),
    })
  }
  return posts
}

async function main() {
  const payload = await getPayload({ config })
  const seedPath = resolve(process.cwd(), 'blog-seed-posts.md')
  const md = readFileSync(seedPath, 'utf8')
  const posts = parseSeedFile(md)

  console.info(`Parsed ${posts.length} posts from ${seedPath}.`)

  const categoryNames = Array.from(new Set(posts.map((p) => p.category)))
  const catIdByName = new Map<string, number>()

  for (const name of categoryNames) {
    const found = await payload.find({
      collection: 'blog-categories',
      where: { name: { equals: name } },
      limit: 1,
    })
    if (found.totalDocs > 0 && found.docs[0]) {
      catIdByName.set(name, found.docs[0].id)
      console.info(`  Category "${name}" already exists (id=${found.docs[0].id}).`)
    } else {
      const created = await payload.create({
        collection: 'blog-categories',
        data: { name, slug: slugifyName(name) } as never,
      })
      catIdByName.set(name, created.id)
      console.info(`  Created category "${name}" (id=${created.id}).`)
    }
  }

  for (const post of posts) {
    const existing = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })
    if (existing.totalDocs > 0) {
      console.info(`  Post "${post.slug}" already exists — skipping.`)
      continue
    }
    const catId = catIdByName.get(post.category)
    if (!catId) {
      console.warn(`  Skipping "${post.slug}" — unknown category "${post.category}".`)
      continue
    }

    const nicheTags = post.tags
      .filter((t): t is (typeof NICHE_ENUM)[number] =>
        (NICHE_ENUM as readonly string[]).includes(t),
      )
      .map((niche) => ({ niche }))

    const excerpt =
      post.excerpt.length > 200 ? `${post.excerpt.slice(0, 197).trimEnd()}…` : post.excerpt

    const created = await payload.create({
      collection: 'blog-posts',
      data: {
        title: post.title,
        slug: post.slug,
        excerpt,
        categories: [catId],
        body: post.body,
        publishDate: post.publishedAt,
        author: 'Maria Levi',
        nicheTags,
        _status: 'published',
      } as never,
    })
    console.info(`  Created post "${post.title}" (id=${created.id}, slug=${post.slug}).`)
  }

  console.info('Done.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
