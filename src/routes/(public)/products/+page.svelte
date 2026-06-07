<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import SearchBar from '$lib/components/SearchBar.svelte';
    import FilterSidebar from '$lib/components/FilterSidebar.svelte';
    import ProductGrid from '$lib/components/ProductGrid.svelte';
    import Pagination from '$lib/components/Pagination.svelte';

    let { data }: { data: import('./$types').PageData } = $props();

    let searchValue = $state($page.url.searchParams.get('q') || '');
    let selectedCategory = $state($page.url.searchParams.get('category') ? Number($page.url.searchParams.get('category')) : null);
    let sortValue = $state($page.url.searchParams.get('sort') || 'newest');

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

    function handleSortChange(value: string) {
        sortValue = value;
        updateParams({ sort: value });
    }
</script>

<svelte:head>
    <title>Katalog Produk | ASA Universe</title>
</svelte:head>

<div class="bg-brand-bg min-h-screen text-white">
    <!-- Header Banner -->
    <div class="bg-brand-surface border-b border-brand-border text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between py-10">
            <div>
                <h1 class="text-3xl font-black uppercase tracking-widest text-brand-primary">CHAMPIONSHIP <span class="text-white">COLLECTION</span></h1>
                <p class="text-xs text-brand-muted uppercase tracking-wider mt-1.5 font-bold">Road to World Cup 2026 Jersey Catalog</p>
            </div>
            <div class="mt-4 sm:mt-0 text-xs font-black tracking-widest text-brand-accent bg-brand-primary/10 border border-brand-primary/20 px-3 py-1.5 rounded-sm uppercase">
                TOTAL SQUAD GEAR: {data.pagination.totalItems} MODELS
            </div>
        </div>
    </div>

    <!-- Main Content Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex flex-col lg:flex-row gap-8">
            
            <!-- Left Sidebar -->
            <div class="w-full lg:w-64 flex-shrink-0">
                <!-- Mobile Collapsible Wrapper -->
                <details class="lg:hidden group bg-brand-card border border-brand-border rounded-sm mb-6 [&_summary::-webkit-details-marker]:hidden">
                    <summary class="flex justify-between items-center p-4 cursor-pointer font-black text-white uppercase text-sm tracking-wider">
                        <span class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                            Filters
                        </span>
                        <span class="transition group-open:rotate-180 text-brand-accent">
                            <svg fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                    </summary>
                    <div class="p-4 border-t border-brand-border space-y-6">
                        <SearchBar value={searchValue} onSearch={handleSearch} />
                        <FilterSidebar 
                            categories={data.categories} 
                            {selectedCategory} 
                            onCategorySelect={handleCategorySelect} 
                        />
                    </div>
                </details>

                <!-- Desktop Sidebar -->
                <div class="hidden lg:block space-y-8">
                    <SearchBar value={searchValue} onSearch={handleSearch} />
                    <FilterSidebar 
                        categories={data.categories} 
                        {selectedCategory} 
                        onCategorySelect={handleCategorySelect} 
                    />
                    <!-- Price Range (Simulated UI based on Figma) -->
                    <div>
                        <h3 class="text-sm font-black text-white uppercase tracking-wider mb-4 border-b border-brand-border pb-2">Price Range</h3>
                        <div class="flex items-center gap-2 mb-4">
                            <input type="text" value="10k" class="w-full text-xs font-bold p-2.5 border border-brand-border bg-brand-bg text-white text-center rounded-sm" readonly>
                            <span class="text-zinc-500 font-bold">-</span>
                            <input type="text" value="500k" class="w-full text-xs font-bold p-2.5 border border-brand-border bg-brand-bg text-white text-center rounded-sm" readonly>
                        </div>
                        <button class="w-full bg-brand-surface text-white text-xs font-black uppercase tracking-widest py-3 hover:bg-brand-card border border-brand-border transition-colors rounded-sm">
                            Clear All
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Content Area -->
            <div class="flex-1">
                <!-- Top bar inside content area -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-brand-border">
                    <div class="text-xs text-brand-muted uppercase tracking-widest font-black">
                        Showing {(data.pagination.currentPage - 1) * 12 + 1}-{Math.min(data.pagination.currentPage * 12, data.pagination.totalItems)} of {data.pagination.totalItems} results
                    </div>
                    <div class="flex items-center gap-2">
                        <label for="sort" class="text-xs font-black text-brand-muted uppercase tracking-widest">Sort By:</label>
                        <select 
                            id="sort" 
                            class="bg-brand-card border border-brand-border text-white text-sm font-black focus:ring-0 focus:border-brand-primary cursor-pointer p-2.5 rounded-sm uppercase tracking-wide"
                            onchange={(e) => handleSortChange(e.currentTarget.value)}
                            value={sortValue}
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                        <div class="hidden sm:flex items-center gap-1 ml-4 border-l border-brand-border pl-4 text-zinc-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-brand-accent">
                                <path fill-rule="evenodd" d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <ProductGrid products={data.products} />
                
                <div class="mt-12 flex justify-center border-t border-brand-border pt-8">
                    <Pagination 
                        currentPage={data.pagination.currentPage} 
                        totalPages={data.pagination.totalPages} 
                        onPageChange={handlePageChange} 
                    />
                </div>
            </div>
        </div>
    </div>
</div>
