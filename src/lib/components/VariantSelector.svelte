<script lang="ts">
    let { label, options, selectedId = null, onSelect }: {
        label: string;
        options: { id: number | string; name: string; value?: string }[];
        selectedId?: number | string | null;
        onSelect: (id: number | string) => void;
    } = $props();
</script>

<div class="mb-6">
    <h3 class="text-sm font-medium text-gray-300 mb-3 uppercase tracking-wide">{label}</h3>
    <div class="flex flex-wrap gap-3">
        {#each options as option}
            <button
                type="button"
                onclick={() => onSelect(option.id)}
                class={`px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 ${
                    selectedId === option.id 
                    ? 'border-red-600 bg-red-600/10 text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.2)]' 
                    : 'border-zinc-700 bg-zinc-900 text-gray-300 hover:border-gray-500 hover:bg-zinc-800'
                }`}
            >
                {option.name}
            </button>
        {/each}
    </div>
</div>
