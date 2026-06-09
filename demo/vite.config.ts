import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  root: resolve(import.meta.dirname),
  plugins: [solid(), tailwindcss()],
  resolve: {
    alias: {
      '@sgreengolf/ui': resolve(import.meta.dirname, '../src'),
    },
  },
});
