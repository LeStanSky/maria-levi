import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    hookTimeout: 60_000,
    // Local default: skip pushDevSchema (shared Neon dev DB already has the schema —
    // re-pushing hits "constraint already exists" errors). CI sets PAYLOAD_DB_PUSH=true
    // via workflow env so a fresh Postgres service gets the schema pushed first.
    env: { PAYLOAD_DB_PUSH: process.env.PAYLOAD_DB_PUSH ?? 'false' },
  },
})
