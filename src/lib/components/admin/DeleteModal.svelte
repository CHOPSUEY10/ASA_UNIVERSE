<script lang="ts">
    import { enhance } from '$app/forms';

    let { isOpen = false, title = 'Confirm Deletion', message = 'Are you sure you want to delete this item?', itemId = 0, onClose = () => {}, isDeleting = false }: {
        isOpen: boolean;
        title?: string;
        message?: string;
        itemId: number;
        onClose: () => void;
        isDeleting?: boolean;
    } = $props();
</script>

{#if isOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <h3 class="text-xl font-bold text-white mb-2">{title}</h3>
            <p class="text-gray-400 text-sm mb-6">{message}</p>
            
            <form method="POST" action="?/delete" use:enhance={() => {
                isDeleting = true;
                return async ({ update }) => {
                    await update();
                    isDeleting = false;
                    onClose();
                };
            }}>
                <input type="hidden" name="id" value={itemId} />
                <div class="flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onclick={onClose} 
                        disabled={isDeleting}
                        class="px-4 py-2 text-sm font-medium text-gray-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                        Batal
                    </button>
                    <button 
                        type="submit" 
                        disabled={isDeleting}
                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                    >
                        {#if isDeleting}
                            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Menghapus...
                        {:else}
                            Hapus
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
