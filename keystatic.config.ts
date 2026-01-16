import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    // ===============================
    // 1. BLOG POSTS (ARTIKEL)
    // ===============================
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      
      // KUNCI UTAMA: Format ini mengaktifkan tampilan 2 Kolom
      format: { contentField: 'content' },
      
      entryLayout: 'content',

      schema: {
        // --- BAGIAN 1: IDENTITAS (Sidebar Kiri/Atas) ---
        title: fields.slug({ name: { label: 'Judul Artikel (H1)' } }),
        publishedDate: fields.date({ label: 'Tanggal Publish', defaultValue: { kind: 'today' } }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        excerpt: fields.text({ 
          label: 'Cuplikan (Excerpt)', 
          multiline: true,
          description: 'Ringkasan untuk preview link & meta description.'
        }),
        
        // --- BAGIAN 2: SIDEBAR KANAN (SEO & Setting) ---
        seo: fields.object({
          metaTitle: fields.text({ label: 'Meta Title (Google)' }),
          metaDescription: fields.text({ label: 'Meta Description (Google)', multiline: true }),
          canonicalUrl: fields.text({ label: 'Canonical URL' }),
          breadcrumbTitle: fields.text({ label: 'Breadcrumb Name' }),
          ogImage: fields.image({
            label: 'OG Image (Share)',
            directory: 'public/images/posts/og',
            publicPath: '/images/posts/og/',
          }),
          noIndex: fields.checkbox({ label: 'Sembunyikan dari Google (NoIndex)' }),
        }, { label: '🔍 Advanced SEO' }),

        // --- BAGIAN 3: EDITOR TENGAH (Full Content) ---
        content: fields.document({
          label: 'Isi Artikel',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts/content',
            publicPath: '/images/posts/content/',
          },
          tables: true,
        }),
      },
    }),

    // ===============================
    // 2. PAGES (HALAMAN ROOT)
    // ===============================
    pages: collection({
      label: 'Halaman (Pages)',
      slugField: 'title',
      path: 'src/content/pages/*',
      
      format: { contentField: 'content' },
      
      entryLayout: 'content',
      
      schema: {
        title: fields.slug({ name: { label: 'Nama Halaman' } }),
        
        seo: fields.object({
          metaTitle: fields.text({ label: 'Meta Title' }),
          metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
          noIndex: fields.checkbox({ label: 'NoIndex' }),
        }, { label: '⚙️ Pengaturan Halaman' }),

        content: fields.document({
          label: 'Isi Halaman',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/pages',
            publicPath: '/images/pages/',
          },
          tables: true,
        }),
      },
    }),
  },
});