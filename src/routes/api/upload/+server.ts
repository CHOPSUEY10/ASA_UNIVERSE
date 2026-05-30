import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import fs from 'node:fs';
import path from 'node:path';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return json(
                { message: 'Invalid file upload. Please provide a valid file under key "file".' },
                { status: 400 }
            );
        }

        // Keep file size limited to e.g. 10MB
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            return json(
                { message: 'File is too large. Maximum size is 10MB.' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure static/uploads exists
        const uploadDir = path.resolve('static/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Retain file extension
        const ext = path.extname(file.name) || '.bin';
        const uuid = crypto.randomUUID();
        const filename = `${uuid}${ext}`;
        const filePath = path.join(uploadDir, filename);

        await fs.promises.writeFile(filePath, buffer);

        const fileUrl = `/uploads/${filename}`;

        return json({
            message: 'File uploaded successfully',
            url: fileUrl,
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
