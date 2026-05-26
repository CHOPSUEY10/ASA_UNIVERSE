import {json} from '@sveltejs/kit';
import {prisma} from '$lib/server/prisma';


export async function GET({params}) {

    try { 
        const products = await prisma.order.findUnique({

            where : {
                id : params.id
            }

        })

        return json(products);
    }catch(error){

        console.error(error);
        return json({
            message : 'Failed fetch products',
            
        },
        {
            status : 500
        }
    )

    }




}


export async function POST ({locals,request,params}) {

    try{
        const body = await request.json();
        const user  = await prisma.user.findFirst({

            where  : {

                id : params.id,
                email : locals.user.email
            },

        }) 

        if(!user) {

            throw new Error('cannot find email')
        }

        const product = await prisma.order.create({
            data : { 
                status : body.status, 
                customerName : body.customerName,
                totalPrice : body.totalPrice, 
                email : user.email,
                userId : user.id
            }
        })

        return json(
            {
                message : "Pesanan berhasil dibuat",
                data : product 
            },
            {
                status : 201
            }

        );

    }catch(error){
        console.error(error);
        return json({
            message : 'Gagal membuat pesanan',
            
        },
        {
            status : 500
        })
    }
}

export async function PATCH({ locals, request,params}){

    try{
        const body = await request.json();

        const order = await prisma.order.update({

            where : {

                userId : locals.user.id,
                id : params.id


            },

            data : {

                status : body.status, 
                totalPrice : body.totalPrice, 
                                
            }

        });

        return json({
            message : "Pesanan berhasil diubah",
            data : order
        })

    }catch(e){

        console.error(e);
        return json({
            message : 'Failed update order',
            
            },
            {
                status : 500
            }
        )}


}


export async function DELETE({ params }){

    await prisma.order.delete({
        where : {
            id : params.id
        }
    });

    return json({
        message : 'pesanan berhasil dihapus'
    })

}