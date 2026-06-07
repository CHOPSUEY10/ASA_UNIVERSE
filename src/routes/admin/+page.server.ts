import type { PageServerLoad } from './$types';
import { VisitorService } from '$lib/server/services/visitor.service';

export const load: PageServerLoad = async () => {
    let visitorStats = { total: 0, daily: 0, monthly: 0 };
    try {
        visitorStats = await VisitorService.getVisitorStats();
    } catch (error) {
        console.error('Failed to load visitor stats in admin loader:', error);
    }

    return {
        visitorStats
    };
};
