<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import Pagination from '$lib/components/Pagination.svelte';
    import { currencyFormatter } from '$lib/utils';
    import { toast } from '$lib/stores/toast';

    let { data }: { data: import('./$types').PageData } = $props();
    let updatingOrderIds = $state<Record<string, boolean>>({});

    function handlePageChange(page: number) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        goto(url.toString(), { keepFocus: true });
    }

    async function handleStatusChange(orderId: string, newStatus: string) {
        updatingOrderIds = { ...updatingOrderIds, [orderId]: true };
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });

            const result = await res.json();

            if (!res.ok) {
                toast.add(result.message || 'Gagal memperbarui status', 'error');
                await invalidateAll();
                return;
            }

            toast.add('Status pesanan berhasil diperbarui', 'success');
            await invalidateAll();
        } catch (e) {
            console.error(e);
            toast.add('Gagal menghubungkan ke server', 'error');
            await invalidateAll();
        } finally {
            updatingOrderIds = { ...updatingOrderIds, [orderId]: false };
        }
    }
</script>

<svelte:head>
    <title>Daftar Pesanan - Admin ASA Universe</title>
</svelte:head>

<div class="mb-8">
    <h1 class="text-3xl font-bold text-white tracking-tight">Daftar Pesanan</h1>
    <p class="text-zinc-400 mt-2">Kelola pesanan pelanggan dan lihat desain yang diunggah.</p>
</div>

<div class="bg-[#111] border border-zinc-800 rounded-xl overflow-hidden">
    {#if data.orders.length === 0}
        <div class="p-8 text-center text-zinc-400">
            Belum ada pesanan yang masuk.
        </div>
    {:else}
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-zinc-300">
                <thead class="bg-[#0a0a0a] text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <tr>
                        <th scope="col" class="px-6 py-4 font-medium">Order ID / Tanggal</th>
                        <th scope="col" class="px-6 py-4 font-medium">Pelanggan</th>
                        <th scope="col" class="px-6 py-4 font-medium">Status</th>
                        <th scope="col" class="px-6 py-4 font-medium">Total</th>
                        <th scope="col" class="px-6 py-4 font-medium">Detail Produk & Desain</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800">
                    {#each data.orders as order}
                        <tr class="hover:bg-zinc-800/50 transition-colors">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="font-medium text-white">{order.id.slice(-6).toUpperCase()}</div>
                                <div class="text-xs text-zinc-500 mt-1">{new Date(order.createdAt).toLocaleDateString('id-ID')}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-white">{order.customerName || 'Guest'}</div>
                                <div class="text-xs text-zinc-500">{order.email || '-'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-zinc-300">
                                <select 
                                    value={order.status} 
                                    onchange={(e) => handleStatusChange(order.id, e.currentTarget.value)}
                                    disabled={updatingOrderIds[order.id]}
                                    class="px-2.5 py-1 rounded-full text-xs font-bold border bg-[#0a0a0a] cursor-pointer focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed {
                                        order.status === 'PENDING' ? 'text-yellow-500 border-yellow-500/30 focus:border-yellow-500 bg-yellow-500/5' : 
                                        order.status === 'CONFIRMED' ? 'text-green-400 border-green-500/30 focus:border-green-500 bg-green-500/5' : 
                                        'text-red-500 border-red-500/30 focus:border-red-500 bg-red-500/5'
                                    }"
                                >
                                    <option value="PENDING" class="bg-[#111] text-zinc-300">PENDING</option>
                                    <option value="CONFIRMED" class="bg-[#111] text-zinc-300">CONFIRMED</option>
                                    <option value="CANCELLED" class="bg-[#111] text-zinc-300">CANCELLED</option>
                                </select>
                            </td>
                            <td class="px-6 py-4 font-medium whitespace-nowrap">
                                {currencyFormatter.format(order.totalPrice)}
                            </td>
                            <td class="px-6 py-4">
                                <div class="space-y-3 min-w-[300px]">
                                    {#each order.items as item}
                                        <div class="bg-[#0a0a0a] p-3 rounded-lg border border-zinc-800 text-xs">
                                            <div class="font-medium text-white mb-1">{item.product.name} <span class="text-zinc-400">({item.quantity} pcs)</span></div>
                                            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-400">
                                                <div>Kerah: <span class="text-zinc-300">{item.kerah.nama}</span></div>
                                                <div>Patch: <span class="text-zinc-300">{item.patch.nama}</span></div>
                                                <div>Ukuran: <span class="text-zinc-300">{item.size.name}</span></div>
                                            </div>
                                            {#if item.designFileUrl}
                                                <div class="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between">
                                                    <span class="text-zinc-400">Desain:</span>
                                                    <a href={item.designFileUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-[#990000] hover:text-red-400 font-medium transition-colors">
                                                        <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        Lihat / Unduh
                                                    </a>
                                                </div>
                                            {:else}
                                                <div class="mt-2 pt-2 border-t border-zinc-800 text-zinc-500 italic">
                                                    Tidak ada desain
                                                </div>
                                            {/if}
                                        </div>
                                    {/each}
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        
        <div class="p-6 border-t border-zinc-800 bg-[#111]">
            <Pagination 
                currentPage={data.pagination.page} 
                totalPages={data.pagination.totalPages} 
                onPageChange={handlePageChange} 
            />
        </div>
    {/if}
</div>
