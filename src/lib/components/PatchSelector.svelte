<script lang="ts">
    import { onMount } from 'svelte';

    let { 
        patches = [], 
        selectedId = null, 
        onSelect 
    }: {
        patches: { id: number; nama: string; harga?: number }[];
        selectedId?: number | null;
        onSelect: (id: number) => void;
    } = $props();

    let patchImages = $state<Record<number, string>>({});
    let loadingImages = $state(true);

    onMount(async () => {
        try {
            for (const patch of patches) {
                const response = await fetch(`/api/patch/${patch.id}`);
                if (response.ok) {
                    const images = await response.json();
                    // Ambil gambar pertama jika ada
                    if (Array.isArray(images) && images.length > 0) {
                        patchImages[patch.id] = images[0].url;
                    }
                }
            }
        } catch (error) {
            console.error('Error loading patch images:', error);
        } finally {
            loadingImages = false;
        }
    });
</script>

<div class="mb-6">
    <h3 class="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Jenis Patch Logo</h3>
    
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {#each patches as patch}
            <button
                type="button"
                onclick={() => onSelect(patch.id)}
                class={`relative group overflow-hidden rounded-sm border transition-all duration-200 ${
                    selectedId === patch.id 
                    ? 'border-[#990000] shadow-sm shadow-[#990000]/20' 
                    : 'border-zinc-700 hover:border-zinc-500'
                }`}
            >
                <!-- Image Container -->
                <div class="aspect-square bg-zinc-900 overflow-hidden">
                    {#if patchImages[patch.id]}
                        <img 
                            src={patchImages[patch.id]} 
                            alt={patch.nama}
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    {:else}
                        <div class="w-full h-full flex items-center justify-center">
                            <div class="text-center">
                                <svg class="w-6 h-6 text-zinc-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    {/if}
                </div>

                <!-- Overlay on hover/select -->
                {#if selectedId === patch.id}
                    <div class="absolute inset-0 border-2 border-[#990000] pointer-events-none"></div>
                {/if}

                <!-- Label -->
                <div class="bg-zinc-950 px-2 py-2 text-center border-t border-zinc-800">
                    <p class="text-[10px] font-bold text-white truncate uppercase tracking-widest">{patch.nama}</p>
                    {#if patch.harga}
                        <p class="text-[10px] text-gray-400 mt-1">Rp {patch.harga.toLocaleString('id-ID')}</p>
                    {/if}
                </div>
            </button>
        {/each}
    </div>

    {#if loadingImages}
        <p class="text-xs text-gray-400 mt-3 uppercase tracking-widest">Loading patches...</p>
    {/if}
</div>

<style>
</style>
