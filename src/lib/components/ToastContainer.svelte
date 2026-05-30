<script lang="ts">
    import { toast } from '$lib/stores/toast';
    import { fly, fade } from 'svelte/transition';
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    {#each $toast as t (t.id)}
        <div
            in:fly={{ x: 50, duration: 300 }}
            out:fade={{ duration: 200 }}
            class="px-4 py-3 rounded-lg shadow-lg border flex items-center min-w-[300px] text-sm font-medium {t.type === 'success' ? 'bg-green-900 border-green-700 text-green-100' : t.type === 'error' ? 'bg-red-900 border-red-700 text-red-100' : 'bg-zinc-800 border-zinc-700 text-zinc-100'}"
        >
            <div class="flex-grow">{t.message}</div>
            <button onclick={() => toast.remove(t.id)} class="ml-4 text-white/50 hover:text-white" aria-label="Tutup">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    {/each}
</div>
