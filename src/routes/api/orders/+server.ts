import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';



export const GET: RequestHandler = async ({ locals }) => {

    try {
        if (!locals.user) {
            return json({
                message: "User is not logged in"
            });
        }
        const orders = await prisma.order.findMany({

            where: {

                userId: locals.user.id
            }

        })

        return json(orders);
    } catch (error) {

        console.error(error);
        return json({
            message: 'Failed fetch products',

        },
            {
                status: 500
            }
        )

    }




}


export const POST: RequestHandler = async ({ locals, request }) => {

    try {
        if (!locals.user) {
            return json({
                message: "User is not logged in"
            });
        }
        const body = await request.json();
        const user = await prisma.user.findFirst({

            where: {

                id: locals.user.id,

            },

        })

        if (!user) {

            throw new Error('cannot find email')
        }

        const product = await prisma.order.create({
            data: {
                status: body.status,
                customerName: body.customerName,
                totalPrice: body.totalPrice,
                email: user.email,
                userId: user.id
            }
        })

        return json(
            {
                message: "Pesanan berhasil dibuat",
                data: product
            },
            {
                status: 201
            }

        );

    } catch (error) {
        console.error(error);
        return json({
            message: 'Gagal membuat pesanan',

        },
            {
                status: 500
            })
    }
}