<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { toast } from '$lib/stores/toast';

    let name = $state('');
    let email = $state('');
    let password = $state('');
    let confirmPassword = $state('');
    let errorMessage = $state('');
    let isLoading = $state(false);

    const handleRegister = async (event: Event) => {
        event.preventDefault(); 
        
        if (password !== confirmPassword) {
            errorMessage = 'Password tidak cocok.';
            toast.add(errorMessage, 'error');
            return;
        }

        isLoading = true;
        errorMessage = '';

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
        });

        isLoading = false;

        if (error) {
            errorMessage = error.message || 'Gagal mendaftar, silakan coba lagi.';
            toast.add(errorMessage, 'error');
        } else if (data) {
            toast.add('Pendaftaran berhasil! Silakan masuk.', 'success');
            await goto('/login');
        }
    };
</script>

<svelte:head>
    <title>Daftar | ASA Universe</title>
</svelte:head>

<div class="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
    <h1 class="text-3xl font-bold text-white mb-6 text-center">Daftar</h1>
    
    {#if errorMessage}
        <div class="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
            {errorMessage}
        </div>
    {/if}

    <form onsubmit={handleRegister} class="space-y-5">
        <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
            <input type="text" id="name" bind:value={name} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="Nama Anda" />
        </div>

        <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input type="email" id="email" bind:value={email} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="nama@email.com" />
        </div>

        <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input type="password" id="password" bind:value={password} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="••••••••" />
        </div>

        <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">Konfirmasi Password</label>
            <input type="password" id="confirmPassword" bind:value={confirmPassword} required class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" placeholder="••••••••" />
        </div>

        <button type="submit" disabled={isLoading} class="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
        </button>
    </form>

    <p class="mt-8 text-center text-sm text-gray-400">
        Sudah punya akun? 
        <a href="/login" class="text-red-500 hover:text-red-400 font-medium transition-colors">Masuk di sini</a>
    </p>
</div>
