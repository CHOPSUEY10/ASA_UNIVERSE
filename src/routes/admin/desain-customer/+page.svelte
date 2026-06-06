<script lang="ts">
    import { enhance } from '$app/forms';
    import { toast } from '$lib/stores/toast';
    let { data, form }: { data: import('./$types').PageData, form: import('./$types').ActionData } = $props();

    $effect(() => {
        if (form?.error) {
            toast.add(form.error, 'error');
        } else if (form?.success) {
            toast.add(form.message || 'Desain diperbarui.', 'success');
        }
    });

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.form && input.files && input.files.length > 0) {
            input.form.requestSubmit();
        }
    }
</script>

<svelte:head>
    <title>Desain Customer - Admin ASA Universe</title>
</svelte:head>

<div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
        <h1 class="text-3xl font-bold text-white tracking-tight">Desain Customer</h1>
        <p class="text-zinc-400 mt-2">Galeri desain khusus yang diunggah oleh pelanggan.</p>
    </div>
    {#if data.filterOrderId}
        <a href="/admin/desain-customer" class="inline-flex items-center bg-[#990000]/10 hover:bg-[#990000]/20 text-[#990000] border border-[#990000]/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Hapus Filter (Order: {data.filterOrderId.slice(-6).toUpperCase()})
        </a>
    {/if}
</div>

{#if data.designs.length === 0}
    <div class="bg-[#111] border border-zinc-800 rounded-xl p-12 text-center text-zinc-400">
        {#if data.filterOrderId}
            Tidak ada desain untuk pesanan ini.
        {:else}
            Belum ada desain customer yang diunggah.
        {/if}
    </div>
{:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each data.designs as item}
            <div class="bg-[#111] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors flex flex-col group/card">
                <!-- Image Container -->
                <div class="aspect-square bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
                    {#if item.designFileUrl}
                        <img src={item.designFileUrl} alt="Desain {item.product.name}" class="max-w-full max-h-full object-contain group-hover/card:scale-105 transition-transform duration-500" />
                        
                        <!-- Overlay -->
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                            <a href={item.designFileUrl} target="_blank" rel="noopener noreferrer" class="bg-[#990000] hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg transform translate-y-4 group-hover/card:translate-y-0 transition-all flex items-center">
                                <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Buka Penuh
                            </a>
                            <div class="flex gap-2">
                                <label class="cursor-pointer bg-[#111] hover:bg-[#990000] text-white px-3 py-2 rounded-lg font-medium shadow-lg transform translate-y-4 group-hover/card:translate-y-0 transition-all flex items-center text-sm">
                                    <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit
                                    <form method="POST" action="?/edit" enctype="multipart/form-data" use:enhance={() => {
                                        toast.add('Mengunggah desain baru...', 'info');
                                        return async ({ update }) => {
                                            await update();
                                        };
                                    }} class="hidden">
                                        <input type="hidden" name="itemId" value={item.id} />
                                        <input type="hidden" name="oldDesignUrl" value={item.designFileUrl} />
                                        <input type="file" name="newDesign" accept="image/*,.pdf" onchange={handleFileChange} />
                                    </form>
                                </label>
                                <form method="POST" action="?/delete" use:enhance={() => {
                                    return async ({ update }) => {
                                        await update();
                                    };
                                }}>
                                    <input type="hidden" name="itemId" value={item.id} />
                                    <input type="hidden" name="designFileUrl" value={item.designFileUrl} />
                                    <button type="submit" class="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600 px-3 py-2 rounded-lg font-medium shadow-lg transform translate-y-4 group-hover/card:translate-y-0 transition-all flex items-center text-sm" onclick={(e) => {
                                        if(!confirm('Yakin ingin menghapus desain ini?')) e.preventDefault();
                                    }}>
                                        <svg class="w-4 h-4 mr-1 text-[#990000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Hapus
                                    </button>
                                </form>
                            </div>
                        </div>
                    {:else}
                        <span class="text-zinc-600">Tidak ada gambar</span>
                    {/if}
                </div>
                
                <!-- Details -->
                <div class="p-4 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-white leading-tight">{item.product.name}</h3>
                        <span class="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md ml-2 whitespace-nowrap border border-zinc-700">
                            {item.quantity} pcs
                        </span>
                    </div>
                    
                    <div class="space-y-1 mt-auto pt-4 border-t border-zinc-800 text-sm">
                        <div class="flex justify-between">
                            <span class="text-zinc-500">Order ID</span>
                            <span class="text-zinc-300 font-medium" title={item.orderId}>
                                {item.orderId.slice(-6).toUpperCase()}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-zinc-500">Customer</span>
                            <span class="text-zinc-300 truncate max-w-[120px]" title={item.order.customerName || 'Guest'}>{item.order.customerName || 'Guest'}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-zinc-500">Tanggal</span>
                            <span class="text-zinc-400">{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}
