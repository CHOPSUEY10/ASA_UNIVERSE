<script lang="ts">
    let { categories = [], selectedCategory = null, onCategorySelect }: {
        categories?: { id: number; name: string }[];
        selectedCategory?: number | null;
        onCategorySelect: (id: number | null) => void;
    } = $props();
</script>

<div class="w-full md:w-64 flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-xl p-5 h-fit sticky top-24">
    <h3 class="text-lg font-bold text-white mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filter Kategori
    </h3>
    
    <div class="space-y-2">
        <button 
            type="button" 
            onclick={() => onCategorySelect(null)}
            class={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm font-medium ${selectedCategory === null ? 'bg-red-600/10 text-red-500 border border-red-600/50' : 'text-gray-400 hover:text-white hover:bg-zinc-800'}`}
        >
            Semua Produk
        </button>
        {#each categories as category}
            <button 
                type="button" 
                onclick={() => onCategorySelect(category.id)}
                class={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm font-medium ${selectedCategory === category.id ? 'bg-red-600/10 text-red-500 border border-red-600/50' : 'text-gray-400 hover:text-white hover:bg-zinc-800'}`}
            >
                {category.name}
            </button>
        {/each}
    </div>
</div>
