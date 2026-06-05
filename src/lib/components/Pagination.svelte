<script lang="ts">
    let { currentPage = 1, totalPages = 1, onPageChange }: {
        currentPage?: number;
        totalPages?: number;
        onPageChange: (page: number) => void;
    } = $props();
</script>

{#if totalPages > 1}
    <div class="flex items-center justify-center space-x-2">
        <button 
            type="button" 
            onclick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            class="px-4 py-2 border border-gray-200 bg-white text-xs font-bold uppercase tracking-widest rounded-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            Prev
        </button>
        
        <div class="hidden sm:flex space-x-2">
            {#each Array(totalPages) as _, i}
                <button
                    type="button"
                    onclick={() => onPageChange(i + 1)}
                    class={`w-10 h-10 flex items-center justify-center text-xs font-bold rounded-sm transition-colors ${currentPage === i + 1 ? 'bg-[#111] text-white border border-[#111]' : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                    {i + 1}
                </button>
            {/each}
        </div>
        
        <button 
            type="button" 
            onclick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            class="px-4 py-2 border border-gray-200 bg-white text-xs font-bold uppercase tracking-widest rounded-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            Next
        </button>
    </div>
{/if}
