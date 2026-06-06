<script lang="ts">
    import { enhance } from '$app/forms';
    import { toast } from '$lib/stores/toast';
    import type { ActionData, PageData } from './$types';
    import { onMount, onDestroy } from 'svelte';
    import { authClient } from '$lib/auth-client';

    let { data, form } = $props<{ data: PageData, form: ActionData }>();
    
    let initialEmail = data.email;
    let email = $state(initialEmail);
    let otp = $state('');
    let newPassword = $state('');
    let confirmPassword = $state('');
    let isLoading = $state(false);
    let isResending = $state(false);

    let cooldownRemaining = $state(0);
    let interval: ReturnType<typeof setInterval>;

    const COOLDOWN_KEY = 'otp_cooldown_expiry';
    const COOLDOWN_TIME = 3 * 60 * 1000;

    onMount(() => {
        const expiry = localStorage.getItem(COOLDOWN_KEY);
        if (expiry) {
            const remaining = Math.max(0, parseInt(expiry) - Date.now());
            if (remaining > 0) {
                startCooldown(remaining);
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
            type: 'forget-password'
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

    $effect(() => {
        if (form?.error) {
            toast.add(form.error, 'error');
        }
        if (data.success === 'otp-sent' && !form?.error) {
            // Kita tidak perlu memunculkan toast setiap kali karena sudah ada mekanisme resend tersendiri,
            // Namun tetap dipertahankan untuk backward compatibility jika dari redirect.
            toast.add('Kode OTP telah dikirim ke email Anda.', 'success');
        }
    });
</script>

<svelte:head>
    <title>Reset Password | ASA Universe</title>
</svelte:head>

<div class="max-w-md mx-auto my-16 p-8 bg-[#111] border border-zinc-800 rounded-sm shadow-sm">
    <h1 class="text-3xl font-black text-white mb-2 text-center uppercase tracking-widest">Buat Password Baru</h1>
    <p class="text-zinc-400 text-center mb-6 text-sm font-medium">
        Masukkan kode OTP yang dikirim ke <span class="font-bold text-white">{email}</span> beserta password baru Anda.
    </p>

    <form 
        method="POST" 
        use:enhance={() => {
            isLoading = true;
            return async ({ update }) => {
                await update();
                isLoading = false;
            };
        }} 
        class="space-y-5"
    >
        <input type="hidden" name="email" value={email} />

        {#if form?.error}
            <div class="p-3 bg-red-950/30 border border-red-900/50 rounded-sm text-red-400 text-xs font-bold uppercase tracking-wider text-center">
                {form.error}
            </div>
        {/if}

        <div>
            <label for="otp" class="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">Kode OTP (6 digit)</label>
            <input 
                type="text" 
                id="otp" 
                name="otp"
                bind:value={otp} 
                required 
                maxLength={6} 
                class="block w-full px-4 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-sm text-white placeholder-zinc-600 focus:ring-[#990000] focus:border-[#990000] transition-colors text-center font-bold tracking-widest text-lg uppercase" 
                placeholder="••••••" 
            />
        </div>

        <div>
            <label for="newPassword" class="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">Password Baru</label>
            <input 
                type="password" 
                id="newPassword" 
                name="newPassword"
                bind:value={newPassword} 
                required 
                class="block w-full px-4 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-sm text-white placeholder-zinc-600 focus:ring-[#990000] focus:border-[#990000] transition-colors" 
                placeholder="••••••••" 
            />
        </div>

        <div>
            <label for="confirmPassword" class="block text-xs font-bold text-zinc-300 mb-2 uppercase tracking-wider">Konfirmasi Password</label>
            <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                bind:value={confirmPassword} 
                required 
                class="block w-full px-4 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-sm text-white placeholder-zinc-600 focus:ring-[#990000] focus:border-[#990000] transition-colors" 
                placeholder="••••••••" 
            />
        </div>

        <button 
            type="submit" 
            disabled={isLoading} 
            class="w-full py-4 bg-[#990000] text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-red-800 transition-colors disabled:opacity-50 flex justify-center items-center shadow-md"
        >
            {#if isLoading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
            {:else}
                Simpan Password Baru
            {/if}
        </button>
    </form>

    <div class="mt-4 text-center">
        {#if isResending}
            <span class="text-xs font-bold text-zinc-500 uppercase tracking-wider">Mengirim ulang...</span>
        {:else if cooldownRemaining > 0}
            <span class="text-xs font-bold text-zinc-500 uppercase tracking-wider">Kirim ulang OTP ({formatTime(cooldownRemaining)})</span>
        {:else}
            <button 
                type="button" 
                onclick={handleResendOtp}
                class="text-xs font-bold text-[#990000] hover:text-red-700 uppercase tracking-wider transition-colors"
            >
                Kirim Ulang Kode OTP
            </button>
        {/if}
    </div>

    <div class="mt-8 text-center border-t border-zinc-800 pt-6">
        <a href="/login" class="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-wider transition-colors flex items-center justify-center">
            Batal
        </a>
    </div>
</div>
