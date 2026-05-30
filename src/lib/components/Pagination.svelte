<script lang="ts">
    let { currentPage = 1, totalPages = 1, onPageChange }: {
        currentPage?: number;
        totalPages?: number;
        onPageChange: (page: number) => void;
    } = $props();
</script>

{#if totalPages > 1}
    <div class="flex items-center justify-center mt-12 space-x-2">
        <button 
            type="button" 
            onclick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            class="px-4 py-2 border border-zinc-700 bg-zinc-900 text-sm font-medium rounded-md text-gray-300 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            Previous
        </button>
        
        <div class="hidden sm:flex space-x-2">
            {#each Array(totalPages) as _, i}
                <button
                    type="button"
                    onclick={() => onPageChange(i + 1)}
                    class={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === i + 1 ? 'bg-red-600 text-white border border-red-600' : 'border border-zinc-700 bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white'}`}
                >
                    {i + 1}
                </button>
            {/each}
        </div>
        
        <button 
            type="button" 
            onclick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            class="px-4 py-2 border border-zinc-700 bg-zinc-900 text-sm font-medium rounded-md text-gray-300 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            Next
        </button>
    </div>
{/if}
