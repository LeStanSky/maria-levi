'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV: Array<{ label: string; href: string }> = [
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

export function Sidebar() {
  const pathname = usePathname() ?? '/'

  return (
    <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-dvh lg:border-r lg:border-line lg:px-8 lg:py-12">
      <Link href="/" className="font-display text-2xl font-light tracking-tight text-ink">
        Maria Levi
      </Link>
      <nav className="mt-16 flex flex-col gap-4">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`font-body text-xs uppercase tracking-[0.18em] transition-colors duration-200 ${
                active ? 'text-ink' : 'text-soft hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto">
        <p className="font-body text-xs uppercase tracking-[0.18em] text-muted">
          New York · New Jersey
        </p>
      </div>
    </aside>
  )
}
