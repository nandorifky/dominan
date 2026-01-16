// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import cloudflare from '@astrojs/cloudflare'; // [1] Import ini

export default defineConfig({
  output: 'static', // Bisa tetap static, adapter akan handle fallback
  adapter: cloudflare(), // [2] Pasang adapter ini
  integrations: [
    tailwind(),
    react(),
    keystatic(),
    markdoc(),
  ],
});