import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            images: {
                orderBy: { createdAt: 'desc' }
            },
            kain: true
            // Assuming related data structure for variants if applicable
            // For MVP we can just mock variants or assume standard ones
        }
    });

    if (!product) {
        throw error(404, 'Product not found');
    }

    const [kerahs, patches, sizes, kains, fonts] = await Promise.all([
        prisma.kerah.findMany(),
        prisma.patch.findMany(),
        prisma.size.findMany(),
        prisma.kain.findMany({
            where: { quality: product.kain.quality }
        }),
        prisma.font.findMany({
            where: { active: true }
        })
    ]);

    const variants = {
        kerah: kerahs.map(k => ({ 
            id: k.id, 
            name: k.harga > 0 ? `${k.nama} (+Rp ${k.harga.toLocaleString('id-ID')})` : k.nama,
            nama: k.nama,
            harga: k.harga
        })), 
        patch: patches.map(p => ({ 
            id: p.id, 
            name: p.harga > 0 ? `${p.nama} (+Rp ${p.harga.toLocaleString('id-ID')})` : p.nama,
            nama: p.nama,
            harga: p.harga
        })), 
        size: sizes,
        kain: kains.map(k => ({
            id: k.id,
            name: k.nama
        })),
        font: fonts.map(f => ({
            id: f.id,
            name: f.name,
            previewUrl: f.previewUrl
        }))
    };

    return {
        product,
        variants
    };
};
