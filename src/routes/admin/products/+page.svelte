<script lang="ts">
    import ProductTable from '$lib/components/admin/ProductTable.svelte';
    import ProductForm from '$lib/components/admin/ProductForm.svelte';
    import DeleteModal from '$lib/components/admin/DeleteModal.svelte';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { toast } from '$lib/stores/toast';
    import type { ActionData, PageData } from './$types';
    import { goto } from '$app/navigation';

    let { data, form }: { data: PageData, form: ActionData } = $props();

    let isFormOpen = $state(false);
    let isDeleteOpen = $state(false);
    let selectedProduct = $state(null);
    let selectedId = $state(0);

    function openCreate() {
        selectedProduct = null;
        isFormOpen = true;
    }

    function openEdit(id: number) {
        selectedProduct = data.products.find(p => p.id === id);
        isFormOpen = true;
    }

    function openDelete(id: number) {
        selectedId = id;
        isDeleteOpen = true;
    }

    $effect(() => {
        if (form?.error) {
            toast.add(form.error, 'error');
        } else if (form?.success) {
            toast.add(form.message || 'Berhasil!', 'success');
            isFormOpen = false;
            isDeleteOpen = false;
        }
    });

    function handleSearch(q: string) {
        goto(`?q=${encodeURIComponent(q)}&page=1`);
    }

    function handlePageChange(page: number) {
        goto(`?q=${encodeURIComponent(data.q)}&page=${page}`);
    }
</script>

<svelte:head>
    <title>Manajemen Produk | ASA Universe Admin</title>
</svelte:head>

<div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
    <div>
        <h1 class="text-2xl font-bold text-white mb-2">Manajemen Produk</h1>
        <p class="text-gray-400">Kelola katalog produk ASA Universe.</p>
    </div>
    <button onclick={openCreate} class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Produk
    </button>
</div>

<div class="mb-6 max-w-md">
    <SearchBar value={data.q} onSearch={handleSearch} placeholder="Cari nama atau slug produk..." />
</div>

<ProductTable products={data.products} onEdit={openEdit} onDelete={openDelete} />

<div class="mt-6 flex justify-center">
    <Pagination 
        currentPage={data.pagination.page} 
        totalPages={data.pagination.totalPages} 
        onPageChange={handlePageChange}
    />
</div>

<ProductForm 
    isOpen={isFormOpen} 
    product={selectedProduct} 
    kains={data.kains} 
    onClose={() => isFormOpen = false} 
/>

<DeleteModal 
    isOpen={isDeleteOpen} 
    itemId={selectedId} 
    title="Hapus Produk"
    message="Apakah Anda yakin ingin menghapus produk ini? Data yang terhapus tidak dapat dikembalikan."
    onClose={() => isDeleteOpen = false} 
/>
