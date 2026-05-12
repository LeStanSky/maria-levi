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
    // Prevent Payload from running pushDevSchema against the shared Neon DB on every test run.
    // The schema is already current; re-pushing hits "constraint already exists" errors.
    env: { PAYLOAD_DB_PUSH: 'false' },
  },
})
