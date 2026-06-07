<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>Collar Models | ASA Universe</title>
</svelte:head>

<div class="min-h-screen bg-brand-bg py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-brand-card p-8 rounded-sm shadow-lg border border-brand-border">
            <span class="text-brand-accent text-xs font-black uppercase tracking-widest font-mono">Collar Customization</span>
            <h1 class="text-3xl font-black text-white uppercase tracking-tight mb-4 mt-1">Collar Models Guide</h1>
            <p class="text-brand-muted mb-8 text-sm leading-relaxed">Setiap model kerah didesain untuk merepresentasikan identitas dan gaya bermain tim Anda. Pilih yang paling sesuai dengan kebutuhan fungsional dan estetika jersey kustom Anda.</p>
            
            <div class="flex justify-center bg-brand-surface rounded-sm border border-brand-border overflow-hidden p-6 mb-10 shadow-inner">
                <img src="/etc/model_kerah.png" alt="Model Kerah" class="max-w-full h-auto object-contain" />
            </div>

            <div class="mt-10 bg-brand-surface border border-brand-border rounded-sm overflow-hidden shadow-sm">
                <table class="w-full text-left text-sm">
                    <thead class="bg-brand-card border-b border-brand-border">
                        <tr>
                            <th class="px-6 py-4 font-black text-white uppercase tracking-wider text-xs">Nama Model</th>
                            <th class="px-6 py-4 font-black text-white uppercase tracking-wider text-right text-xs">Harga (Rp)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-brand-border">
                        {#each data.kerahs as kerah}
                            <tr class="hover:bg-brand-card/40 transition-colors">
                                <td class="px-6 py-4 font-black text-brand-primary uppercase text-xs tracking-wider">{kerah.nama}</td>
                                <td class="px-6 py-4 text-brand-accent font-bold text-right text-xs">
                                    {kerah.harga > 0 ? '+ ' + new Intl.NumberFormat('id-ID').format(kerah.harga) : 'Gratis'}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
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
