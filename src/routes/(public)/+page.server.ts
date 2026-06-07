import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
    setHeaders({
        'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=30'
    });
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
