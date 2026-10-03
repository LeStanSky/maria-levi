import NextImage from 'next/image'
import { isMedia, type MediaLike } from '@/lib/media'
import type { Video } from '@/payload-types'
import { HeroVideo } from './HeroVideo.client'

type Props = {
  image: MediaLike
  video: number | Video | null | undefined
  videoPosition?: 'left' | 'right' | null
  tag?: string | null
  tagline?: string | null
}

const PANEL =
  'relative aspect-[4/5] md:aspect-auto md:h-[min(88svh,960px)] overflow-hidden bg-bg-subtle'

/**
 * Homepage hero: one portrait photo + one silent video loop, edge to edge,
 * side by side on tablet/desktop, stacked on mobile (photo first — it is the
 * LCP element and gets `priority`; the video shows its poster until it plays).
 */
export function HeroMediaPair({ image, video, videoPosition, tag, tagline }: Props) {
  const hasImage = isMedia(image) && !!image.url
  const hasVideo = typeof video === 'object' && video !== null && !!video.url
  if (!hasImage && !hasVideo) return null

  const poster = hasVideo && isMedia(video.poster) ? (video.poster.url ?? undefined) : undefined
  const videoFirst = videoPosition === 'left'

  return (
    <section className="relative w-full">
      {(tag || tagline) && (
        <div className="px-6 lg:px-8 pt-12 pb-8 md:pb-10 max-w-3xl">
          {tag && (
            <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-4">{tag}</p>
          )}
          {tagline && (
            <h1 className="font-display text-4xl md:text-5xl font-light tracking-tight leading-tight text-ink">
              {tagline}
            </h1>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[6px]">
        {hasImage && (
          <div className={`${PANEL} ${videoFirst ? 'md:order-2' : ''}`}>
            <NextImage
              src={image.url as string}
              alt={image.alt ?? ''}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        {hasVideo && (
          <div className={`${PANEL} ${videoFirst ? 'md:order-1' : ''}`}>
            <HeroVideo
              src={video.url as string}
              type={video.mimeType}
              poster={poster}
              label={video.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  )
}
