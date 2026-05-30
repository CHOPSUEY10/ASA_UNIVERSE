import { json } from '@sveltejs/kit';
import { VisitorService } from '$lib/server/services/visitor.service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
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
            message: 'Failed to fetch visitor stats'
        }, { status: 500 });
    }
};
