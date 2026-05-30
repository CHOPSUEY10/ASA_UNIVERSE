import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { prisma } from '$lib/server/prisma';

export async function handle({ event, resolve }) {
	if (!building) {
		const sessionData = await auth.api.getSession({
			headers: event.request.headers
		});

		event.locals.user = sessionData?.user ?? null;
		event.locals.session = sessionData?.session ?? null;

		// Track user visit during login, register, callback, or accessing /login
		const pathname = event.url.pathname;
		const isLoginOrRegister = 
			(event.request.method === 'POST' && (
				pathname.includes('/api/auth/sign-in') || 
				pathname.includes('/api/auth/sign-up')
			)) ||
			(event.request.method === 'GET' && (
				pathname === '/login' || 
				pathname.includes('/api/auth/callback')
			));

		if (isLoginOrRegister) {
			let ipAddress: string;
			try {
				ipAddress = event.getClientAddress();
			} catch {
				ipAddress = event.request.headers.get('x-forwarded-for') ||
							event.request.headers.get('cf-connecting-ip') ||
							event.request.headers.get('x-real-ip') ||
							'127.0.0.1';
			}
			const userAgent = event.request.headers.get('user-agent');

			// Save log asynchronously in the background to prevent blocking auth process
			prisma.visitorLog.create({
				data: {
					path: pathname,
					ipAddress,
					userAgent
				}
			}).catch((err) => console.error('Error logging login/register visitor:', err));
		}
	}
	// DEBUG MODE 
	// console.log(event.locals.user);
	return svelteKitHandler({
		event,
		resolve,
		auth,
		building
	});
}
