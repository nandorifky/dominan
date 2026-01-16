import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  // WAJIB 'content' KARENA KITA UBAH FORMAT DI KEYSTATIC
  type: 'content', 
  
  schema: z.object({
    title: z.string(),
    publishedDate: z.string().or(z.date()).transform((val) => new Date(val)),
    coverImage: z.string().optional(),
    excerpt: z.string().optional(),
    
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      canonicalUrl: z.string().optional(),
      breadcrumbTitle: z.string().optional(),
      ogImage: z.string().optional(),
      noIndex: z.boolean().default(false),
    }).optional(),

    // CATATAN: Field 'content' DIHAPUS dari sini karena Astro otomatis membacanya sebagai body
  }),
});

const pages = defineCollection({
  // WAJIB 'content'
  type: 'content',
  
  schema: z.object({
    title: z.string(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      noIndex: z.boolean().default(false),
    }).optional(),
  }),
});

export const collections = { posts, pages };