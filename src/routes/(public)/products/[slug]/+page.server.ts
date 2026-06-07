import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, setHeaders }) => {
    setHeaders({
        'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=30'
    });
    const { slug } = params;

    const [product, kerahs, patches, sizes, fonts] = await Promise.all([
        prisma.product.findUnique({
            where: { slug },
            include: {
                images: {
                    orderBy: { createdAt: 'desc' }
                },
                kain: true
            }
        }),
        prisma.kerah.findMany(),
        prisma.patch.findMany(),
        prisma.size.findMany(),
        prisma.font.findMany({
            where: { active: true }
        })
    ]);

    if (!product) {
        throw error(404, 'Product not found');
    }

    const kains = await prisma.kain.findMany({
        where: { quality: product.kain.quality }
    });

    const variants = {
        kerah: kerahs.map(k => ({
            id: k.id,
            name: k.harga > 0 ? `${k.nama} (+Rp ${k.harga.toLocaleString('id-ID')})` : k.nama,
            nama: k.nama,
            harga: k.harga
        })),
        patch: patches.map(p => ({
            id: p.id,
            name: p.harga > 0 ? `${p.nama} (+Rp ${p.harga.toLocaleString('id-ID')})` : p.nama,
            nama: p.nama,
            harga: p.harga
        })),
        size: sizes,
        kain: kains.map(k => ({
            id: k.id,
            name: k.nama
        })),
        font: fonts.map(f => ({
            id: f.id,
            name: f.name,
            previewUrl: f.previewUrl
        }))
    };

    return {
        product,
        variants
    };
};
