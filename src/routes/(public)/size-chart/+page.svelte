<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>Size Chart | ASA Universe</title>
</svelte:head><div class="min-h-screen bg-[#0a0a0a] py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-[#111] p-8 rounded-sm shadow-sm border border-zinc-800">
            <h1 class="text-3xl font-black text-white uppercase tracking-tight mb-6">Size Chart</h1>
            <p class="text-zinc-400 mb-8">Panduan ukuran jersey untuk memastikan kenyamanan maksimal saat bertanding maupun beraktivitas. Pastikan Anda memilih ukuran yang sesuai dengan mengacu pada panduan di bawah ini sebelum memesan.</p>
            
            <div class="flex justify-center bg-black rounded-sm border border-zinc-800 overflow-hidden">
                <img src="/etc/size_chart.png" alt="Size Chart" class="w-full h-auto object-contain" />
            </div>

            <div class="mt-10 bg-[#111] border border-zinc-800 rounded-sm overflow-hidden">
                <table class="w-full text-left text-sm">
                    <thead class="bg-zinc-900 border-b border-zinc-800">
                        <tr>
                            <th class="px-6 py-4 font-bold text-white uppercase tracking-wider">Ukuran</th>
                            <th class="px-6 py-4 font-bold text-white uppercase tracking-wider">Lebar (cm)</th>
                            <th class="px-6 py-4 font-bold text-white uppercase tracking-wider">Tinggi (cm)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-800">
                        {#each data.sizes as size}
                            <tr class="hover:bg-zinc-900/50 transition-colors">
                                <td class="px-6 py-4 font-bold text-[#990000]">{size.name}</td>
                                <td class="px-6 py-4 text-zinc-300">{size.width}</td>
                                <td class="px-6 py-4 text-zinc-300">{size.height}</td>
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
