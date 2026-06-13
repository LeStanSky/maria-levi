import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // Two test tiers:
    //   tests/int/*.int.spec.ts  — touches DB + Payload Local API + route handlers
    //   tests/unit/**/*.unit.spec.ts — pure functions, no DB, no Payload bootstrap
    include: ['tests/int/**/*.int.spec.ts', 'tests/unit/**/*.unit.spec.ts'],
    hookTimeout: 60_000,
    // Local default: skip pushDevSchema (shared Neon dev DB already has the schema —
    // re-pushing hits "constraint already exists" errors). CI sets PAYLOAD_DB_PUSH=true
    // via workflow env so a fresh Postgres service gets the schema pushed first.
    env: { PAYLOAD_DB_PUSH: process.env.PAYLOAD_DB_PUSH ?? 'false' },
    coverage: {
      // v8 provider — same engine Node uses, no Babel transform of source.
      // Reports go to coverage/ (gitignored); json-summary is what CI / status
      // checks can parse for a single-number total.
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      reportsDirectory: 'coverage',
      // Include everything we ship under src/. Generated files
      // (payload-types, migrations, the [...slug] route Payload writes for us)
      // skew the total and are owned by Payload, not us — exclude.
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/payload-types.ts',
        'src/migrations/**',
        'src/app/(payload)/**',
        '**/*.d.ts',
      ],
      // No thresholds yet — PR-T1..T4 will lift the number incrementally;
      // gating in CI lands once we hit the 65 % target.
    },
  },
})
