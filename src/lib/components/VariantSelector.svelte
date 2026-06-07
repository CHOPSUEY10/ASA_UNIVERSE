<script lang="ts">
    let { label, options, selectedId = null, onSelect }: {
        label: string;
        options: { id: number | string; name: string; value?: string }[];
        selectedId?: number | string | null;
        onSelect: (id: number | string) => void;
    } = $props();
</script>

<div class="mb-6">
    <h3 class="text-xs font-black text-gray-400 mb-3 uppercase tracking-wider">{label}</h3>
    <div class="flex flex-wrap gap-2">
        {#each options as option}
            <button
                type="button"
                onclick={() => onSelect(option.id)}
                class={`px-4 py-2.5 text-xs font-black uppercase tracking-widest rounded-sm border transition-all duration-200 ${
                    selectedId === option.id 
                    ? 'border-brand-primary bg-brand-primary text-white shadow-sm shadow-brand-primary/20' 
                    : 'border-brand-border bg-brand-bg text-brand-muted hover:border-brand-primary hover:bg-brand-surface hover:text-white'
                }`}
            >
                {option.name}
            </button>
        {/each}
    </div>
</div>
