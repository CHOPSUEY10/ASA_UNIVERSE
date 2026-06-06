import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const sizes = await prisma.size.findMany({
        orderBy: { width: 'asc' }
    });

    return {
        sizes
    };
};
