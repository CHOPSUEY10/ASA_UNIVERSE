import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;
    const search = url.searchParams.get('q') || '';
    const categoryId = url.searchParams.get('category');

    const whereClause: any = {
        isActive: true,
    };

    if (search) {
        whereClause.name = {
            contains: search,
            mode: 'insensitive'
        };
    }

    if (categoryId) {
        whereClause.categoryId = Number(categoryId);
    }

    const [products, totalItems, categories] = await Promise.all([
        prisma.product.findMany({
            where: whereClause,
            include: {
                images: {
                    take: 1
                }
            },
            skip,
            take: limit,
            orderBy: { id: 'desc' }
        }),
        prisma.product.count({ where: whereClause }),
        prisma.product.findMany({
            select: { categoryId: true },
            distinct: ['categoryId'],
            where: { categoryId: { not: null } }
        }).catch(() => [])
    ]);

    const formattedProducts = products.map((p: any) => ({
        ...p,
        image: p.images?.[0]?.url || null
    }));

    const availableCategories = categories
        .filter((c: any) => c.categoryId !== null)
        .map((c: any) => ({
            id: c.categoryId as number,
            name: `Kategori ${c.categoryId}`
        }));

    return {
        products: formattedProducts,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems
        },
        categories: availableCategories
    };
};
