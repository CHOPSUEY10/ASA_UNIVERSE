<script lang="ts">
    let { 
        fonts = [], 
        selectedId = null, 
        onSelect 
    }: {
        fonts: { id: number; name: string; previewUrl: string }[];
        selectedId?: number | null;
        onSelect: (id: number) => void;
    } = $props();

    let selectedFontData = $derived(fonts.find(f => f.id === selectedId));
</script>

<div class="mb-6">
    <h3 class="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Pilih Font Jersey</h3>
    
    {#if fonts.length === 0}
        <p class="text-xs text-gray-400 italic">Belum ada pilihan font yang tersedia.</p>
    {:else}
        <div class="space-y-4">
            <!-- Dropdown -->
            <div class="relative">
                <select
                    class="w-full bg-zinc-950 border border-zinc-700 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#990000] focus:ring-1 focus:ring-[#990000] transition-colors appearance-none cursor-pointer text-sm font-bold uppercase tracking-wider"
                    value={selectedId || ''}
                    onchange={(e) => onSelect(Number(e.currentTarget.value))}
                >
                    <option value="" disabled>-- Pilih Font --</option>
                    {#each fonts as font}
                        <option value={font.id}>{font.name}</option>
                    {/each}
                </select>
                <!-- Custom Arrow -->
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <!-- Preview Image -->
            {#if selectedFontData}
                <div class="mt-4 p-4 bg-zinc-900 border border-zinc-800 rounded-sm shadow-inner">
                    <p class="text-xs font-bold text-gray-400 mb-3 text-center uppercase tracking-widest">Preview Font:</p>
                    <div class="w-full h-48 md:h-64 flex items-center justify-center bg-zinc-950 border border-zinc-700 rounded-sm p-4 overflow-hidden relative">
                        {#if selectedFontData.previewUrl}
                            <img 
                                src={selectedFontData.previewUrl} 
                                alt={selectedFontData.name}
                                class="max-w-full max-h-full object-contain"
                            />
                        {:else}
                            <span class="text-zinc-600 text-xs font-bold uppercase tracking-wider">Preview tidak tersedia</span>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
</style>
