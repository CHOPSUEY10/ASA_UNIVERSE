<script lang="ts">
    let { quantity = $bindable(1), max = 99, min = 1, onChange = () => {} }: {
        quantity?: number;
        max?: number;
        min?: number;
        onChange?: (newQuantity: number) => void;
    } = $props();

    function increment() {
        if (quantity < max) {
            quantity += 1;
            onChange(quantity);
        }
    }

    function decrement() {
        if (quantity > min) {
            quantity -= 1;
            onChange(quantity);
        }
    }
</script>

<div class="flex items-center space-x-4 mb-6">
    <h3 class="text-sm font-medium text-gray-300 uppercase tracking-wide">Jumlah</h3>
    <div class="flex items-center border border-zinc-700 rounded-md bg-zinc-900 overflow-hidden">
        <button 
            type="button" 
            onclick={decrement}
            disabled={quantity <= min}
            class="px-4 py-2 text-gray-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            -
        </button>
        <span class="px-4 py-2 text-white font-medium min-w-[3rem] text-center">{quantity}</span>
        <button 
            type="button" 
            onclick={increment}
            disabled={quantity >= max}
            class="px-4 py-2 text-gray-400 hover:text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
            +
        </button>
    </div>
</div>
