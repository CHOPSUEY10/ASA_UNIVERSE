<script lang="ts">
    let { product }: {
        product: {
            id: number;
            name: string;
            slug: string;
            price: number;
            image?: string;
            categoryId?: number;
        }
    } = $props();
</script>

<a href={`/products/${product.slug}`} class="group block relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/20">
    <div class="aspect-w-3 aspect-h-4 bg-zinc-800 w-full overflow-hidden">
        {#if product.image}
            <img src={product.image} alt={product.name} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out" loading="lazy" />
        {:else}
            <div class="flex items-center justify-center h-64 bg-zinc-800 text-zinc-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        {/if}
    </div>
    
    <div class="p-4">
        <h3 class="text-lg font-bold text-white mb-1 truncate group-hover:text-red-500 transition-colors">{product.name}</h3>
        <p class="text-red-600 font-semibold text-lg">
            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
        </p>
    </div>
</a>
