<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>Model Kerah | ASA Universe</title>
</svelte:head><div class="min-h-screen bg-[#0a0a0a] py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-[#111] p-8 rounded-sm shadow-sm border border-zinc-800">
            <h1 class="text-3xl font-black text-white uppercase tracking-tight mb-6">Model Kerah</h1>
            <p class="text-zinc-400 mb-8">Setiap model kerah didesain untuk merepresentasikan identitas dan gaya bermain tim Anda. Pilih yang paling sesuai dengan kebutuhan fungsional dan estetika jersey kustom Anda.</p>
            
            <div class="flex justify-center bg-black rounded-sm border border-zinc-800 overflow-hidden">
                <img src="/etc/model_kerah.png" alt="Model Kerah" class="w-full h-auto object-contain" />
            </div>

            <div class="mt-10 bg-[#111] border border-zinc-800 rounded-sm overflow-hidden">
                <table class="w-full text-left text-sm">
                    <thead class="bg-zinc-900 border-b border-zinc-800">
                        <tr>
                            <th class="px-6 py-4 font-bold text-white uppercase tracking-wider">Nama Model</th>
                            <th class="px-6 py-4 font-bold text-white uppercase tracking-wider text-right">Harga (Rp)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-800">
                        {#each data.kerahs as kerah}
                            <tr class="hover:bg-zinc-900/50 transition-colors">
                                <td class="px-6 py-4 font-bold text-[#990000]">{kerah.nama}</td>
                                <td class="px-6 py-4 text-zinc-300 text-right">
                                    {kerah.harga > 0 ? '+ ' + new Intl.NumberFormat('id-ID').format(kerah.harga) : 'Gratis'}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <div class="mt-10">
                <a href="/" class="inline-flex items-center text-[#990000] text-sm font-bold uppercase tracking-wider hover:text-white transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Kembali ke Beranda
                </a>
            </div>
        </div>
    </div>
</div>
