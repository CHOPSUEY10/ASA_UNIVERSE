import { json } from '@sveltejs/kit';
import { VisitorService } from '$lib/server/services/visitor.service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.session || (locals.user?.role !== 'admin' && locals.user?.role !== 'ADMIN')) {
        return json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    try {
        const stats = await VisitorService.getVisitorStats();
        return json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Failed to fetch visitor stats:', error);
        return json({
            success: false,
            message: 'Gagal mengambil data statistik pengunjung'
        }, { status: 500 });
    }
};
