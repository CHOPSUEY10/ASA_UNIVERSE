<script lang="ts">
    let { existingImages = [], files = $bindable([]), keptImages = $bindable([]) }: {
        existingImages?: { id: number; url: string }[];
        files?: File[];
        keptImages?: { id: number; url: string }[];
    } = $props();
    
    let fileInput: HTMLInputElement;
    let previews: { id: string; url: string; file: File }[] = $state([]);

    $effect(() => {
        keptImages = [...existingImages];
    });

    $effect(() => {
        files = previews.map(p => p.file);
    });

    function handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            const newFiles = Array.from(target.files);
            const newPreviews = newFiles.map(file => ({
                id: crypto.randomUUID(),
                url: URL.createObjectURL(file),
                file
            }));
            previews = [...previews, ...newPreviews];
            
            // Clear input so we can select same file again if needed
            target.value = '';
        }
    }

    function removePreview(id: string) {
        previews = previews.filter(p => p.id !== id);
    }

    function removeExisting(id: number) {
        keptImages = keptImages.filter(img => img.id !== id);
    }

    function replacePreview(id: string, event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            const file = target.files[0];
            previews = previews.map(p => {
                if (p.id === id) {
                    URL.revokeObjectURL(p.url);
                    return { ...p, url: URL.createObjectURL(file), file };
                }
                return p;
            });
        }
    }
</script>

<div class="space-y-4">
    <div class="flex items-center justify-between">
        <label class="block text-sm font-medium text-gray-300">Gambar Produk</label>
        <button 
            type="button" 
            onclick={() => fileInput.click()} 
            class="text-sm text-red-500 hover:text-red-400 font-medium flex items-center transition-colors"
        >
            <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Gambar
        </button>
        <input 
            type="file" 
            bind:this={fileInput} 
            accept="image/*" 
            multiple 
            class="hidden" 
            onchange={handleFileChange} 
        />
    </div>

    <!-- Hidden inputs to pass data to form actions -->
    {#each keptImages as img}
        <input type="hidden" name="keptImages" value={img.id} />
    {/each}

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <!-- Existing Images -->
        {#each keptImages as img (img.id)}
            <div class="relative group aspect-square rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
                <img src={img.url} alt="Product Image" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button 
                        type="button" 
                        onclick={() => removeExisting(img.id)} 
                        class="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        title="Hapus Gambar"
                    >
                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        {/each}

        <!-- New Image Previews -->
        {#each previews as preview (preview.id)}
            <div class="relative group aspect-square rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
                <img src={preview.url} alt="Preview" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2">
                    <div class="flex space-x-2">
                        <!-- Replace Button -->
                        <label class="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer" title="Ganti Gambar">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <input type="file" accept="image/*" class="hidden" onchange={(e) => replacePreview(preview.id, e)} />
                        </label>

                        <!-- Remove Button -->
                        <button 
                            type="button" 
                            onclick={() => removePreview(preview.id)} 
                            class="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            title="Batal Tambah"
                        >
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        {/each}

        {#if keptImages.length === 0 && previews.length === 0}
            <div class="col-span-full py-8 text-center border-2 border-dashed border-zinc-800 rounded-lg">
                <p class="text-sm text-gray-500">Belum ada gambar yang ditambahkan.</p>
            </div>
        {/if}
    </div>
</div>
