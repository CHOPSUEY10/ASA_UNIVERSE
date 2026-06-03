import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const orderId = url.searchParams.get('orderId');

    const whereClause: any = {
        designFileUrl: {
            not: null
        }
    };

    if (orderId) {
        whereClause.orderId = orderId;
    }

    const itemsWithDesigns = await prisma.orderItem.findMany({
        where: whereClause,
        include: {
            order: {
                select: {
                    id: true,
                    customerName: true,
                    email: true,
                    createdAt: true,
                    status: true
                }
            },
            product: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return {
        designs: itemsWithDesigns,
        filterOrderId: orderId
    };
};

import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { supabaseAdmin } from '$lib/server/supabase';

export const actions: Actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const itemId = formData.get('itemId') as string;
        const designFileUrl = formData.get('designFileUrl') as string;

        if (!itemId) {
            return fail(400, { error: 'Item ID tidak ditemukan' });
        }

        try {
            // Update database untuk menghapus relasi URL desain
            await prisma.orderItem.update({
                where: { id: itemId },
                data: { designFileUrl: null }
            });

            // Hapus file fisik dari Supabase Storage jika ada URL
            if (designFileUrl) {
                try {
                    const urlParts = designFileUrl.split('/');
                    const filename = urlParts[urlParts.length - 1];
                    
                    if (filename) {
                        const { error } = await supabaseAdmin.storage
                            .from('customer-design')
                            .remove([filename]);
                        
                        if (error) {
                            console.error('Gagal menghapus file dari Supabase:', error);
                        }
                    }
                } catch (e) {
                    console.error('Error saat menghapus file fisik:', e);
                }
            }

            return { success: true, message: 'Desain berhasil dihapus' };
        } catch (error: any) {
            console.error('Gagal menghapus desain:', error);
            return fail(500, { error: 'Gagal menghapus desain dari database' });
        }
    },
    edit: async ({ request }) => {
        const formData = await request.formData();
        const itemId = formData.get('itemId') as string;
        const oldDesignUrl = formData.get('oldDesignUrl') as string;
        const newFile = formData.get('newDesign');

        if (!itemId || !(newFile instanceof File) || newFile.size === 0) {
            return fail(400, { error: 'File desain baru tidak valid' });
        }

        try {
            // Validasi file
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
            if (!allowedTypes.includes(newFile.type)) {
                return fail(400, { error: 'Tipe file tidak didukung' });
            }

            const bytes = await newFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            let ext = '.bin';
            if (newFile.type === 'image/jpeg') ext = '.jpg';
            else if (newFile.type === 'image/png') ext = '.png';
            else if (newFile.type === 'image/webp') ext = '.webp';
            else if (newFile.type === 'application/pdf') ext = '.pdf';

            const filename = `${crypto.randomUUID()}${ext}`;

            // Upload ke Supabase
            const { error: uploadError } = await supabaseAdmin.storage
                .from('customer-design')
                .upload(filename, buffer, {
                    contentType: newFile.type,
                    upsert: false
                });

            if (uploadError) {
                console.error("Supabase Upload Error:", uploadError);
                return fail(500, { error: 'Gagal mengunggah file ke Supabase' });
            }

            const { data: { publicUrl } } = supabaseAdmin.storage
                .from('customer-design')
                .getPublicUrl(filename);

            // Update database
            await prisma.orderItem.update({
                where: { id: itemId },
                data: { designFileUrl: publicUrl }
            });

            // Hapus file lama jika ada
            if (oldDesignUrl) {
                try {
                    const urlParts = oldDesignUrl.split('/');
                    const oldFilename = urlParts[urlParts.length - 1];
                    if (oldFilename) {
                        await supabaseAdmin.storage.from('customer-design').remove([oldFilename]);
                    }
                } catch (e) {
                    console.error('Gagal menghapus file lama:', e);
                }
            }

            return { success: true, message: 'Desain berhasil diubah' };
        } catch (error: any) {
            console.error('Gagal mengubah desain:', error);
            return fail(500, { error: 'Terjadi kesalahan sistem saat mengubah desain' });
        }
    }
};
