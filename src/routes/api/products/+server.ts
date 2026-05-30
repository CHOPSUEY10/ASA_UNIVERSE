import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';


export const GET: RequestHandler = async () => {

    try {
        const products = await prisma.product.findMany({

            orderBy: {
                id: "asc"
            }

        })

        return json(products);
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


export const POST: RequestHandler = async ({ request }) => {

    try {
        const body = await request.json();
        const product = await prisma.product.create({
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
                price: body.price,
                stock: body.stock,
                isFeatured: body.isfeatured ?? false,
                isActive: true,
                categoryId: body.categoryId
            }
        })

        return json(
            {
                message: "Product berhasil dibuat",
                data: product
            },
            {
                status: 201
            }

        );

    } catch (error) {
        console.error(error);
        return json({
            message: 'Failed create products',

        },
            {
                status: 500
            })
    }
}

