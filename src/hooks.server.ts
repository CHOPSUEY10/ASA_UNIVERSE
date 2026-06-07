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

		// Protect Admin API Routes
		const isAdminApiRoute = pathname.startsWith('/api/admin');
		if (isAdminApiRoute) {
			if (!event.locals.user) {
				return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
			}
			if (event.locals.user.role !== 'admin' && event.locals.user.role !== 'ADMIN') {
				return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
			}
		}

		// Helper for non-blocking visitor logging
		const logVisitor = (path: string, ip: string, ua: string | null) => {
			const promise = prisma.visitorLog.create({
				data: {
					path,
					ipAddress: ip,
					userAgent: ua
				}
			}).catch(err => {
				console.error('Error logging visitor background:', err);
			});

			if (event.platform?.context?.waitUntil) {
				event.platform.context.waitUntil(promise);
			}
		};

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
			logVisitor(pathname, ipAddress, userAgent);
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
				logVisitor(pathname, ipAddress, userAgent);
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
