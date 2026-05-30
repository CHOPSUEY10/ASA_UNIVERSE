<script lang="ts">
    import { cart, type CartItem } from '$lib/stores/cart';
    
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

<div class="flex py-6 border-b border-zinc-800 last:border-0">
    <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-zinc-700 bg-zinc-900">
        {#if item.image}
            <img src={item.image} alt={item.name} class="h-full w-full object-cover object-center" />
        {:else}
            <div class="h-full w-full flex items-center justify-center text-zinc-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        {/if}
    </div>

    <div class="ml-4 flex flex-1 flex-col">
        <div>
            <div class="flex justify-between text-base font-medium text-white">
                <h3>
                    <a href={`/products/${item.productId}`}>{item.name}</a>
                </h3>
                <p class="ml-4 text-red-500">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price * item.quantity)}</p>
            </div>
            <div class="mt-1 text-sm text-gray-400 space-y-1">
                {#if item.variants.color}<p>Warna: {item.variants.color}</p>{/if}
                {#if item.variants.size}<p>Ukuran: {item.variants.size}</p>{/if}
                {#if item.variants.kerah}<p>Kerah: {item.variants.kerah}</p>{/if}
                {#if item.variants.patch}<p>Patch: {item.variants.patch}</p>{/if}
            </div>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
            <div class="flex items-center border border-zinc-700 rounded-md bg-zinc-900 overflow-hidden">
                <button type="button" onclick={decrement} class="px-2 py-1 text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors">-</button>
                <span class="px-2 py-1 text-white min-w-[2rem] text-center">{item.quantity}</span>
                <button type="button" onclick={increment} class="px-2 py-1 text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors">+</button>
            </div>

            <div class="flex">
                <button type="button" onclick={remove} class="font-medium text-red-600 hover:text-red-500 transition-colors">Hapus</button>
            </div>
        </div>
    </div>
</div>
