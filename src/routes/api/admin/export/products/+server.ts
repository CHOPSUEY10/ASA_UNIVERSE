import { prisma } from '$lib/server/prisma';
import { ExcelService } from '$lib/server/services/excel.service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    try {
        const products = await prisma.product.findMany({
            include: { kain: true },
            orderBy: { createdAt: 'desc' }
        });

        const buffer = await ExcelService.generateProductsExcel(products);

        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="products.xlsx"'
            }
        });
    } catch (error) {
        console.error('Failed to export products:', error);
        return new Response('Failed to generate export file', { status: 500 });
    }
};
