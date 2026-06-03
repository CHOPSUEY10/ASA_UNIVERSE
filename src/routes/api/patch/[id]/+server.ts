import type { RequestHandler } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase';

export const GET: RequestHandler = async ({ params }) => {
    const patchId = params.id;

    try {
        // List files dalam folder patch/<patchId>
        const { data, error } = await supabaseAdmin
            .storage
            .from('patch')
            .list(patchId);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Ambil URL public untuk setiap file
        const images = (data || [])
            .filter(file => !file.name.startsWith('.'))
            .map(file => {
                const { data: urlData } = supabaseAdmin
                    .storage
                    .from('patch')
                    .getPublicUrl(`${patchId}/${file.name}`);

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
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
