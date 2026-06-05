<script lang="ts">
    let { label, options, selectedId = null, onSelect }: {
        label: string;
        options: { id: number | string; name: string; value?: string }[];
        selectedId?: number | string | null;
        onSelect: (id: number | string) => void;
    } = $props();
</script>

<div class="mb-6">
    <h3 class="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">{label}</h3>
    <div class="flex flex-wrap gap-2">
        {#each options as option}
            <button
                type="button"
                onclick={() => onSelect(option.id)}
                class={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm border transition-all duration-200 ${
                    selectedId === option.id 
                    ? 'border-[#111] bg-[#111] text-white shadow-sm' 
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}
            >
                {option.name}
            </button>
        {/each}
    </div>
</div>
