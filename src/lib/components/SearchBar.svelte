<script lang="ts">
    let { value = '', placeholder = 'Cari produk...', onSearch = () => {} }: {
        value?: string;
        placeholder?: string;
        onSearch?: (value: string) => void;
    } = $props();

    let timer: ReturnType<typeof setTimeout>;

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        value = target.value;
        
        clearTimeout(timer);
        timer = setTimeout(() => {
            onSearch(value);
        }, 300); // debounce
    }
</script>

<div class="relative w-full">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
    <input 
        type="text" 
        {value} 
        oninput={handleInput} 
        {placeholder}
        class="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-sm leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#990000] focus:ring-1 focus:ring-[#990000] sm:text-sm transition-colors uppercase tracking-wider" 
    />
</div>
