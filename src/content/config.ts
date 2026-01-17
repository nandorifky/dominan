// src/content/config.ts
import { defineCollection, reference, z } from 'astro:content'; // Import reference
export const SITE_CONFIG = {
  // Format nomor: Kode negara tanpa +, contoh: 6281234567890
  whatsappNumber: "6281234567890", 
  
  // Pesan default jika link WA langsung (bukan dari form)
  defaultMessage: "Halo Dominan Web, saya mau konsultasi jasa digital marketing."
};
const authors = defineCollection({
  type: 'data', // Karena kita set format: 'json' di Keystatic
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    social: z.object({
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      facebook: z.string().optional(),
      website: z.string().optional(),
    }).optional(),
  }),
});

const posts = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    
    // --- TAMBAHKAN VALIDASI RELASI ---
    author: reference('authors').optional(), // Merujuk ke koleksi 'authors'
    parent: reference('posts').optional(),
    // ---------------------------------
    // Wajib diisi agar tidak error saat build
    category: z.string().default('Uncategorized'), 
    // =====================

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
      customSchema: z.string().optional(), 
    }).optional(),
  }),
});

const pages = defineCollection({
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

// Export authors juga
export const collections = { posts, pages, authors };