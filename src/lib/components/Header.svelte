<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { onMount } from 'svelte';
    import { toast } from '$lib/stores/toast';

    import { authClient } from '$lib/auth-client';

    let isMenuOpen = $state(false);
    
    let cartItemCount = $derived($cart.reduce((total, item) => total + item.quantity, 0));

    const session = authClient.useSession();

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    async function handleLogout() {
        const { error } = await authClient.signOut();
        if (error) {
            toast.add("Gagal logout: " + error.message, 'error');
            console.error(error);
            return;
        }
        // Option to reload or goto
        window.location.href = '/login';
    }
</script>

<header class="bg-black text-white sticky top-0 z-50 shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a href="/" class="text-2xl font-bold tracking-tighter text-red-600">
                    ASA<span class="text-white">UNIVERSE</span>
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8 items-center">
                <a href="/" class="text-gray-300 hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium">Home</a>
                <a href="/products" class="text-gray-300 hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium">Katalog</a>
                <a href="/#faq" class="text-gray-300 hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium">FAQ</a>
            </nav>

            <!-- Icons -->
            <div class="flex items-center space-x-4">
                <a href="/cart" class="text-gray-300 hover:text-red-500 relative transition-colors p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {#if cartItemCount > 0}
                        <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">{cartItemCount}</span>
                    {/if}
                </a>

                {#if $session.data?.user}
                    <a href="/profile" class="text-gray-300 hover:text-red-500 transition-colors p-2 flex items-center" title="Pengaturan Akun">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </a>
                    <button onclick={handleLogout} title="Logout" class="text-red-500 hover:text-red-400 transition-colors p-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </button>
                {:else}
                    <a href="/login" class="text-white bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded-md text-sm font-medium">
                        Login
                    </a>
                {/if}

                <!-- Mobile menu button -->
                <button type="button" class="md:hidden text-gray-300 hover:text-white focus:outline-none p-2" onclick={toggleMenu} aria-label="Toggle menu">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {#if isMenuOpen}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        {:else}
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        {/if}
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Navigation -->
    {#if isMenuOpen}
        <div class="md:hidden bg-zinc-900">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="/" class="block text-gray-300 hover:text-red-500 hover:bg-zinc-800 px-3 py-2 rounded-md text-base font-medium">Home</a>
                <a href="/products" class="block text-gray-300 hover:text-red-500 hover:bg-zinc-800 px-3 py-2 rounded-md text-base font-medium">Katalog</a>
                <a href="/#faq" class="block text-gray-300 hover:text-red-500 hover:bg-zinc-800 px-3 py-2 rounded-md text-base font-medium">FAQ</a>
                {#if $session.data?.user}
                    <a href="/profile" class="block text-gray-300 hover:text-red-500 hover:bg-zinc-800 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        Pengaturan Akun
                    </a>
                    <button onclick={handleLogout} class="w-full text-left flex items-center gap-2 text-red-500 hover:bg-zinc-800 px-3 py-2 rounded-md text-base font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        Logout
                    </button>
                {:else}
                    <a href="/login" class="block text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium text-center mt-2">Login</a>
                {/if}
            </div>
        </div>
    {/if}
</header>
