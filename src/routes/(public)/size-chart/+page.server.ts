import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
    setHeaders({
        'cache-control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=60'
    });
    const sizes = await prisma.size.findMany({
        orderBy: { width: 'asc' }
    });

    return {
        sizes
    };
};
