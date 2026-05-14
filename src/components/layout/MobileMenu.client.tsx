'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() ?? '/'

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-fire on pathname change to auto-close
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 bg-bg/95 backdrop-blur border-b border-line">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-display text-xl font-light tracking-tight text-ink">
            Maria Levi
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="font-body text-xs uppercase tracking-[0.18em] text-ink p-2"
          >
            Menu
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="lg:hidden h-14" />

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="lg:hidden fixed inset-0 z-40 bg-bg flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-display text-xl font-light tracking-tight text-ink"
            >
              Maria Levi
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="font-body text-xs uppercase tracking-[0.18em] text-ink p-2"
            >
              Close ×
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8">
            <ul className="flex flex-col gap-6">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`block font-display text-3xl font-light tracking-tight transition-colors ${
                        active ? 'text-ink' : 'text-soft hover:text-ink'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="px-8 py-6 border-t border-line">
            <p className="font-body text-xs uppercase tracking-[0.18em] text-muted">
              New York · New Jersey
            </p>
          </div>
        </div>
      )}
    </>
  )
}
