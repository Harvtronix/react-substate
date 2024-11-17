import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',

      thresholds: {
        lines: 76,
        branches: 76
      },

      reporter: ['text', 'lcov'],
      reportsDirectory: './.test-coverage',

      all: true,
      include: ['src/main'],
      exclude: ['src/main/**/interfaces.ts']
    }
  }
})
