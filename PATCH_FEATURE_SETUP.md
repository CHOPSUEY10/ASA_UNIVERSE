# Patch Feature Setup Guide

## Fitur Patch Logo Selection

Fitur ini memungkinkan user untuk memilih patch logo pada saat membeli produk dengan preview gambar dari Supabase Storage.

## Setup Supabase Bucket

### 1. Buat Bucket "patch" di Supabase Storage

1. Buka dashboard Supabase project Anda
2. Pergi ke Storage di sidebar
3. Klik "New Bucket" atau "+Create a new bucket"
4. Isi nama: `patch`
5. Pilih "Public" (untuk akses gambar publik tanpa auth)
6. Klik "Create bucket"

### 2. Struktur Folder Patch

Setiap patch harus memiliki folder dengan ID-nya:

```
patch/
├── 1/
│   ├── classic.jpg
│   ├── preview.jpg
│   └── thumbnail.jpg
├── 2/
│   ├── modern.jpg
│   ├── preview.jpg
│   └── thumbnail.jpg
└── 3/
    └── minimal.jpg
```

**Format penamaan:**
- Folder = ID patch dari database
- File = Nama gambar (format: JPG, PNG recommended)
- Upload minimal 1 gambar per patch

### 3. Set RLS Policy (jika bucket Private)

Jika ingin bucket Private, tambahkan policy untuk select:

```sql
CREATE POLICY "Public access for patch images" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'patch' AND
    auth.role() = 'anon'
  );
```

### 4. Database Patch Model

Model Patch sudah ada di Prisma schema:

```prisma
model Patch {
  id    Int    @id @default(autoincrement())
  nama  String
  harga Int
  orderItems OrderItem[]
}
```

Contoh data yang perlu ditambahkan via seed.ts atau migrations:

```typescript
await prisma.patch.createMany({
  data: [
    { nama: 'Classic Logo', harga: 0 },
    { nama: 'Modern Minimalis', harga: 0 },
    { nama: 'Dragon Design', harga: 50000 },
    { nama: 'Eagle Emblem', harga: 50000 }
  ]
});
```

## Komponen yang Digunakan

### PatchSelector.svelte
- Lokasi: `src/lib/components/PatchSelector.svelte`
- Props:
  - `patches`: Array of patch objects dengan `id`, `nama`, `harga`
  - `selectedId`: ID patch yang dipilih
  - `onSelect`: Callback saat patch dipilih

### API Endpoint
- Lokasi: `src/routes/api/patch/[id]/+server.ts`
- Fungsi: Mengambil daftar gambar patch dari Supabase storage
- Response: Array of objects dengan `name` dan `url`

## Implementasi di Product Page

Komponen digunakan di `src/routes/(public)/products/[slug]/+page.svelte`:

```svelte
<PatchSelector 
    patches={variants.patch} 
    selectedId={selectedPatch} 
    onSelect={(id) => selectedPatch = id as number} 
/>
```

Data `variants.patch` didapatkan dari `+page.server.ts` yang query database.

## Upload Gambar Patch

Untuk upload gambar ke Supabase Storage:

1. Buka bucket `patch`
2. Klik folder dengan ID patch
3. Klik "Upload" atau drag-drop file gambar
4. Gunakan format JPG atau PNG (recommended ukuran: 200x200px untuk preview)

## Troubleshooting

### Gambar tidak muncul
- Pastikan file ada di folder dengan ID yang sesuai
- Cek bucket permissions (harus Public atau ada RLS policy yang mengizinkan SELECT)
- Verifikasi naming convention folder

### API tidak merespon
- Cek console browser untuk error
- Verifikasi SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local
- Check server logs untuk error di `/api/patch/[id]`

### Patch tidak muncul di product
- Verifikasi patch ada di database dengan query: `SELECT * FROM "Patch";`
- Cek product memiliki patchId di OrderItem structure
- Verifikasi load data di +page.server.ts include patch variants

## Development Tips

Untuk testing lokal:
1. Gunakan patch ID yang valid dari database
2. Upload test image ke Supabase patch bucket
3. Refresh halaman produk
4. Pilih patch untuk melihat preview gambar

Setelah user memilih patch:
- Gambar ditampilkan sebagai preview di component
- Pilihan disimpan di cart item sebagai `patchId`
- Saat checkout, `patchId` digunakan untuk membuat OrderItem
