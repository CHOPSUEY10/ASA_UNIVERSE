import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const contactInfo = await prisma.contactInformation.findFirst();

        if (!contactInfo) {
            return json({
                whatsapp: '',
                instagram: null,
                tiktok: null,
                address: null,
                googleMapsUrl: null
            });
        }

        return json(contactInfo);
    } catch (error) {
        console.error('Error fetching contact information:', error);
        return json(
            {
                message: 'Gagal mengambil informasi kontak'
            },
            { status: 500 }
        );
    }
};

export const POST: RequestHandler = async ({ request, locals }) => {
    if (!locals.session || (locals.user?.role !== 'admin' && locals.user?.role !== 'ADMIN')) {
        return json({ message: 'Forbidden' }, { status: 403 });
    }
    try {
        const body = await request.json();
        const { whatsapp, instagram, tiktok, address, googleMapsUrl } = body;

        if (whatsapp === undefined || whatsapp === null || typeof whatsapp !== 'string') {
            return json(
                { message: 'WhatsApp number is required and must be a string.' },
                { status: 400 }
            );
        }

        const existing = await prisma.contactInformation.findFirst();

        let contactInfo;
        if (existing) {
            contactInfo = await prisma.contactInformation.update({
                where: {
                    id: existing.id
                },
                data: {
                    whatsapp,
                    instagram: instagram !== undefined ? instagram : existing.instagram,
                    tiktok: tiktok !== undefined ? tiktok : existing.tiktok,
                    address: address !== undefined ? address : existing.address,
                    googleMapsUrl: googleMapsUrl !== undefined ? googleMapsUrl : existing.googleMapsUrl
                }
            });
        } else {
            contactInfo = await prisma.contactInformation.create({
                data: {
                    whatsapp,
                    instagram: instagram || null,
                    tiktok: tiktok || null,
                    address: address || null,
                    googleMapsUrl: googleMapsUrl || null
                }
            });
        }

        return json(
            {
                message: existing ? 'Contact information updated successfully' : 'Contact information created successfully',
                data: contactInfo
            },
            { status: existing ? 200 : 201 }
        );

    } catch (error) {
        console.error('Error updating contact information:', error);
        return json(
            {
                message: 'Gagal menyimpan informasi kontak'
            },
            { status: 500 }
        );
    }
};

// Also support PUT and PATCH by referencing the same handler to make it developer-friendly!
export const PUT = POST;
export const PATCH = POST;
