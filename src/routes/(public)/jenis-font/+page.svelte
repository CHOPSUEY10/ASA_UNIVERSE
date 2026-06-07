<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>Official Style Fonts | ASA Universe</title>
</svelte:head>

<div class="min-h-screen bg-brand-bg py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-brand-card p-8 rounded-sm shadow-lg border border-brand-border">
            <span class="text-brand-accent text-xs font-black uppercase tracking-widest font-mono">Typography Guide</span>
            <h1 class="text-3xl font-black text-white uppercase tracking-tight mb-4 mt-1">Official Style Fonts</h1>
            <p class="text-brand-muted mb-8 text-sm leading-relaxed">Pilih gaya tipografi (font) yang paling cocok untuk mencetak nama pemain dan nomor punggung pada jersey Anda. Tersedia berbagai opsi dari yang klasik hingga modern yang agresif.</p>
            
            <div class="flex justify-center bg-brand-surface rounded-sm border border-brand-border overflow-hidden p-6 mb-10 shadow-inner">
                <img src="/etc/jenis_font.png" alt="Jenis Font" class="max-w-full h-auto object-contain" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each data.fonts as font}
                    <div class="bg-brand-surface border border-brand-border rounded-sm p-6 text-center hover:border-brand-accent hover:shadow-[0_0_15px_rgba(255,215,0,0.05)] transition-all group">
                        {#if font.previewUrl}
                            <img src={font.previewUrl} alt={font.name} class="h-16 mx-auto mb-4 object-contain opacity-85 group-hover:opacity-100 transition-opacity" />
                        {:else}
                            <div class="h-16 flex items-center justify-center mb-4 text-4xl font-bold text-zinc-600 group-hover:text-white transition-colors" style="font-family: {font.name}, sans-serif;">
                                Aa
                            </div>
                        {/if}
                        <h3 class="font-black text-white uppercase tracking-wider text-xs">{font.name}</h3>
                    </div>
                {/each}
            </div>

            <div class="mt-12 pt-6 border-t border-brand-border">
                <a href="/" class="inline-flex items-center text-brand-primary text-xs font-black uppercase tracking-widest hover:text-brand-accent transition-colors">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Kembali ke Beranda
                </a>
            </div>
        </div>
    </div>
</div>
