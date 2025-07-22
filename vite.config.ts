/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        '**/node_modules/**',
        '**/generated/**', // <- Ignora a pasta onde está o wasm.js do Prisma
        '**/dist/**',
      ],
    },
  },
})
