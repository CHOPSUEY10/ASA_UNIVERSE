import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { supabaseAdmin } from '$lib/server/supabase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
    try {
        await supabaseAdmin.storage.updateBucket('font', { public: true });
        
        const { data: files, error } = await supabaseAdmin.storage.from('font').list();
        if (error) throw error;
        
        const results = [];
        for (const file of files || []) {
            if (file.name.startsWith('.')) continue;
            const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ').toUpperCase();
            const { data: urlData } = supabaseAdmin.storage.from('font').getPublicUrl(file.name);
            
            const existingFont = await prisma.font.findFirst({ where: { previewUrl: urlData.publicUrl } });
            if (!existingFont) {
                const newFont = await prisma.font.create({
                    data: { name, previewUrl: urlData.publicUrl, active: true }
                });
                results.push(`Added: ${newFont.name}`);
            } else {
                results.push(`Exists: ${existingFont.name}`);
            }
        }
        return json({ success: true, results });
    } catch (e: any) {
        return json({ success: false, error: e.message }, { status: 500 });
    }
};
