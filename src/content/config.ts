import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  // WAJIB 'data' KARENA KITA PAKAI JSON
  type: 'data', 
  
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

    // Content tidak perlu didefinisikan di Zod untuk JSON Keystatic
  }),
});

export const collections = { posts };