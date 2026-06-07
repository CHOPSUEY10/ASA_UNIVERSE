import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase';

// Helper function to extract filename from Supabase Public URL
function extractFilenameFromUrl(url: string) {
    try {
        const parts = url.split('/');
        return parts[parts.length - 1];
    } catch {
        return null;
    }
}

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
    if (!locals.session || (locals.user?.role !== 'admin' && locals.user?.role !== 'ADMIN')) {
        return json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const productId = Number(params.id);
        const keptImageIds = body.keptImageIds || [];

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

        const product = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                name: body.name,
                slug: body.slug,
                price: body.price,
                stock: body.stock,
                isActive: body.isActive,
                kainId: Number(body.kainId),
                images: {
                    deleteMany: {
                        id: { notIn: keptImageIds }
                    },
                    create: (body.newImagesUrls || []).map((url: string) => ({ url }))
                }
            }
        });

        return json({
            message: "Product berhasil diupdate",
            data: product
        });

    } catch (e) {
        console.error('Failed to update product:', e);
        return json({
            message: 'Gagal memperbarui produk',
        }, { status: 500 });
    }
}

export const DELETE: RequestHandler = async ({ params, locals }) => {
    if (!locals.session || (locals.user?.role !== 'admin' && locals.user?.role !== 'ADMIN')) {
        return json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
        const productId = Number(params.id);

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

        return json({
            message: 'product berhasil dihapus'
        });
    } catch (e) {
        console.error('Failed to delete product:', e);
        return json({
            message: 'Gagal menghapus produk',
        }, { status: 500 });
    }
}