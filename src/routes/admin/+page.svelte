<script lang="ts">
    import VisitorWidget from '$lib/components/admin/VisitorWidget.svelte';
    let { data } = $props();
</script>

<svelte:head>
    <title>Admin Dashboard - ASA Universe</title>
</svelte:head>

<div class="mb-8">
    <h1 class="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
    <p class="text-gray-400 mt-2">Welcome to ASA Universe Business Panel.</p>
</div>

<VisitorWidget stats={data.visitorStats} />

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Placeholder for future widgets (e.g. Sales, Quick Actions) -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 class="text-xl font-bold text-white mb-4">Aksi Cepat</h2>
        <div class="space-y-4">
            <a href="/admin/products" class="block p-4 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div class="flex items-center text-white">
                    <svg class="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    Kelola Produk
                </div>
            </a>
            <a href="/admin/export" class="block p-4 bg-zinc-950 rounded-lg border border-zinc-800 hover:border-red-500 transition-colors">
                <div class="flex items-center text-white">
                    <svg class="w-6 h-6 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Export Data Excel
                </div>
            </a>
        </div>
    </div>
</div>
