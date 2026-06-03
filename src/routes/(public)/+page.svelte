<script lang="ts">
    import ProductGrid from '$lib/components/ProductGrid.svelte';
    
    let { data }: { data: import('./$types').PageData } = $props();
    
    // We now use data.featuredProducts loaded from the database
</script>

<svelte:head>
    <title>ASA Universe - Premium Custom Jersey</title>
    <meta name="description" content="ASA Universe menyediakan pembuatan jersey custom premium untuk berbagai cabang olahraga. Kualitas terbaik, desain elegan." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-cover bg-center overflow-hidden" style="background-image: url('/uploads/hero.jpg')">
    <!-- Background styling to look cool -->
    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-red-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24 md:pt-32 md:pb-40">
        <div class="text-center md:text-left md:w-2/3">
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                TINGKATKAN <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">PERFORMA</span> TIM ANDA
            </h1>
            <p class="mt-4 text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
                Jersey custom premium dengan kualitas bahan terbaik. Didesain khusus untuk kenyamanan dan kebanggaan tim saat bertanding.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="/products" class="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-red-600/30 text-center">
                    Lihat Katalog
                </a>
                <a href="#cara-order" class="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-full transition-all border border-zinc-700 text-center">
                    Cara Pesan
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Featured Products Section -->
<section class="py-20 bg-black">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-10 border-b border-zinc-800 pb-4">
            <div>
                <h2 class="text-3xl font-bold text-white uppercase tracking-wider">Produk <span class="text-red-600">Unggulan</span></h2>
                <p class="text-gray-400 mt-2">Koleksi jersey terbaik dari ASA Universe</p>
            </div>
            <a href="/products" class="hidden md:block text-red-500 hover:text-red-400 font-medium group transition-colors">
                Lihat Semua <span class="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
        </div>
        
        <ProductGrid products={data.featuredProducts} />
        
        <div class="mt-10 text-center md:hidden">
            <a href="/products" class="inline-block px-6 py-3 border border-zinc-700 rounded-full text-white hover:bg-zinc-800 transition-colors">
                Lihat Semua Produk
            </a>
        </div>
    </div>
</section>

<!-- Cara Order Section -->
<section id="cara-order" class="py-20 bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-white uppercase tracking-wider mb-4">Cara <span class="text-red-600">Pemesanan</span></h2>
            <p class="text-gray-400 max-w-2xl mx-auto">Proses pemesanan mudah dan transparan via WhatsApp</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center relative group hover:border-red-600 transition-colors">
                <div class="w-16 h-16 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span class="text-2xl font-bold">1</span>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Pilih Produk</h3>
                <p class="text-gray-400 text-sm">Pilih desain jersey dari katalog kami dan tentukan spesifikasi.</p>
            </div>
            <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center relative group hover:border-red-600 transition-colors">
                <div class="w-16 h-16 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span class="text-2xl font-bold">2</span>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Hubungi CS</h3>
                <p class="text-gray-400 text-sm">Klik tombol "Beli via WhatsApp" untuk terhubung dengan tim kami.</p>
            </div>
            <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center relative group hover:border-red-600 transition-colors">
                <div class="w-16 h-16 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span class="text-2xl font-bold">3</span>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Desain & DP</h3>
                <p class="text-gray-400 text-sm">Diskusi desain detail dan lakukan pembayaran Down Payment (DP).</p>
            </div>
            <div class="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center relative group hover:border-red-600 transition-colors">
                <div class="w-16 h-16 bg-red-600/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <span class="text-2xl font-bold">4</span>
                </div>
                <h3 class="text-xl font-bold text-white mb-3">Produksi & Kirim</h3>
                <p class="text-gray-400 text-sm">Pesanan diproduksi lalu dikirim setelah pelunasan dilakukan.</p>
            </div>
        </div>
    </div>
</section>

<!-- FAQ Section -->
<section id="faq" class="py-20 bg-black">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-white uppercase tracking-wider mb-4">Frequently Asked <span class="text-red-600">Questions</span></h2>
        </div>

        <div class="space-y-4">
            <!-- FAQ Item 1 -->
            <details class="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white hover:text-red-500 transition-colors">
                    <span class="text-lg">Berapa minimal order pemesanan?</span>
                    <span class="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                </summary>
                <div class="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    Minimal order di ASA Universe adalah 12 pcs per desain/tim. Untuk penambahan pemain setelah order utama minimal 1 pcs bisa dilayani dengan harga menyesuaikan.
                </div>
            </details>

            <!-- FAQ Item 2 -->
            <details class="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white hover:text-red-500 transition-colors">
                    <span class="text-lg">Berapa lama waktu produksinya?</span>
                    <span class="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                </summary>
                <div class="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    Waktu produksi standar adalah 10-14 hari kerja terhitung setelah desain disetujui (ACC Desain) dan Down Payment (DP) diterima.
                </div>
            </details>

            <!-- FAQ Item 3 -->
            <details class="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 [&_summary::-webkit-details-marker]:hidden">
                <summary class="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-white hover:text-red-500 transition-colors">
                    <span class="text-lg">Apakah bisa custom desain sendiri?</span>
                    <span class="transition group-open:rotate-180">
                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                </summary>
                <div class="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                    Tentu saja! Kami menerima custom desain 100% dari Anda. Tim desainer kami juga siap membantu merealisasikan ide desain jersey tim Anda.
                </div>
            </details>
        </div>
    </div>
</section>

<!-- Location Section -->
<section class="py-20 bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 class="text-3xl font-bold text-white uppercase tracking-wider mb-6">Kunjungi <span class="text-red-600">Store Kami</span></h2>
                <p class="text-gray-400 mb-8 text-lg">
                    Lihat langsung kualitas bahan dan hasil printing jersey ASA Universe di workshop kami.
                </p>
                <div class="space-y-4 mb-8">
                    <div class="flex items-start">
                        <svg class="w-6 h-6 text-red-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <div>
                            <h4 class="text-white font-semibold">Alamat Workshop</h4>
                            <p class="text-gray-400">Jl. Contoh Alamat No. 123, Kota Bandung, Jawa Barat</p>
                        </div>
                    </div>
                    <div class="flex items-start">
                        <svg class="w-6 h-6 text-red-500 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                            <h4 class="text-white font-semibold">Jam Operasional</h4>
                            <p class="text-gray-400">Senin - Sabtu: 09:00 - 17:00 WIB<br>Minggu: Libur</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="h-96 rounded-2xl overflow-hidden shadow-2xl shadow-red-900/10 border border-zinc-800">
                <!-- Replace with real google maps iframe -->
                <iframe 
                    title="Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.60965005893!2d107.57311739502758!3d-6.903444341517406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1689255018698!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen={true} 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    </div>
</section>
