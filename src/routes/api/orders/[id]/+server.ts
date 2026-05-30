import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';




export const PATCH: RequestHandler = async ({ locals, request, params }) => {

    try {

        if (!locals.user) {
            return json({
                message: "User is not logged in"
            });
        }

        const body = await request.json();

        const order = await prisma.order.update({

            where: {

                userId: locals.user.id,
                id: params.id


            },

            data: {

                status: body.status,
                totalPrice: body.totalPrice,

            }

        });

        return json({
            message: "Pesanan berhasil diubah",
            data: order
        })

    } catch (e) {

        console.error(e);
        return json({
            message: 'Failed update order',

        },
            {
                status: 500
            }
        )
    }


}


export const DELETE: RequestHandler = async ({ params, locals }) => {


    if (!locals.user) {
        return json({
            message: "User is not logged in"
        });
    }

    await prisma.order.delete({
        where: {
            id: params.id
        }
    });

    return json({
        message: 'pesanan berhasil dihapus'
    })

}