import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap'; // [Added by CLI]
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://dominan.pages.dev', // [WAJIB DIISI] Ganti dengan domain asli Anda
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    tailwind(),
    react(),
    keystatic(),
    markdoc(),
    sitemap(), // [Added by CLI]
  ],
});