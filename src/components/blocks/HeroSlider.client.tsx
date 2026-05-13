'use client'

import NextImage from 'next/image'
import { useEffect, useState } from 'react'
import { isMedia, type MediaLike } from '@/lib/media'

type Slide = { image: MediaLike }

type Props = {
  slides: Slide[]
  autoplayInterval?: number | null
  tag?: string | null
  tagline?: string | null
}

export function HeroSlider({ slides, autoplayInterval, tag, tagline }: Props) {
  const usable = slides.filter((s) => isMedia(s.image) && s.image.url)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (usable.length < 2) return
    const interval = autoplayInterval ?? 5000
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % usable.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [usable.length, autoplayInterval])

  if (usable.length === 0) return null

  return (
    <section className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[5/3] overflow-hidden bg-bg-subtle">
      {usable.map((slide, i) => {
        const img = slide.image
        if (!isMedia(img) || !img.url) return null
        return (
          <div
            key={img.id ?? `slide-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={i !== index}
          >
            <NextImage
              src={img.url}
              alt={img.alt ?? ''}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) calc(100vw - 220px), 100vw"
              className="object-cover"
            />
          </div>
        )
      })}

      {(tag || tagline) && (
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 md:px-12 md:pb-20 text-bg pointer-events-none">
          <div className="max-w-2xl">
            {tag && (
              <p className="font-body uppercase text-xs tracking-[0.18em] mb-4 opacity-90">{tag}</p>
            )}
            {tagline && (
              <p className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-snug">
                {tagline}
              </p>
            )}
          </div>
        </div>
      )}

      {usable.length > 1 && (
        <div className="absolute bottom-6 right-6 flex gap-2">
          {usable.map((slide, i) => {
            const img = slide.image
            const dotKey =
              isMedia(img) && img.id ? `dot-${img.id}` : `dot-${img && isMedia(img) ? img.url : i}`
            return (
              <button
                key={dotKey}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === index ? 'bg-bg w-6' : 'bg-bg/50 hover:bg-bg/80'
                }`}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
