<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import ProductGallery from '$lib/components/ProductGallery.svelte';
    import VariantSelector from '$lib/components/VariantSelector.svelte';
    import QuantitySelector from '$lib/components/QuantitySelector.svelte';
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';
    import { config } from '$lib/config';
    import { toast } from '$lib/stores/toast';

    let { data }: { data: import('./$types').PageData } = $props();

    let product = $derived(data.product);
    let variants = $derived(data.variants);

    let designFile = $state<File | null>(null);
    let designFileUrl = $state<string | null>(null);
    let isUploading = $state(false);
    let uploadFileInput: HTMLInputElement | undefined = $state();

    let selectedKerah = $state<number | null>(data.variants.kerah[0]?.id || null);
    let selectedPatch = $state<number | null>(data.variants.patch[0]?.id || null);
    let selectedSize = $state<number | null>(data.variants.size[0]?.id || null);
    let quantity = $state(1);

    const session = authClient.useSession();

    // Format IDR
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    async function handleFileUpload(event: Event) {
        const target = event.target as HTMLInputElement;
        if (!target.files || target.files.length === 0) return;

        designFile = target.files[0];
        isUploading = true;

        const formData = new FormData();
        formData.append('file', designFile);

        try {
            const res = await fetch('/api/upload/design', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                designFileUrl = data.url;
                toast.add('Desain berhasil diunggah!', 'success');
            } else {
                const errorData = await res.json();
                toast.add(`Gagal mengunggah: ${errorData.message}`, 'error');
                designFileUrl = null;
                designFile = null;
            }
        } catch (error) {
            console.error('Upload error', error);
            toast.add('Terjadi kesalahan saat mengunggah desain.', 'error');
            designFileUrl = null;
            designFile = null;
        } finally {
            isUploading = false;
        }
    }

    function removeDesign() {
        designFile = null;
        designFileUrl = null;
        if (uploadFileInput) uploadFileInput.value = '';
    }

    async function handleAddToCart() {
        if (!$session.data?.user) {
            toast.add('Silakan login terlebih dahulu untuk menambahkan produk ke keranjang.', 'error');
            await goto('/login');
            return;
        }

        if (!selectedSize || !designFileUrl || !selectedKerah || !selectedPatch) {
            toast.add('Silakan pilih semua varian dan unggah desain Anda', 'error');
            return;
        }

        const cartItem = {
            id: `${product.id}-${designFileUrl}-${selectedKerah}-${selectedPatch}-${selectedSize}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.images[0]?.url || '',
            variants: {
                designFileUrl: designFileUrl,
                kerah: variants.kerah.find(v => v.id === selectedKerah)?.name,
                patch: variants.patch.find(v => v.id === selectedPatch)?.name,
                size: variants.size.find(v => v.id === selectedSize)?.name,
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

        if (!selectedSize || !designFileUrl || !selectedKerah || !selectedPatch) {
            toast.add('Silakan pilih semua varian dan unggah desain Anda', 'error');
            return;
        }

        const phone = config.whatsapp.csNumber;
        const text = `Halo ASA Universe! Saya ingin memesan:\n\n` +
            `*Produk:* ${product.name}\n` +
            `*Kerah:* ${variants.kerah.find(v => v.id === selectedKerah)?.name}\n` +
            `*Patch:* ${variants.patch.find(v => v.id === selectedPatch)?.name}\n` +
            `*Ukuran:* ${variants.size.find(v => v.id === selectedSize)?.name}\n` +
            `*Jumlah:* ${quantity} pcs\n` +
            `*Desain:* ${designFileUrl}\n\n` +
            `Mohon info lebih lanjut untuk proses pembayarannya. Terima kasih!`;

        const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
    }
</script>

<svelte:head>
    <title>{product.name} | {config.seo.siteName}</title>
    <meta name="description" content={product.description || config.seo.defaultDescription} />
    <meta property="og:title" content={`${product.name} | ${config.seo.siteName}`} />
    <meta property="og:description" content={product.description || config.seo.defaultDescription} />
    <meta property="og:image" content={product.images[0]?.url || config.seo.defaultImage} />
    <meta property="og:type" content="product" />
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
                    <!-- Design Upload -->
                    <div class="space-y-3">
                        <label class="block text-sm font-medium text-gray-300">Unggah Desain Anda <span class="text-red-500">*</span></label>
                        
                        {#if designFileUrl}
                            <div class="flex items-center justify-between p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                                <div class="flex items-center space-x-3 overflow-hidden">
                                    {#if designFile?.type.startsWith('image/')}
                                        <div class="h-12 w-12 rounded overflow-hidden bg-zinc-900 flex-shrink-0">
                                            <img src={designFileUrl} alt="Design preview" class="h-full w-full object-cover" />
                                        </div>
                                    {:else}
                                        <div class="h-12 w-12 rounded bg-zinc-900 flex items-center justify-center text-red-500 flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    {/if}
                                    <div class="truncate">
                                        <p class="text-sm font-medium text-white truncate">{designFile?.name || 'design-file'}</p>
                                        <a href={designFileUrl} target="_blank" class="text-xs text-red-500 hover:text-red-400">Lihat File</a>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button type="button" onclick={() => uploadFileInput?.click()} class="p-2 text-gray-400 hover:text-white transition-colors" title="Ganti File">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                    <button type="button" onclick={removeDesign} class="p-2 text-red-500 hover:text-red-400 transition-colors" title="Hapus File">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        {:else}
                            <button 
                                type="button" 
                                onclick={() => uploadFileInput?.click()}
                                disabled={isUploading}
                                class="w-full border-2 border-dashed border-zinc-700 hover:border-red-500 rounded-lg p-6 flex flex-col items-center justify-center transition-colors bg-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {#if isUploading}
                                    <svg class="animate-spin h-8 w-8 text-red-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span class="text-sm font-medium text-white">Mengunggah...</span>
                                {:else}
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span class="text-sm font-medium text-white mb-1">Klik untuk unggah desain</span>
                                    <span class="text-xs text-gray-500">Mendukung JPG, PNG, atau PDF (Max 10MB)</span>
                                {/if}
                            </button>
                        {/if}
                        
                        <input 
                            type="file" 
                            bind:this={uploadFileInput} 
                            accept=".jpg,.jpeg,.png,.pdf" 
                            class="hidden" 
                            onchange={handleFileUpload} 
                        />
                    </div>

                    
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
                <div class="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 z-50 flex gap-3 md:relative md:border-t-0 md:bg-transparent md:p-0 md:flex-row shadow-[0_-4px_20px_rgba(0,0,0,0.5)] md:shadow-none">
                    <button 
                        type="button" 
                        onclick={handleAddToCart}
                        class="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold transition-all text-center flex justify-center items-center gap-2 text-sm md:text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="hidden sm:inline">Tambah ke Cart</span>
                        <span class="sm:hidden">Cart</span>
                    </button>
                    <button 
                        type="button" 
                        onclick={handleBuyViaWhatsapp}
                        class="flex-[2] md:flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 md:px-6 md:py-4 rounded-xl font-bold transition-all transform md:hover:-translate-y-1 md:hover:shadow-lg md:hover:shadow-green-900/30 text-center flex justify-center items-center gap-2 text-sm md:text-base"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        Beli via WA
                    </button>
                </div>
                <!-- Extra padding at bottom for mobile to prevent content hiding behind sticky bar -->
                <div class="h-24 md:hidden"></div>
            </div>
        </div>
    </div>
</div>
