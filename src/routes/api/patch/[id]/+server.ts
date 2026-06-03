import type { RequestHandler } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ params }) => {
    const patchId = parseInt(params.id);

    if (isNaN(patchId)) {
        return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
    }

    try {
        // Ambil data patch dari database untuk mendapatkan namanya
        const patchData = await prisma.patch.findUnique({
            where: { id: patchId }
        });

        if (!patchData) {
            return new Response(JSON.stringify({ error: 'Patch not found' }), { status: 404 });
        }

        // List semua file di root bucket 'patch'
        const { data, error } = await supabaseAdmin
            .storage
            .from('patch')
            .list();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 400 });
        }

        // Cari file yang namanya mengandung nama patch (case-insensitive)
        const matchName = patchData.nama.toLowerCase();
        const matchedFiles = (data || []).filter(file => 
            !file.name.startsWith('.') && 
            file.name.toLowerCase().includes(matchName)
        );

        const images = matchedFiles.map(file => {
            const { data: urlData } = supabaseAdmin
                .storage
                .from('patch')
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
