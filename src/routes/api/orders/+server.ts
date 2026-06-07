import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.session) {
        return json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: locals.user.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return json(orders);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return json({ message: 'Gagal mengambil data pesanan' }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ locals, request }) => {
    if (!locals.session) {
        return json({ message: "Unauthorized" }, { status: 401 });
    }

    // Hanya Admin dan Customer Service yang boleh membuat order manual secara langsung
    if (locals.user.role !== 'admin' && locals.user.role !== 'ADMIN' && locals.user.role !== 'customer_service' && locals.user.role !== 'CUSTOMER_SERVICE') {
        return json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        const body = await request.json();
        
        const { status, customerName, totalPrice } = body;

        if (!status || !['PENDING', 'CONFIRMED', 'CANCELLED'].includes(status)) {
            return json({ message: 'Status pesanan tidak valid' }, { status: 400 });
        }

        const newOrder = await prisma.order.create({
            data: {
                status,
                customerName: customerName || '',
                totalPrice: Number(totalPrice) || 0,
                email: locals.user.email,
                userId: locals.user.id
            }
        });

        return json(
            {
                message: "Pesanan berhasil dibuat",
                data: newOrder
            },
            {
                status: 201
            }
        );

    } catch (error) {
        console.error('Failed to create order manually:', error);
        return json({ message: 'Gagal membuat pesanan' }, { status: 500 });
    }
};