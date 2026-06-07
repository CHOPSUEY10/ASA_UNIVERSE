<script lang="ts">
    import { currencyFormatter } from '$lib/utils';

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

<a href={`/products/${product.slug}`} class="group block relative bg-brand-card rounded-sm border border-brand-border overflow-hidden hover:shadow-[0_0_20px_rgba(160,0,0,0.25)] hover:border-brand-accent transition-all duration-300">
    <div class="relative aspect-w-3 aspect-h-4 bg-brand-surface w-full overflow-hidden flex items-center justify-center">
        <!-- New Badge (Simulated for visual match) -->
        <div class="absolute top-3 left-3 bg-brand-primary text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest z-10 border border-brand-accent/30 rounded-sm">New</div>

        {#if product.image}
            <img src={product.image} alt={product.name} class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out" loading="lazy" />
        {:else}
            <div class="flex items-center justify-center w-full h-full text-zinc-700 bg-brand-surface">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        {/if}

        <!-- Cart Icon overlay -->
        <button class="absolute bottom-3 right-3 bg-brand-surface text-white p-2.5 rounded-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all z-20 hover:bg-brand-primary border border-brand-border" onclick={(e) => { e.preventDefault(); /* Cart logic */ }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </button>
    </div>
    
    <div class="p-5 border-t border-brand-border bg-brand-card/90">
        <div class="flex justify-between items-start mb-2">
            <h3 class="text-sm font-black text-white uppercase tracking-tight group-hover:text-brand-accent transition-colors line-clamp-2 pr-2">{product.name}</h3>
            <p class="text-brand-accent font-black text-sm whitespace-nowrap">
                {currencyFormatter.format(product.price)}
            </p>
        </div>
        <p class="text-brand-muted text-xs mb-4 line-clamp-2 leading-relaxed">
            Premium custom jersey for peak performance. Engineered for athletes chasing greatness.
        </p>

        <div class="flex justify-between items-center">
            <!-- Simulated color dots -->
            <div class="flex gap-1.5">
                <div class="w-2.5 h-2.5 rounded-full bg-brand-surface border border-brand-border"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-white border border-gray-400"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-brand-primary"></div>
            </div>
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-brand-primary group-hover:text-brand-accent transform group-hover:translate-x-1 transition-all">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
        </div>
    </div>
</a>
