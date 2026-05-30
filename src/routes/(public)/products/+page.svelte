<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import FilterSidebar from '$lib/components/FilterSidebar.svelte';
    import ProductGrid from '$lib/components/ProductGrid.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    let { data }: { data: import('./$types').PageData } = $props();

    let searchValue = $page.url.searchParams.get('q') || '';
    let selectedCategory = $page.url.searchParams.get('category') ? Number($page.url.searchParams.get('category')) : null;

    function updateParams(updates: Record<string, string | null>) {
        const url = new URL($page.url);
        for (const [key, value] of Object.entries(updates)) {
            if (value === null) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, value);
            }
        }
        // Reset page to 1 when filters change (unless updating page itself)
        if (!updates.page && url.searchParams.has('page')) {
            url.searchParams.set('page', '1');
        }
        goto(url.toString(), { keepFocus: true, noScroll: false });
    }

    function handleSearch(value: string) {
        searchValue = value;
        updateParams({ q: value || null });
    }

    function handleCategorySelect(categoryId: number | null) {
        selectedCategory = categoryId;
        updateParams({ category: categoryId?.toString() || null });
    }

    function handlePageChange(newPage: number) {
        updateParams({ page: newPage.toString() });
    }
</script>

<svelte:head>
    <title>Katalog Produk | ASA Universe</title>
</svelte:head>

<div class="bg-black min-h-screen pt-24 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10 text-center md:text-left">
            <h1 class="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider mb-2">Katalog <span class="text-red-600">Produk</span></h1>
            <p class="text-gray-400">Temukan jersey custom terbaik untuk tim Anda</p>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
            <!-- Sidebar -->
            <div class="w-full md:w-64 flex-shrink-0 space-y-6">
                <SearchBar value={searchValue} onSearch={handleSearch} />
                <FilterSidebar 
                    categories={data.categories} 
                    {selectedCategory} 
                    onCategorySelect={handleCategorySelect} 
                />
            </div>

            <!-- Main Content -->
            <div class="flex-1">
                <div class="mb-6 flex justify-between items-center bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <span class="text-gray-400 text-sm">Menampilkan <span class="text-white font-medium">{data.products.length}</span> dari <span class="text-white font-medium">{data.pagination.totalItems}</span> produk</span>
                </div>

                <ProductGrid products={data.products} />
                
                <Pagination 
                    currentPage={data.pagination.currentPage} 
                    totalPages={data.pagination.totalPages} 
                    onPageChange={handlePageChange} 
                />
            </div>
        </div>
    </div>
</div>
