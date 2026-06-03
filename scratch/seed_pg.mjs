import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
    console.log("Fetching files from font bucket...");
    const { data: files } = await supabase.storage.from('font').list();
    if (!files) return;

    // Connect to PG directly
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    
    console.log(`Found ${files.length} files. Inserting...`);
    
    for (const file of files) {
        if (file.name.startsWith('.')) continue;
        const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ').toUpperCase();
        const { data: urlData } = supabase.storage.from('font').getPublicUrl(file.name);
        
        try {
            await client.query(
                `INSERT INTO "Font" ("name", "previewUrl", "active", "updatedAt") 
                 VALUES ($1, $2, $3, $4)
                 ON CONFLICT DO NOTHING`,
                [name, urlData.publicUrl, true, new Date().toISOString()]
            );
            console.log(`Inserted: ${name}`);
        } catch(e) {
            console.log(`Error inserting ${name}:`, e.message);
        }
    }
    
    await client.end();
    console.log("Done!");
}

main();
