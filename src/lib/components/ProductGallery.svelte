<script lang="ts">
    let { images = [] }: { images?: { id: number; url: string; isPrimary?: boolean }[] } = $props();
    
    let initialImage = (images.find(img => img.isPrimary) || images[0])?.url || '';
    let activeImage = $state(initialImage);

    function setActive(url: string) {
        activeImage = url;
    }
</script>

<div class="flex flex-col gap-4">
    <!-- Main Image -->
    <div class="w-full aspect-w-4 aspect-h-5 bg-gray-50 rounded-sm overflow-hidden border border-gray-200">
        {#if activeImage}
            <img src={activeImage} alt="Product" class="object-cover w-full h-full" />
        {:else}
            <div class="flex items-center justify-center h-full text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        {/if}
    </div>

    <!-- Thumbnails -->
    {#if images.length > 1}
        <div class="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {#each images as image}
                <button 
                    type="button" 
                    onclick={() => setActive(image.url)}
                    class={`flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${activeImage === image.url ? 'border-[#990000] ring-2 ring-[#990000]/20' : 'border-transparent hover:border-gray-300'}`}
                >
                    <img src={image.url} alt="Thumbnail" class="object-cover w-full h-full" />
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    /* Custom scrollbar for thumbnails */
    .custom-scrollbar::-webkit-scrollbar {
        height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: #f3f4f6; 
        border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #d1d5db; 
        border-radius: 2px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #9ca3af; 
    }
</style>
