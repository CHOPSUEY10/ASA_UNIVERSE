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
</script>

<div class="mb-6">
    <h3 class="text-sm font-medium text-gray-300 mb-4 uppercase tracking-wide">Pilih Font Jersey</h3>
    
    {#if fonts.length === 0}
        <p class="text-sm text-gray-500 italic">Belum ada pilihan font yang tersedia.</p>
    {:else}
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {#each fonts as font}
                <button
                    type="button"
                    onclick={() => onSelect(font.id)}
                    class={`relative group overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        selectedId === font.id 
                        ? 'border-red-600 shadow-lg shadow-red-600/50' 
                        : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                >
                    <!-- Image Container -->
                    <div class="aspect-video bg-zinc-900 overflow-hidden relative">
                        {#if font.previewUrl}
                            <img 
                                src={font.previewUrl} 
                                alt={font.name}
                                class="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300 bg-white"
                            />
                        {:else}
                            <div class="w-full h-full flex items-center justify-center">
                                <div class="text-center">
                                    <svg class="w-8 h-8 text-zinc-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span class="text-xs text-zinc-500">No image</span>
                                </div>
                            </div>
                        {/if}
                    </div>

                    <!-- Overlay on hover/select -->
                    {#if selectedId === font.id}
                        <div class="absolute inset-0 bg-red-600/20 flex items-center justify-center pointer-events-none">
                            <svg class="w-6 h-6 text-red-400 drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    {/if}

                    <!-- Label -->
                    <div class="bg-zinc-950/80 px-2 py-2 text-center border-t border-zinc-800">
                        <p class="text-xs font-medium text-gray-300 truncate">{font.name}</p>
                    </div>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
</style>
