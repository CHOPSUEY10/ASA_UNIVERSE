import { json, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async () => {
    try {
        const patches = [
            { nama: 'Polyflex', harga: 20000 },
            { nama: 'Biasa', harga: 10000 }
        ];

        let results = [];

        for (const patch of patches) {
            const existing = await prisma.patch.findFirst({
                where: { nama: patch.nama }
            });

            if (!existing) {
                const created = await prisma.patch.create({
                    data: patch
                });
                results.push(`Created: ${created.nama}`);
            } else {
                results.push(`Exists: ${existing.nama}`);
            }
        }

        return json({ success: true, results });
    } catch (e: any) {
        return json({ success: false, error: e.message }, { status: 500 });
    }
};
