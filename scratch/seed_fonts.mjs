import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const prisma = new PrismaClient();

async function main() {
    await supabaseAdmin.storage.updateBucket('font', { public: true });
    const { data: files } = await supabaseAdmin.storage.from('font').list();
    
    for (const file of files || []) {
        if (file.name.startsWith('.')) continue;
        const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ').toUpperCase();
        const { data: urlData } = supabaseAdmin.storage.from('font').getPublicUrl(file.name);
        
        await prisma.font.create({
            data: { name, previewUrl: urlData.publicUrl, active: true }
        }).catch(e => console.log(e.message));
        console.log("Seeded:", name);
    }
}
main();
