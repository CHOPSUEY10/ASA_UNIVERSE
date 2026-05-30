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
            <div class="w-full md:w-64 flex-shrink-0">
                <!-- Mobile Collapsible Wrapper -->
                <details class="md:hidden group bg-zinc-900 border border-zinc-800 rounded-xl mb-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex justify-between items-center p-4 cursor-pointer font-bold text-white">
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                            Filter & Cari
                        </span>
                        <span class="transition group-open:rotate-180">
                            <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div class="p-4 border-t border-zinc-800 space-y-6">
                        <SearchBar value={searchValue} onSearch={handleSearch} />
                        <FilterSidebar 
                            categories={data.categories} 
                            {selectedCategory} 
                            onCategorySelect={handleCategorySelect} 
                        />
                    </div>
                </details>

                <!-- Desktop Sidebar -->
                <div class="hidden md:block space-y-6">
                    <SearchBar value={searchValue} onSearch={handleSearch} />
                    <FilterSidebar 
                        categories={data.categories} 
                        {selectedCategory} 
                        onCategorySelect={handleCategorySelect} 
                    />
                </div>
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
