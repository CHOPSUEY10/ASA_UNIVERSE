<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    import { toast } from '$lib/stores/toast';

    let email = $state($page.url.searchParams.get('email') || '');
    let otp = $state('');
    let newPassword = $state('');
    let confirmPassword = $state('');
    let isLoading = $state(false);

    const handleResetPassword = async (event: Event) => {
        event.preventDefault(); 
        
        if (newPassword !== confirmPassword) {
            toast.add('Password tidak cocok.', 'error');
            return;
        }

        isLoading = true;

        // First verify OTP if needed, or directly pass it as token.
        // BetterAuth resetPassword uses token. In emailOTP flow, OTP is the token.
        const { data, error } = await authClient.resetPassword({
            newPassword,
            token: otp, // Sending OTP as the reset token
        });

        isLoading = false;

        if (error) {
            toast.add(error.message || 'Gagal mengubah password. OTP mungkin salah atau sudah kedaluwarsa.', 'error');
        } else {
            toast.add('Password berhasil diubah! Silakan masuk dengan password baru.', 'success');
            await goto('/login');
        }
    };
</script>

<svelte:head>
    <title>Reset Password | ASA Universe</title>
</svelte:head>

<div class="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
    <h1 class="text-3xl font-bold text-white mb-2 text-center">Buat Password Baru</h1>
    <p class="text-gray-400 text-center mb-6 text-sm">
        Masukkan kode OTP yang dikirim ke <span class="font-medium text-white">{email}</span> beserta password baru Anda.
    </p>

    <form onsubmit={handleResetPassword} class="space-y-5">
        <div>
            <label for="otp" class="block text-sm font-medium text-gray-300 mb-2">Kode OTP (6 digit)</label>
            <input type="text" id="otp" bind:value={otp} required maxLength={6} class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors text-center tracking-widest text-lg" placeholder="••••••" />
        </div>

        <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-300 mb-2">Password Baru</label>
            <input type="password" id="newPassword" bind:value={newPassword} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="••••••••" />
        </div>

        <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">Konfirmasi Password</label>
            <input type="password" id="confirmPassword" bind:value={confirmPassword} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="••••••••" />
        </div>

        <button type="submit" disabled={isLoading} class="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
            {isLoading ? 'Menyimpan...' : 'Simpan Password Baru'}
        </button>
    </form>

    <div class="mt-6 text-center">
        <a href="/login" class="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center">
            Batal
        </a>
    </div>
</div>
