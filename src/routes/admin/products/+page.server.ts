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

import fs from 'node:fs';
import path from 'node:path';

async function processNewImages(formData: FormData) {
    const newFiles = formData.getAll('newImages');
    const urls: string[] = [];
    const uploadDir = path.resolve('static/uploads');
    
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

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
            const filePath = path.join(uploadDir, filename);
            await fs.promises.writeFile(filePath, buffer);
            urls.push(`/uploads/${filename}`);
        }
    }
    return urls;
}

export const actions: Actions = {
    create: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        
        const images = await processNewImages(formData);

        const payload = {
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            kainId: Number(data.kainId),
            isActive: data.isActive === 'true',
            isFeatured: data.isFeatured === 'true',
            images
        };

        const res = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return fail(res.status, { error: err.message || 'Gagal membuat produk' });
        }
        return { success: true, message: 'Produk berhasil dibuat' };
    },
    update: async ({ request, fetch }) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        
        const newImagesUrls = await processNewImages(formData);
        const keptImageIds = formData.getAll('keptImages').map(id => Number(id));

        const payload = {
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            kainId: Number(data.kainId),
            isActive: data.isActive === 'true',
            isFeatured: data.isFeatured === 'true',
            newImagesUrls,
            keptImageIds
        };

        const res = await fetch(`/api/products/${data.id}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return fail(res.status, { error: err.message || 'Gagal memperbarui produk' });
        }
        return { success: true, message: 'Produk berhasil diperbarui' };
    },
    delete: async ({ request, fetch }) => {
        const formData = await request.formData();
        const id = formData.get('id');

        if (!id) return fail(400, { error: 'ID tidak valid' });

        const res = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            return fail(res.status, { error: err.message || 'Gagal menghapus produk' });
        }
        return { success: true, message: 'Produk berhasil dihapus' };
    }
};
