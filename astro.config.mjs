// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc'; // Pastikan ini ada

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind(),
    react(),
    keystatic(),
    markdoc(), // Pastikan ini ada di daftar
  ],
});