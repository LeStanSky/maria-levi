'use client'

import NextImage from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

export type LightboxPhoto = {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string | null
}

type Props = {
  photos: LightboxPhoto[]
  renderTrigger?: (open: (index: number) => void) => React.ReactNode
}

export function Lightbox({ photos, renderTrigger }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  const open = useCallback((index: number) => setOpenIndex(index), [])
  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  )
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (openIndex === null) return

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [openIndex, close, next, prev])

  const touchX = useRef<number | null>(null)
  function onTouchStart(e: React.TouchEvent) {
    touchX.current = e.touches[0]?.clientX ?? null
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchX.current === null) return
    const endX = e.changedTouches[0]?.clientX ?? touchX.current
    const delta = endX - touchX.current
    if (delta > 50) prev()
    if (delta < -50) next()
    touchX.current = null
  }

  const current = openIndex !== null ? photos[openIndex] : null
  const counter = openIndex !== null ? openIndex + 1 : 0

  return (
    <>
      {renderTrigger?.(open)}

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${counter} of ${photos.length}`}
          className="fixed inset-0 z-50 bg-ink/95 flex flex-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-between px-6 py-4 text-bg font-body text-xs uppercase tracking-[0.18em]">
            <span>
              {counter} / {photos.length}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="text-bg hover:opacity-70 transition-opacity p-2"
            >
              Close ×
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-4 pb-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-bg hover:opacity-70 transition-opacity p-3 text-sm uppercase tracking-[0.18em]"
            >
              ← Prev
            </button>

            <div className="relative w-full h-full max-w-6xl">
              <NextImage
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-bg hover:opacity-70 transition-opacity p-3 text-sm uppercase tracking-[0.18em]"
            >
              Next →
            </button>
          </div>

          {current.caption && (
            <p className="text-center text-bg/70 text-sm px-6 pb-4 font-body">{current.caption}</p>
          )}
        </div>
      )}
    </>
  )
}
