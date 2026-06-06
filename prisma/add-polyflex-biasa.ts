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
	console.log('Adding Polyflex and Biasa patches...');

	const patches = await Promise.all([
		prisma.patch.create({
			data: {
				nama: 'Polyflex',
				harga: 20000
			}
		}),
		prisma.patch.create({
			data: {
				nama: 'Biasa',
				harga: 20000
			}
		})
	]);

	console.log('✅ Patches created:');
	patches.forEach(p => {
		console.log(`   - ID ${p.id}: ${p.nama} (Rp ${p.harga.toLocaleString('id-ID')})`);
	});
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
