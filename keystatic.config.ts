// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    
    // ==========================================
    // 1. KOLEKSI AUTHORS (TETAP SAMA)
    // ==========================================
    authors: collection({
      label: 'Authors',
      slugField: 'name',
      path: 'src/content/authors/*',
      format: { data: 'json' },
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
    // 2. UPDATE KOLEKSI: POSTS (ADA TAMBAHAN KATEGORI)
    // ==========================================
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Judul Artikel (H1)' } }),
        parent: fields.relationship({
            label: 'Postingan Induk (Opsional)',
            description: 'Pilih postingan lain untuk menjadikan artikel ini sebagai sub-halaman (URL: /blog/induk/anak)',
            collection: 'posts',
        }),
        
        // --- [BARU] FIELD KATEGORI (DROPDOWN) ---
        // PENTING: Gunakan Select agar konsisten dan tidak typo saat input
        category: fields.select({
            label: 'Kategori',
            description: 'Pilih topik untuk struktur Silo SEO',
            options: [
                { label: 'Insight & Strategi', value: 'Insight' },
                { label: 'SEO News', value: 'SEO News' },
                { label: 'Teknis Website', value: 'Teknis' },
                { label: 'Tutorial', value: 'Tutorial' },
                { label: 'Case Study', value: 'Case Study' },
            ],
            defaultValue: 'Insight',
        }),
        // ----------------------------------------

        author: fields.relationship({
          label: 'Penulis',
          collection: 'authors',
        }),

        publishedDate: fields.date({ label: 'Tanggal Publish', defaultValue: { kind: 'today' } }),
        
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

    // ==========================================
    // 3. PAGES (TETAP SAMA)
    // ==========================================
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
                images: { directory: 'public/images/pages', publicPath: '/images/pages/' },
                tables: true,
            }),
        }
    }),
  },
});