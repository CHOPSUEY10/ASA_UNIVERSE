import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const products = await prisma.product.findMany({
        where: {
            isActive: true,
            isFeatured: true
        },
        include: {
            images: {
                take: 1,
                orderBy: { createdAt: 'desc' }
            }
        },
        take: 4,
        orderBy: { id: 'desc' }
    });

    const featuredProducts = products.map((p: any) => ({
        ...p,
        image: p.images?.[0]?.url || null
    }));

    return {
        featuredProducts
    };
};
