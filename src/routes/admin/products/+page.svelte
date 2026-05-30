<script lang="ts">
    import { goto } from '$app/navigation';
    import AdminTable from '$lib/components/AdminTable.svelte';

    let { data }: { data: import('./$types').PageData } = $props();

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nama Produk' },
        { key: 'price', label: 'Harga', type: 'currency' as const },
        { key: 'stock', label: 'Stok' },
        { key: 'isActive', label: 'Aktif', type: 'boolean' as const },
        { key: 'actions', label: 'Aksi', type: 'action' as const }
    ];

    function handleEdit(id: number) {
        goto(`/admin/products/${id}/edit`);
    }

    async function handleDelete(id: number) {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            // For real implementation: call DELETE /api/products/[id]
            alert('Fungsi delete akan diimplementasikan ke endpoint API yang sesuai.');
        }
    }
</script>

<div class="mb-8 flex justify-between items-center">
    <div>
        <h1 class="text-2xl font-bold text-white mb-2">Manajemen Produk</h1>
        <p class="text-gray-400">Kelola katalog produk ASA Universe.</p>
    </div>
    <a href="/admin/products/create" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Produk
    </a>
</div>

<AdminTable {columns} data={data.products} onEdit={handleEdit} onDelete={handleDelete} />
