<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { onMount } from 'svelte';
    import { toast } from '$lib/stores/toast';
    import { page } from '$app/stores';
    import { authClient } from '$lib/auth-client';

    let isMenuOpen = $state(false);
    
    let cartItemCount = $derived($cart.reduce((total, item) => total + item.quantity, 0));

    const session = authClient.useSession();
    let userRole = $derived(($session.data?.user as any)?.role);

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

<header class="bg-brand-bg text-white sticky top-0 z-50 border-b border-brand-border shadow-lg shadow-black/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
                <a href="/" class="text-lg md:text-2xl font-black tracking-tighter text-white flex items-center gap-1.5 md:gap-2 transition-colors hover:text-brand-accent">
                    <img src="/icon/icon.png" alt="Logo" class="w-8 h-8 md:w-12 md:h-12 object-contain">
                    ASA UNIVERSE
                </a>
            </div>
 
            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8 items-center">
                <a href="/" class="px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors {$page.url.pathname === '/' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-300 hover:text-brand-primary'}">Beranda</a>
                <a href="/products" class="px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors {$page.url.pathname.startsWith('/products') ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-300 hover:text-brand-primary'}">Katalog</a>
                <a href="/#kontak" class="px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors text-gray-300 hover:text-brand-primary">Kontak</a>
                <a href="/#faq" class="px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors text-gray-300 hover:text-brand-primary">FAQ</a>
            </nav>
 
            <!-- Icons -->
            <div class="flex items-center space-x-2 md:space-x-4">
                <!-- Login/Register/Logout icons -->
                {#if !$session.data?.user}
                    <a href="/login" class="p-1.5 md:p-2 transition-colors {$page.url.pathname === '/login' ? 'text-brand-primary' : 'text-gray-300 hover:text-brand-accent'}" title="Login">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 md:w-5 md:h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </a>
                {/if}
 
                {#if $session.data?.user}
                    {#if userRole === 'ADMIN' || userRole === 'admin'}
                        <a href="/admin" class="p-1.5 md:p-2 flex items-center transition-colors text-gray-300 hover:text-brand-accent" title="Admin Panel">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 md:w-5 md:h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </a>
                    {:else}
                        <a href="/profile" class="p-1.5 md:p-2 flex items-center transition-colors {$page.url.pathname === '/profile' ? 'text-brand-primary' : 'text-gray-300 hover:text-brand-accent'}" title="Pengaturan Akun">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 md:w-5 md:h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </a>
                    {/if}
                    <button onclick={handleLogout} title="Logout" class="p-1.5 md:p-2 flex items-center text-gray-300 hover:text-brand-accent transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 md:w-5 md:h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                    </button>
                {/if}
 
                <a href="/cart" class="relative p-1.5 md:p-2 transition-colors {$page.url.pathname === '/cart' ? 'text-brand-accent' : 'text-gray-300 hover:text-brand-accent'}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 md:w-5 md:h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    {#if cartItemCount > 0}
                        <span class="absolute top-0 right-0 inline-flex items-center justify-center w-3.5 h-3.5 md:w-4 md:h-4 text-[9px] md:text-[10px] font-bold leading-none text-brand-bg transform translate-x-1/4 -translate-y-1/4 bg-brand-accent rounded-full">{cartItemCount}</span>
                    {/if}
                </a>
 
                <!-- Mobile menu button -->
                <button type="button" class="md:hidden p-1.5 transition-colors text-white hover:text-brand-accent focus:outline-none" onclick={toggleMenu} aria-label="Toggle menu">
                    <svg class="h-5 w-5 md:h-6 md:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
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
        <div class="md:hidden bg-brand-surface border-t border-brand-border shadow-inner">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="/" class="block px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors {$page.url.pathname === '/' ? 'text-brand-accent bg-[#222]' : 'text-gray-300 hover:text-white hover:bg-brand-surface'}">Beranda</a>
                <a href="/products" class="block px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors {$page.url.pathname.startsWith('/products') ? 'text-brand-accent bg-[#222]' : 'text-gray-300 hover:text-white hover:bg-brand-surface'}">Katalog</a>
                <a href="/#kontak" class="block px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors text-gray-300 hover:text-white hover:bg-brand-surface">Kontak</a>
                <a href="/#faq" class="block px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors text-gray-300 hover:text-white hover:bg-brand-surface">FAQ</a>
                {#if $session.data?.user}
                    {#if userRole === 'ADMIN' || userRole === 'admin'}
                        <a href="/admin" class="block px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-colors {$page.url.pathname.startsWith('/admin') ? 'text-brand-accent bg-[#222]' : 'text-gray-300 hover:text-white hover:bg-brand-surface'}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Admin Panel
                        </a>
                    {:else}
                        <a href="/profile" class="block px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-colors {$page.url.pathname === '/profile' ? 'text-brand-accent bg-[#222]' : 'text-gray-300 hover:text-white hover:bg-brand-surface'}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            Pengaturan Akun
                        </a>
                    {/if}
                    <button onclick={handleLogout} class="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors text-gray-300 hover:text-white hover:bg-brand-surface">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                        </svg>
                        Logout
                    </button>
                {:else}
                    <a href="/login" class="block text-brand-bg bg-brand-accent hover:bg-yellow-500 px-3 py-2 rounded-md text-sm font-bold text-center mt-2 uppercase tracking-wider transition-colors">Login</a>
                {/if}
            </div>
        </div>
    {/if}
</header>
