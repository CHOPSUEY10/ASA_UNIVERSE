
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    // 1. Ambil data user langsung dari locals yang sudah diisi oleh hook
    const user = locals.user;
    const session = locals.session;

    

    // 3. Lempar ke frontend (+page.svelte)
    return {
        user,
        session,
       
    };
};