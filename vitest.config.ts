import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: '/resume/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    restoreMocks: true,
  },
  server: {
    port: 5173,
    open: true,
  },
})
