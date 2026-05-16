import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { BlogCategories } from './collections/BlogCategories'
import { BlogPosts } from './collections/BlogPosts'
import { FaqEntries } from './collections/FaqEntries'
import { Leads } from './collections/Leads'
import { LocalLandingPages } from './collections/LocalLandingPages'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { PortfolioCategories } from './collections/PortfolioCategories'
import { PortfolioSeries } from './collections/PortfolioSeries'
import { Redirects } from './collections/Redirects'
import { Services } from './collections/Services'
import { Subscribers } from './collections/Subscribers'
import { Tags } from './collections/Tags'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { FaqPage } from './globals/FaqPage'
import { LeadMagnetSettings } from './globals/LeadMagnetSettings'
import { Navigation } from './globals/Navigation'
import { ServicesIndex } from './globals/ServicesIndex'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const allowedOrigins = [process.env.NEXT_PUBLIC_SITE_URL, 'http://localhost:3000'].filter(
  (origin): origin is string => Boolean(origin),
)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · Maria Levi Admin',
    },
    components: {
      afterNavLinks: ['/admin/components/LogoutLink#LogoutLink'],
    },
  },
  collections: [
    // Content
    Pages,
    BlogPosts,
    BlogCategories,
    // Portfolio
    PortfolioCategories,
    PortfolioSeries,
    Tags,
    // Services & Pricing
    Services,
    FaqEntries,
    // Content / Social proof
    Testimonials,
    // Local SEO
    LocalLandingPages,
    // Inbox
    Leads,
    Subscribers,
    // System
    Media,
    Redirects,
    Users,
  ],
  globals: [
    // Content
    AboutPage,
    ContactPage,
    FaqPage,
    // Services & Pricing
    ServicesIndex,
    // Marketing
    LeadMagnetSettings,
    // System
    Navigation,
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: allowedOrigins,
  csrf: allowedOrigins,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  sharp,
  plugins: [],
})
