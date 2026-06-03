import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabaseAdmin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
    const { data: buckets, error: bucketError } = await supabaseAdmin.storage.listBuckets();
    if (bucketError) {
        console.error('Error listing buckets:', bucketError);
        return;
    }
    console.log('Buckets:', buckets?.map(b => b.name));

    const { data: patchFiles, error: fileError } = await supabaseAdmin.storage.from('patch').list();
    if (fileError) {
        console.error('Error listing patch files:', fileError);
    } else {
        console.log('Files in root of patch bucket:', patchFiles);
        // let's check some subdirectories if they exist
        for (const file of patchFiles || []) {
            if (!file.metadata) { // it's a folder
                console.log(`Contents of folder ${file.name}:`);
                const { data: subFiles } = await supabaseAdmin.storage.from('patch').list(file.name);
                console.log(subFiles);
            }
        }
    }
}

main();
