'use client'

import { useEffect, useRef } from 'react'

type Props = {
  src: string
  type?: string | null
  poster?: string
  label: string
  className?: string
}

/**
 * Only advertise types every browser recognises. Phone exports are often
 * QuickTime-branded (`video/quicktime`) even when the stream is plain H.264 —
 * Chrome rejects that type up front without trying, so we omit it and let the
 * browser sniff the file instead.
 */
function sourceType(type?: string | null) {
  return type === 'video/mp4' || type === 'video/webm' ? type : undefined
}

/**
 * Self-hosted background loop (muted, inline, no controls). Autoplays unless
 * the visitor prefers reduced motion — then it stays on the poster frame.
 * `preload="metadata"` keeps the initial page weight down; the browser starts
 * fetching the stream once play() is called after hydration.
 */
export function HeroVideo({ src, type, poster, label, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.play().catch(() => {
      // Autoplay blocked (e.g. low-power mode) — poster stays visible.
    })
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    >
      <source src={src} type={sourceType(type)} />
    </video>
  )
}
