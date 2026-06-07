<script lang="ts">
    import { cart, type CartItem } from '$lib/stores/cart';
    import { currencyFormatter } from '$lib/utils';
    
    let { item }: { item: CartItem } = $props();

    function increment() {
        cart.updateQuantity(item.id, item.quantity + 1);
    }

    function decrement() {
        cart.updateQuantity(item.id, item.quantity - 1);
    }

    function remove() {
        cart.removeItem(item.id);
    }
</script>

<div class="flex py-6 border-b border-brand-border last:border-0">
    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border border-brand-border bg-brand-bg">
        {#if item.image}
            <img src={item.image} alt={item.name} class="h-full w-full object-cover object-center" />
        {:else}
            <div class="h-full w-full flex items-center justify-center text-zinc-700 bg-brand-surface">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        {/if}
    </div>

    <div class="ml-4 flex flex-1 flex-col">
        <div>
            <div class="flex justify-between text-sm font-black text-white uppercase tracking-wide">
                <h3>
                    <a href={`/products/${item.productId}`} class="hover:text-brand-accent transition-colors">{item.name}</a>
                </h3>
                <p class="ml-4 text-brand-accent">{currencyFormatter.format(item.price * item.quantity)}</p>
            </div>
            <div class="mt-2 text-xs font-bold text-brand-muted space-y-1">
                {#if item.variants.designFileUrl}
                    <p class="flex items-center space-x-1">
                        <span class="font-black text-white uppercase text-[10px] tracking-wide">Desain:</span>
                        <a href={item.variants.designFileUrl} target="_blank" class="text-brand-primary hover:text-brand-accent underline uppercase tracking-wider">Lihat File</a>
                    </p>
                {/if}
                {#if item.variants.size}<p><span class="font-black text-white uppercase text-[10px] tracking-wide">Ukuran:</span> <span class="text-brand-accent">{item.variants.size}</span></p>{/if}
                {#if item.variants.kain}<p><span class="font-black text-white uppercase text-[10px] tracking-wide">Kain:</span> <span class="text-brand-accent">{item.variants.kain}</span></p>{/if}
                {#if item.variants.kerah}<p><span class="font-black text-white uppercase text-[10px] tracking-wide">Kerah:</span> <span class="text-brand-accent">{item.variants.kerah}</span></p>{/if}
                {#if item.variants.patch}<p><span class="font-black text-white uppercase text-[10px] tracking-wide">Patch:</span> <span class="text-brand-accent">{item.variants.patch}</span></p>{/if}
                {#if item.variants.fontName}<p><span class="font-black text-white uppercase text-[10px] tracking-wide">Font:</span> <span class="text-brand-accent">{item.variants.fontName}</span></p>{/if}
            </div>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm mt-4">
            <div class="flex items-center border border-brand-border rounded-sm bg-brand-surface overflow-hidden shadow-sm">
                <button type="button" onclick={decrement} class="px-3 py-1 text-brand-muted hover:text-white hover:bg-brand-card transition-colors font-black border-r border-brand-border">-</button>
                <span class="px-3 py-1 text-white font-black min-w-[2rem] text-center">{item.quantity}</span>
                <button type="button" onclick={increment} class="px-3 py-1 text-brand-muted hover:text-white hover:bg-brand-card transition-colors font-black border-l border-brand-border">+</button>
            </div>

            <div class="flex">
                <button type="button" onclick={remove} class="font-black text-xs uppercase tracking-widest text-brand-primary hover:text-red-700 transition-colors">Hapus</button>
            </div>
        </div>
    </div>
</div>
