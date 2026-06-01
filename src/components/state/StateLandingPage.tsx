import Link from 'next/link'
import { Breadcrumbs } from '@/components/primitives/Breadcrumbs'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Image } from '@/components/primitives/Image'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'
import { breadcrumbListJsonLd } from '@/lib/jsonld'
import { getPayloadClient } from '@/lib/payload'
import type { LocalLandingPage } from '@/payload-types'

export type StateConfig = {
  /** URL slug for this state page, e.g. "nyc". */
  pathSlug: string
  /** Two-letter state abbreviation stored on LocalLandingPages.cityState. */
  stateCode: string
  /** Human-readable state name shown in copy. */
  stateName: string
  /** Hero headline. */
  headline: string
  /** Hero sub-line. */
  subhead: string
  /** Editorial intro paragraph(s) shown above the city grid. */
  intro: string[]
  /** Short label shown above headline (e.g. "New York"). */
  eyebrow: string
  /** Sibling state's pathSlug + label (for the cross-link block). */
  sibling: { pathSlug: string; label: string }
}

export const NYC_CONFIG: StateConfig = {
  pathSlug: 'nyc',
  stateCode: 'NY',
  stateName: 'New York',
  eyebrow: 'New York',
  headline: 'Personal brand & editorial photography in NYC',
  subhead:
    'Sessions across Manhattan and Long Island City — and on assignment throughout the boroughs.',
  intro: [
    'New York is where editorial portraits live their fullest life — the architecture, the light, the pace, the wardrobe culture. I work with founders, creators, and small brands across Manhattan and the river-side neighborhoods of Queens to make images that feel like the next chapter of their work.',
    'Every session is built around the way you actually present yourself: how you sit at a desk, how you stand in front of a class, how you address a room. The output is editorial in tone, but practical in use — equally at home on a website, a press kit, or a magazine feature.',
  ],
  sibling: { pathSlug: 'new-jersey', label: 'New Jersey' },
}

export const NJ_CONFIG: StateConfig = {
  pathSlug: 'new-jersey',
  stateCode: 'NJ',
  stateName: 'New Jersey',
  eyebrow: 'New Jersey',
  headline: 'Personal brand photography across New Jersey',
  subhead: 'Hoboken, Jersey City, Princeton — and quietly serving founders & studios in between.',
  intro: [
    'New Jersey is where a lot of New York-adjacent work actually happens — therapists keeping offices in Hoboken, coaches running practices in Jersey City, professionals based in Princeton who want a portrait photographer close to home. The light is different here, the wardrobes a little more grounded, and the sessions tend to be quieter and more considered.',
    'I shoot personal brand and editorial portraits across the state on a rotating schedule. If you have a New Jersey base — studio, office, garden, home — I can usually come to you. If you want a Manhattan-side studio session, the bridge is short.',
  ],
  sibling: { pathSlug: 'nyc', label: 'NYC' },
}

async function getCitiesInState(stateCode: string): Promise<LocalLandingPage[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'local-landing-pages',
    where: { cityState: { equals: stateCode } },
    limit: 50,
    draft: false,
    sort: 'cityName',
    depth: 1,
  })
  return result.docs
}

type Props = { config: StateConfig }

export async function StateLandingPage({ config }: Props) {
  const cities = await getCitiesInState(config.stateCode)
  const inquireHref = `/contact?region=${config.pathSlug}`

  const breadcrumbsSchema = breadcrumbListJsonLd([
    { name: 'Home', path: '/' },
    { name: config.stateName, path: `/${config.pathSlug}` },
  ])

  return (
    <article>
      {/* Hero + intro in a single section — keeps the page from "stacking" two
          `py-(--spacing-section)` paddings on top of each other, which was the
          v0.9.3-era density complaint. */}
      <Section padding="sm">
        <Container size="prose">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: config.stateName }]} />
          <p className="mt-6 font-body uppercase text-xs tracking-[0.18em] text-muted text-center">
            {config.eyebrow}
          </p>
          <Heading level={1} size="display" className="mt-3 text-center">
            {config.headline}
          </Heading>
          <Text tone="soft" className="mt-5 text-center max-w-prose mx-auto text-lg">
            {config.subhead}
          </Text>

          <div className="prose mt-10">
            {config.intro.map((p, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs are static & ordered
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* City grid */}
      {cities.length > 0 ? (
        <Section padding="sm" className="border-t border-line">
          <Container size="content">
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted text-center">
              City pages
            </p>
            <Heading level={2} size="xl" className="mt-3 text-center">
              Find your neighborhood
            </Heading>
            {/* Grid columns adapt to the city count so 1–2 cards center on
                wide screens instead of stacking against the left edge. */}
            <div
              className={`mt-10 grid gap-10 md:gap-12 ${
                cities.length === 1
                  ? 'mx-auto max-w-sm'
                  : cities.length === 2
                    ? 'mx-auto max-w-3xl md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {cities.map((c) => {
                const href = `/photographer-in/${c.slug}`
                return (
                  <Link key={c.id} href={href} className="group block">
                    {/* aspect-[2/3] matches the 1600×2400 portraits stored on
                        LocalLandingPages → object-cover crops nothing visible. */}
                    <div className="relative aspect-[2/3] overflow-hidden bg-bg-subtle">
                      {c.heroImage && typeof c.heroImage === 'object' && (
                        <Image
                          media={c.heroImage}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="mt-4 flex items-baseline justify-between gap-3">
                      <Heading
                        level={3}
                        size="md"
                        className="group-hover:text-soft transition-colors"
                      >
                        {c.cityName}
                      </Heading>
                      {c.cityState && (
                        <span className="font-body uppercase text-[10px] tracking-[0.22em] text-muted shrink-0">
                          {c.cityState}
                        </span>
                      )}
                    </div>
                    {c.subhead && (
                      <Text tone="soft" size="sm" className="mt-1.5 line-clamp-2">
                        {c.subhead}
                      </Text>
                    )}
                  </Link>
                )
              })}
            </div>
          </Container>
        </Section>
      ) : (
        <Section padding="sm" className="border-t border-line">
          <Container size="prose">
            <Text tone="soft" className="text-center">
              City pages are coming soon. In the meantime, you can{' '}
              <Link href={inquireHref} className="underline underline-offset-4 hover:text-soft">
                send an inquiry
              </Link>{' '}
              for a session anywhere in {config.stateName}.
            </Text>
          </Container>
        </Section>
      )}

      {/* Cross-link to sibling state + primary CTA — fused into one section so
          we don't double-pay the section padding twice in a row. */}
      <Section padding="sm" className="border-t border-line bg-bg-subtle">
        <Container size="prose">
          <div className="grid gap-12 md:gap-16 md:grid-cols-2 text-center">
            <div>
              <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-3">
                Across the river
              </p>
              <Heading level={2} size="lg">
                Also serving {config.sibling.label}
              </Heading>
              <Link
                href={`/${config.sibling.pathSlug}`}
                className="mt-6 inline-flex items-center justify-center px-8 py-3 border border-ink text-ink font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
              >
                See {config.sibling.label} cities
              </Link>
            </div>
            <div>
              <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-3">
                Let&apos;s work together
              </p>
              <Heading level={2} size="lg">
                Plan a session in {config.stateName}
              </Heading>
              <Link
                href={inquireHref}
                className="mt-6 inline-flex items-center justify-center px-10 py-3.5 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 hover:tracking-[0.28em]"
              >
                Send an inquiry
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted server-generated JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
    </article>
  )
}
