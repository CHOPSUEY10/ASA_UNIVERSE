import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const orders = await prisma.order.findMany({
        where: {
            status: {
                not: 'CART' // Don't show cart items to admin, only pending or confirmed
            }
        },
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
    });

    return {
        orders
    };
};
