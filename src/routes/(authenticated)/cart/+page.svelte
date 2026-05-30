<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { toast } from '$lib/stores/toast';
    import CartItem from '$lib/components/CartItem.svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let subtotal = $derived($cart.reduce((total, item) => total + (item.price * item.quantity), 0));
    let totalItems = $derived($cart.reduce((total, item) => total + item.quantity, 0));

    // Format IDR
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    let isCheckingOut = $state(false);

    async function handleCheckout() {
        if ($cart.length === 0) return;
        
        if (totalItems < 12) {
            toast.add('Minimal pemesanan adalah 12 pcs. Silakan tambah produk lagi.', 'error');
            return;
        }
        
        isCheckingOut = true;

        try {
            // 1. Simpan ke database via API
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: $cart,
                    total: subtotal
                })
            });

            if (!response.ok) {
                const data = await response.json();
                toast.add(`Checkout gagal: ${data.error || 'Server error'}`, 'error');
                isCheckingOut = false;
                return;
            }

            const { orderId } = await response.json();

            // 2. Redirect ke WhatsApp
            const phone = '6281234567890'; // Replace with real UMKM number
            
            let text = `Halo ASA Universe! Saya ingin memesan produk-produk berikut dari Keranjang saya:\n`;
            text += `*Order ID:* ${orderId}\n\n`;
            
            $cart.forEach((item, index) => {
                text += `${index + 1}. *${item.name}* (${item.quantity} pcs)\n`;
                text += `   - Warna: ${item.variants.color}\n`;
                text += `   - Kerah: ${item.variants.kerah}\n`;
                text += `   - Patch: ${item.variants.patch}\n`;
                text += `   - Ukuran: ${item.variants.size}\n`;
                text += `   - Sub: ${formatter.format(item.price * item.quantity)}\n\n`;
            });

            text += `*Total Estimasi: ${formatter.format(subtotal)}*\n\n`;
            text += `Mohon info lebih lanjut untuk proses pembayarannya. Terima kasih!`;

            const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
            window.open(waUrl, '_blank');
            
            // 3. Clear cart
            cart.clear();
            toast.add('Berhasil dialihkan ke WhatsApp!', 'success');
            
        } catch (error) {
            console.error(error);
            toast.add("Terjadi kesalahan jaringan saat checkout.", 'error');
        } finally {
            isCheckingOut = false;
        }
    }
</script>

<svelte:head>
    <title>Keranjang Belanja | ASA Universe</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-red-500 selection:text-white">
    <Header />
    
    <main class="flex-grow pt-12 pb-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold text-white uppercase tracking-wider mb-8">Keranjang <span class="text-red-600">Belanja</span></h1>

            {#if $cart.length === 0}
                <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-zinc-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 class="text-xl font-bold text-white mb-2">Keranjang Anda kosong</h2>
                    <p class="text-gray-400 mb-6">Sepertinya Anda belum menambahkan produk apapun ke keranjang.</p>
                    <a href="/products" class="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                        Mulai Belanja
                    </a>
                </div>
            {:else}
                <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div class="lg:col-span-8">
                        <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                            {#each $cart as item (item.id)}
                                <CartItem {item} />
                            {/each}
                        </div>
                    </div>

                    <!-- Order Summary -->
                    <div class="mt-8 lg:mt-0 lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24">
                        <h2 class="text-lg font-bold text-white mb-4 border-b border-zinc-800 pb-4">Ringkasan Pesanan</h2>
                        
                        <div class="flow-root mb-6">
                            <dl class="-my-4 text-sm divide-y divide-zinc-800">
                                <div class="py-4 flex items-center justify-between">
                                    <dt class="text-gray-400">Total Item</dt>
                                    <dd class="font-medium text-white">{totalItems} pcs</dd>
                                </div>
                                <div class="py-4 flex items-center justify-between">
                                    <dt class="text-base font-bold text-white">Total Estimasi</dt>
                                    <dd class="text-lg font-bold text-red-500">{formatter.format(subtotal)}</dd>
                                </div>
                            </dl>
                        </div>

                        {#if totalItems < 12}
                            <div class="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
                                Minimal pemesanan adalah 12 pcs. <br/>(Kurang {12 - totalItems} pcs lagi)
                            </div>
                        {/if}

                        <button
                            type="button"
                            onclick={handleCheckout}
                            disabled={isCheckingOut || totalItems < 12}
                            class="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/30 text-center flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                        >
                            {#if isCheckingOut}
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Memproses...
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                </svg>
                                Checkout via WhatsApp
                            {/if}
                        </button>
                        <p class="text-xs text-gray-500 mt-4 text-center">Checkout akan diarahkan ke WhatsApp Customer Service kami untuk konfirmasi lebih lanjut.</p>
                    </div>
                </div>
            {/if}
        </div>
    </main>

    <Footer />
</div>
