import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const supabaseAdmin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const prisma = new PrismaClient();

async function main() {
    // 1. Ensure the bucket is public
    await supabaseAdmin.storage.updateBucket('font', { public: true });

    // 2. Fetch all files from the 'font' bucket
    const { data: files, error } = await supabaseAdmin.storage.from('font').list();
    if (error) {
        console.error("Error fetching files from font bucket:", error);
        return;
    }

    if (!files || files.length === 0) {
        console.log("No files found in the 'font' bucket.");
        return;
    }

    // 3. For each file, create a Font entry in DB
    console.log(`Found ${files.length} files in 'font' bucket.`);
    for (const file of files) {
        if (file.name.startsWith('.')) continue; // skip hidden files
        
        // Remove extension for the name
        const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ').toUpperCase();
        
        const { data: urlData } = supabaseAdmin.storage.from('font').getPublicUrl(file.name);
        
        // Upsert into DB
        const existingFont = await prisma.font.findFirst({ where: { previewUrl: urlData.publicUrl } });
        if (!existingFont) {
            await prisma.font.create({
                data: {
                    name,
                    previewUrl: urlData.publicUrl,
                    active: true
                }
            });
            console.log(`Added font: ${name}`);
        } else {
            console.log(`Font already exists: ${name}`);
        }
    }
}

main().finally(() => prisma.$disconnect());
