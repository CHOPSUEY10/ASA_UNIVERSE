<script lang="ts">
    let isDownloading = $state(false);
    let errorMessage = $state('');

    async function handleExport() {
        isDownloading = true;
        errorMessage = '';
        
        try {
            const response = await fetch('/api/admin/export/products');
            
            if (!response.ok) {
                throw new Error('Gagal mengunduh file Excel.');
            }

            // Create a blob from the response
            const blob = await response.blob();
            
            // Create a temporary link element to trigger the download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Products_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error: any) {
            errorMessage = error.message || 'Terjadi kesalahan saat mengekspor data.';
        } finally {
            isDownloading = false;
        }
    }
</script>

<svelte:head>
    <title>Export Data - Admin ASA Universe</title>
</svelte:head>

<div class="mb-8">
    <h1 class="text-3xl font-bold text-white tracking-tight">Export Data</h1>
    <p class="text-zinc-400 mt-2">Unduh laporan data sistem dalam format Microsoft Excel.</p>
</div>

<div class="bg-[#111] border border-zinc-800 rounded-xl p-6">
    <div class="max-w-2xl">
        <h2 class="text-xl font-bold text-white mb-4">Export Produk</h2>
        <p class="text-zinc-400 mb-6 text-sm">
            Unduh seluruh daftar produk beserta status, stok, harga, dan kategorinya ke dalam file <code class="bg-zinc-800 text-red-400 px-1 py-0.5 rounded">.xlsx</code>.
        </p>

        {#if errorMessage}
            <div class="mb-6 p-4 bg-[#990000]/10 border border-[#990000]/20 rounded-lg flex items-start space-x-3 text-[#990000]">
                <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span class="text-sm">{errorMessage}</span>
            </div>
        {/if}

        <button 
            type="button" 
            onclick={handleExport}
            disabled={isDownloading}
            class="inline-flex items-center justify-center px-6 py-3 bg-[#990000] hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {#if isDownloading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses File...
            {:else}
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Unduh Data Produk (.xlsx)
            {/if}
        </button>
    </div>
</div>
