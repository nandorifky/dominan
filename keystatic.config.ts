// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' }, // Ingat peringatan saya sebelumnya soal Cloudflare, ganti ke 'github' nanti
  collections: {
    
    // ==========================================
    // 1. BUAT KOLEKSI BARU: AUTHORS
    // ==========================================
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      format: { data: 'json' }, // Kita simpan sebagai JSON saja karena datanya simple
      schema: {
        name: fields.slug({ name: { label: 'Nama Lengkap' } }),
        role: fields.text({ label: 'Profesi / Role' }),
        bio: fields.text({ label: 'Bio Singkat', multiline: true }),
        avatar: fields.image({
          label: 'Foto Profil',
          directory: 'public/images/authors',
          publicPath: '/images/authors/',
        }),
        social: fields.object({
          instagram: fields.text({ label: 'Instagram URL' }),
          linkedin: fields.text({ label: 'LinkedIn URL' }),
          facebook: fields.text({ label: 'Facebook URL' }),
          website: fields.text({ label: 'Personal Website' }),
        }, { label: 'Social Media' }),
      },
    }),

    // ==========================================
    // 2. UPDATE KOLEKSI: POSTS
    // ==========================================
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Judul Artikel (H1)' } }),
        
        // --- TAMBAHKAN FIELD INI ---
        author: fields.relationship({
          label: 'Penulis',
          collection: 'authors', // Mengambil data dari koleksi authors di atas
        }),
        // ---------------------------

        publishedDate: fields.date({ label: 'Tanggal Publish', defaultValue: { kind: 'today' } }),
        // ... sisa config lama Anda (coverImage, seo, content, dll)
        coverImage: fields.image({
            label: 'Cover Image',
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
        }),
        excerpt: fields.text({ label: 'Cuplikan', multiline: true }),
        seo: fields.object({
             metaTitle: fields.text({ label: 'Meta Title' }),
             metaDescription: fields.text({ label: 'Meta Description', multiline: true }),
             canonicalUrl: fields.text({ label: 'Canonical URL' }),
             breadcrumbTitle: fields.text({ label: 'Breadcrumb Name' }),
             ogImage: fields.image({ label: 'OG Image', directory: 'public/images/posts/og', publicPath: '/images/posts/og/' }),
             noIndex: fields.checkbox({ label: 'NoIndex' }),
             customSchema: fields.text({ label: 'Custom JSON-LD', multiline: true }),
        }, { label: '🔍 Advanced SEO' }),
        content: fields.document({
            label: 'Isi Artikel',
            formatting: true,
            dividers: true,
            links: true,
            images: { directory: 'public/images/posts/content', publicPath: '/images/posts/content/' },
            tables: true,
        }),
      },
    }),

    pages: collection({
        // ... config pages lama Anda biarkan saja
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
                images: { directory: 'public/images/pages', publicPath: '/images/pages/' },
                tables: true,
            }),
        }
    }),
  },
});