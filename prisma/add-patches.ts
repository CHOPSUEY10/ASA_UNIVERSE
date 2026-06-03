// Script untuk menambahkan patch contoh ke seed
// Gunakan script ini jika ingin menambahkan lebih banyak patch untuk testing

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare const process: any;

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({
	adapter
});

async function addPatches() {
	console.log('Adding example patches...');

	const patches = await Promise.all([
		prisma.patch.create({
			data: {
				nama: 'Classic Eagle',
				harga: 0
			}
		}),
		prisma.patch.create({
			data: {
				nama: 'Dragon Emblem',
				harga: 50000
			}
		}),
		prisma.patch.create({
			data: {
				nama: 'Minimalist Badge',
				harga: 0
			}
		}),
		prisma.patch.create({
			data: {
				nama: 'Premium Gold',
				harga: 100000
			}
		})
	]);

	console.log('✅ Patches created:');
	patches.forEach(p => {
		console.log(`   - ID ${p.id}: ${p.nama} (Rp ${p.harga.toLocaleString('id-ID')})`);
	});

	console.log('\n📁 Next steps:');
	console.log('1. Create folder in Supabase storage bucket "patch":');
	patches.forEach(p => {
		console.log(`   - patch/${p.id}/ (untuk: ${p.nama})`);
	});
	console.log('\n2. Upload patch images to each folder (JPG/PNG format)');
	console.log('3. Recommended image size: 200x200px or higher');
	console.log('4. Image names can be any format (e.g., image.jpg, logo.png, etc.)');
}

addPatches()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error('Error:', e);
		await prisma.$disconnect();
		process.exit(1);
	});
