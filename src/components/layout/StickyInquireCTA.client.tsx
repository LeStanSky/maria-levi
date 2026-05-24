'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const HIDDEN_PATHS = ['/contact']

export function StickyInquireCTA() {
  const [scrolled, setScrolled] = useState(false)
  const [atFooter, setAtFooter] = useState(false)
  const pathname = usePathname() ?? '/'

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 200)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hide once the footer is in view so the CTA never overlaps the footer links.
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting))
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  if (HIDDEN_PATHS.includes(pathname)) return null

  const visible = scrolled && !atFooter

  return (
    <Link
      href="/contact"
      aria-label="Inquire about a session"
      className={`fixed bottom-6 right-6 z-20 inline-flex items-center justify-center px-6 py-3 border border-ink/60 bg-bg/70 text-ink backdrop-blur-sm font-body uppercase text-[11px] font-medium tracking-[0.18em] rounded-[2px] transition-all duration-500 ease-out hover:bg-ink hover:text-bg hover:border-ink ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      Inquire
    </Link>
  )
}
