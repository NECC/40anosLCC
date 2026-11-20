import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {},
  resolve: {
    // Vitest can't parse tsconfig without using Vite.
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
