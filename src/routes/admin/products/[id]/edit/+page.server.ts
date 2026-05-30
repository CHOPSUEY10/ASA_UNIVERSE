import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;

    const product = await prisma.product.findUnique({
        where: { id: Number(id) }
    });

    if (!product) {
        throw error(404, 'Product not found');
    }

    return {
        product
    };
};
