<script lang="ts">
    import { page } from '$app/stores';
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { cart } from '$lib/stores/cart';
    import { toast } from '$lib/stores/toast';
    
    let { children } = $props();

    const handleLogout = async () => {
        const { error } = await authClient.signOut();
        if (error) {
            toast.add("Gagal logout: " + error.message, 'error');
            console.error(error);
            return;
        }
        window.location.href = '/login';
    };
</script>

<svelte:head>
    <title>Admin Dashboard | ASA Universe</title>
</svelte:head>

<div class="min-h-screen bg-[#0a0a0a] text-white flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#111] border-r border-zinc-800 hidden md:block">
        <div class="h-16 flex items-center px-6 border-b border-zinc-800">
            <a href="/admin" class="text-xl font-bold tracking-tighter text-[#990000]">
                <img src="/icon/icon.png" alt="ASA Universe Logo" class="h-8 w-auto mr-2">
                ASA<span class="text-white">UNIVERSE</span> <p class="text-xs text-zinc-500 font-normal ml-1">ADMIN</p>
            </a>
        </div>
        <nav class="p-4 space-y-1">
            <a href="/admin" class={`flex items-center px-4 py-3 text-sm font-medium rounded-sm transition-colors ${$page.url.pathname === '/admin' ? 'bg-[#990000] text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
                <svg class="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
            </a>
            <a href="/admin/products" class={`flex items-center px-4 py-3 text-sm font-medium rounded-sm transition-colors ${$page.url.pathname.startsWith('/admin/products') ? 'bg-[#990000] text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
                <svg class="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Produk
            </a>
            <a href="/admin/orders" class={`flex items-center px-4 py-3 text-sm font-medium rounded-sm transition-colors ${$page.url.pathname.startsWith('/admin/orders') ? 'bg-[#990000] text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
                <svg class="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Pesanan
            </a>
            <a href="/admin/desain-customer" class={`flex items-center px-4 py-3 text-sm font-medium rounded-sm transition-colors ${$page.url.pathname.startsWith('/admin/desain-customer') ? 'bg-[#990000] text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
                <svg class="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Desain Customer
            </a>
            <!-- Other menus would go here, omitting for MVP if not required immediately -->
            <a href="/" class="flex items-center px-4 py-3 text-sm font-medium rounded-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors mt-8">
                <svg class="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Web
            </a>
        </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header class="h-16 bg-[#111] border-b border-zinc-800 flex items-center justify-between px-6">
            <div class="md:hidden">
                <a href="/admin" class="text-xl font-bold tracking-tighter text-[#990000]">
                    ASA<span class="text-white">UNIVERSE</span>
                </a>
            </div>
            <div class="flex-1"></div>
            <div class="flex items-center gap-4">
                <button onclick={handleLogout} title="Logout" class="text-[#990000] hover:text-red-800 transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </button>
            </div>
        </header>

        <div class="flex-1 overflow-y-auto p-6 md:p-8">
            {@render children()}
        </div>
    </main>
</div>
