import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const email = url.searchParams.get('email') || '';
    const success = url.searchParams.get('success') || '';
    return {
        email,
        success
    };
};

export const actions: Actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const otp = formData.get('otp')?.toString();
        const newPassword = formData.get('newPassword')?.toString();
        const confirmPassword = formData.get('confirmPassword')?.toString();
        const email = event.url.searchParams.get('email') || formData.get('email')?.toString();

        if (!otp || !newPassword || !confirmPassword || !email) {
            return fail(400, { error: 'Semua field (termasuk email) wajib diisi.' });
        }

        if (newPassword !== confirmPassword) {
            return fail(400, { error: 'Password tidak cocok.' });
        }

        try {
            const response = await event.fetch('/api/auth/email-otp/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password: newPassword,
                    otp, 
                })
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                return fail(400, { 
                    error: errData.message || 'Gagal mengubah password. OTP mungkin salah atau sudah kedaluwarsa.' 
                });
            }
        } catch (err) {
            return fail(500, { 
                error: 'Terjadi kesalahan pada server saat mengubah password.' 
            });
        }

        throw redirect(303, `/login?success=password-reset`);
    }
};
