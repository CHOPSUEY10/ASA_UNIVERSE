<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { onMount } from 'svelte';
    import { toast } from '$lib/stores/toast';
    import { page } from '$app/stores';
    import { authClient } from '$lib/auth-client';
    import { fly, fade } from 'svelte/transition';

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
 
            </div>
        </div>
    </div>
</header>
 
<!-- Mobile Floating Navigation Overlay & Menu -->
{#if isMenuOpen}
    <!-- Backdrop to close the menu when clicked outside -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
        class="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
        onclick={toggleMenu}
        transition:fade={{ duration: 150 }}
    ></div>
 
    <!-- Floating Menu Stack (above FAB) -->
    <div 
        class="fixed bottom-20 right-6 z-50 md:hidden flex flex-col items-end gap-3"
        role="menu"
        transition:fly={{ y: 20, duration: 200 }}
    >
        <!-- Beranda -->
        <a href="/" class="flex items-center gap-3 group" onclick={toggleMenu}>
            <span class={`px-2.5 py-1 text-xs font-black uppercase tracking-widest border rounded-sm shadow-md transition-all duration-200 ${
                $page.url.pathname === '/' 
                ? 'border-brand-primary text-brand-accent bg-[#222]' 
                : 'border-brand-border text-gray-200 bg-brand-surface group-hover:text-white group-hover:border-brand-primary'
            }`}>Beranda</span>
            <div class={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-200 ${
                $page.url.pathname === '/' 
                ? 'border-brand-primary bg-brand-primary text-brand-accent' 
                : 'border-brand-border bg-brand-surface text-brand-muted group-hover:text-white group-hover:bg-brand-primary group-hover:border-brand-primary'
            }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </div>
        </a>
 
        <!-- Katalog -->
        <a href="/products" class="flex items-center gap-3 group" onclick={toggleMenu}>
            <span class={`px-2.5 py-1 text-xs font-black uppercase tracking-widest border rounded-sm shadow-md transition-all duration-200 ${
                $page.url.pathname.startsWith('/products') 
                ? 'border-brand-primary text-brand-accent bg-[#222]' 
                : 'border-brand-border text-gray-200 bg-brand-surface group-hover:text-white group-hover:border-brand-primary'
            }`}>Katalog</span>
            <div class={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-200 ${
                $page.url.pathname.startsWith('/products') 
                ? 'border-brand-primary bg-brand-primary text-brand-accent' 
                : 'border-brand-border bg-brand-surface text-brand-muted group-hover:text-white group-hover:bg-brand-primary group-hover:border-brand-primary'
            }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6H8.25M3.75 12H8.25M3.75 18H8.25M20.25 6H12M20.25 12H12M20.25 18H12" />
                </svg>
            </div>
        </a>
 
        <!-- Kontak -->
        <a href="/#kontak" class="flex items-center gap-3 group" onclick={toggleMenu}>
            <span class="px-2.5 py-1 text-xs font-black uppercase tracking-widest border border-brand-border text-gray-200 bg-brand-surface rounded-sm shadow-md transition-all duration-200 group-hover:text-white group-hover:border-brand-primary">Kontak</span>
            <div class="w-10 h-10 rounded-full border border-brand-border bg-brand-surface text-brand-muted flex items-center justify-center shadow-md transition-all duration-200 group-hover:text-white group-hover:bg-brand-primary group-hover:border-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.82-1.468-5.118-3.767-6.586-6.586l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5a2.25 2.25 0 0 0-2.25 4.5v2.25Z" />
                </svg>
            </div>
        </a>
 
        <!-- FAQ -->
        <a href="/#faq" class="flex items-center gap-3 group" onclick={toggleMenu}>
            <span class="px-2.5 py-1 text-xs font-black uppercase tracking-widest border border-brand-border text-gray-200 bg-brand-surface rounded-sm shadow-md transition-all duration-200 group-hover:text-white group-hover:border-brand-primary">FAQ</span>
            <div class="w-10 h-10 rounded-full border border-brand-border bg-brand-surface text-brand-muted flex items-center justify-center shadow-md transition-all duration-200 group-hover:text-white group-hover:bg-brand-primary group-hover:border-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
            </div>
        </a>
 
        <!-- Conditional auth links -->
        {#if $session.data?.user}
            {#if userRole === 'ADMIN' || userRole === 'admin'}
                <a href="/admin" class="flex items-center gap-3 group" onclick={toggleMenu}>
                    <span class={`px-2.5 py-1 text-xs font-black uppercase tracking-widest border rounded-sm shadow-md transition-all duration-200 ${
                        $page.url.pathname.startsWith('/admin') 
                        ? 'border-brand-primary text-brand-accent bg-[#222]' 
                        : 'border-brand-border text-gray-200 bg-brand-surface group-hover:text-white group-hover:border-brand-primary'
                    }`}>Admin Panel</span>
                    <div class={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-200 ${
                        $page.url.pathname.startsWith('/admin') 
                        ? 'border-brand-primary bg-brand-primary text-brand-accent' 
                        : 'border-brand-border bg-brand-surface text-brand-muted group-hover:text-white group-hover:bg-brand-primary group-hover:border-brand-primary'
                    }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                </a>
            {:else}
                <a href="/profile" class="flex items-center gap-3 group" onclick={toggleMenu}>
                    <span class={`px-2.5 py-1 text-xs font-black uppercase tracking-widest border rounded-sm shadow-md transition-all duration-200 ${
                        $page.url.pathname === '/profile' 
                        ? 'border-brand-primary text-brand-accent bg-[#222]' 
                        : 'border-brand-border text-gray-200 bg-brand-surface group-hover:text-white group-hover:border-brand-primary'
                    }`}>Akun</span>
                    <div class={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-200 ${
                        $page.url.pathname === '/profile' 
                        ? 'border-brand-primary bg-brand-primary text-brand-accent' 
                        : 'border-brand-border bg-brand-surface text-brand-muted group-hover:text-white group-hover:bg-brand-primary group-hover:border-brand-primary'
                    }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                </a>
            {/if}
            <button onclick={() => { handleLogout(); toggleMenu(); }} class="flex items-center gap-3 group text-left focus:outline-none">
                <span class="px-2.5 py-1 text-xs font-black uppercase tracking-widest border border-brand-border text-gray-200 bg-brand-surface rounded-sm shadow-md transition-all duration-200 group-hover:text-white group-hover:border-brand-primary">Logout</span>
                <div class="w-10 h-10 rounded-full border border-brand-border bg-brand-surface text-red-500 hover:text-red-400 border-red-900/30 hover:border-red-500/50 flex items-center justify-center shadow-md transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </div>
            </button>
        {:else}
            <a href="/login" class="flex items-center gap-3 group" onclick={toggleMenu}>
                <span class={`px-2.5 py-1 text-xs font-black uppercase tracking-widest border rounded-sm shadow-md transition-all duration-200 ${
                    $page.url.pathname === '/login' 
                    ? 'border-brand-primary text-brand-accent bg-[#222]' 
                    : 'border-brand-border text-brand-bg bg-brand-accent group-hover:bg-yellow-500 group-hover:border-yellow-500'
                }`}>Login</span>
                <div class={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-200 ${
                    $page.url.pathname === '/login' 
                    ? 'border-brand-primary bg-brand-primary text-brand-accent' 
                    : 'border-brand-accent bg-brand-accent text-brand-bg group-hover:bg-yellow-500 group-hover:border-yellow-500'
                }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
            </a>
        {/if}
    </div>
{/if}
 
<!-- Floating Main Action Trigger (Hamburger) Button -->
<div class="fixed bottom-6 right-6 z-50 md:hidden flex items-center gap-3">
    <button 
        type="button"
        onclick={toggleMenu}
        class="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white bg-brand-surface border border-brand-border rounded-sm shadow-lg shadow-black/40 focus:outline-none transition-all active:scale-95 duration-200"
    >
        {isMenuOpen ? 'Tutup' : 'Menu'}
    </button>
    <button 
        type="button" 
        class="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg shadow-black/40 hover:bg-[#800000] active:scale-95 transition-all duration-200 border border-brand-primary/50 focus:outline-none" 
        onclick={toggleMenu} 
        aria-label="Toggle menu"
    >
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
            {#if isMenuOpen}
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            {:else}
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7l4.76 3.45l-1.76 5.55h-6l-1.76 -5.55z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7v-4m3 13l2.5 3m-.74 -8.55l3.74 -1.45m-11.44 7.05l-2.56 2.95m.74 -8.55l-3.74 -1.45" />
            {/if}
        </svg>
    </button>
</div>
