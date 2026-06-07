<script lang="ts">
    import ProductGrid from '$lib/components/ProductGrid.svelte';
    
    let { data }: { data: import('./$types').PageData } = $props();
</script>

<svelte:head>
    <title>ASA Universe - Road to World Cup 2026 | Premium Custom Jersey</title>
    <meta name="description" content="ASA Universe menyediakan pembuatan jersey kustom premium sepak bola untuk tim impian Anda. Dapatkan kualitas apparel turnamen kelas dunia." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-cover bg-center overflow-hidden min-h-[650px] flex items-center bg-brand-bg bg-[url('/hero/stadium_hero_bg.png')]" aria-label="Stadium background">
    <!-- Stadium spotlights simulation overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent z-10"></div>
    <div class="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-brand-bg/90 z-10"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-brand-bg/90 via-transparent to-brand-bg/60 z-10"></div>
    
    <!-- Pulse spotlight beam -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none z-10 animate-pulse" style="animation-duration: 8s"></div>
    <div class="absolute top-0 right-1/4 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none z-10 animate-pulse" style="animation-duration: 6s"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
        <div class="md:w-2/3">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/20 border border-brand-primary/40 rounded-full text-brand-accent text-xs font-bold uppercase tracking-widest mb-6">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.37V7z"/>
                </svg>
                ROAD TO WORLD CUP 2026
            </div>
            
            <h1 class="text-4xl md:text-7xl font-black tracking-tight text-white mb-6 uppercase leading-none">
                BUILD YOUR<br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-red-500 to-brand-accent">DREAM JERSEY</span>
            </h1>
            
            <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                Create professional custom jerseys for your team. Engineered for peak performance, styled for championship glory.
            </p>
            
            <div class="flex flex-wrap gap-4">
                <a href="/products" class="px-8 py-4 bg-brand-primary hover:bg-red-800 text-white font-black rounded-sm transition-all duration-300 text-sm uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40 border border-transparent hover:-translate-y-0.5">
                    Start Customizing
                </a>
                <a href="/products" class="px-8 py-4 bg-transparent hover:bg-white/5 text-white font-black rounded-sm transition-all duration-300 text-sm uppercase tracking-widest border border-white/20 hover:border-white hover:-translate-y-0.5">
                    Explore Catalog
                </a>
            </div>
        </div>
    </div>
</section>

<!-- Section 2: Build Your Team Identity -->
<section class="py-20 bg-brand-bg border-t border-brand-border relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-brand-accent text-xs font-black uppercase tracking-widest">Apparel Customization</span>
            <h2 class="text-3xl md:text-4xl font-black text-white uppercase mt-2 tracking-tight">Build Your Team Identity</h2>
            <p class="text-brand-muted text-sm mt-3 leading-relaxed">Choose every element to match your club's spirit. Forge a professional look for the tournament stage.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
            <!-- Step 1 -->
            <div class="bg-brand-surface p-6 rounded-sm border border-brand-border text-center hover:border-brand-primary/50 transition-all duration-300 group">
                <div class="w-16 h-16 mx-auto bg-brand-bg rounded-full border border-brand-border flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 group-hover:border-brand-primary transition-all duration-300">
                    <!-- Jersey Outline SVG -->
                    <svg class="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.5l-4 2.5v11.5l4 1.5 4-1.5V7l-4-2.5zm0 0V20M8 7H5.5L4 8.5v3.5L5.5 13H8m8-6h2.5L20 8.5v3.5L18.5 13H16" />
                    </svg>
                </div>
                <h3 class="text-sm font-black text-white uppercase tracking-wider mb-2">1. Choose Model</h3>
                <p class="text-xs text-brand-muted leading-relaxed">Select from premium standard or premium-quality fabric cuts.</p>
            </div>

            <!-- Step 2 -->
            <div class="bg-brand-surface p-6 rounded-sm border border-brand-border text-center hover:border-brand-primary/50 transition-all duration-300 group">
                <div class="w-16 h-16 mx-auto bg-brand-bg rounded-full border border-brand-border flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 group-hover:border-brand-primary transition-all duration-300">
                    <!-- Badge Icon SVG -->
                    <svg class="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <h3 class="text-sm font-black text-white uppercase tracking-wider mb-2">2. Choose Patch</h3>
                <p class="text-xs text-brand-muted leading-relaxed">Opt for official-style TPU rubber or woven emblems.</p>
            </div>

            <!-- Step 3 -->
            <div class="bg-brand-surface p-6 rounded-sm border border-brand-border text-center hover:border-brand-primary/50 transition-all duration-300 group">
                <div class="w-16 h-16 mx-auto bg-brand-bg rounded-full border border-brand-border flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 group-hover:border-brand-primary transition-all duration-300">
                    <!-- Upload Icon SVG -->
                    <svg class="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                </div>
                <h3 class="text-sm font-black text-white uppercase tracking-wider mb-2">3. Upload Design</h3>
                <p class="text-xs text-brand-muted leading-relaxed">Send us your raw logo files or full custom mockups.</p>
            </div>

            <!-- Step 4 -->
            <div class="bg-brand-surface p-6 rounded-sm border border-brand-border text-center hover:border-brand-primary/50 transition-all duration-300 group">
                <div class="w-16 h-16 mx-auto bg-brand-bg rounded-full border border-brand-border flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 group-hover:border-brand-primary transition-all duration-300">
                    <!-- Typography Icon SVG -->
                    <svg class="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h12M4 18h8" />
                    </svg>
                </div>
                <h3 class="text-sm font-black text-white uppercase tracking-wider mb-2">4. Select Font</h3>
                <p class="text-xs text-brand-muted leading-relaxed">Pick numbering styles from elite national team fonts.</p>
            </div>

            <!-- Step 5 -->
            <div class="bg-brand-surface p-6 rounded-sm border border-brand-border text-center hover:border-brand-primary/50 transition-all duration-300 group">
                <div class="w-16 h-16 mx-auto bg-brand-bg rounded-full border border-brand-border flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 group-hover:border-brand-primary transition-all duration-300">
                    <!-- Pitch SVG -->
                    <svg class="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1M3 6l-1.35 11.025A2 2 0 003.622 19.3l16.756-1.522a2 2 0 001.751-2.22L21 6M3 6h18m0 0l-3 1m3-1v10m-3-9v9" />
                    </svg>
                </div>
                <h3 class="text-sm font-black text-white uppercase tracking-wider mb-2">5. Build Your Jersey</h3>
                <p class="text-xs text-brand-muted leading-relaxed">Submit the squad config and secure tournament gear.</p>
            </div>
        </div>
    </div>
</section>

<!-- Section 3: How It Works -->
<section class="py-20 bg-[#070707] border-t border-brand-border relative overflow-hidden">
    <!-- Spotlight background element -->
    <div class="absolute bottom-0 right-0 w-[600px] h-[300px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-brand-accent text-xs font-black uppercase tracking-widest">Match Preparation</span>
            <h2 class="text-3xl md:text-4xl font-black text-white uppercase mt-2 tracking-tight">Your Order Journey</h2>
            <p class="text-brand-muted text-sm mt-3 leading-relaxed">Follow this process to step onto the pitch fully equipped for victory.</p>
        </div>

        <div class="relative">
            <!-- Central Line for timeline (Desktop) -->
            <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand-border -translate-x-1/2 hidden lg:block"></div>

            <div class="space-y-12 lg:space-y-20">
                <!-- Step 1 -->
                <div class="flex flex-col lg:flex-row items-center justify-between gap-8 relative">
                    <div class="w-full lg:w-[45%] text-left lg:text-right">
                        <span class="text-xs font-black text-brand-accent tracking-widest uppercase">TACTICAL LINEUP</span>
                        <h3 class="text-xl font-black text-white mt-1 uppercase tracking-tight">Step 1: Choose Your Jersey</h3>
                        <p class="text-sm text-brand-muted mt-2 leading-relaxed">Browse our collection and select the base model jersey. We offer options optimized for breathability and high-speed play.</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-brand-primary border border-brand-accent text-white flex items-center justify-center font-bold text-sm z-10">01</div>
                    <div class="w-full lg:w-[45%]"></div>
                </div>

                <!-- Step 2 -->
                <div class="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 relative">
                    <div class="w-full lg:w-[45%] text-left">
                        <span class="text-xs font-black text-brand-accent tracking-widest uppercase">SPECS OVERVIEW</span>
                        <h3 class="text-xl font-black text-white mt-1 uppercase tracking-tight">Step 2: Customize Details</h3>
                        <p class="text-sm text-brand-muted mt-2 leading-relaxed">Choose your collar models (classic polo, v-neck, or standard rib), fabric quality levels, and structural details of the garments.</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-brand-primary border border-brand-accent text-white flex items-center justify-center font-bold text-sm z-10">02</div>
                    <div class="w-full lg:w-[45%]"></div>
                </div>

                <!-- Step 3 -->
                <div class="flex flex-col lg:flex-row items-center justify-between gap-8 relative">
                    <div class="w-full lg:w-[45%] text-left lg:text-right">
                        <span class="text-xs font-black text-brand-accent tracking-widest uppercase">KIT CONFIGURATION</span>
                        <h3 class="text-xl font-black text-white mt-1 uppercase tracking-tight">Step 3: Upload Design</h3>
                        <p class="text-sm text-brand-muted mt-2 leading-relaxed">Attach your team's crest, logos, sponsor art, or full design vectors. Our designers will match your branding layout perfectly.</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-brand-primary border border-brand-accent text-white flex items-center justify-center font-bold text-sm z-10">03</div>
                    <div class="w-full lg:w-[45%]"></div>
                </div>

                <!-- Step 4 -->
                <div class="flex flex-col lg:flex-row-reverse items-center justify-between gap-8 relative">
                    <div class="w-full lg:w-[45%] text-left">
                        <span class="text-xs font-black text-brand-accent tracking-widest uppercase">TACTICAL BRIEFING</span>
                        <h3 class="text-xl font-black text-white mt-1 uppercase tracking-tight">Step 4: Confirm Order</h3>
                        <p class="text-sm text-brand-muted mt-2 leading-relaxed">Confirm your customization variants and submit. Your details are saved and a direct WhatsApp link prepares you for checkout review.</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-brand-primary border border-brand-accent text-white flex items-center justify-center font-bold text-sm z-10">04</div>
                    <div class="w-full lg:w-[45%]"></div>
                </div>

                <!-- Step 5 -->
                <div class="flex flex-col lg:flex-row items-center justify-between gap-8 relative">
                    <div class="w-full lg:w-[45%] text-left lg:text-right">
                        <span class="text-xs font-black text-brand-accent tracking-widest uppercase">CHAMPIONSHIP STAGE</span>
                        <h3 class="text-xl font-black text-white mt-1 uppercase tracking-tight">Step 5: Ready For Match Day</h3>
                        <p class="text-sm text-brand-muted mt-2 leading-relaxed">Our production crew finishes fabrication and delivers your premium kits. Wear the colors of your team with absolute pride.</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-brand-primary border border-brand-accent text-white flex items-center justify-center font-bold text-sm z-10">05</div>
                    <div class="w-full lg:w-[45%]"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Section 4: Product Catalog (Featured) -->
<section class="py-20 bg-brand-bg border-t border-brand-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 pb-6 border-b border-brand-border">
            <div>
                <span class="text-brand-accent text-xs font-black uppercase tracking-widest font-mono">Starter Squad</span>
                <h2 class="text-3xl font-black text-white uppercase mt-1 tracking-tight">Championship Collection</h2>
                <p class="text-brand-muted text-sm mt-1">Our featured starting XI custom jerseys.</p>
            </div>
            <a href="/products" class="hidden sm:inline-flex px-6 py-3 border border-brand-border rounded-sm text-white hover:bg-brand-surface hover:text-brand-accent hover:border-brand-accent transition-all duration-300 uppercase text-xs font-bold tracking-widest">
                View All Products
            </a>
        </div>
        
        <ProductGrid products={data.featuredProducts} />
        
        <div class="mt-12 text-center sm:hidden">
            <a href="/products" class="inline-block w-full px-6 py-4 border border-brand-border rounded-sm text-white hover:bg-brand-surface hover:text-brand-accent hover:border-brand-accent transition-all duration-300 uppercase text-xs font-bold tracking-widest">
                View All Products
            </a>
        </div>
    </div>
</section>

<!-- Section 5: Customization Features (Option Links) -->
<section class="py-20 bg-[#070707] border-t border-brand-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-brand-accent text-xs font-black uppercase tracking-widest">Fine Tuning</span>
            <h2 class="text-3xl md:text-4xl font-black text-white uppercase mt-2 tracking-tight">Official Style Customizer</h2>
            <p class="text-brand-muted text-sm mt-3 leading-relaxed">Dive deep into the specifications. Click any feature below to view detailed charts, models, and patch details.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Card 1: Size Chart -->
            <a href="/size-chart" class="block bg-brand-card p-5 rounded-sm border border-brand-border hover:border-brand-accent/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all duration-300 group">
                <div class="aspect-square bg-brand-surface rounded-sm mb-5 overflow-hidden flex items-center justify-center relative border border-brand-border">
                    <img src="/etc/size_chart.png" alt="Size Chart" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent opacity-40"></div>
                </div>
                <h3 class="font-black text-white text-sm uppercase group-hover:text-brand-accent transition-colors tracking-wide">Size Chart</h3>
                <p class="text-xs text-brand-muted mt-2 mb-4">Complete size guidelines for jersey fits, widths, and heights.</p>
                <div class="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-brand-primary group-hover:text-brand-accent transition-colors">
                    <span>View Chart</span>
                    <span>→</span>
                </div>
            </a>
            
            <!-- Card 2: Model Kerah -->
            <a href="/model-kerah" class="block bg-brand-card p-5 rounded-sm border border-brand-border hover:border-brand-primary/50 hover:shadow-[0_0_20px_rgba(160,0,0,0.25)] transition-all duration-300 group">
                <div class="aspect-square bg-brand-surface rounded-sm mb-5 overflow-hidden flex items-center justify-center relative border border-brand-border">
                    <img src="/etc/model_kerah.png" alt="Model Kerah" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent opacity-40"></div>
                </div>
                <h3 class="font-black text-white text-sm uppercase group-hover:text-brand-primary transition-colors tracking-wide">Collar Models</h3>
                <p class="text-xs text-brand-muted mt-2 mb-4">Explore traditional collar, polo styles, and modern collar models.</p>
                <div class="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-brand-primary transition-colors">
                    <span>View Collar styles</span>
                    <span>→</span>
                </div>
            </a>

            <!-- Card 3: Jenis Font -->
            <a href="/jenis-font" class="block bg-brand-card p-5 rounded-sm border border-brand-border hover:border-brand-accent/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all duration-300 group">
                <div class="aspect-square bg-brand-surface rounded-sm mb-5 overflow-hidden flex items-center justify-center relative border border-brand-border">
                    <img src="/etc/jenis_font.png" alt="Jenis Font" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent opacity-40"></div>
                </div>
                <h3 class="font-black text-white text-sm uppercase group-hover:text-brand-accent transition-colors tracking-wide">Official Fonts</h3>
                <p class="text-xs text-brand-muted mt-2 mb-4">Championship jersey numbering and typography styling rules.</p>
                <div class="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-brand-primary group-hover:text-brand-accent transition-colors">
                    <span>Explore Fonts</span>
                    <span>→</span>
                </div>
            </a>

            <!-- Card 4: Patch Logo -->
            <a href="/patch-logo" class="block bg-brand-card p-5 rounded-sm border border-brand-border hover:border-brand-primary/50 hover:shadow-[0_0_20px_rgba(160,0,0,0.25)] transition-all duration-300 group">
                <div class="aspect-square bg-brand-surface rounded-sm mb-5 overflow-hidden flex items-center justify-center relative border border-brand-border">
                    <img src="/etc/patch_logo.png" alt="Patch Logo" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div class="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent opacity-40"></div>
                </div>
                <h3 class="font-black text-white text-sm uppercase group-hover:text-brand-primary transition-colors tracking-wide">Patch Collection</h3>
                <p class="text-xs text-brand-muted mt-2 mb-4">Official-grade tournament patches and club emblems.</p>
                <div class="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-brand-primary transition-colors">
                    <span>View Patches</span>
                    <span>→</span>
                </div>
            </a>
        </div>
    </div>
</section>

<!-- Section 6: Customer Showcase -->
<section class="py-20 bg-brand-bg border-t border-brand-border relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <span class="text-brand-accent text-xs font-black uppercase tracking-widest">Team Pride</span>
            <h2 class="text-3xl md:text-4xl font-black text-white uppercase mt-2 tracking-tight">Squad Showcase</h2>
            <p class="text-brand-muted text-sm mt-3 leading-relaxed">See how other teams configure their jerseys for greatness. Build your legacy on the pitch.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Showcase 1 -->
            <div class="bg-brand-card border border-brand-border p-6 rounded-sm">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-full bg-brand-surface flex-shrink-0 flex items-center justify-center font-bold text-brand-accent border border-brand-border">FC</div>
                    <div>
                        <h4 class="font-bold text-white uppercase tracking-wider text-sm">FC Tanjungpinang</h4>
                        <p class="text-xs text-brand-muted">Standard Milano • Collar Classic</p>
                    </div>
                </div>
                <p class="text-xs text-brand-muted italic leading-relaxed">"Bahan Milano sangat dingin saat dipakai bertanding di siang hari. Kustomisasi patch logo rubber sangat presisi dan tebal. Recommended!"</p>
                <div class="mt-4 flex gap-1 text-brand-accent text-xs font-mono">★★★★★</div>
            </div>

            <!-- Showcase 2 -->
            <div class="bg-brand-card border border-brand-border p-6 rounded-sm">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-full bg-brand-surface flex-shrink-0 flex items-center justify-center font-bold text-brand-accent border border-brand-border">AC</div>
                    <div>
                        <h4 class="font-bold text-white uppercase tracking-wider text-sm">AC Bintan United</h4>
                        <p class="text-xs text-brand-muted">Premium Airwalk • Collar Polo</p>
                    </div>
                </div>
                <p class="text-xs text-brand-muted italic leading-relaxed">"Desain kustom tim kami terpasang rapi sesuai request. Font angka punggung memakai official style yang terlihat gagah dari jauh."</p>
                <div class="mt-4 flex gap-1 text-brand-accent text-xs font-mono">★★★★★</div>
            </div>

            <!-- Showcase 3 -->
            <div class="bg-brand-card border border-brand-border p-6 rounded-sm">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-full bg-brand-surface flex-shrink-0 flex items-center justify-center font-bold text-brand-accent border border-brand-border">SC</div>
                    <div>
                        <h4 class="font-bold text-white uppercase tracking-wider text-sm">Santiago FC</h4>
                        <p class="text-xs text-brand-muted">Premium Emboss • Collar V-Neck</p>
                    </div>
                </div>
                <p class="text-xs text-brand-muted italic leading-relaxed">"Custom order minimal 12 pcs sangat mudah diproses. Layanan CS WhatsApp sangat membantu menyusun detail ukuran pemain. Mantap!"</p>
                <div class="mt-4 flex gap-1 text-brand-accent text-xs font-mono">★★★★★</div>
            </div>
        </div>
    </div>
</section>

<!-- Location Section -->
<section id="kontak" class="py-20 bg-[#070707] border-t border-brand-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 text-center lg:text-left">
            <span class="text-brand-accent text-xs font-black uppercase tracking-widest font-mono">Physical Workshop</span>
            <h2 class="text-3xl font-black text-white uppercase mt-1 tracking-tight">Visit Our Headquarters</h2>
            <p class="text-brand-muted text-sm mt-2 max-w-xl">
                Feel the fabric textures, inspect standard prints, and consult designs directly with our creators at the ASA Universe workshop.
            </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            <div class="h-[350px] lg:h-auto min-h-[300px] rounded-sm overflow-hidden border border-brand-border shadow-lg relative bg-brand-card">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8156757.052933032!2d102.13731542566728!3d-3.400974185673756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d973005205c239%3A0x8be46109e314f2b2!2sAsa%20Kopi!5e0!3m2!1sen!2sid!4v1780664843211!5m2!1sen!2sid" class="absolute inset-0 w-full h-full border-0" allowfullscreen={true} loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="ASA UNIVERSE Workshop Location"></iframe>
            </div>
            
            <div class="flex flex-col justify-between gap-6">
                <div class="bg-brand-card border border-brand-border p-8 rounded-sm shadow-sm flex-1">
                    <div class="flex items-center mb-4">
                        <svg class="w-6 h-6 text-brand-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <h4 class="text-white font-black uppercase tracking-wider text-sm">Workshop Address</h4>
                    </div>
                    <p class="text-brand-muted text-sm ml-9 leading-relaxed">Jl. Matador, Bukit Cermin, Kec. Tanjungpinang Bar.,<br/>Kota Tanjung Pinang, Kepulauan Riau 29124</p>
                </div>
                
                <div class="bg-brand-card border border-brand-border p-8 rounded-sm shadow-sm flex-1">
                    <div class="flex items-center mb-4">
                        <svg class="w-6 h-6 text-brand-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h4 class="text-white font-black uppercase tracking-wider text-sm">Operational Hours</h4>
                    </div>
                    <p class="text-brand-muted text-sm ml-9 leading-relaxed">Senin - Sabtu: 09:00 - 17:00 WIB<br>Minggu: Libur</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Marquee banner -->
<div class="bg-brand-primary text-white py-4 overflow-hidden border-y-2 border-brand-accent">
    <div class="whitespace-nowrap animate-marquee flex gap-4 text-xs font-black tracking-widest uppercase font-mono">
        <span>CHASE GREATNESS • PRECISION DETAILS • ROAD TO WORLD CUP 2026 • OFFICIAL STYLE GEAR • BUILD YOUR IDENTITY •</span>
        <span>CHASE GREATNESS • PRECISION DETAILS • ROAD TO WORLD CUP 2026 • OFFICIAL STYLE GEAR • BUILD YOUR IDENTITY •</span>
        <span>CHASE GREATNESS • PRECISION DETAILS • ROAD TO WORLD CUP 2026 • OFFICIAL STYLE GEAR • BUILD YOUR IDENTITY •</span>
    </div>
</div>

<!-- FAQ Section -->
<section id="faq" class="py-20 bg-brand-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 border-b border-brand-border pb-6">
            <span class="bg-brand-primary text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest inline-block mb-4">Support Center</span>
            <h2 class="text-3xl font-black text-white uppercase tracking-tight">Frequently Asked <span class="text-brand-accent">Questions</span></h2>
            <p class="text-brand-muted text-sm mt-2 max-w-xl">Everything you need to know about ASA UNIVERSE products, ordering processes, and customization. Ready to coordinate your squad config?</p>
        </div>

        <div class="max-w-4xl mx-auto space-y-8">
                <!-- Ordering & Payments -->
                <div>
                    <h3 class="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-brand-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>
                        Ordering & Minimums
                    </h3>
                    <div class="space-y-4">
                        <details class="group bg-brand-card rounded-sm border border-brand-border [&_summary::-webkit-details-marker]:hidden open:bg-brand-surface transition-all duration-300">
                            <summary class="flex justify-between items-center font-black text-sm cursor-pointer list-none p-5 text-white">
                                <span>Berapa minimal order pemesanan?</span>
                                <span class="transition group-open:rotate-180 text-brand-accent">
                                    <svg fill="none" height="16" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div class="px-5 pb-5 text-brand-muted text-xs leading-relaxed border-t border-brand-border pt-4">
                                Minimal order di ASA Universe adalah 12 pcs per desain/tim. Untuk penambahan pemain setelah order utama minimal 1 pcs bisa dilayani dengan harga menyesuaikan.
                            </div>
                        </details>
                    </div>
                </div>

                <!-- Shipping & Delivery -->
                <div>
                    <h3 class="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-brand-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                        Production Timeline
                    </h3>
                    <div class="space-y-4">
                        <details class="group bg-brand-card rounded-sm border border-brand-border [&_summary::-webkit-details-marker]:hidden open:bg-brand-surface transition-all duration-300">
                            <summary class="flex justify-between items-center font-black text-sm cursor-pointer list-none p-5 text-white">
                                <span>Berapa lama waktu produksinya?</span>
                                <span class="transition group-open:rotate-180 text-brand-accent">
                                    <svg fill="none" height="16" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div class="px-5 pb-5 text-brand-muted text-xs leading-relaxed border-t border-brand-border pt-4">
                                Waktu produksi standar adalah 10-14 hari kerja terhitung setelah desain disetujui (ACC Desain) dan Down Payment (DP) diterima.
                            </div>
                        </details>
                    </div>
                </div>

                <!-- Customization -->
                <div>
                    <h3 class="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-brand-primary"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.879-3.879a1.5 1.5 0 1 0-2.121-2.121l-3.879 3.879a15.991 15.991 0 0 0-4.648 4.764m3.869-3.869a1.5 1.5 0 1 1-2.121 2.121 1.5 1.5 0 0 1 2.121-2.121Z" /></svg>
                        Artwork & Layout
                    </h3>
                    <div class="space-y-4">
                        <details class="group bg-brand-card rounded-sm border border-brand-border [&_summary::-webkit-details-marker]:hidden open:bg-brand-surface transition-all duration-300">
                            <summary class="flex justify-between items-center font-black text-sm cursor-pointer list-none p-5 text-white">
                                <span>Apakah bisa custom desain sendiri?</span>
                                <span class="transition group-open:rotate-180 text-brand-accent">
                                    <svg fill="none" height="16" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="16"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div class="px-5 pb-5 text-brand-muted text-xs leading-relaxed border-t border-brand-border pt-4">
                                Tentu saja! Kami menerima custom desain 100% dari Anda. Tim desainer kami juga siap membantu merealisasikan ide desain jersey tim Anda.
                            </div>
                        </details>
                    </div>
                </div>

                <!-- Contact Support Box -->
                <div class="bg-brand-card p-8 rounded-sm border border-brand-border flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden mt-12">
                    <!-- Background watermarked icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-32 h-32 absolute -right-4 -bottom-4 text-brand-border transform rotate-12">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                    <div class="relative z-10 text-center sm:text-left">
                        <h4 class="font-black text-white uppercase text-base">Still Have Questions?</h4>
                        <p class="text-xs text-brand-muted mt-1 font-medium">Our athlete support specialists are standing by to assist with squad orders.</p>
                    </div>
                    <div class="relative z-10 w-full sm:w-auto">
                        <a href="mailto:fadliaidin16@gmail.com" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-brand-primary bg-brand-primary px-6 py-3.5 text-xs font-black text-white uppercase hover:bg-red-800 transition-colors tracking-widest rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            Email Support
                        </a>
                    </div>
                </div>
        </div>
    </div>
</section>
