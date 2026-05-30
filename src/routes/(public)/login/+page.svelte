<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { toast } from '$lib/stores/toast';

    let email = $state('');
    let password = $state('');
    let errorMessage = $state('');
    let isLoading = $state(false);

    const handleEmailLogin = async (event: Event) => {
        event.preventDefault(); 
        isLoading = true;
        errorMessage = '';

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });

        isLoading = false;

        if (error) {
            errorMessage = error.message || 'Gagal login, periksa kembali akun Anda.';
            toast.add(errorMessage, 'error');
        } else if (data) {
            toast.add("Berhasil login!", 'success');
            await goto(resolve('/admin/dashboard'),{}); 
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: '/admin/dashboard' 
        });
    };

</script>

<svelte:head>
    <title>Masuk | ASA Universe</title>
</svelte:head>

<div class="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
    <h1 class="text-3xl font-bold text-white mb-6 text-center">Masuk</h1>
    
    {#if errorMessage}
        <div class="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
            {errorMessage}
        </div>
    {/if}

    <form onsubmit={handleEmailLogin} class="space-y-5">
        <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input type="email" id="email" bind:value={email} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="nama@email.com" />
        </div>

        <div>
            <div class="flex justify-between items-center mb-2">
                <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
                <a href="/forgot-password" class="text-xs text-red-500 hover:text-red-400 transition-colors">Lupa Password?</a>
            </div>
            <input type="password" id="password" bind:value={password} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="••••••••" />
        </div>

        <button type="submit" disabled={isLoading} class="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
            {isLoading ? 'Memproses...' : 'Masuk'}
        </button>
    </form>

    <div class="mt-8 text-center">
        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-zinc-800"></div>
            </div>
            <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-zinc-900 text-gray-500">Atau masuk dengan</span>
            </div>
        </div>
        
        <button onclick={handleGoogleLogin} class="mt-6 w-full flex items-center justify-center py-3 bg-white text-zinc-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
            <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Masuk dengan Google
        </button>
    </div>

    <p class="mt-8 text-center text-sm text-gray-400">
        Belum punya akun? 
        <a href="/register" class="text-red-500 hover:text-red-400 font-medium transition-colors">Daftar sekarang</a>
    </p>
</div>