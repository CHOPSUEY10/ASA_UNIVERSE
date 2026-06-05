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
            // Send OTP for email verification
            const { error: otpError } = await authClient.emailOtp.sendVerificationOtp({
                email,
                type: 'email-verification'
            });

            if (otpError) {
                errorMessage = otpError.message || 'Berhasil mendaftar, namun gagal mengirim OTP verifikasi.';
                toast.add(errorMessage, 'error');
                await goto('/login');
            } else {
                toast.add('Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.', 'success');
                await goto(`/verify-email?email=${encodeURIComponent(email)}`);
            }
        }
    };
</script>

<svelte:head>
    <title>Daftar | ASA Universe</title>
</svelte:head>

<div class="min-h-[calc(100vh-64px)] flex bg-white">
    <!-- Left Hero Image (Hidden on mobile) -->
    <div class="hidden md:flex md:w-1/2 relative bg-[#7a0000] items-end pb-12 px-12 overflow-hidden">
        <!-- Background decorative elements -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-[#990000]/40 to-transparent z-10"></div>
        <img src="/uploads/hero.jpg" alt="Athlete sprinting" class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
        <div class="absolute inset-0 bg-[url('/hero/hero_section.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"></div>
        
        <div class="relative z-20 w-full mb-[10em]">
            <h1 class="text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                Velocity<br/>In Every Move
            </h1>
            <p class="mt-4 text-gray-200 max-w-md text-sm">
                Join the elite ecosystem of ASA UNIVERSE. Engineered for high performance, designed for the bold.
            </p>
        </div>
    </div>

    <!-- Right Register Form -->
    <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-8 lg:p-16 relative">
        <div class="w-full max-w-md">
            
            <!-- Tabs -->
            <div class="flex border-b border-gray-200 mb-10">
                <a href="/login" class="pb-3 px-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-wider">Login</a>
                <a href="/register" class="pb-3 px-4 text-sm font-bold text-[#990000] border-b-2 border-[#990000] uppercase tracking-wider">Register</a>
            </div>

            <h2 class="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tight">Create Account</h2>

            {#if errorMessage}
                <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">
                    {errorMessage}
                </div>
            {/if}

            <form onsubmit={handleRegister} class="space-y-6">
                <div>
                    <label for="name" class="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Full Name</label>
                    <input type="text" id="name" bind:value={name} required class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-900 focus:ring-1 focus:ring-[#990000] focus:border-[#990000] transition-colors shadow-sm" placeholder="Your Name" />
                </div>

                <div>
                    <label for="email" class="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                    <input type="email" id="email" bind:value={email} required class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-900 focus:ring-1 focus:ring-[#990000] focus:border-[#990000] transition-colors shadow-sm" placeholder="runner@asauniverse.com" />
                </div>

                <div>
                    <label for="password" class="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Password</label>
                    <input type="password" id="password" bind:value={password} required class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-900 focus:ring-1 focus:ring-[#990000] focus:border-[#990000] transition-colors shadow-sm" placeholder="••••••••" />
                </div>

                <div>
                    <label for="confirmPassword" class="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">Confirm Password</label>
                    <input type="password" id="confirmPassword" bind:value={confirmPassword} required class="block w-full px-4 py-3 bg-white border border-gray-200 rounded-sm text-gray-900 focus:ring-1 focus:ring-[#990000] focus:border-[#990000] transition-colors shadow-sm" placeholder="••••••••" />
                </div>

                <button type="submit" disabled={isLoading} class="w-full py-4 bg-[#1a1a1a] text-white font-bold text-sm rounded-sm hover:bg-black transition-colors disabled:opacity-50 uppercase tracking-widest shadow-lg shadow-black/10">
                    {isLoading ? 'Processing...' : 'Create Account'}
                </button>
            </form>

        </div>
    </div>
</div>
