'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const HIDDEN_PATHS = ['/contact']

export function StickyInquireCTA() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname() ?? '/'

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 200)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (HIDDEN_PATHS.includes(pathname)) return null

  return (
    <Link
      href="/contact"
      aria-label="Inquire about a session"
      className={`fixed bottom-6 right-6 z-20 inline-flex items-center justify-center px-8 py-4 bg-ink text-bg font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] shadow-lg transition-all duration-500 ease-out hover:tracking-[0.28em] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      Inquire
    </Link>
  )
}
