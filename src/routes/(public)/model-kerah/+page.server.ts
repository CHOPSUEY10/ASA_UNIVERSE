import { prisma } from '$lib/server/db/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const kerahs = await prisma.kerah.findMany({
        orderBy: { id: 'asc' }
    });

    return {
        kerahs
    };
};
