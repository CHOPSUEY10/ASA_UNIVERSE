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

<header class="bg-white text-gray-900 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a href="/" class="text-2xl font-black tracking-tighter text-gray-900 flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L22 20H2L12 2Z" fill="#111" fill-opacity="0.2"/>
                        <path d="M12 2L17 11L12 20L7 11L12 2Z" fill="#990000"/>
                    </svg>
                    ASA UNIVERSE
                </a>
            </div>

            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8 items-center">
                <a href="/" class="text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 text-xs font-bold uppercase tracking-widest">Beranda</a>
                <a href="/products" class="text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 text-xs font-bold uppercase tracking-widest">Katalog</a>
                <a href="/#kontak" class="text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 text-xs font-bold uppercase tracking-widest">Kontak</a>
                <a href="/#faq" class="text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 text-xs font-bold uppercase tracking-widest">FAQ</a>
            </nav>

            <!-- Icons -->
            <div class="flex items-center space-x-4">
                <!-- Login/Register/Logout icons -->
                {#if !$session.data?.user}
                    <a href="/login" class="text-gray-500 hover:text-[#990000] transition-colors p-2" title="Login">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </a>
                {/if}

                {#if $session.data?.user}
                    <a href="/profile" class="text-gray-500 hover:text-[#990000] transition-colors p-2 flex items-center" title="Pengaturan Akun">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </a>
                    <button onclick={handleLogout} title="Logout" class="text-gray-500 hover:text-[#990000] transition-colors p-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </button>
                {/if}

                <a href="/cart" class="text-gray-500 hover:text-[#990000] relative transition-colors p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {#if cartItemCount > 0}
                        <span class="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[#990000] rounded-full">{cartItemCount}</span>
                    {/if}
                </a>

                <!-- Mobile menu button -->
                <button type="button" class="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none p-2" onclick={toggleMenu} aria-label="Toggle menu">
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
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
        <div class="md:hidden bg-white border-t border-gray-100">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="/" class="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider">Beranda</a>
                <a href="/products" class="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider">Katalog</a>
                <a href="/#kontak" class="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider">Kontak</a>
                <a href="/#faq" class="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider">FAQ</a>
                {#if $session.data?.user}
                    <a href="/profile" class="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        Pengaturan Akun
                    </a>
                    <button onclick={handleLogout} class="w-full text-left flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        Logout
                    </button>
                {:else}
                    <a href="/login" class="block text-white bg-[#111] hover:bg-black px-3 py-2 rounded-md text-sm font-bold text-center mt-2 uppercase tracking-wider">Login</a>
                {/if}
            </div>
        </div>
    {/if}
</header>
