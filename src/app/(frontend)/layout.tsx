import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Sidebar } from '@/components/layout/Sidebar'
import { fraunces, inter } from '@/lib/fonts'

import './styles.css'

export const metadata: Metadata = {
  title: {
    default: 'Maria Levi · Fashion & Personal Brand Photographer in NYC and New Jersey',
    template: '%s · Maria Levi Photography',
  },
  description:
    'Editorial · Personal brand · Commercial photography. Based in New Jersey — serving Manhattan, Long Island City, Hoboken, Jersey City, Princeton and beyond.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-bg text-ink min-h-dvh">
        <div className="lg:grid lg:grid-cols-[220px_1fr] min-h-dvh">
          <Sidebar />
          <div className="flex flex-col min-h-dvh">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
