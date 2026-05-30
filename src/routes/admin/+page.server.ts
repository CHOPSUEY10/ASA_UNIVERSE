import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    // Fetch visitor stats via abstraction API
    const res = await fetch('/api/visitor');
    let visitorStats = { total: 0, daily: 0, monthly: 0 };
    
    if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
            visitorStats = data.data;
        }
    }

    return {
        visitorStats
    };
};
