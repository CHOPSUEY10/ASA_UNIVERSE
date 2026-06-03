import type { RequestHandler } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ params }) => {
    const kerahId = parseInt(params.id);

    if (isNaN(kerahId)) {
        return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    try {
        // Ambil data kerah dari database untuk mendapatkan namanya
        const kerahData = await prisma.kerah.findUnique({
            where: { id: kerahId }
        });

        if (!kerahData) {
            return new Response(JSON.stringify({ error: 'Kerah not found' }), { status: 404 });
        }

        // List semua file di root bucket 'kerah'
        const { data, error } = await supabaseAdmin
            .storage
            .from('kerah')
            .list();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        }

        // Cari file yang namanya mengandung nama kerah (case-insensitive)
        const matchName = kerahData.nama.toLowerCase();
        const matchedFiles = (data || []).filter(file => 
            !file.name.startsWith('.') && 
            file.name.toLowerCase().includes(matchName)
        );

        const images = matchedFiles.map(file => {
            const { data: urlData } = supabaseAdmin
                .storage
                .from('kerah')
                .getPublicUrl(file.name);

            return {
                name: file.name,
                url: urlData?.publicUrl || null
            };
        });

        return new Response(JSON.stringify(images), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
