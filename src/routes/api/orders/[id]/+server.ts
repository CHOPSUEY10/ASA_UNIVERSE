import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ locals, request, params }) => {
    if (!locals.session) {
        return json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const orderId = params.id;

        // Ambil data order untuk verifikasi kepemilikan dan status saat ini
        const existingOrder = await prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!existingOrder) {
            return json({ message: 'Order tidak ditemukan' }, { status: 404 });
        }

        const isAdminOrCS = locals.user.role === 'admin' || 
                            locals.user.role === 'ADMIN' || 
                            locals.user.role === 'customer_service' || 
                            locals.user.role === 'CUSTOMER_SERVICE';

        const isOwner = existingOrder.userId === locals.user.id;

        if (!isAdminOrCS && !isOwner) {
            return json({ message: 'Forbidden' }, { status: 403 });
        }

        let updateData: any = {};

        if (isAdminOrCS) {
            // Admin/CS dapat mengubah status dan harga total secara bebas
            if (body.status !== undefined) {
                if (!['CART', 'PENDING', 'CONFIRMED', 'CANCELLED'].includes(body.status)) {
                    return json({ message: 'Status tidak valid' }, { status: 400 });
                }
                updateData.status = body.status;
            }
            if (body.totalPrice !== undefined) {
                updateData.totalPrice = Number(body.totalPrice);
            }
        } else {
            // Pelanggan reguler hanya boleh membatalkan pesanan mereka sendiri
            if (body.status !== 'CANCELLED') {
                return json({ message: 'Pelanggan hanya diperbolehkan membatalkan pesanan' }, { status: 403 });
            }
            if (existingOrder.status !== 'PENDING' && existingOrder.status !== 'CART') {
                return json({ message: 'Pesanan dengan status ini tidak dapat dibatalkan' }, { status: 400 });
            }
            updateData.status = 'CANCELLED';
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: updateData
        });

        return json({
            message: "Pesanan berhasil diubah",
            data: updatedOrder
        });

    } catch (e) {
        console.error('Failed to update order:', e);
        return json({ message: 'Gagal memperbarui pesanan' }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
    if (!locals.session) {
        return json({ message: "Unauthorized" }, { status: 401 });
    }

    // Hanya Admin yang boleh menghapus pesanan secara permanen
    if (locals.user.role !== 'admin' && locals.user.role !== 'ADMIN') {
        return json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
        await prisma.order.delete({
            where: {
                id: params.id
            }
        });

        return json({
            message: 'Pesanan berhasil dihapus'
        });
    } catch (e) {
        console.error('Failed to delete order:', e);
        return json({ message: 'Gagal menghapus pesanan' }, { status: 500 });
    }
};