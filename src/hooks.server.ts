import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
	if (!building) {
		const sessionData = await auth.api.getSession({
			headers: event.request.headers
		});

		event.locals.user = sessionData?.user ?? null;
		event.locals.session = sessionData?.session ?? null;
	}
	// DEBUG MODE 
	console.log(event.locals.user);
	return svelteKitHandler({
		event,
		resolve,
		auth,
		building
	});
}