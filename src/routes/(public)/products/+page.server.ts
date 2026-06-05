import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const search = url.searchParams.get('q') || '';
    const sort = url.searchParams.get('sort') || 'newest';

    const whereClause: any = {
        isActive: true,
    };

    if (search) {
        whereClause.name = {
            contains: search,
            mode: 'insensitive'
        };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'oldest') {
        orderBy = { createdAt: 'asc' };
    }

    const [products, totalItems] = await Promise.all([
        prisma.product.findMany({
            where: whereClause,
            include: {
                images: {
                    take: 1,
                    orderBy: { createdAt: 'desc' }
                }
            },
            skip,
            take: limit,
            orderBy
        }),
        prisma.product.count({ where: whereClause })
    ]);

    const formattedProducts = products.map((p: any) => ({
        ...p,
        image: p.images?.[0]?.url || null
    }));

    return {
        products: formattedProducts,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems
        },
        categories: []
    };
};
