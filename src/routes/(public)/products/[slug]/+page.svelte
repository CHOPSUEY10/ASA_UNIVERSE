<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import ProductGallery from '$lib/components/ProductGallery.svelte';
    import VariantSelector from '$lib/components/VariantSelector.svelte';
    import QuantitySelector from '$lib/components/QuantitySelector.svelte';
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';

    import { toast } from '$lib/stores/toast';

    let { data }: { data: import('./$types').PageData } = $props();

    const { product, variants } = data;

    let selectedColor = $state<number | null>(variants.color[0]?.id || null);
    let selectedKerah = $state<number | null>(variants.kerah[0]?.id || null);
    let selectedPatch = $state<number | null>(variants.patch[0]?.id || null);
    let selectedSize = $state<number | null>(variants.size[0]?.id || null);
    let quantity = $state(1);

    const session = authClient.useSession();

    // Format IDR
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    async function handleAddToCart() {
        if (!$session.data?.user) {
            toast.add('Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.', 'error');
            await goto('/login');
            return;
        }

        if (!selectedSize || !selectedColor || !selectedKerah || !selectedPatch) {
            toast.add('Silakan pilih semua varian (Warna, Kerah, Patch, Ukuran)', 'error');
            return;
        }

        const cartItem = {
            id: `${product.id}-${selectedColor}-${selectedKerah}-${selectedPatch}-${selectedSize}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.images[0]?.url || '',
            variants: {
                color: variants.color.find(v => v.id === selectedColor)?.name,
                kerah: variants.kerah.find(v => v.id === selectedKerah)?.name,
                patch: variants.patch.find(v => v.id === selectedPatch)?.name,
                size: variants.size.find(v => v.id === selectedSize)?.name,
                colorId: selectedColor,
                kerahId: selectedKerah,
                patchId: selectedPatch,
                sizeId: selectedSize
            }
        };

        await cart.addItem(cartItem);
        toast.add('Produk berhasil ditambahkan ke keranjang!', 'success');
    }

    async function handleBuyViaWhatsapp() {
        if (!$session.data?.user) {
            toast.add('Silakan login terlebih dahulu untuk melakukan pembelian.', 'error');
            await goto('/login');
            return;
        }

        if (!selectedSize || !selectedColor || !selectedKerah || !selectedPatch) {
            toast.add('Silakan pilih semua varian (Warna, Kerah, Patch, Ukuran)', 'error');
            return;
        }

        const phone = '6281234567890'; // Replace with real UMKM number
        const text = `Halo ASA Universe! Saya ingin memesan:\n\n` +
            `*Produk:* ${product.name}\n` +
            `*Warna:* ${variants.color.find(v => v.id === selectedColor)?.name}\n` +
            `*Kerah:* ${variants.kerah.find(v => v.id === selectedKerah)?.name}\n` +
            `*Patch:* ${variants.patch.find(v => v.id === selectedPatch)?.name}\n` +
            `*Ukuran:* ${variants.size.find(v => v.id === selectedSize)?.name}\n` +
            `*Jumlah:* ${quantity} pcs\n\n` +
            `Mohon info lebih lanjut untuk proses pembayarannya. Terima kasih!`;

        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
    }
</script>

<svelte:head>
    <title>{product.name} | ASA Universe</title>
</svelte:head>

<div class="bg-black min-h-screen pt-24 pb-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="text-sm text-gray-500 mb-8 flex items-center">
            <a href="/" class="hover:text-red-500 transition-colors">Home</a>
            <span class="mx-2">/</span>
            <a href="/products" class="hover:text-red-500 transition-colors">Katalog</a>
            <span class="mx-2">/</span>
            <span class="text-gray-300 truncate">{product.name}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Product Images -->
            <div class="lg:sticky lg:top-24 h-fit">
                <ProductGallery images={product.images} />
            </div>

            <!-- Product Info -->
            <div>
                <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">{product.name}</h1>
                <p class="text-2xl font-bold text-red-600 mb-6">{formatter.format(product.price)}</p>

                <div class="prose prose-invert prose-red max-w-none mb-8 text-gray-400">
                    <p>{product.description}</p>
                </div>

                <div class="space-y-6 bg-zinc-900 border border-zinc-800 p-6 rounded-xl mb-8">
                    <!-- Variants -->
                    <VariantSelector 
                        label="Warna" 
                        options={variants.color} 
                        selectedId={selectedColor} 
                        onSelect={(id) => selectedColor = id as number} 
                    />
                    
                    <VariantSelector 
                        label="Model Kerah" 
                        options={variants.kerah} 
                        selectedId={selectedKerah} 
                        onSelect={(id) => selectedKerah = id as number} 
                    />

                    <VariantSelector 
                        label="Jenis Patch Logo" 
                        options={variants.patch} 
                        selectedId={selectedPatch} 
                        onSelect={(id) => selectedPatch = id as number} 
                    />

                    <VariantSelector 
                        label="Ukuran" 
                        options={variants.size} 
                        selectedId={selectedSize} 
                        onSelect={(id) => selectedSize = id as number} 
                    />

                    <!-- Quantity -->
                    <QuantitySelector 
                        {quantity} 
                        onChange={(q) => quantity = q} 
                        max={product.stock > 0 ? product.stock : 99} 
                    />
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4">
                    <button 
                        type="button" 
                        onclick={handleAddToCart}
                        class="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-6 py-4 rounded-xl font-bold transition-all text-center flex justify-center items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Tambah ke Cart
                    </button>
                    <button 
                        type="button" 
                        onclick={handleBuyViaWhatsapp}
                        class="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/30 text-center flex justify-center items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        Beli via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
