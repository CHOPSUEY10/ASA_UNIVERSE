<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import ProductGallery from '$lib/components/ProductGallery.svelte';
    import VariantSelector from '$lib/components/VariantSelector.svelte';
    import PatchSelector from '$lib/components/PatchSelector.svelte';
    import KerahSelector from '$lib/components/KerahSelector.svelte';
    import FontSelector from '$lib/components/FontSelector.svelte';
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

    let initialKerah = data.variants.kerah[0]?.id || null;
    let selectedKerah = $state<number | null>(initialKerah);
    
    let initialPatch = data.variants.patch[0]?.id || null;
    let selectedPatch = $state<number | null>(initialPatch);
    
    let initialSize = data.variants.size[0]?.id || null;
    let selectedSize = $state<number | null>(initialSize);
    
    let initialKain = data.variants.kain[0]?.id || null;
    let selectedKain = $state<number | null>(initialKain);
    
    let initialFont = data.variants.font && data.variants.font.length > 0 ? data.variants.font[0].id : null;
    let selectedFont = $state<number | null>(initialFont);
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

        if (!selectedSize || !designFileUrl || !selectedKerah || !selectedPatch || !selectedKain || !selectedFont) {
            toast.add('Silakan pilih semua varian (termasuk font) dan unggah desain Anda', 'error');
            return;
        }

        const cartItem = {
            id: `${product.id}-${designFileUrl}-${selectedKerah}-${selectedPatch}-${selectedSize}-${selectedKain}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.images[0]?.url || '',
            variants: {
                designFileUrl: designFileUrl,
                kerah: variants.kerah.find((v: any) => v.id === selectedKerah)?.name,
                patch: variants.patch.find((v: any) => v.id === selectedPatch)?.name,
                size: variants.size.find((v: any) => v.id === selectedSize)?.name,
                kain: variants.kain.find((v: any) => v.id === selectedKain)?.name,
                fontName: variants.font.find((v: any) => v.id === selectedFont)?.name,
                fontPreviewUrl: variants.font.find((v: any) => v.id === selectedFont)?.previewUrl,
                kerahId: selectedKerah,
                patchId: selectedPatch,
                sizeId: selectedSize,
                kainId: selectedKain,
                fontId: selectedFont
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

        if (!selectedSize || !designFileUrl || !selectedKerah || !selectedPatch || !selectedKain || !selectedFont) {
            toast.add('Silakan pilih semua varian (termasuk font) dan unggah desain Anda', 'error');
            return;
        }

        const phone = config.whatsapp.csNumber;
        const text = `Halo ASA Universe! Saya ingin memesan:\n\n` +
            `*Produk:* ${product.name}\n` +
            `*Kain:* ${variants.kain.find((v: any) => v.id === selectedKain)?.name}\n` +
            `*Kerah:* ${variants.kerah.find((v: any) => v.id === selectedKerah)?.name}\n` +
            `*Patch:* ${variants.patch.find((v: any) => v.id === selectedPatch)?.name}\n` +
            `*Font:* ${variants.font.find((v: any) => v.id === selectedFont)?.name}\n` +
            `*Ukuran:* ${variants.size.find((v: any) => v.id === selectedSize)?.name}\n` +
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

<div class="bg-white min-h-screen pt-12 pb-20 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 flex items-center">
            <a href="/" class="hover:text-gray-900 transition-colors">Home</a>
            <span class="mx-2">/</span>
            <a href="/products" class="hover:text-gray-900 transition-colors">Katalog</a>
            <span class="mx-2">/</span>
            <span class="text-gray-900 truncate">{product.name}</span>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <!-- Product Images -->
            <div class="lg:sticky lg:top-24 h-fit">
                <ProductGallery images={product.images} />
            </div>

            <!-- Product Info -->
            <div>
                <h1 class="text-3xl sm:text-4xl font-black text-gray-900 mb-2 uppercase tracking-tight">{product.name}</h1>
                <p class="text-2xl font-bold text-[#990000] mb-6">{formatter.format(product.price)}</p>

                <div class="prose max-w-none mb-10 text-gray-600 text-sm leading-relaxed">
                    <p>{product.description}</p>
                </div>

                <div class="space-y-8 bg-white border border-gray-200 shadow-sm p-8 rounded-sm mb-8">
                    <h3 class="text-sm font-bold uppercase tracking-wider border-b border-gray-200 pb-2 mb-6">Customize Your Gear</h3>
                    
                    <!-- Design Upload -->
                    <div class="space-y-3">
                        <label class="block text-xs font-bold uppercase tracking-wider text-gray-700">Upload Design <span class="text-[#990000]">*</span></label>
                        
                        {#if designFileUrl}
                            <div class="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-sm">
                                <div class="flex items-center space-x-3 overflow-hidden">
                                    {#if designFile?.type.startsWith('image/')}
                                        <div class="h-12 w-12 rounded-sm overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                                            <img src={designFileUrl} alt="Design preview" class="h-full w-full object-cover" />
                                        </div>
                                    {:else}
                                        <div class="h-12 w-12 rounded-sm bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0 border border-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    {/if}
                                    <div class="truncate">
                                        <p class="text-sm font-bold text-gray-900 truncate">{designFile?.name || 'design-file'}</p>
                                        <a href={designFileUrl} target="_blank" class="text-xs font-bold text-[#990000] uppercase tracking-wider hover:underline">View File</a>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button type="button" onclick={() => uploadFileInput?.click()} class="p-2 text-gray-400 hover:text-gray-900 transition-colors" title="Ganti File">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </button>
                                    <button type="button" onclick={removeDesign} class="p-2 text-[#990000] hover:text-red-700 transition-colors" title="Hapus File">
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
                                class="w-full border-2 border-dashed border-gray-300 hover:border-[#990000] rounded-sm p-8 flex flex-col items-center justify-center transition-colors bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {#if isUploading}
                                    <svg class="animate-spin h-8 w-8 text-[#990000] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span class="text-xs font-bold uppercase tracking-wider text-gray-900">Uploading...</span>
                                {:else}
                                    <div class="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4 group-hover:border-[#990000] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400 group-hover:text-[#990000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <span class="text-sm font-bold text-gray-900 mb-1">Click to upload design</span>
                                    <span class="text-xs text-gray-500">JPG, PNG, or PDF (Max 10MB)</span>
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
                        label="Fabric Type" 
                        options={variants.kain} 
                        selectedId={selectedKain} 
                        onSelect={(id) => selectedKain = id as number} 
                    />

                    <KerahSelector 
                        kerahs={variants.kerah} 
                        selectedId={selectedKerah} 
                        onSelect={(id) => selectedKerah = id as number} 
                    />

                    <PatchSelector 
                        patches={variants.patch} 
                        selectedId={selectedPatch} 
                        onSelect={(id) => selectedPatch = id as number} 
                    />

                    <VariantSelector 
                        label="Size" 
                        options={variants.size} 
                        selectedId={selectedSize} 
                        onSelect={(id) => selectedSize = id as number} 
                    />

                    {#if variants.font && variants.font.length > 0}
                        <FontSelector 
                            fonts={variants.font} 
                            selectedId={selectedFont} 
                            onSelect={(id) => selectedFont = id as number} 
                        />
                    {/if}

                    <!-- Quantity -->
                    <QuantitySelector 
                        {quantity} 
                        onChange={(q) => quantity = q} 
                        max={product.stock > 0 ? product.stock : 99} 
                    />
                </div>

                <!-- Action Buttons -->
                <div class="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 flex gap-3 md:relative md:border-t-0 md:bg-transparent md:p-0 md:flex-row shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:shadow-none">
                    <button 
                        type="button" 
                        onclick={handleAddToCart}
                        class="flex-1 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-4 py-4 md:px-6 md:py-5 rounded-sm font-bold uppercase tracking-widest transition-all text-center flex justify-center items-center gap-2 text-xs md:text-sm shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        <span class="hidden sm:inline">Add to Cart</span>
                        <span class="sm:hidden">Cart</span>
                    </button>
                    <button 
                        type="button" 
                        onclick={handleBuyViaWhatsapp}
                        class="flex-[2] md:flex-1 bg-[#111] hover:bg-black text-white px-4 py-4 md:px-6 md:py-5 rounded-sm font-bold uppercase tracking-widest transition-all text-center flex justify-center items-center gap-2 text-xs md:text-sm shadow-lg shadow-black/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
328:                         </svg>
329:                         Buy Via Whatsapp
330:                     </button>
331:                 </div>
332:                 <!-- Extra padding at bottom for mobile to prevent content hiding behind sticky bar -->
333:                 <div class="h-24 md:hidden"></div>
334:             </div>
335:         </div>
336:     </div>
337: </div>
