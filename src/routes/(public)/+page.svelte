<script lang="ts">
    import ProductGrid from '$lib/components/ProductGrid.svelte';
    
    let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
    <title>ASA Universe - Premium Custom Jersey</title>
    <meta name="description" content="ASA Universe menyediakan pembuatan jersey custom premium untuk berbagai cabang olahraga. Kualitas terbaik, desain elegan." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-cover bg-center overflow-hidden h-[600px] flex items-center" style="background-image: url('/uploads/hero.jpg')">
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div class="md:w-2/3">
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                TINGKATKAN <span class="text-red-600">PERFORMA</span><br/>TIM ANDA
            </h1>
            <p class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                Jersey custom premium dengan kualitas bahan terbaik. Didesain khusus untuk kenyamanan dan kebanggaan tim saat bertanding.
            </p>
            <div>
                <a href="/products" class="inline-block px-8 py-3 bg-[#990000] hover:bg-red-800 text-white font-bold rounded transition-colors text-sm uppercase tracking-wider">
                    Explore Collection
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Quick Links Section -->
<section class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#faq" class="bg-white p-6 flex justify-between items-center rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all group">
                <div class="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-800">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <span class="font-bold text-gray-900 uppercase tracking-wide">Cara Order</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-400 group-hover:text-[#990000] transition-colors">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </a>
            <a href="/products" class="bg-white p-6 flex justify-between items-center rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-all group">
                <div class="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-800">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    <span class="font-bold text-gray-900 uppercase tracking-wide">Katalog</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-400 group-hover:text-[#990000] transition-colors">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </a>
        </div>
    </div>
</section>

<!-- Featured Products Section -->
<section class="py-16 bg-gray-50 border-t border-gray-200/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10 pb-4 border-b border-gray-300">
            <h2 class="text-2xl font-black text-gray-900 uppercase tracking-tight">Produk Populer</h2>
            <p class="text-gray-500 text-sm mt-1">Koleksi jersey terbaik dari ASA Universe</p>
        </div>
        
        <ProductGrid products={data.featuredProducts} />
        
        <div class="mt-10 text-center md:hidden">
            <a href="/products" class="inline-block px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors uppercase text-sm font-semibold">
                Lihat Semua Produk
            </a>
        </div>
    </div>
</section>

<!-- Customization Section -->
<section class="py-16 bg-gray-100 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10 pb-4 border-b border-gray-300">
            <h2 class="text-2xl font-black text-[#990000] uppercase tracking-tight">Kustomisasi Jersey Anda</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div class="aspect-w-1 aspect-h-1 bg-gray-100 rounded mb-4 overflow-hidden flex items-center justify-center">
                    <div class="w-full h-full bg-[#111] p-4 flex flex-col gap-1 items-center justify-center">
                        <div class="w-full h-2 bg-gray-700 rounded-sm"></div>
                        <div class="w-full h-2 bg-gray-700 rounded-sm"></div>
                        <div class="w-full h-2 bg-gray-700 rounded-sm"></div>
                        <div class="w-full h-2 bg-gray-700 rounded-sm"></div>
                    </div>
                </div>
                <h3 class="font-bold text-gray-900 text-sm uppercase">Size Chart</h3>
                <p class="text-xs text-gray-500 mt-1 mb-3">Panduan ukuran jersey untuk semua pilihan.</p>
                <div class="text-right">
                    <span class="text-[#990000]">→</span>
                </div>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div class="aspect-w-1 aspect-h-1 bg-gray-100 rounded mb-4 overflow-hidden flex items-center justify-center">
                    <div class="w-full h-full bg-[#111] p-4 flex items-center justify-center">
                        <div class="w-16 h-12 border-t-4 border-l-4 border-r-4 border-gray-600 rounded-t-lg"></div>
                    </div>
                </div>
                <h3 class="font-bold text-gray-900 text-sm uppercase">Model Kerah</h3>
                <p class="text-xs text-gray-500 mt-1 mb-3">Pilihan model kerah sesuai kebutuhan tim.</p>
                <div class="text-right">
                    <span class="text-[#990000]">→</span>
                </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div class="aspect-w-1 aspect-h-1 bg-gray-100 rounded mb-4 overflow-hidden flex items-center justify-center">
                    <div class="w-full h-full bg-[#111] flex items-center justify-center">
                        <span class="text-[#990000] font-black text-5xl italic tracking-tighter">26</span>
                    </div>
                </div>
                <h3 class="font-bold text-gray-900 text-sm uppercase">Jenis Font</h3>
                <p class="text-xs text-gray-500 mt-1 mb-3">Berbagai pilihan font nama dan nomor.</p>
                <div class="text-right">
                    <span class="text-[#990000]">→</span>
                </div>
            </div>

            <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div class="aspect-w-1 aspect-h-1 bg-gray-100 rounded mb-4 overflow-hidden flex items-center justify-center">
                    <div class="w-full h-full bg-[#111] flex items-center justify-center overflow-hidden relative">
                        <div class="w-24 h-24 rounded-full border-4 border-[#990000] opacity-80 absolute -right-4 -bottom-4"></div>
                        <div class="w-16 h-16 rounded-full border-4 border-[#990000] opacity-80 absolute -left-2 -top-2"></div>
                    </div>
                </div>
                <h3 class="font-bold text-gray-900 text-sm uppercase">Patch Logo</h3>
                <p class="text-xs text-gray-500 mt-1 mb-3">Pilih patch emblem klub impian tim anda.</p>
                <div class="text-right">
                    <span class="text-[#990000]">→</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Location Section -->
<section class="py-16 bg-white border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10">
            <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tight">Kunjungi <span class="text-[#990000]">Toko Kami</span></h2>
            <p class="text-gray-500 text-sm mt-1 uppercase tracking-widest">
                Lihat langsung kualitas bahan dan hasil printing jersey ASA Universe di workshop kami.
            </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div class="h-96 rounded-sm overflow-hidden border border-gray-200 shadow-sm">
                <!-- Replace with real google maps iframe -->
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8156757.052933032!2d102.13731542566728!3d-3.400974185673756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d973005205c239%3A0x8be46109e314f2b2!2sAsa%20Kopi!5e0!3m2!1sen!2sid!4v1780664843211!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            
            <div class="space-y-6">
                <div class="bg-gray-50 border border-gray-200 p-8 rounded-sm shadow-sm">
                    <div class="flex items-center mb-4">
                        <svg class="w-6 h-6 text-[#990000] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <h4 class="text-gray-900 font-bold uppercase tracking-wider">Alamat Workshop</h4>
                    </div>
                    <p class="text-gray-600 text-sm ml-9">Jl. Matador, Bukit Cermin, Kec. Tanjungpinang Bar.,<br/>Kota Tanjung Pinang, Kepulauan Riau 29124</p>
                </div>
                
                <div class="bg-gray-50 border border-gray-200 p-8 rounded-sm shadow-sm">
                    <div class="flex items-center mb-4">
                        <svg class="w-6 h-6 text-[#990000] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h4 class="text-gray-900 font-bold uppercase tracking-wider">Jam Operasional</h4>
                    </div>
                    <p class="text-gray-600 text-sm ml-9">Senin - Sabtu: 09:00 - 17:00 WIB<br>Minggu: Libur</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Marquee -->
<div class="bg-[#990000] text-white py-3 overflow-hidden border-y-4 border-red-900">
    <div class="whitespace-nowrap animate-marquee flex gap-4 text-sm font-bold tracking-widest uppercase">
        <span>VELOCITY • PRECISION • ASA UNIVERSE • GEAR FOR ELITES • PUSH LIMITS •</span>
        <span>VELOCITY • PRECISION • ASA UNIVERSE • GEAR FOR ELITES • PUSH LIMITS •</span>
        <span>VELOCITY • PRECISION • ASA UNIVERSE • GEAR FOR ELITES • PUSH LIMITS •</span>
    </div>
</div>

<!-- FAQ Section -->
<section id="faq" class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 border-b border-gray-200 pb-4">
            <span class="bg-[#990000] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest inline-block mb-4">Support Center</span>
            <h2 class="text-3xl font-black text-gray-900 uppercase tracking-tight">Frequently Asked <span class="text-[#990000]">Questions</span></h2>
            <p class="text-gray-500 text-sm mt-2">Everything you need to know about ASA UNIVERSE products, processes, and<br/>performance gear. High-speed support for high-performance athletes.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="md:col-span-1">
                <nav class="flex flex-col space-y-1">
                    <button class="text-left px-4 py-3 bg-gray-50 border-l-4 border-[#990000] text-gray-900 font-bold text-sm">Ordering & Payments</button>
                    <button class="text-left px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium text-sm transition-colors">Shipping & Delivery</button>
                    <button class="text-left px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium text-sm transition-colors">Returns & Exchanges</button>
                    <button class="text-left px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium text-sm transition-colors">Customization</button>
                </nav>
            </div>
            
            <div class="md:col-span-3 space-y-8">
                <!-- Ordering & Payments -->
                <div>
                    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-[#990000]"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>
                        Ordering & Payments
                    </h3>
                    <div class="space-y-4">
                        <details class="group bg-white rounded-sm border border-gray-200 [&_summary::-webkit-details-marker]:hidden open:bg-gray-50">
                            <summary class="flex justify-between items-center font-bold text-sm cursor-pointer list-none p-5 text-gray-900">
                                <span>Berapa minimal order pemesanan?</span>
                                <span class="transition group-open:rotate-180 text-gray-400">
                                    <svg fill="none" height="16" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                Minimal order di ASA Universe adalah 12 pcs per desain/tim. Untuk penambahan pemain setelah order utama minimal 1 pcs bisa dilayani dengan harga menyesuaikan.
                            </div>
                        </details>
                    </div>
                </div>

                <!-- Shipping & Delivery -->
                <div>
                    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-[#990000]"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                        Shipping & Delivery
                    </h3>
                    <div class="space-y-4">
                        <details class="group bg-white rounded-sm border border-gray-200 [&_summary::-webkit-details-marker]:hidden open:bg-gray-50">
                            <summary class="flex justify-between items-center font-bold text-sm cursor-pointer list-none p-5 text-gray-900">
                                <span>Berapa lama waktu produksinya?</span>
                                <span class="transition group-open:rotate-180 text-gray-400">
                                    <svg fill="none" height="16" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                Waktu produksi standar adalah 10-14 hari kerja terhitung setelah desain disetujui (ACC Desain) dan Down Payment (DP) diterima.
                            </div>
                        </details>
                    </div>
                </div>

                <!-- Customization -->
                <div>
                    <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-[#990000]"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.879-3.879a1.5 1.5 0 1 0-2.121-2.121l-3.879 3.879a15.991 15.991 0 0 0-4.648 4.764m3.869-3.869a1.5 1.5 0 1 1-2.121 2.121 1.5 1.5 0 0 1 2.121-2.121Z" /></svg>
                        Customization
                    </h3>
                    <div class="space-y-4">
                        <details class="group bg-white rounded-sm border border-gray-200 [&_summary::-webkit-details-marker]:hidden open:bg-gray-50">
                            <summary class="flex justify-between items-center font-bold text-sm cursor-pointer list-none p-5 text-gray-900">
                                <span>Apakah bisa custom desain sendiri?</span>
                                <span class="transition group-open:rotate-180 text-gray-400">
                                    <svg fill="none" height="16" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div class="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                Tentu saja! Kami menerima custom desain 100% dari Anda. Tim desainer kami juga siap membantu merealisasikan ide desain jersey tim Anda.
                            </div>
                        </details>
                    </div>
                </div>

                <!-- Contact Support Box -->
                <div class="bg-gray-50 p-6 rounded-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden mt-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32 absolute -right-4 -bottom-4 text-gray-200 transform rotate-12">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                    <div class="relative z-10 text-center sm:text-left">
                        <h4 class="font-black text-gray-900 uppercase">Still Have Questions?</h4>
                        <p class="text-sm text-gray-500">Our athlete support specialists are available 24/7 to assist you.</p>
                    </div>
                    <div class="relative z-10">
                        <a href="#kontak" class="inline-flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-900 uppercase hover:bg-gray-50 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            Email Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
