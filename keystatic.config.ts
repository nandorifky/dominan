import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      
      // SETTING PENTING AGAR JADI JSON & EDITOR LEGA
      format: 'json', 
      entryLayout: 'content',

      schema: {
        title: fields.slug({ name: { label: 'Judul Artikel' } }),
        publishedDate: fields.date({ label: 'Tanggal Publish', defaultValue: { kind: 'today' } }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        excerpt: fields.text({ 
          label: 'Cuplikan (Meta Desc)', 
          multiline: true 
        }),
        
        // SEO SECTION
        seo: fields.object({
          metaTitle: fields.text({ label: 'Custom Meta Title' }),
          metaDescription: fields.text({ label: 'Custom Meta Description', multiline: true }),
          canonicalUrl: fields.text({ label: 'Canonical URL' }),
          breadcrumbTitle: fields.text({ label: 'Breadcrumb Name' }),
          ogImage: fields.image({
            label: 'OG Image (Share)',
            directory: 'public/images/posts/og',
            publicPath: '/images/posts/og/',
          }),
          noIndex: fields.checkbox({ label: 'NoIndex' }),
        }, { label: 'Pengaturan SEO (Opsional)' }),

        // CONTENT FIELD
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
  },
});