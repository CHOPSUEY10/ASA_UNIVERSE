import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from '$lib/server/prisma';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
// import { db } from '$lib/server/db';

//import { prisma } from '$lib/server/prisma';

// --- TAMBAHKAN KODE INI UNTUK DIAGNOSA ---
// console.log("=== DIAGNOSA PRISMA ===");
// console.log("1. Apakah prisma.user ada (huruf kecil)?", !!prisma.user);
// console.log("2. Apakah prisma.User ada (huruf besar)?", !!(prisma as any).User);
// console.log("3. Daftar isi Prisma:", Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
// console.log("=======================");

export const auth = betterAuth({
	baseURL: env.ORIGIN +  "/api/auth",
	secret: env.BETTER_AUTH_SECRET,
	database: prismaAdapter(prisma, { provider : 'postgresql'}),
	emailAndPassword: { enabled: true },
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET
		}
	},
	plugins: [
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
