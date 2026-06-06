import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const fonts = await prisma.font.findMany({
        orderBy: { id: 'asc' }
    });

    return {
        fonts
    };
};
