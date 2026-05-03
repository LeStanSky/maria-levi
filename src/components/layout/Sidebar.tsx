import Link from 'next/link'

const NAV: Array<{ label: string; href: string }> = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-dvh lg:border-r lg:border-line lg:px-8 lg:py-12">
      <Link href="/" className="font-display text-2xl font-light tracking-tight text-ink">
        Maria Levi
      </Link>
      <nav className="mt-16 flex flex-col gap-4">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-body text-xs uppercase tracking-[0.18em] text-soft hover:text-ink transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <p className="font-body text-xs uppercase tracking-[0.18em] text-muted">New Jersey · NYC</p>
      </div>
    </aside>
  )
}
