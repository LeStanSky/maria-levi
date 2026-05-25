'use client'

import NextImage from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { isMedia, type MediaLike } from '@/lib/media'

type Slide = { image: MediaLike }

type Props = {
  slides: Slide[]
  autoplayInterval?: number | null
  tag?: string | null
  tagline?: string | null
}

/**
 * Editorial portrait filmstrip. Most of Maria's work is vertical with deliberate
 * composition, so instead of cropping one shot into a landscape band we show a
 * row of portraits (3 on desktop, 2 on tablet, 1 on mobile) that "flows" left:
 * every few seconds the track steps one column to the left, a new portrait
 * enters from the right, and the loop is seamless via cloned leading slides.
 */
export function HeroSlider({ slides, autoplayInterval, tag, tagline }: Props) {
  const usable = slides.filter((s) => isMedia(s.image) && s.image.url)

  const [visible, setVisible] = useState(3)
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const pausedRef = useRef(false)
  const reducedRef = useRef(false)

  // Responsive column count.
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setVisible(w >= 1024 ? 3 : w >= 640 ? 2 : 1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const canScroll = usable.length > visible

  // Step left on a timer (paused on hover / reduced-motion).
  useEffect(() => {
    if (!canScroll || reducedRef.current) return
    const id = window.setInterval(() => {
      if (!pausedRef.current) setIndex((i) => i + 1)
    }, autoplayInterval ?? 4500)
    return () => window.clearInterval(id)
  }, [canScroll, autoplayInterval])

  // After the step that lands on the cloned head, snap back to 0 without animation.
  const onTransitionEnd = useCallback(() => {
    if (index >= usable.length) {
      setAnimate(false)
      setIndex(0)
    }
  }, [index, usable.length])

  // Re-enable the transition one frame after the silent snap.
  useEffect(() => {
    if (animate) return
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(raf)
  }, [animate])

  if (usable.length === 0) return null

  const colPct = 100 / visible
  // Append `visible` clones of the head so stepping past the end stays seamless.
  const track = canScroll ? [...usable, ...usable.slice(0, visible)] : usable

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

      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover-pause is a decorative enhancement, autoplay still pauses for reduced-motion */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => {
          pausedRef.current = true
        }}
        onMouseLeave={() => {
          pausedRef.current = false
        }}
      >
        <div
          className="flex"
          style={{
            transform: `translateX(-${index * colPct}%)`,
            transition: animate ? 'transform 800ms cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((slide, i) => {
            const img = slide.image
            if (!isMedia(img) || !img.url) return null
            const isClone = i >= usable.length
            return (
              <div
                key={`${img.id ?? img.url}-${isClone ? 'clone' : 'main'}`}
                className="shrink-0 basis-full px-[3px] sm:basis-1/2 lg:basis-1/3"
                aria-hidden={isClone}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-bg-subtle">
                  <NextImage
                    src={img.url}
                    alt={img.alt ?? ''}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
