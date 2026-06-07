import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const where = {
        status: {
            not: 'CART' as const
        }
    };

    const [orders, total] = await Promise.all([
        prisma.order.findMany({
            where,
            skip,
            take: limit,
            include: {
                user: true,
                items: {
                    include: {
                        product: true,
                        kerah: true,
                        patch: true,
                        size: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        }),
        prisma.order.count({ where })
    ]);

    return {
        orders,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};
