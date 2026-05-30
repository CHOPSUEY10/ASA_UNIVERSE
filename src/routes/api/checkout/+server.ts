import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    // 1. Pastikan user sudah login
    if (!locals.session) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { items, total } = body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return json({ error: 'Cart is empty' }, { status: 400 });
        }

        const userId = locals.user.id;

        const order = await prisma.order.findFirst({
            where: { userId, status: 'CART' },
            include: { items: true }
        });

        if (!order || order.items.length === 0) {
            return json({ error: 'Keranjang kosong.' }, { status: 400 });
        }

        // Calculate total accurately on the server
        const calculatedTotal = order.items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

        // Update the order status to PENDING and set accurate total
        const updatedOrder = await prisma.order.update({
            where: { id: order.id },
            data: {
                status: 'PENDING',
                totalPrice: calculatedTotal
            }
        });

        // Stok akan dikurangi saat Admin mengubah status menjadi CONFIRMED.

        return json({ success: true, orderId: updatedOrder.id });

    } catch (error: any) {
        console.error('Checkout error:', error);
        return json({ error: 'Internal server error', details: error.message }, { status: 500 });
    }
};
