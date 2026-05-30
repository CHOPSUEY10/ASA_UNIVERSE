<script lang="ts">
    import { enhance } from '$app/forms';
    import ImageUploader from './ImageUploader.svelte';

    let { isOpen = false, product = null, kains = [], onClose = () => {}, isSaving = false }: {
        isOpen: boolean;
        product?: any;
        kains: any[];
        onClose: () => void;
        isSaving?: boolean;
    } = $props();

    let newFiles: File[] = $state([]);
    let keptImages: any[] = $state([]);


    let action = $derived(product ? '?/update' : '?/create');
    let title = $derived(product ? 'Edit Produk' : 'Tambah Produk');

    // Auto generate slug from name
    let name = $state('');
    let slug = $state('');

    $effect(() => {
        if (product) {
            name = product.name;
            slug = product.slug;
        } else if (!product && isOpen) {
            name = '';
            slug = '';
        }
    });

    function generateSlug(e: Event) {
        const val = (e.target as HTMLInputElement).value;
        if (!product) { // Only auto generate on create
            slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
    }
</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <div class="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-6 w-full max-w-2xl my-8">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-bold text-white">{title}</h3>
                <button onclick={onClose} class="text-gray-400 hover:text-white transition-colors" aria-label="Tutup">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <form method="POST" {action} enctype="multipart/form-data" use:enhance={({ formData }) => {
                isSaving = true;
                
                // Append new files
                newFiles.forEach(file => {
                    formData.append('newImages', file);
                });
                
                // keptImages input is already generated inside ImageUploader 
                // but if we want to be safe we can let it be handled by hidden inputs there

                return async ({ update }) => {
                    await update();
                    isSaving = false;
                    onClose();
                };
            }} class="space-y-4">
                {#if product}
                    <input type="hidden" name="id" value={product.id} />
                {/if}

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-300 mb-1">Nama Produk</label>
                        <input type="text" id="name" name="name" bind:value={name} oninput={generateSlug} required class="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 text-sm" />
                    </div>

                    <div>
                        <label for="slug" class="block text-sm font-medium text-gray-300 mb-1">Slug</label>
                        <input type="text" id="slug" name="slug" bind:value={slug} required class="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-gray-400 focus:ring-red-500 focus:border-red-500 text-sm" />
                    </div>
                </div>

                <div>
                    <label for="description" class="block text-sm font-medium text-gray-300 mb-1">Deskripsi</label>
                    <textarea id="description" name="description" rows="3" value={product?.description ?? ''} class="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 text-sm"></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label for="price" class="block text-sm font-medium text-gray-300 mb-1">Harga (Rp)</label>
                        <input type="number" id="price" name="price" value={product?.price ?? 0} required min="0" class="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 text-sm" />
                    </div>

                    <div>
                        <label for="stock" class="block text-sm font-medium text-gray-300 mb-1">Stok</label>
                        <input type="number" id="stock" name="stock" value={product?.stock ?? 0} required min="0" class="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 text-sm" />
                    </div>

                    <div>
                        <label for="kainId" class="block text-sm font-medium text-gray-300 mb-1">Kain</label>
                        <select id="kainId" name="kainId" value={product?.kainId ?? ''} required class="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-red-500 text-sm">
                            <option value="" disabled>Pilih Kain</option>
                            {#each kains as kain}
                                <option value={kain.id}>{kain.nama}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <!-- Image Uploader Component -->
                <div class="pt-4 border-t border-zinc-800">
                    <ImageUploader 
                        existingImages={product?.images ?? []} 
                        bind:files={newFiles} 
                        bind:keptImages={keptImages} 
                    />
                </div>

                <div class="flex items-center space-x-6 pt-4 border-t border-zinc-800">
                    <label class="flex items-center">
                        <input type="checkbox" name="isActive" value="true" checked={product ? product.isActive : true} class="w-4 h-4 text-red-600 bg-zinc-950 border-zinc-800 rounded focus:ring-red-500 focus:ring-offset-zinc-900" />
                        <span class="ml-2 text-sm font-medium text-gray-300">Active</span>
                    </label>

                    <label class="flex items-center">
                        <input type="checkbox" name="isFeatured" value="true" checked={product ? product.isFeatured : false} class="w-4 h-4 text-red-600 bg-zinc-950 border-zinc-800 rounded focus:ring-red-500 focus:ring-offset-zinc-900" />
                        <span class="ml-2 text-sm font-medium text-gray-300">Featured</span>
                    </label>
                </div>

                <div class="flex justify-end space-x-3 pt-4 border-t border-zinc-800">
                    <button 
                        type="button" 
                        onclick={onClose} 
                        disabled={isSaving}
                        class="px-4 py-2 text-sm font-medium text-gray-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                    >
                        {#if isSaving}
                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Menyimpan...
                        {:else}
                            Simpan
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
