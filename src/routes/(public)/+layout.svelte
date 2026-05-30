<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { onMount } from 'svelte';
    import { cart } from '$lib/stores/cart';
    
    let { children } = $props();

    onMount(() => {
        cart.init();
    });
</script>

<div class="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-red-500 selection:text-white">
    <Header />
    
    <main class="flex-grow">
        {@render children()}
    </main>

    <Footer />
</div>
