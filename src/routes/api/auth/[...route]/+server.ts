// GANTI dari '$lib/auth' menjadi '$lib/server/auth'
import { auth } from '$lib/server/auth'; 
import { toSvelteKitHandler } from 'better-auth/svelte-kit';
import type { RequestEvent } from '@sveltejs/kit';

const betterAuthHandler = toSvelteKitHandler(auth);

const debugHandler = async (event: RequestEvent) => {
    return betterAuthHandler(event);
};

export const GET = debugHandler;
export const POST = debugHandler;