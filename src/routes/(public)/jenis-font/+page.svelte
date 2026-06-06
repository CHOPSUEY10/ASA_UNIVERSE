<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>Jenis Font | ASA Universe</title>
</svelte:head><div class="min-h-screen bg-[#0a0a0a] py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-[#111] p-8 rounded-sm shadow-sm border border-zinc-800">
            <h1 class="text-3xl font-black text-white uppercase tracking-tight mb-6">Jenis Font</h1>
            <p class="text-zinc-400 mb-8">Pilih gaya tipografi (font) yang paling cocok untuk mencetak nama pemain dan nomor punggung pada jersey Anda. Tersedia berbagai opsi dari yang klasik hingga modern yang agresif.</p>
            
            <div class="flex justify-center bg-black rounded-sm border border-zinc-800 overflow-hidden">
                <img src="/etc/jenis_font.png" alt="Jenis Font" class="w-full h-auto object-contain" />
            </div>

            <div class="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each data.fonts as font}
                    <div class="bg-[#111] border border-zinc-800 rounded-sm p-6 text-center hover:border-[#990000] transition-colors group">
                        {#if font.previewUrl}
                            <img src={font.previewUrl} alt={font.name} class="h-16 mx-auto mb-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                        {:else}
                            <div class="h-16 flex items-center justify-center mb-4 text-4xl font-bold text-zinc-600 group-hover:text-white transition-colors" style="font-family: {font.name}, sans-serif;">
                                Aa
                            </div>
                        {/if}
                        <h3 class="font-bold text-white uppercase tracking-wider">{font.name}</h3>
                    </div>
                {/each}
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
