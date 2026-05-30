import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const email = formData.get('email')?.toString();

        // Server-side validation
        if (!email) {
            return fail(400, { email, error: 'Email wajib diisi.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return fail(400, { email, error: 'Format email tidak valid.' });
        }

        // Call BetterAuth API endpoint
        try {
            const response = await event.fetch('/api/auth/email-otp/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                return fail(400, { 
                    email, 
                    error: errData.message || 'Gagal mengirim OTP, pastikan email terdaftar.' 
                });
            }
        } catch (err) {
            return fail(500, { 
                email, 
                error: 'Terjadi kesalahan pada server saat mengirim OTP.' 
            });
        }

        // Redirect on success
        throw redirect(303, `/reset-password?email=${encodeURIComponent(email)}&success=otp-sent`);
    }
};
