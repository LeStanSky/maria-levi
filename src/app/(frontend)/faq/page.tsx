import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/lib/richtext'
import { buildMetadata } from '@/lib/seo'
import type { FaqEntry } from '@/payload-types'

export const revalidate = 60

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  pricing: 'Pricing',
  process: 'Process',
  preparation: 'Preparation',
  delivery: 'Delivery',
}
const CATEGORY_ORDER = ['general', 'pricing', 'process', 'preparation', 'delivery'] as const
const UNCATEGORISED = 'other'

const getFaqData = cache(async () => {
  const payload = await getPayloadClient()
  const [faqPage, entries] = await Promise.all([
    payload.findGlobal({ slug: 'faq-page', draft: false }),
    payload.find({
      collection: 'faq-entries',
      limit: 200,
      sort: 'displayOrder',
      depth: 0,
    }),
  ])
  return { faqPage, entries: entries.docs }
})

export async function generateMetadata(): Promise<Metadata> {
  const { faqPage } = await getFaqData()
  return buildMetadata({
    seo: faqPage.seo,
    fallbackTitle: 'FAQ · Maria Levi Photography',
    fallbackDescription:
      'Common questions about session pricing, the booking process, what to wear, and delivery timelines.',
    fallbackImage: faqPage.heroImage,
    path: '/faq',
  })
}

function groupByCategory(entries: FaqEntry[]): Map<string, FaqEntry[]> {
  const groups = new Map<string, FaqEntry[]>()
  for (const entry of entries) {
    const key = entry.category ?? UNCATEGORISED
    const bucket = groups.get(key) ?? []
    bucket.push(entry)
    groups.set(key, bucket)
  }
  return groups
}

function orderedCategories(groups: Map<string, FaqEntry[]>): string[] {
  const knownOrdered = CATEGORY_ORDER.filter((c) => groups.has(c))
  const extras = [...groups.keys()].filter(
    (c) => !(CATEGORY_ORDER as readonly string[]).includes(c),
  )
  return [...knownOrdered, ...extras]
}

export default async function FaqPageRoute() {
  const { faqPage, entries } = await getFaqData()
  if (!faqPage?.headline) notFound()

  const groups = groupByCategory(entries)
  const categories = orderedCategories(groups)

  return (
    <article>
      <Section padding="lg">
        <Container size="prose">
          {faqPage.eyebrow && (
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6 text-center">
              {faqPage.eyebrow}
            </p>
          )}
          <Heading level={1} size="display" className="text-center">
            {faqPage.headline}
          </Heading>
          {faqPage.intro && (
            <div className="mt-10">
              <RichText data={faqPage.intro} className="prose text-center mx-auto" />
            </div>
          )}
        </Container>
      </Section>

      {entries.length === 0 ? (
        <Section padding="md" className="border-t border-line">
          <Container size="prose">
            <p className="font-body text-sm text-muted text-center">FAQ entries are coming soon.</p>
          </Container>
        </Section>
      ) : (
        categories.map((category) => {
          const items = groups.get(category) ?? []
          const label = CATEGORY_LABELS[category] ?? 'More'
          return (
            <Section key={category} padding="md" className="border-t border-line">
              <Container size="content">
                <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
                  <header className="lg:sticky lg:top-12 lg:self-start">
                    <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-3">
                      {category === UNCATEGORISED
                        ? '—'
                        : `0${CATEGORY_ORDER.indexOf(category as (typeof CATEGORY_ORDER)[number]) + 1}`.slice(
                            -2,
                          )}
                    </p>
                    <Heading level={2} size="lg">
                      {label}
                    </Heading>
                  </header>
                  <ul className="divide-y divide-line border-y border-line">
                    {items.map((item) => (
                      <li key={item.id}>
                        <details className="group py-6 [&[open]>summary>span:last-child]:rotate-45">
                          <summary className="flex items-start justify-between gap-6 cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-focus-ring) rounded-sm">
                            <span className="font-display text-xl lg:text-2xl font-light text-ink leading-snug">
                              {item.question}
                            </span>
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block w-4 h-4 shrink-0 transition-transform duration-200 before:content-[''] before:absolute before:w-4 before:h-px before:bg-ink relative after:content-[''] after:absolute after:w-px after:h-4 after:bg-ink after:left-[7px] after:top-0"
                            />
                          </summary>
                          <div className="mt-4 pr-10">
                            <RichText data={item.answer} className="prose prose--sm" />
                          </div>
                        </details>
                      </li>
                    ))}
                  </ul>
                </div>
              </Container>
            </Section>
          )
        })
      )}

      <Section padding="md" className="border-t border-line">
        <Container size="prose">
          <div className="text-center">
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
              Didn’t find your answer?
            </p>
            <Heading level={2} size="xl">
              Just ask.
            </Heading>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center justify-center px-11 py-4.5 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
            >
              Send an inquiry
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  )
}
