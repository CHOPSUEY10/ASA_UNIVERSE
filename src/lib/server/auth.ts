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

import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
	baseURL: env.ORIGIN +  "/api/auth",
	secret: env.BETTER_AUTH_SECRET,
	database: prismaAdapter(prisma, { provider : 'postgresql'}),
	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: "user"
			}
		}
	},
	emailAndPassword: { 
		enabled: true,
		sendResetPassword: async ({ user, url }) => {
			// This is the fallback if standard reset is used. We'll use OTP below.
			console.log(`Kirim link reset ke ${user.email}: ${url}`);
		}
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID || 'dummy',
			clientSecret: env.GOOGLE_CLIENT_SECRET || 'dummy'
		}
	},
	plugins: [
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				// Implement sending email here (e.g. via nodemailer)
				console.log(`[EMAIL OTP] Type: ${type} | Mengirim OTP ${otp} ke ${email}`);
				
				// In MVP, we just console.log the OTP. 
				// The real implementation would use nodemailer with env.SMTP_URL
			}
		}),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
