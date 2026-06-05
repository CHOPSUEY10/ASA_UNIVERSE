<script lang="ts">
    let { categories = [], selectedCategory = null, onCategorySelect }: {
        categories?: { id: number; name: string }[];
        selectedCategory?: number | null;
        onCategorySelect: (id: number | null) => void;
    } = $props();
</script>

<div class="w-full">
    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
        Categories
    </h3>
    
    <div class="space-y-1">
        <label class="flex items-center gap-3 py-2 cursor-pointer group">
            <input 
                type="radio" 
                name="category" 
                checked={selectedCategory === null}
                onchange={() => onCategorySelect(null)}
                class="text-[#990000] focus:ring-[#990000] cursor-pointer"
            />
            <span class={`text-sm ${selectedCategory === null ? 'font-bold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'} uppercase tracking-wide`}>All Products</span>
        </label>
        {#each categories as category}
            <label class="flex items-center gap-3 py-2 cursor-pointer group">
                <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === category.id}
                    onchange={() => onCategorySelect(category.id)}
                    class="text-[#990000] focus:ring-[#990000] cursor-pointer"
                />
                <span class={`text-sm ${selectedCategory === category.id ? 'font-bold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'} uppercase tracking-wide`}>{category.name}</span>
            </label>
        {/each}
    </div>
</div>
