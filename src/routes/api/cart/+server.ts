import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.session) {
        return json({ items: [] });
    }

    try {
        const order = await prisma.order.findFirst({
            where: {
                userId: locals.user.id,
                status: 'CART'
            },
            include: {
                items: {
                    include: {
                        product: {
                            include: { images: true }
                        },
                        kerah: true,
                        patch: true,
                        size: true,
                        kain: true,
                        font: true

                    }
                }
            }
        });

        if (!order) return json({ items: [] });

        const mappedItems = order.items.map(item => ({
            id: item.id, // We use OrderItem ID here
            productId: item.productId,
            name: item.product.name,
            price: item.price,
            quantity: item.quantity,
            image: item.product.images[0]?.url || '',
            variants: {
                designFileUrl: item.designFileUrl,
                kerah: item.kerah.nama,
                patch: item.patch.nama,
                size: item.size.name,
                kain: item.kain?.nama || '',
                fontName: item.font?.name || '',
                fontPreviewUrl: item.font?.previewUrl || '',
                kerahId: item.kerahId,
                patchId: item.patchId,
                sizeId: item.sizeId,
                kainId: item.kainId,
                fontId: item.fontId
            }
        }));

        return json({ items: mappedItems });
    } catch (e) {
        return json({ error: 'Server error', items: [] }, { status: 500 });
    }
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.session) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const itemData = await request.json();

        // Cari order yang statusnya CART
        let order = await prisma.order.findFirst({
            where: { userId: locals.user.id, status: 'CART' }
        });

        // Jika belum ada, buat order baru dengan status CART
        if (!order) {
            order = await prisma.order.create({
                data: {
                    userId: locals.user.id,
                    customerName: locals.user.name || '',
                    email: locals.user.email || '',
                    status: 'CART',
                    totalPrice: 0 
                }
            });
        }

        // Cek apakah item dengan variasi persis sama sudah ada
        const existingItem = await prisma.orderItem.findFirst({
            where: {
                orderId: order.id,
                productId: itemData.productId,
                kerahId: itemData.variants.kerahId,
                patchId: itemData.variants.patchId,
                sizeId: itemData.variants.sizeId,
                kainId: itemData.variants.kainId,
                fontId: itemData.variants.fontId,
                designFileUrl: itemData.variants.designFileUrl
            }
        });

        // Ambil harga asli dari database untuk keamanan dan akurasi (Product, Kerah, Patch)
        const [product, kerah, patch] = await Promise.all([
            prisma.product.findUnique({ where: { id: itemData.productId } }),
            prisma.kerah.findUnique({ where: { id: itemData.variants.kerahId } }),
            prisma.patch.findUnique({ where: { id: itemData.variants.patchId } })
        ]);

        if (!product || !kerah || !patch) {
            return json({ error: 'Produk atau variasi tidak valid' }, { status: 400 });
        }

        const calculatedPricePerItem = product.price + kerah.harga + patch.harga;

        let savedItem;
        if (existingItem) {
            // Update quantity and recalculate price just in case
            savedItem = await prisma.orderItem.update({
                where: { id: existingItem.id },
                data: { 
                    quantity: existingItem.quantity + itemData.quantity,
                    price: calculatedPricePerItem 
                }
            });
        } else {
            // Add new item
            savedItem = await prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: itemData.productId,
                    designFileUrl: itemData.variants.designFileUrl,
                    kerahId: itemData.variants.kerahId,
                    patchId: itemData.variants.patchId,
                    sizeId: itemData.variants.sizeId,
                    kainId: itemData.variants.kainId,
                    fontId: itemData.variants.fontId,
                    quantity: itemData.quantity,
                    price: calculatedPricePerItem
                }
            });
        }

        // Recalculate total price for the CART order
        const allItems = await prisma.orderItem.findMany({
            where: { orderId: order.id },
            select: { price: true, quantity: true }
        });
        const newTotal = allItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        await prisma.order.update({
            where: { id: order.id },
            data: { totalPrice: newTotal }
        });

        return json({ success: true, item: savedItem });
    } catch (e: any) {
        console.error(e);
        return json({ error: 'Failed to add item', message: e.message }, { status: 500 });
    }
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
    if (!locals.session) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const url = new URL(request.url);
        const itemId = url.searchParams.get('id');

        if (!itemId) {
            // Jika tidak ada ID, hapus seluruh cart user
            const order = await prisma.order.findFirst({
                where: { userId: locals.user.id, status: 'CART' }
            });
            if (order) {
                await prisma.orderItem.deleteMany({ where: { orderId: order.id } });
            }
            return json({ success: true });
        }

        // Pastikan item yang dihapus milik user yang bersangkutan
        const orderItem = await prisma.orderItem.findUnique({
            where: { id: itemId },
            include: { order: true }
        });

        if (!orderItem || orderItem.order.userId !== locals.user.id) {
            return json({ error: 'Forbidden' }, { status: 403 });
        }

        await prisma.orderItem.delete({
            where: { id: itemId }
        });

        // Recalculate total price
        const remainingItems = await prisma.orderItem.findMany({
            where: { orderId: orderItem.orderId },
            select: { price: true, quantity: true }
        });
        const newTotal = remainingItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        await prisma.order.update({
            where: { id: orderItem.orderId },
            data: { totalPrice: newTotal }
        });

        return json({ success: true });
    } catch (e) {
        return json({ error: 'Server error' }, { status: 500 });
    }
};
