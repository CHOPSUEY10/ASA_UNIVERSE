import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    // Jika tidak ada sesi, tendang ke halaman login
    if (!locals.session) {
        throw redirect(302, "/login");
    }

    if (locals.user.role !== "admin") {
        throw redirect(302, "/");
    }

    // Lempar data user ke frontend agar bisa dipakai di halaman profile/orders
    return {
        user: locals.user
    };
};