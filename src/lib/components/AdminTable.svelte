<script lang="ts">
    let { columns = [], data = [], onEdit = () => {}, onDelete = () => {} }: {
        columns?: { key: string; label: string; type?: 'currency' | 'boolean' | 'date' | 'action' }[];
        data?: any[];
        onEdit?: (id: number) => void;
        onDelete?: (id: number) => void;
    } = $props();
</script>

<div class="overflow-x-auto bg-zinc-900 border border-zinc-800 rounded-lg shadow">
    <table class="min-w-full divide-y divide-zinc-800">
        <thead class="bg-zinc-950">
            <tr>
                {#each columns as column}
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {column.label}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody class="divide-y divide-zinc-800 bg-zinc-900">
            {#each data as row}
                <tr class="hover:bg-zinc-800/50 transition-colors">
                    {#each columns as column}
                        <td class="px-6 py-4 whitespace-nowrap">
                            {#if column.type === 'action'}
                                <div class="flex space-x-2">
                                    <button onclick={() => onEdit(row.id)} class="text-blue-500 hover:text-blue-400 font-medium text-sm">Edit</button>
                                    <button onclick={() => onDelete(row.id)} class="text-red-500 hover:text-red-400 font-medium text-sm">Delete</button>
                                </div>
                            {:else if column.type === 'currency'}
                                <div class="text-sm text-gray-300">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(row[column.key])}
                                </div>
                            {:else if column.type === 'boolean'}
                                <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${row[column.key] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {row[column.key] ? 'Yes' : 'No'}
                                </span>
                            {:else}
                                <div class="text-sm text-gray-300">{row[column.key]}</div>
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
            {#if data.length === 0}
                <tr>
                    <td colspan={columns.length} class="px-6 py-12 text-center text-sm text-gray-500">
                        Tidak ada data yang ditemukan.
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>
