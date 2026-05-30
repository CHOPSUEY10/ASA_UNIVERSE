import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ url }) => {
    const email = url.searchParams.get('email');
    
    if (!email) {
        throw redirect(303, '/login');
    }

    return {
        email
    };
};
