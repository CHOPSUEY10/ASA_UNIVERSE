<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { toast } from '$lib/stores/toast';
    import type { PageData } from './$types';
    import { onMount, onDestroy } from 'svelte';

    let { data } = $props<{ data: PageData }>();
    
    let email = $state(data.email);
    let otp = $state('');
    let isLoading = $state(false);
    let errorMessage = $state('');
    let isResending = $state(false);

    let cooldownRemaining = $state(0);
    let interval: ReturnType<typeof setInterval>;

    const COOLDOWN_KEY = 'verify_email_otp_cooldown_expiry';
    const COOLDOWN_TIME = 3 * 60 * 1000;

    onMount(() => {
        const expiry = localStorage.getItem(COOLDOWN_KEY);
        if (expiry) {
            const remaining = Math.max(0, parseInt(expiry) - Date.now());
            if (remaining > 0) {
                startCooldown(remaining);
            }
        } else {
            // First time landing here, OTP was just sent from register
            const newExpiry = Date.now() + COOLDOWN_TIME;
            localStorage.setItem(COOLDOWN_KEY, newExpiry.toString());
            startCooldown(COOLDOWN_TIME);
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

    function formatTime(seconds: number) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    async function handleResendOtp() {
        if (cooldownRemaining > 0 || isResending) return;
        
        isResending = true;
        const { error } = await authClient.emailOtp.sendVerificationOtp({
            email,
            type: 'email-verification'
        });
        
        isResending = false;
        
        if (error) {
            toast.add(error.message || 'Gagal mengirim ulang OTP.', 'error');
        } else {
            toast.add('Kode OTP telah dikirim ulang ke email Anda.', 'success');
            const expiry = Date.now() + COOLDOWN_TIME;
            localStorage.setItem(COOLDOWN_KEY, expiry.toString());
            startCooldown(COOLDOWN_TIME);
        }
    }

    const handleVerify = async (event: Event) => {
        event.preventDefault(); 
        
        if (!otp || otp.length < 6) {
            errorMessage = 'Kode OTP harus 6 digit.';
            toast.add(errorMessage, 'error');
            return;
        }

        isLoading = true;
        errorMessage = '';

        const { data: resultData, error } = await authClient.emailOtp.verifyEmail({
            email,
            otp
        });

        isLoading = false;

        if (error) {
            errorMessage = error.message || 'Kode OTP salah atau sudah kadaluarsa.';
            toast.add(errorMessage, 'error');
        } else if (resultData) {
            toast.add('Verifikasi email berhasil! Silakan masuk.', 'success');
            await goto('/login');
        }
    };
</script>

<svelte:head>
    <title>Verifikasi Email | ASA Universe</title>
</svelte:head>

<div class="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
    <h1 class="text-3xl font-bold text-white mb-2 text-center">Verifikasi Email</h1>
    <p class="text-gray-400 text-center mb-6 text-sm">
        Masukkan kode OTP yang dikirim ke <span class="font-medium text-white">{email}</span>.
    </p>

    <form onsubmit={handleVerify} class="space-y-5">
        {#if errorMessage}
            <div class="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm text-center">
                {errorMessage}
            </div>
        {/if}

        <div>
            <label for="otp" class="block text-sm font-medium text-gray-300 mb-2">Kode OTP (6 digit)</label>
            <input 
                type="text" 
                id="otp" 
                bind:value={otp} 
                required 
                maxLength={6} 
                class="block w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 transition-colors text-center tracking-widest text-lg" 
                placeholder="••••••" 
            />
        </div>

        <button 
            type="submit" 
            disabled={isLoading} 
            class="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex justify-center items-center"
        >
            {#if isLoading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memverifikasi...
            {:else}
                Verifikasi Email
            {/if}
        </button>
    </form>

    <div class="mt-6 text-center">
        {#if isResending}
            <span class="text-sm text-gray-400">Mengirim ulang...</span>
        {:else if cooldownRemaining > 0}
            <span class="text-sm text-gray-400">Kirim ulang OTP dalam {formatTime(cooldownRemaining)}</span>
        {:else}
            <button 
                type="button" 
                onclick={handleResendOtp}
                class="text-sm text-red-500 hover:text-red-400 font-medium transition-colors"
            >
                Kirim Ulang Kode OTP
            </button>
        {/if}
    </div>
</div>
