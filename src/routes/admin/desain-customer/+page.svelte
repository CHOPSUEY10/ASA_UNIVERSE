<script lang="ts">
    let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
    <title>Desain Customer - Admin ASA Universe</title>
</svelte:head>

<div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
        <h1 class="text-3xl font-bold text-white tracking-tight">Desain Customer</h1>
        <p class="text-gray-400 mt-2">Galeri desain khusus yang diunggah oleh pelanggan.</p>
    </div>
    {#if data.filterOrderId}
        <a href="/admin/desain-customer" class="inline-flex items-center bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Hapus Filter (Order: {data.filterOrderId.slice(-6).toUpperCase()})
        </a>
    {/if}
</div>

{#if data.designs.length === 0}
    <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center text-gray-400">
        {#if data.filterOrderId}
            Tidak ada desain untuk pesanan ini.
        {:else}
            Belum ada desain customer yang diunggah.
        {/if}
    </div>
{:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each data.designs as item}
            <div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col group/card">
                <!-- Image Container -->
                <div class="aspect-square bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
                    {#if item.designFileUrl}
                        <img src={item.designFileUrl} alt="Desain {item.product.name}" class="max-w-full max-h-full object-contain group-hover/card:scale-105 transition-transform duration-500" />
                        
                        <!-- Overlay -->
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                            <a href={item.designFileUrl} target="_blank" rel="noopener noreferrer" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg transform translate-y-4 group-hover/card:translate-y-0 transition-all flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Buka Penuh
                            </a>
                        </div>
                    {:else}
                        <span class="text-zinc-600">Tidak ada gambar</span>
                    {/if}
                </div>
                
                <!-- Details -->
                <div class="p-4 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-white leading-tight">{item.product.name}</h3>
                        <span class="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded-md ml-2 whitespace-nowrap border border-zinc-700">
                            {item.quantity} pcs
                        </span>
                    </div>
                    
                    <div class="space-y-1 mt-auto pt-4 border-t border-zinc-800 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-500">Order ID</span>
                            <span class="text-gray-300 font-medium" title={item.orderId}>
                                {item.orderId.slice(-6).toUpperCase()}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Customer</span>
                            <span class="text-gray-300 truncate max-w-[120px]" title={item.order.customerName || 'Guest'}>{item.order.customerName || 'Guest'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Tanggal</span>
                            <span class="text-gray-400">{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}
