import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  resolve: {
    alias: {
      '@sgreengolf/ui': resolve(import.meta.dirname, '../src'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
