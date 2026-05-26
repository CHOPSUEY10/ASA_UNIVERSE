import {json} from '@sveltejs/kit';
import {prisma} from '$lib/server/prisma';

export async function PATCH({ params, request}){

    try{
        const body = await request.json();

        const product = await prisma.product.update({

            where : {

                id : params.id
            },

            data : {

                name : body.name, 
                slug: body.slug, 
                price : body.price,
                stock : body.stock,
                isfeatured : body.isFeatured,
                isActive : body.isActive,

                categoryId : body.categoryId

            }

        });

        return json({
            message : "Product berhasil diupdate",
            data : product
        })

    }catch(e){

        console.error(e);
        return json({
            message : 'Failed fetch products',
            
            },
            {
                status : 500
            }
        )}


}


export async function DELETE({ params }){

    await prisma.product.delete({
        where : {
            id : params.id
        }
    });

    return json({
        message : 'product berhasil dihapus'
    })

}