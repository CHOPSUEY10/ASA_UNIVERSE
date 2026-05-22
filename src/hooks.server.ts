import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
    if (building) {
        return svelteKitHandler({ event, resolve, auth, building });
    }

    // Ambil sesi
    const sessionData = await auth.api.getSession({
        headers: event.request.headers,
    });

    // Simpan ke locals (tanpa logika redirect di sini)
    event.locals.session = sessionData?.session || null;
    event.locals.user = sessionData?.user || null;

    return svelteKitHandler({ event, resolve, auth, building });
}