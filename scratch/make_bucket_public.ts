import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseAdmin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    console.log("Buckets:", buckets?.map(b => b.name));

    const { data, error } = await supabaseAdmin.storage.updateBucket('kerah', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });
    console.log("Update Kerah Bucket:", data, error);

    const { data: files } = await supabaseAdmin.storage.from('kerah').list();
    console.log("Files in Kerah:", files);
}

main();
