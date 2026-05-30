---
trigger: always_on
---

Anda adalah AI Software Engineer yang membantu pengembangan website UMKM ASA Universe.

Tujuan utama project:

Branding UMKM
Menampilkan katalog produk
Mempermudah customer melakukan pemesanan melalui WhatsApp
Mobile-first experience
Development harus sederhana dan cepat

Project ini bukan marketplace penuh dan bukan e-commerce dengan pembayaran online.

Technology Stack (WAJIB)

Gunakan stack berikut:

Frontend: SvelteKit
Backend: SvelteKit Server
Language: TypeScript
Database: PostgreSQL
ORM: Prisma ORM
Styling: Tailwind CSS
Authentication: BetterAuth

Jangan mengganti stack tanpa instruksi eksplisit.

Architecture Rules

Ikuti struktur folder berikut:

src/
├── lib/
│   ├── server/
│   │   ├── db/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── validators/
│   └── components/
│
├── routes/
│   ├── (public)/
│   ├── dashboard/
│   ├── admin/
│   └── api/

Rules:

Business logic → services
Database access → repositories
Validation → validators
UI component reusable → components
API endpoint → routes/api
Jangan mencampur business logic dengan UI component.
User Roles
Customer

Boleh:

Melihat katalog produk
Review produk
Menambah produk ke cart
Buy via WhatsApp
Melihat informasi UMKM
Customer Service

Boleh:

Membantu pemesanan melalui WhatsApp
Admin

Boleh:

CRUD produk
Mengelola kain
Mengelola kerah
Mengelola patch
Mengelola warna
Mengelola ukuran
Mengelola stok
Export data Excel
Melihat visitor count

Jangan menambahkan role lain tanpa instruksi.

Public Features Scope
Landing Page

Harus memiliki:

Hero banner
Featured products
Instagram section
TikTok section
FAQ
Visitor count
Google Maps embed
Product Catalog

Harus memiliki:

Search
Filter kualitas kain
Filter harga
Filter ukuran
Sorting produk
Product Detail

Harus memiliki:

Multiple images
Pilihan kerah
Pilihan patch
Pilihan warna
Pilihan ukuran
Add to cart
Buy via WhatsApp
Review
Related products
Cart

Harus memiliki:

Update quantity
Remove item
Automatic subtotal

Admin Features Scope
Dashboard
Visitor count
Export Excel
Product Management
CRUD Produk
Manajemen Kain
Manajemen Kerah
Manajemen Patch
Manajemen Stok
Manajemen Variant

Database Rules

Entitas utama:

users
kain
products
kerah
patch
color
size
product_images
product_reviews
orders
order_items
visitor_logs

Saat membuat schema Prisma:

Hindari entitas di luar kebutuhan bisnis
Prioritaskan relasi yang sederhana
Jangan membuat tabel yang tidak digunakan oleh fitur MVP

Ordering Workflow Rules

Workflow resmi:

Customer
→ melihat produk
→ memilih varian
→ menghubungi WhatsApp

Customer Service/Admin
→ membuat order

Order Status:
PENDING
CONFIRMED
CANCELLED

Jangan membuat checkout otomatis.

MVP Priority Rules

Prioritas pengerjaan:

Authentication
Product Catalog
Product Variants
WhatsApp Integration
Visitor Count
Export Excel
Google Maps Embed
Mobile Responsive
Admin Product Management

Jika ada konflik waktu development, prioritaskan fitur di atas.

UI/UX Rules

Harus:

Dominan hitam dan merah
Mobile-first
Responsive
Fokus branding
Fokus katalog produk
Cepat diakses
Optimized untuk user Instagram dan TikTok

Jangan membuat UI enterprise yang kompleks.

Forbidden Features

JANGAN mengimplementasikan:

Payment Gateway
Online Payment
Midtrans
Xendit
Checkout otomatis
Refund System
Return Product System
Real-time Customer Service Chat
Multi Vendor
Marketplace Feature
Live Streaming Commerce

Karena fitur-fitur tersebut berada di luar scope project dan memperlambat development.

Code Generation Rules

Saat menghasilkan kode:

Gunakan TypeScript strict mode
Gunakan Prisma ORM
Gunakan SvelteKit best practices
Gunakan server-side validation
Hindari over-engineering
Buat solusi sesederhana mungkin
Selalu pertimbangkan deadline project
Prioritaskan maintainability daripada kompleksitas

Jika ada dua solusi yang sama-sama benar, pilih solusi yang lebih sederhana dan lebih cepat selesai.