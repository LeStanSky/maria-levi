import { ImageResponse } from 'next/og'

// Next.js opengraph-image standard size — Twitter / FB / LinkedIn all crop to
// this aspect or a close subset.
export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_CONTENT_TYPE = 'image/png'

// @vercel/og (Satori) only accepts TTF/OTF/WOFF — our site fonts ship as WOFF2.
// Rather than bundle separate TTF copies, we let Satori fall back to its
// internal default sans-serif and rely on CSS family stacks for visual tone.
// This keeps OG images branded *enough* (layout, colors, accent line) without
// adding ~500KB of font duplicates to the build.
const SERIF_STACK = '"Times New Roman", Times, serif'
const SANS_STACK = '"Helvetica Neue", Helvetica, Arial, sans-serif'

export type OgCardProps = {
  /** Small uppercase eyebrow above the title (e.g. "City landing"). */
  eyebrow?: string
  /** Main headline. Truncated visually if it overflows. */
  title: string
  /** Optional supporting line under the title. */
  subhead?: string
  /** Brand name shown bottom-left. */
  brand?: string
  /** Tagline/role under the brand mark. */
  brandTagline?: string
}

/**
 * Renders a branded Maria Levi OG card. Used as the fallback opengraph-image
 * for any dynamic route whose CMS document has no custom OG image set.
 *
 * Layout: black background, generous margins, large display headline left,
 * brand mark bottom-left, thin accent line bottom-right. No external images
 * (keeps render fast & R2-independent).
 */
export async function renderOgCard({
  eyebrow,
  title,
  subhead,
  brand = 'Maria Levi',
  brandTagline = 'Fashion & Personal Brand Photography',
}: OgCardProps) {
  // Headline auto-sizes by length so long titles don't overflow the card.
  const headlineSize = title.length > 60 ? 64 : title.length > 36 ? 80 : 96

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0a',
        color: '#f5f3ee',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        fontFamily: SANS_STACK,
      }}
    >
      {/* Top: eyebrow */}
      <div
        style={{
          display: 'flex',
          fontFamily: SANS_STACK,
          fontSize: 20,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: '#b8b1a3',
        }}
      >
        {eyebrow ?? brandTagline}
      </div>

      {/* Middle: headline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1000 }}>
        <div
          style={{
            display: 'flex',
            fontFamily: SERIF_STACK,
            fontSize: headlineSize,
            lineHeight: 1.05,
            fontWeight: 300,
            letterSpacing: -2,
            color: '#f5f3ee',
          }}
        >
          {title}
        </div>
        {subhead && (
          <div
            style={{
              display: 'flex',
              fontFamily: SANS_STACK,
              fontSize: 28,
              lineHeight: 1.3,
              color: '#b8b1a3',
              fontWeight: 300,
              maxWidth: 900,
            }}
          >
            {subhead}
          </div>
        )}
      </div>

      {/* Bottom: brand mark + accent line */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              display: 'flex',
              fontFamily: SERIF_STACK,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: -1,
            }}
          >
            {brand}
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: SANS_STACK,
              fontSize: 16,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#b8b1a3',
            }}
          >
            {brandTagline}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: 200,
            height: 2,
            backgroundColor: '#b8b1a3',
          }}
        />
      </div>
    </div>,
    OG_SIZE,
  )
}
