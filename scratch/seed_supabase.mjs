import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
    console.log("Making font bucket public...");
    await supabase.storage.updateBucket('font', { public: true });
    
    console.log("Fetching files from font bucket...");
    const { data: files, error } = await supabase.storage.from('font').list();
    if (error) {
        console.error("Error fetching files:", error);
        return;
    }
    
    if (!files || files.length === 0) {
        console.log("No fonts found in bucket!");
        return;
    }
    
    console.log(`Found ${files.length} files. Inserting to database...`);
    
    for (const file of files) {
        if (file.name.startsWith('.')) continue;
        const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ').toUpperCase();
        const { data: urlData } = supabase.storage.from('font').getPublicUrl(file.name);
        
        console.log(`Inserting: ${name}`);
        // Insert into Font table via Supabase client directly
        const { error: insertError } = await supabase
            .from('Font')
            .upsert({
                name: name,
                previewUrl: urlData.publicUrl,
                active: true,
                updatedAt: new Date().toISOString()
            }, { onConflict: 'id' }); // Actually Prisma generated tables don't always work perfectly with Supabase upsert unless we know the conflict key. 
            // Prisma tables are usually lowercase? Wait, Prisma `model Font` -> the table is `Font`. 
        
        if (insertError) {
             console.log(`Error inserting ${name} into Font table (Trying lowercase 'font'):`, insertError.message);
             const { error: insertError2 } = await supabase.from('font').insert({
                name: name,
                previewUrl: urlData.publicUrl,
                active: true,
                updatedAt: new Date().toISOString()
             });
             if (insertError2) {
                 console.log("Error inserting to 'font':", insertError2.message);
             } else {
                 console.log("Success (lowercase)!");
             }
        } else {
            console.log("Success!");
        }
    }
    console.log("Seeding complete!");
}

main();
