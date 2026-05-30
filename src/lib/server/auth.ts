import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from '$lib/server/prisma';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import nodemailer from 'nodemailer';

import { emailOTP } from "better-auth/plugins";

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || 'smtp.gmail.com', // Contoh: smtp.gmail.com
    port: parseInt(env.SMTP_PORT || '587'),
    secure: env.SMTP_SECURE === 'true', // true untuk 465, false untuk port lain
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD
    }
});

export const auth = betterAuth({
	baseURL: env.BETTER_AUTH_URL || env.ORIGIN || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : "http://localhost:5173")),
	trustedOrigins: [env.ORIGIN || "http://localhost:5173", "https://asa-universe.vercel.app"],
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
            generateOTP: () => {
                const randomNum = Math.floor(100000 + Math.random() * 900000);
                return randomNum.toString();
            },
			async sendVerificationOTP({ email, otp, type }) {
				console.log(`[EMAIL OTP] Type: ${type} | Mempersiapkan pengiriman OTP ke ${email}`);
				
                if (!env.SMTP_USER || !env.SMTP_PASSWORD) {
                    console.warn("[EMAIL OTP] Peringatan: SMTP_USER atau SMTP_PASSWORD belum diatur di .env! Gagal mengirim email sungguhan.");
                    console.log(`[MOCK OTP] Kode OTP: ${otp}`);
                    return;
                }

                try {
                    await transporter.sendMail({
                        from: `"ASA Universe" <${env.SMTP_USER}>`,
                        to: email,
                        subject: type === "forget-password" ? "Kode OTP Reset Password | ASA Universe" : "Kode OTP Verifikasi | ASA Universe",
                        html: `
                            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background-color: #18181b; color: #e4e4e7; border: 1px solid #27272a; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                                <div style="text-align: center; margin-bottom: 24px;">
                                    <h1 style="color: #ffffff; font-size: 24px; margin: 0;">ASA Universe</h1>
                                </div>
                                <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin-top: 0;">Permintaan Kode OTP</h2>
                                <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6;">
                                    Anda telah meminta kode OTP untuk <strong>${type === "forget-password" ? "mengubah password" : "verifikasi akun"}</strong> Anda di ASA Universe.
                                </p>
                                <div style="margin: 30px 0; padding: 20px; background-color: #09090b; border: 1px solid #3f3f46; border-radius: 8px; text-align: center;">
                                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #dc2626; display: block; margin-left: 8px;">${otp}</span>
                                </div>
                                <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                                    Kode ini hanya berlaku selama 5 menit. Jika Anda tidak merasa melakukan permintaan ini, abaikan saja email ini.
                                </p>
                                <hr style="border: 0; border-top: 1px solid #27272a; margin: 24px 0;" />
                                <p style="color: #71717a; font-size: 12px; text-align: center; margin: 0;">
                                    © 2026 ASA Universe. Semua hak cipta dilindungi.
                                </p>
                            </div>
                        `
                    });
                    console.log(`[EMAIL OTP] Berhasil mengirim email OTP ke ${email}`);
                } catch (error) {
                    console.error("[EMAIL OTP] Gagal mengirim email OTP:", error);
                }
			}
		}),
		sveltekitCookies(getRequestEvent)
	]
});
