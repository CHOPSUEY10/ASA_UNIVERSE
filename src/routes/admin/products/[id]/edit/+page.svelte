<script lang="ts">
    import { goto } from '$app/navigation';

    let { data }: { data: import('./$types').PageData } = $props();

    let isSubmitting = $state(false);

    async function handleSubmit(event: Event) {
        event.preventDefault();
        isSubmitting = true;
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const submitData = Object.fromEntries(formData.entries());

        try {
            // For real implementation: call PUT/PATCH /api/products/[id]
            // We'll simulate success since we are only implementing frontend
            await new Promise(resolve => setTimeout(resolve, 500));
            
            alert('Produk berhasil diperbarui');
            goto('/admin/products');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Terjadi kesalahan.');
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="mb-8">
    <a href="/admin/products" class="text-[#990000] hover:text-red-400 font-medium mb-4 inline-flex items-center text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Daftar Produk
    </a>
    <h1 class="text-2xl font-bold text-white">Edit Produk</h1>
</div>

<div class="bg-[#111] border border-zinc-800 rounded-xl p-6 md:p-8 max-w-3xl">
    <form onsubmit={handleSubmit} class="space-y-6">
        <div>
            <label for="name" class="block text-sm font-medium text-zinc-300 mb-2">Nama Produk</label>
            <input type="text" id="name" name="name" value={data.product.name} required class="block w-full px-4 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-[#990000] transition-colors">
        </div>

        <div>
            <label for="description" class="block text-sm font-medium text-zinc-300 mb-2">Deskripsi</label>
            <textarea id="description" name="description" rows="4" required class="block w-full px-4 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-[#990000] transition-colors">{data.product.description}</textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label for="price" class="block text-sm font-medium text-zinc-300 mb-2">Harga (Rp)</label>
                <input type="number" id="price" name="price" value={data.product.price} required min="0" class="block w-full px-4 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-[#990000] transition-colors">
            </div>

            <div>
                <label for="stock" class="block text-sm font-medium text-zinc-300 mb-2">Stok</label>
                <input type="number" id="stock" name="stock" value={data.product.stock} required min="0" class="block w-full px-4 py-3 bg-[#0a0a0a] border border-zinc-800 rounded-lg text-white focus:ring-red-500 focus:border-[#990000] transition-colors">
            </div>
        </div>

        <div class="flex items-center">
            <input id="isFeatured" name="isFeatured" type="checkbox" checked={data.product.isFeatured} class="h-4 w-4 bg-[#0a0a0a] border-zinc-800 rounded text-[#990000] focus:ring-red-500">
            <label for="isFeatured" class="ml-2 block text-sm text-zinc-300">
                Jadikan Produk Unggulan
            </label>
        </div>

        <div class="pt-6 border-t border-zinc-800 flex justify-end gap-4">
            <a href="/admin/products" class="px-6 py-3 border border-zinc-700 text-zinc-300 font-medium rounded-lg hover:bg-zinc-800 hover:text-white transition-colors">
                Batal
            </a>
            <button type="submit" disabled={isSubmitting} class="px-6 py-3 bg-[#990000] text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50">
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
        </div>
    </form>
</div>
