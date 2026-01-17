import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://dominan.web.id',
  output: 'static', // KEMBALIKAN KE STATIC (Default Astro 5)
  adapter: cloudflare({
    platformProxy: {
      enabled: true, // Penting buat test KV di local
    },
  }),
  integrations: [
    tailwind(),
    react(),
    keystatic(),
    markdoc(),
    sitemap(),
  ],
});