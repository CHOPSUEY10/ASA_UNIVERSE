<script lang="ts">
    import { cart } from '$lib/stores/cart';
    import { toast } from '$lib/stores/toast';
    import CartItem from '$lib/components/CartItem.svelte';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { config } from '$lib/config';

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
            const phone = config.whatsapp.csNumber;
            
            let text = `Halo ASA Universe! Saya ingin memesan produk-produk berikut dari Keranjang saya:\n`;
            text += `*Order ID:* ${orderId}\n\n`;
            
            $cart.forEach((item, index) => {
                text += `${index + 1}. *${item.name}* (${item.quantity} pcs)\n`;
                text += `   - Desain: ${item.variants.designFileUrl ? `${window.location.origin}/admin/desain-customer?orderId=${orderId}` : '-'}\n`;
                text += `   - Kain: ${item.variants.kain}\n`;
                text += `   - Kerah: ${item.variants.kerah}\n`;
                text += `   - Patch: ${item.variants.patch}\n`;
                text += `   - Font: ${item.variants.fontName}\n`;
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
    <title>Squad Configuration | ASA Universe</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-brand-bg text-white font-sans selection:bg-brand-primary selection:text-white">
    <Header />
    
    <main class="flex-grow pt-12 pb-20 border-t border-brand-border">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-black text-white uppercase tracking-widest mb-8">Squad <span class="text-brand-accent">Configuration</span></h1>

            {#if $cart.length === 0}
                <div class="bg-brand-card border border-brand-border rounded-sm p-16 text-center shadow-lg">
                    <svg class="h-16 w-16 mx-auto text-brand-primary mb-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 class="text-xl font-black text-white mb-2 uppercase tracking-widest">Your squad is not ready yet.</h2>
                    <p class="text-brand-muted mb-8 text-sm max-w-md mx-auto">Start building your team's jersey. Pick fabric, collar types, custom patches, and elite fonts to equip your club.</p>
                    <a href="/products" class="inline-block bg-brand-primary hover:bg-red-800 text-white px-8 py-4 rounded-sm font-black uppercase tracking-widest transition-all duration-300 shadow-md">
                        Start Customizing
                    </a>
                </div>
            {:else}
                <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    <div class="lg:col-span-8">
                        <div class="bg-brand-card border border-brand-border rounded-sm p-6 shadow-md">
                            {#each $cart as item (item.id)}
                                <CartItem {item} />
                            {/each}
                        </div>
                    </div>

                    <!-- Order Summary -->
                    <div class="mt-8 lg:mt-0 lg:col-span-4 lg:sticky lg:top-24">
                        <div class="bg-brand-card border border-brand-border rounded-sm p-6 shadow-md mb-24 lg:mb-0">
                            <h2 class="text-xs font-black text-white mb-4 border-b border-brand-border pb-4 uppercase tracking-widest">Squad Summary</h2>
                            
                            <div class="flow-root mb-6">
                                <dl class="-my-4 text-sm divide-y divide-brand-border">
                                    <div class="py-4 flex items-center justify-between">
                                        <dt class="text-brand-muted font-bold text-xs uppercase tracking-wide">Total Quantity</dt>
                                        <dd class="font-black text-white">{totalItems} jerseys</dd>
                                    </div>
                                    <div class="py-4 flex items-center justify-between">
                                        <dt class="text-xs font-black text-white uppercase tracking-wider">Estimated Total</dt>
                                        <dd class="text-lg font-black text-brand-accent">{formatter.format(subtotal)}</dd>
                                    </div>
                                </dl>
                            </div>

                            {#if totalItems < 12}
                                <div class="mb-4 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary p-4 rounded-sm text-xs text-center font-bold uppercase tracking-wider leading-relaxed">
                                    Minimum squad configuration requires 12 jerseys. <br/>
                                    <span class="text-brand-accent">(Deficit of {12 - totalItems} pcs)</span>
                                </div>
                            {/if}

                            <!-- Sticky Action Bar for Mobile -->
                            <div class="fixed bottom-0 left-0 right-0 p-4 bg-brand-bg/95 backdrop-blur-md border-t border-brand-border z-50 lg:relative lg:border-t-0 lg:bg-transparent lg:p-0 lg:flex-row shadow-[0_-4px_20px_rgba(0,0,0,0.5)] lg:shadow-none">
                                <div class="flex items-center justify-between lg:hidden mb-4 px-2">
                                    <span class="text-brand-muted text-xs font-black uppercase tracking-wider">Estimated Total:</span>
                                    <span class="text-brand-accent font-black text-lg">{formatter.format(subtotal)}</span>
                                </div>
                                <button
                                    type="button"
                                    onclick={handleCheckout}
                                    disabled={isCheckingOut || totalItems < 12}
                                    class="w-full bg-brand-primary hover:bg-red-800 text-white px-4 py-4 lg:px-6 lg:py-5 rounded-sm font-black uppercase tracking-widest transition-all text-center flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-primary/20"
                                >
                                    {#if isCheckingOut}
                                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Order...
                                    {:else}
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                        </svg>
                                        <span class="hidden lg:inline">Confirm Squad via WhatsApp</span>
                                        <span class="lg:hidden">Confirm via WhatsApp</span>
                                    {/if}
                                </button>
                                <p class="text-[10px] font-bold text-brand-muted mt-3 text-center uppercase tracking-wider">Checkout will route directly to customer service.</p>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </main>

    <Footer />
</div>
