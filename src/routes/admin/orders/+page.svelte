<script lang="ts">
    import { enhance } from '$app/forms';

    let { data }: { data: import('./$types').PageData } = $props();

    // Format IDR
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });
</script>

<svelte:head>
    <title>Daftar Pesanan - Admin ASA Universe</title>
</svelte:head>

<div class="mb-8">
    <h1 class="text-3xl font-bold text-white tracking-tight">Daftar Pesanan</h1>
    <p class="text-gray-400 mt-2">Kelola pesanan pelanggan dan lihat desain yang diunggah.</p>
</div>

<div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
    {#if data.orders.length === 0}
        <div class="p-8 text-center text-gray-400">
            Belum ada pesanan yang masuk.
        </div>
    {:else}
        <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-300">
                <thead class="bg-zinc-950 text-xs uppercase text-gray-400 border-b border-zinc-800">
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
                                <div class="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString('id-ID')}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-white">{order.customerName || 'Guest'}</div>
                                <div class="text-xs text-gray-500">{order.email || '-'}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2.5 py-1 rounded-full text-xs font-medium border
                                    {order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                                     order.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                                     'bg-red-500/10 text-red-500 border-red-500/20'}">
                                    {order.status}
                                </span>
                            </td>
                            <td class="px-6 py-4 font-medium whitespace-nowrap">
                                {formatter.format(order.totalPrice)}
                            </td>
                            <td class="px-6 py-4">
                                <div class="space-y-3 min-w-[300px]">
                                    {#each order.items as item}
                                        <div class="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-xs">
                                            <div class="font-medium text-white mb-1">{item.product.name} <span class="text-gray-400">({item.quantity} pcs)</span></div>
                                            <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-400">
                                                <div>Kerah: <span class="text-gray-300">{item.kerah.nama}</span></div>
                                                <div>Patch: <span class="text-gray-300">{item.patch.nama}</span></div>
                                                <div>Ukuran: <span class="text-gray-300">{item.size.name}</span></div>
                                            </div>
                                            {#if item.designFileUrl}
                                                <div class="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between">
                                                    <span class="text-gray-400">Desain:</span>
                                                    <a href={item.designFileUrl} target="_blank" rel="noopener noreferrer" class="inline-flex items-center text-red-500 hover:text-red-400 font-medium transition-colors">
                                                        <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        Lihat / Unduh
                                                    </a>
                                                </div>
                                            {:else}
                                                <div class="mt-2 pt-2 border-t border-zinc-800 text-gray-500 italic">
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
    {/if}
</div>
