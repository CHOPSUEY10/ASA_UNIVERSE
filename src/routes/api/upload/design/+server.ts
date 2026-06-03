import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/server/supabase';

export const POST: RequestHandler = async ({ request, locals }) => {
    try {
        if (!locals.session) {
            return json({ message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return json(
                { message: 'Invalid file upload. Please provide a valid file under key "file".' },
                { status: 400 }
            );
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return json(
                { message: 'File is too large. Maximum size is 10MB.' },
                { status: 400 }
            );
        }

        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
        const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        
        if (!allowedExtensions.includes(ext)) {
            return json(
                { message: 'Unsupported file format. Please upload JPG, PNG, or PDF.' },
                { status: 400 }
            );
        }

        const uuid = crypto.randomUUID();
        const filename = `${uuid}${ext}`;

        // Upload to Supabase Storage bucket 'customer-design'
        const { data, error } = await supabaseAdmin
            .storage
            .from('customer-design')
            .upload(filename, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return json({ message: 'Failed to upload to storage', error: error.message }, { status: 500 });
        }

        // Get public URL
        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from('customer-design')
            .getPublicUrl(filename);

        return json({
            message: 'File uploaded successfully',
            url: publicUrl,
            filename: filename,
            originalName: file.name
        }, { status: 201 });

    } catch (error) {
        console.error('Error during file upload:', error);
        return json(
            {
                message: 'Failed to upload file',
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
};
