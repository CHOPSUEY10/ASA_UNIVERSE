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
