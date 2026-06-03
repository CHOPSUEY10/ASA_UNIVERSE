import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseAdmin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
    const { data: urlData } = supabaseAdmin.storage.from('patch').getPublicUrl('logo 3d tpu.png');
    console.log("URL:", urlData?.publicUrl);
    
    // Also try fetch the API
    const matchName = "3d tpu";
    const { data } = await supabaseAdmin.storage.from('patch').list();
    const matchedFiles = (data || []).filter(file => 
        !file.name.startsWith('.') && 
        file.name.toLowerCase().includes(matchName)
    );
    console.log("Matched files:", matchedFiles);
}

main();
