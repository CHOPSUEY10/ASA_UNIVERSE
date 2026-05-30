<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { toast } from '$lib/stores/toast';

    let email = $state('');
    let isLoading = $state(false);

    const handleForgotPassword = async (event: Event) => {
        event.preventDefault(); 
        
        isLoading = true;

        // We use emailOtp plugin to send OTP
        const { data, error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: "forget-password"
        });

        isLoading = false;

        if (error) {
            toast.add(error.message || 'Gagal mengirim OTP, pastikan email terdaftar.', 'error');
        } else {
            toast.add('Kode OTP telah dikirim ke email Anda.', 'success');
            setTimeout(() => {
                goto(`/reset-password?email=${encodeURIComponent(email)}`);
            }, 2000);
        }
    };
</script>

<svelte:head>
    <title>Ubah Password | ASA Universe</title>
</svelte:head>

<div class="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
    <h1 class="text-3xl font-bold text-white mb-2 text-center">Ubah Password</h1>
    <p class="text-gray-400 text-center mb-6 text-sm">Masukkan email Anda untuk menerima kode OTP.</p>

    <form onsubmit={handleForgotPassword} class="space-y-5">
        <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email Akun Anda</label>
            <input type="email" id="email" bind:value={email} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="nama@email.com" />
        </div>

        <button type="submit" disabled={isLoading} class="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
            {isLoading ? 'Mengirim...' : 'Kirim Kode OTP'}
        </button>
    </form>

    <div class="mt-6 text-center">
        <a href="/login" class="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Halaman Masuk
        </a>
    </div>
</div>
