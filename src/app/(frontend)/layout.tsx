import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu.client'
import { Sidebar } from '@/components/layout/Sidebar'
import { StickyInquireCTA } from '@/components/layout/StickyInquireCTA.client'
import { FooterLeadMagnet } from '@/components/lead-magnet/FooterLeadMagnet'
import { LeadMagnetMount } from '@/components/lead-magnet/LeadMagnetMount'
import { fraunces, inter } from '@/lib/fonts'

import './styles.css'

export const metadata: Metadata = {
  // Needed so file-based opengraph-image.tsx routes resolve to absolute URLs
  // when crawlers fetch the metadata. Falls back to localhost only at build
  // time when no env is set (e.g. fresh dev), Vercel envs always set this.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Maria Levi · Fashion & Personal Brand Photographer in NYC and New Jersey',
    template: '%s · Maria Levi Photography',
  },
  description:
    'Editorial · Personal brand · Commercial photography. Based in New York & New Jersey — serving Manhattan, Long Island City, Hoboken, Jersey City, Princeton and beyond.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-bg text-ink min-h-dvh">
        <MobileMenu />
        <div className="lg:grid lg:grid-cols-[220px_1fr] min-h-dvh">
          <Sidebar />
          <div className="flex flex-col min-h-dvh">
            <main className="flex-1">{children}</main>
            <FooterLeadMagnet />
            <Footer />
          </div>
        </div>
        <StickyInquireCTA />
        <LeadMagnetMount />
      </body>
    </html>
  )
}
