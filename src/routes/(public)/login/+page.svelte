<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { page } from '$app/stores';
    import { toast } from '$lib/stores/toast';

    let email = $state('');
    let password = $state('');
    let errorMessage = $state('');
    let isLoading = $state(false);

    $effect(() => {
        if ($page.url.searchParams.get('success') === 'password-reset') {
            toast.add('Password berhasil diubah! Silakan masuk dengan password baru.', 'success');
            const url = new URL(window.location.href);
            url.searchParams.delete('success');
            window.history.replaceState(history.state, '', url.href);
        }
    });

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

<div class="min-h-[calc(100vh-64px)] flex bg-white">
    <!-- Left Hero Image (Hidden on mobile) -->
    <div class="hidden md:flex md:w-1/2 relative bg-[#7a0000] items-end pb-12 px-12 overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-[#990000]/40 to-transparent z-10"></div>
        <img src="/uploads/hero.jpg" alt="Athlete sprinting" class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
        <div class="absolute inset-0 bg-[url('/hero/hero_section.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"></div>
        
        <div class="relative z-20 w-full">
            <h1 class="text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                Velocity<br/>In Every Move
            </h1>
            <p class="mt-4 text-gray-200 max-w-md text-sm">
                Join the elite ecosystem of ASA UNIVERSE. Engineered for high performance, designed for the bold.
            </p>
        </div>
    </div>

    <!-- Right Login Form -->
    <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 relative">
        <div class="w-full max-w-md">
            
            <!-- Tabs -->
            <div class="flex border-b border-gray-200 mb-10">
                <a href="/login" class="pb-3 px-4 text-sm font-bold text-[#990000] border-b-2 border-[#990000] uppercase tracking-wider">Login</a>
                <a href="/register" class="pb-3 px-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wider">Register</a>
            </div>

            <h2 class="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">Welcome Back</h2>

            {#if errorMessage}
                <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">
                    {errorMessage}
                </div>
            {/if}

            <form onsubmit={handleEmailLogin} class="space-y-6">
                <div>
                    <label for="email" class="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                    <input type="email" id="email" bind:value={email} required class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-900 focus:ring-1 focus:ring-[#990000] focus:border-[#990000] transition-colors shadow-sm" placeholder="runner@asauniverse.com" />
                </div>

                <div>
                    <label for="password" class="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Password</label>
                    <input type="password" id="password" bind:value={password} required class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-900 focus:ring-1 focus:ring-[#990000] focus:border-[#990000] transition-colors shadow-sm" placeholder="••••••••" />
                </div>

                <div class="flex justify-end">
                    <a href="/forgot-password" class="text-xs font-bold text-[#990000] hover:text-red-700 transition-colors uppercase tracking-wider">Forgot Password?</a>
                </div>

                <button type="submit" disabled={isLoading} class="w-full py-4 bg-[#1a1a1a] text-white font-bold text-sm rounded-sm hover:bg-black transition-colors disabled:opacity-50 uppercase tracking-widest shadow-lg shadow-black/10">
                    {isLoading ? 'Processing...' : 'Access Portal'}
                </button>
            </form>

            <div class="mt-8 relative flex items-center justify-center">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Or continue with</div>
            </div>

            <div class="mt-8 grid grid-cols-2 gap-4">
                <button onclick={handleGoogleLogin} class="flex items-center justify-center py-3 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors shadow-sm">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </button>
                <button type="button" class="flex items-center justify-center py-3 bg-white border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors shadow-sm">
                    <svg class="h-6 w-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.365 7.143c.828-1.002 1.385-2.4 1.233-3.793-1.192.048-2.648.793-3.498 1.815-.765.897-1.436 2.336-1.258 3.7.159 1.282.049.034 1.341 1.22-.05.006.126.002.041.026 1.109-.044 2.141-.837 2.141-.837s-.008.016 0-.005l.006-.01zm2.348 9.387c-.822 1.196-1.681 2.365-2.928 2.389-1.217.024-1.62-.716-3.023-.716-1.416 0-1.855.692-3.007.74-1.196.048-2.182-1.268-3.018-2.464-1.705-2.464-3.009-6.953-2.13-9.94.436-1.482 1.543-2.44 2.802-2.465 1.197-.024 2.337.804 3.064.804.726 0 2.052-.962 3.497-.82 1.489.144 2.842.864 3.702 2.124-3.239 1.884-2.68 6.442.492 7.749-.757 1.821-1.637 3.8-2.451 4.795z"/></svg>
                </button>
            </div>
        </div>
    </div>
</div>