import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const patches = await prisma.patch.findMany({
        orderBy: { id: 'asc' }
    });

    return {
        patches
    };
};
