import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	if (!building) {
		let sessionData = null;
		try {
			sessionData = await auth.api.getSession({
				headers: event.request.headers
			});
		} catch (error) {
			console.error("[Auth] getSession error:", error);
		}

		event.locals.user = sessionData?.user ?? null;
		event.locals.session = sessionData?.session ?? null;

		const pathname = event.url.pathname;
		
		// Role-based Route Protection
		const isAdminRoute = pathname.startsWith('/admin');
		const isAuthRoute = pathname.startsWith('/cart') || pathname.startsWith('/profile') || pathname.startsWith('/orders');

		if (isAdminRoute) {
			if (!event.locals.user) {
				throw redirect(303, '/login');
			}
			if (event.locals.user.role !== 'admin' && event.locals.user.role !== 'ADMIN') {
				throw redirect(303, '/');
			}
		} else if (isAuthRoute) {
			if (!event.locals.user) {
				throw redirect(303, '/login');
			}
		}

		// Track user visit during login, register, callback, or accessing /login
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

			// Use await for logging to ensure it completes before serverless process halts
			try {
				await prisma.visitorLog.create({
					data: {
						path: pathname,
						ipAddress,
						userAgent
					}
				});
			} catch (err) {
				console.error('Error logging login/register visitor:', err);
			}
		}

		// General Visitor Tracking
		if (!pathname.startsWith('/api') && event.request.method === 'GET' && !pathname.startsWith('/admin')) {
			const visitorCookie = event.cookies.get('visitor_session');
			if (!visitorCookie) {
				event.cookies.set('visitor_session', '1', {
					path: '/',
					maxAge: 60 * 60 * 24, // 24 hours
					httpOnly: true,
					secure: process.env.NODE_ENV === 'production',
					sameSite: 'lax'
				});

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

				try {
					await prisma.visitorLog.create({
						data: {
							path: pathname,
							ipAddress,
							userAgent
						}
					});
				} catch (err) {
					console.error('Error logging general visitor:', err);
				}
			}
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
