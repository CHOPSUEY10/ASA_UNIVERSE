import { prisma } from '$lib/server/db/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const fonts = await prisma.font.findMany({
        orderBy: { id: 'asc' }
    });

    return {
        fonts
    };
};
