<script lang="ts">
    import ProductCard from './ProductCard.svelte';
    let { products = [] }: { products?: any[] } = $props();
</script>

{#if products.length === 0}
    <div class="col-span-full py-12 text-center text-gray-500">
        <p>Tidak ada produk ditemukan.</p>
    </div>
{:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {#each products as product (product.id)}
            <ProductCard {product} />
        {/each}
    </div>
{/if}
