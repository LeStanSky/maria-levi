import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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
import { Videos } from './collections/Videos'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { FaqPage } from './globals/FaqPage'
import { LeadMagnetSettings } from './globals/LeadMagnetSettings'
import { Navigation } from './globals/Navigation'
import { ServicesIndex } from './globals/ServicesIndex'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'

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
    Videos,
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
    // Push is opt-in for local-dev iteration only. CI + production deploy run
    // explicit migrations via `pnpm payload:migrate`. Leaving PAYLOAD_DB_PUSH
    // set in prod is a noop in Drizzle (NODE_ENV=production blocks push) but
    // also a documented foot-gun — schema changes silently don't apply.
    push: process.env.PAYLOAD_DB_PUSH === 'true',
    // Bundled into the production build so serverless functions can resolve
    // migration definitions without reading `src/migrations/` from disk at
    // runtime. `payload migrate:create` updates `src/migrations/index.ts`,
    // which this import follows.
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    // Cloudflare R2 (S3-compatible) media storage. Conditional so CI / local
    // without R2 creds falls back to Payload's default local storage.
    // Files are served directly from the public R2 URL (no Payload proxy).
    ...(process.env.R2_ACCOUNT_ID
      ? [
          s3Storage({
            collections: {
              media: {
                // Per-env key namespace so dev/preview uploads can't clobber prod's
                // (shared bucket). Stored per-doc, so existing root files (empty
                // prefix) keep resolving. Set R2_PREFIX=dev on dev/preview; leave
                // unset on prod (root).
                prefix: process.env.R2_PREFIX || '',
                disablePayloadAccessControl: true,
                generateFileURL: ({ filename, prefix }) =>
                  `${process.env.R2_PUBLIC_URL}/${prefix ? `${prefix}/` : ''}${filename}`,
              },
              videos: {
                prefix: process.env.R2_PREFIX || '',
                disablePayloadAccessControl: true,
                generateFileURL: ({ filename, prefix }) =>
                  `${process.env.R2_PUBLIC_URL}/${prefix ? `${prefix}/` : ''}${filename}`,
              },
            },
            bucket: process.env.R2_BUCKET || '',
            config: {
              endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
              region: 'auto',
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
              },
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
})
