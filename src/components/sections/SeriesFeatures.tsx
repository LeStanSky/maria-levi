import type { PortfolioSery } from '@/payload-types'

type Feature = NonNullable<PortfolioSery['features']>[number]

/**
 * Per-series "features" accordion (right column of the series intro).
 * Native <details>/<summary> — no client JS, text stays in the HTML for SEO.
 * First item starts open; the "+" collapses to "—" when expanded.
 */
export function SeriesFeatures({ features }: { features: Feature[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {features.map((feature, i) => (
        <li key={feature.id ?? i}>
          <details
            open={i === 0}
            className="group py-5 [&[open]>summary>span:last-child]:after:opacity-0"
          >
            <summary className="flex items-start justify-between gap-6 cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-focus-ring) rounded-sm">
              <span className="font-display text-xl lg:text-2xl font-light text-ink leading-snug">
                {feature.heading}
              </span>
              <span
                aria-hidden="true"
                className="mt-2 inline-block w-4 h-4 shrink-0 relative before:content-[''] before:absolute before:w-4 before:h-px before:bg-ink before:top-[7px] after:content-[''] after:absolute after:w-px after:h-4 after:bg-ink after:left-[7px] after:top-0 after:transition-opacity after:duration-200"
              />
            </summary>
            {feature.body && (
              <p className="mt-4 pr-10 font-body text-soft leading-relaxed whitespace-pre-line">
                {feature.body}
              </p>
            )}
          </details>
        </li>
      ))}
    </ul>
  )
}
