import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { withPayload } from '@payloadcms/next/withPayload'
import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

// Allow next/image to optimize media served from R2's public URL (and a future
// custom media domain). Host is derived from R2_PUBLIC_URL at build time;
// "*.r2.dev" stays as a fallback for envs that build without the var set.
const r2Host = (() => {
  try {
    return process.env.R2_PUBLIC_URL ? new URL(process.env.R2_PUBLIC_URL).hostname : undefined
  } catch {
    return undefined
  }
})()

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    remotePatterns: [
      { protocol: 'https', hostname: '*.r2.dev' },
      ...(r2Host ? [{ protocol: 'https' as const, hostname: r2Host }] : []),
    ],
    // Cache every optimized variant for a year. Default is 60 s — the variant
    // expires constantly, and the next request re-runs the transformation,
    // burning Vercel's Image Optimization quota on a portfolio whose photos
    // never change. Triggered after free-tier alert hit 75 % (3 750 / 5 000)
    // pre-launch on 2026-06-12. Each photo's content is immutable once
    // uploaded (R2 URL = id-based), so a long TTL is safe — if Maria ever
    // replaces a photo in CMS, the URL changes and we get a fresh cache key.
    minimumCacheTTL: 31_536_000,
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withSentryConfig(withPayload(nextConfig, { devBundleServerPackages: false }), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'lestansky',

  project: 'maria-levi',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
})
