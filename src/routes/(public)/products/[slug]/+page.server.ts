import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            images: true,
            // Assuming related data structure for variants if applicable
            // For MVP we can just mock variants or assume standard ones
        }
    });

    if (!product) {
        throw error(404, 'Product not found');
    }

    const [colors, kerahs, patches, sizes] = await Promise.all([
        prisma.color.findMany(),
        prisma.kerah.findMany(),
        prisma.patch.findMany(),
        prisma.size.findMany()
    ]);

    const variants = {
        color: colors,
        kerah: kerahs.map(k => ({ 
            id: k.id, 
            name: k.harga > 0 ? `${k.nama} (+Rp ${k.harga.toLocaleString('id-ID')})` : k.nama 
        })), 
        patch: patches.map(p => ({ 
            id: p.id, 
            name: p.harga > 0 ? `${p.nama} (+Rp ${p.harga.toLocaleString('id-ID')})` : p.nama 
        })), 
        size: sizes
    };

    return {
        product,
        variants
    };
};
