import type { APIRoute } from 'astro';

export const prerender = false; // API harus jalan di server

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { slug, rating } = await request.json();
    
    // Akses KV Cloudflare
    const KV = locals.runtime.env.RATINGS;
    
    // Ambil data lama
    const currentData = await KV.get(slug, { type: 'json' }) || { total: 0, count: 0 };
    
    // Update data
    const newData = {
      total: currentData.total + rating,
      count: currentData.count + 1
    };
    
    // Simpan balik ke KV
    await KV.put(slug, JSON.stringify(newData));

    return new Response(JSON.stringify({ success: true, ...newData }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};