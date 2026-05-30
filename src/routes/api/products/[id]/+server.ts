import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';



export const PATCH: RequestHandler = async ({ params, request }) => {

    try {
        const body = await request.json();

        const product = await prisma.product.update({

            where: {

                id: Number(params.id)
            },

            data: {

                name: body.name,
                slug: body.slug,
                price: body.price,
                stock: body.stock,
                isActive: body.isActive,
                kainId: Number(body.kainId),
                images: {
                    deleteMany: {
                        id: { notIn: body.keptImageIds || [] }
                    },
                    create: (body.newImagesUrls || []).map((url: string) => ({ url }))
                }
            }

        });

        return json({
            message: "Product berhasil diupdate",
            data: product
        })

    } catch (e) {

        console.error(e);
        return json({
            message: 'Failed update products',

        },
            {
                status: 500
            }
        )
    }


}


export const DELETE: RequestHandler = async ({ params }) => {

    await prisma.product.delete({
        where: {
            id: Number(params.id)
        }
    });

    return json({
        message: 'product berhasil dihapus'
    })

}