import { prisma } from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url }) => {
    const q = url.searchParams.get('q') || '';
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const where = q ? {
        OR: [
            { name: { contains: q, mode: 'insensitive' as const } },
            { slug: { contains: q, mode: 'insensitive' as const } }
        ]
    } : {};

    const [products, total, kains] = await Promise.all([
        prisma.product.findMany({
            where,
            skip,
            take: limit,
            orderBy: { id: 'desc' },
            include: { kain: true, images: true }
        }),
        prisma.product.count({ where }),
        prisma.kain.findMany({ orderBy: { nama: 'asc' } })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
        products,
        kains,
        pagination: {
            page,
            limit,
            total,
            totalPages
        },
        q
    };
};

import { supabaseAdmin } from '$lib/server/supabase';

async function processNewImages(formData: FormData) {
    const newFiles = formData.getAll('newImages');
    const urls: string[] = [];

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    for (const file of newFiles) {
        if (file instanceof File && file.size > 0) {
            // Validasi Tipe File
            if (!allowedTypes.includes(file.type)) {
                throw new Error(`Tipe file ${file.type} tidak didukung. Hanya JPG, PNG, dan WEBP yang diizinkan.`);
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Gunakan ekstensi berdasarkan tipe MIME agar lebih aman daripada nama file asli
            let ext = '.bin';
            if (file.type === 'image/jpeg') ext = '.jpg';
            else if (file.type === 'image/png') ext = '.png';
            else if (file.type === 'image/webp') ext = '.webp';

            const filename = `${crypto.randomUUID()}${ext}`;
            
            // Upload ke Supabase Storage
            const { error } = await supabaseAdmin.storage
                .from('products')
                .upload(filename, buffer, {
                    contentType: file.type,
                    upsert: false
                });

            if (error) {
                console.error("Supabase Upload Error:", error);
                throw new Error(`Gagal mengunggah gambar: ${error.message}`);
            }

            // Dapatkan Public URL
            const { data: { publicUrl } } = supabaseAdmin.storage
                .from('products')
                .getPublicUrl(filename);

            urls.push(publicUrl);
        }
    }
    return urls;
}

function extractFilenameFromUrl(url: string) {
    try {
        const parts = url.split('/');
        return parts[parts.length - 1];
    } catch {
        return null;
    }
}

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        
        try {
            const images = await processNewImages(formData);
            const price = Number(data.price);
            const stock = Number(data.stock);
            const kainId = Number(data.kainId);
            const name = String(data.name);
            const slug = String(data.slug);
            const description = String(data.description);
            const isFeatured = data.isFeatured === 'true';

            await prisma.product.create({
                data: {
                    name,
                    slug,
                    description,
                    price,
                    stock,
                    isFeatured,
                    isActive: true,
                    kainId,
                    images: {
                        create: images.map((url: string) => ({ url }))
                    }
                }
            });

            return { success: true, message: 'Produk berhasil dibuat' };
        } catch (error: any) {
            console.error('Error creating product in action:', error);
            return fail(500, { error: error.message || 'Gagal membuat produk' });
        }
    },
    update: async ({ request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        
        try {
            const productId = Number(data.id);
            if (!productId) return fail(400, { error: 'ID tidak valid' });

            const newImagesUrls = await processNewImages(formData);
            const keptImageIds = formData.getAll('keptImages').map(id => Number(id));

            // 1. Dapatkan gambar yang akan dihapus dari database
            const imagesToDelete = await prisma.productImage.findMany({
                where: {
                    productId: productId,
                    id: { notIn: keptImageIds }
                }
            });

            // 2. Hapus file fisik dari Supabase Storage
            if (imagesToDelete.length > 0) {
                const filenames = imagesToDelete
                    .map(img => extractFilenameFromUrl(img.url))
                    .filter(Boolean) as string[];

                if (filenames.length > 0) {
                    const { error } = await supabaseAdmin.storage
                        .from('products')
                        .remove(filenames);
                    
                    if (error) {
                        console.error("Gagal menghapus gambar dari Supabase:", error);
                    }
                }
            }

            await prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    name: String(data.name),
                    slug: String(data.slug),
                    price: Number(data.price),
                    stock: Number(data.stock),
                    isActive: data.isActive === 'true',
                    kainId: Number(data.kainId),
                    images: {
                        deleteMany: {
                            id: { notIn: keptImageIds }
                        },
                        create: newImagesUrls.map((url: string) => ({ url }))
                    }
                }
            });

            return { success: true, message: 'Produk berhasil diperbarui' };
        } catch (error: any) {
            console.error('Error updating product in action:', error);
            return fail(500, { error: error.message || 'Gagal memperbarui produk' });
        }
    },
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id) return fail(400, { error: 'ID tidak valid' });
        const productId = Number(id);

        try {
            // 1. Dapatkan semua gambar produk ini
            const imagesToDelete = await prisma.productImage.findMany({
                where: { productId }
            });

            // 2. Hapus file fisik dari Supabase Storage
            if (imagesToDelete.length > 0) {
                const filenames = imagesToDelete
                    .map(img => extractFilenameFromUrl(img.url))
                    .filter(Boolean) as string[];

                if (filenames.length > 0) {
                    const { error } = await supabaseAdmin.storage
                        .from('products')
                        .remove(filenames);
                    
                    if (error) {
                        console.error("Gagal menghapus gambar dari Supabase:", error);
                    }
                }
            }

            // 3. Hapus produk dari database (cascade delete akan menghapus baris ProductImage otomatis)
            await prisma.product.delete({
                where: {
                    id: productId
                }
            });

            return { success: true, message: 'Produk berhasil dihapus' };
        } catch (error: any) {
            console.error('Error deleting product in action:', error);
            return fail(500, { error: error.message || 'Gagal menghapus produk' });
        }
    }
};
