<script lang="ts">
    import { enhance } from '$app/forms';
    import { toast } from '$lib/stores/toast';
    import type { ActionData } from './$types';
    import { onMount, onDestroy } from 'svelte';

    let { form } = $props<{ form: ActionData }>();
    
    let initialEmail = form?.email ?? '';
    let email = $state(initialEmail);
    let isLoading = $state(false);

    let cooldownRemaining = $state(0);
    let hasSentOtp = $state(false);
    let interval: ReturnType<typeof setInterval>;

    const COOLDOWN_KEY = 'otp_cooldown_expiry';
    const COOLDOWN_TIME = 3 * 60 * 1000; // 3 minutes

    onMount(() => {
        const expiry = localStorage.getItem(COOLDOWN_KEY);
        if (expiry) {
            hasSentOtp = true;
            const remaining = Math.max(0, parseInt(expiry) - Date.now());
            if (remaining > 0) {
                startCooldown(remaining);
            } else {
                cooldownRemaining = 0;
            }
        }
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });

    function startCooldown(durationMs: number) {
        cooldownRemaining = Math.ceil(durationMs / 1000);
        
        if (interval) clearInterval(interval);
        
        interval = setInterval(() => {
            cooldownRemaining -= 1;
            if (cooldownRemaining <= 0) {
                clearInterval(interval);
                cooldownRemaining = 0;
            }
        }, 1000);
    }

    $effect(() => {
        if (form?.error) {
            toast.add(form.error, 'error');
        }
    });

    function formatTime(seconds: number) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }
</script>

<svelte:head>
    <title>Ubah Password | ASA Universe</title>
</svelte:head>

<div class="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
    <h1 class="text-3xl font-bold text-white mb-2 text-center">Ubah Password</h1>
    <p class="text-gray-400 text-center mb-6 text-sm">Masukkan email Anda untuk menerima kode OTP.</p>

    <form 
        method="POST" 
        use:enhance={() => {
            isLoading = true;
            return async ({ update, result }) => {
                if (result.type === 'redirect') {
                    const expiry = Date.now() + COOLDOWN_TIME;
                    localStorage.setItem(COOLDOWN_KEY, expiry.toString());
                    hasSentOtp = true;
                    startCooldown(COOLDOWN_TIME);
                }
                await update();
                isLoading = false;
            };
        }} 
        class="space-y-5"
    >
        {#if form?.error}
            <div class="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm text-center">
                {form.error}
            </div>
        {/if}

        <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email Akun Anda</label>
            <input 
                type="email" 
                id="email" 
                name="email"
                bind:value={email} 
                required 
                class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors" 
                placeholder="nama@email.com" 
            />
        </div>

        <button 
            type="submit" 
            disabled={isLoading || cooldownRemaining > 0} 
            class="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex justify-center items-center"
        >
            {#if isLoading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
            {:else if cooldownRemaining > 0}
                Kirim Ulang OTP dalam {formatTime(cooldownRemaining)}
            {:else if hasSentOtp}
                Kirim Ulang Kode OTP
            {:else}
                Kirim Kode OTP
            {/if}
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
