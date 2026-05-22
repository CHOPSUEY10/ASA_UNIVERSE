import 'dotenv/config';

import { PrismaClient } from '../src/lib/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

declare const process: any;

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({
	adapter
});

async function main() {
	console.log('🧹 Menghapus data lama...');

	// Hapus berdasarkan dependency relation
	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();

	await prisma.productReview.deleteMany();
	await prisma.productImage.deleteMany();
	await prisma.productVariant.deleteMany();

	await prisma.product.deleteMany();
	await prisma.category.deleteMany();

	await prisma.visitorLog.deleteMany();

	await prisma.contactInformation.deleteMany();

	await prisma.user.deleteMany();

	console.log('🌱 Membuat data seed...');

	// =====================================================
	// USERS
	// =====================================================

	await prisma.user.create({
		data: {
			name: 'Admin ASA Universe',
			email: 'admin@asauniverse.com',
			phone: '081234567890',
			passwordHash: 'dummy_hashed_password',
			role: 'ADMIN'
		}
	});

	await prisma.user.create({
		data: {
			name: 'Customer Service ASA',
			email: 'cs@asauniverse.com',
			phone: '081298765432',
			passwordHash: 'dummy_hashed_password',
			role: 'CUSTOMER_SERVICE'
		}
	});

	// =====================================================
	// CONTACT INFORMATION
	// =====================================================

	await prisma.contactInformation.create({
		data: {
			whatsapp: '6281234567890',
			instagram: '@asa.universe',
			tiktok: '@asa.universe.official',
			address: 'Tanjungpinang, Kepulauan Riau',
			googleMapsUrl: 'https://maps.google.com'
		}
	});

	// =====================================================
	// CATEGORIES
	// =====================================================

	const atasanCategory = await prisma.category.create({
		data: {
			name: 'Atasan',
			slug: 'atasan'
		}
	});

	const bawahanCategory = await prisma.category.create({
		data: {
			name: 'Bawahan',
			slug: 'bawahan'
		}
	});

	const aksesorisCategory = await prisma.category.create({
		data: {
			name: 'Aksesoris',
			slug: 'aksesoris'
		}
	});

	// =====================================================
	// PRODUCTS
	// =====================================================

	const flanel = await prisma.product.create({
		data: {
			name: 'Kemeja Flanel Kotak',
			slug: 'kemeja-flanel-kotak',
			description:
				'Kemeja flanel premium berbahan lembut dan nyaman dipakai sehari-hari.',
			price: 150000,
			stock: 50,
			isFeatured: true,
			isActive: true,

			categoryId: atasanCategory.id,

			variants: {
				create: [
					{
						size: 'M',
						color: 'Merah Hitam',
						stock: 20
					},
					{
						size: 'L',
						color: 'Merah Hitam',
						stock: 20
					},
					{
						size: 'XL',
						color: 'Merah Hitam',
						stock: 10
					}
				]
			},

			images: {
				create: [
					{
						imageUrl:
							'https://via.placeholder.com/600x800?text=Flanel+Depan',
						isPrimary: true
					},
					{
						imageUrl:
							'https://via.placeholder.com/600x800?text=Flanel+Belakang',
						isPrimary: false
					}
				]
			}
		}
	});

	const kaos = await prisma.product.create({
		data: {
			name: 'Kaos Oversize Hitam',
			slug: 'kaos-oversize-hitam',
			description:
				'Kaos oversize berbahan cotton combed premium.',
			price: 95000,
			stock: 100,
			isFeatured: true,
			isActive: true,

			categoryId: atasanCategory.id,

			variants: {
				create: [
					{
						size: 'M',
						color: 'Hitam',
						stock: 50
					},
					{
						size: 'L',
						color: 'Hitam',
						stock: 50
					}
				]
			},

			images: {
				create: [
					{
						imageUrl:
							'https://via.placeholder.com/600x800?text=Kaos+Oversize',
						isPrimary: true
					}
				]
			}
		}
	});

	const chino = await prisma.product.create({
		data: {
			name: 'Celana Chino Panjang',
			slug: 'celana-chino-panjang',
			description:
				'Celana chino slim fit dengan bahan stretch premium.',
			price: 185000,
			stock: 30,
			isFeatured: false,
			isActive: true,

			categoryId: bawahanCategory.id,

			variants: {
				create: [
					{
						size: '30',
						color: 'Khaki',
						stock: 15
					},
					{
						size: '32',
						color: 'Khaki',
						stock: 15
					}
				]
			},

			images: {
				create: [
					{
						imageUrl:
							'https://via.placeholder.com/600x800?text=Celana+Chino',
						isPrimary: true
					}
				]
			}
		}
	});

	// =====================================================
	// PRODUCT REVIEWS
	// =====================================================

	await prisma.productReview.createMany({
		data: [
			{
				productId: flanel.id,
				customerName: 'Fadli',
				rating: 5,
				comment: 'Bahannya bagus dan nyaman dipakai.'
			},
			{
				productId: kaos.id,
				customerName: 'Andi',
				rating: 4,
				comment: 'Oversize-nya pas banget.'
			}
		]
	});

	// =====================================================
	// ORDERS
	// =====================================================

	const order = await prisma.order.create({
		data: {
			customerName: 'Budi',
			phone: '081277788899',
			totalPrice: 245000,
			status: 'CONFIRMED'
		}
	});

	await prisma.orderItem.createMany({
		data: [
			{
				orderId: order.id,
				productId: flanel.id,
				quantity: 1,
				price: 150000
			},
			{
				orderId: order.id,
				productId: kaos.id,
				quantity: 1,
				price: 95000
			}
		]
	});

	// =====================================================
	// VISITOR LOGS
	// =====================================================

	await prisma.visitorLog.createMany({
		data: [
			{
				ipAddress: '127.0.0.1',
				userAgent: 'Chrome',
				path: '/'
			},
			{
				ipAddress: '127.0.0.1',
				userAgent: 'Chrome',
				path: '/products'
			},
			{
				ipAddress: '127.0.0.1',
				userAgent: 'Mobile Safari',
				path: '/products/kaos-oversize-hitam'
			}
		]
	});

	console.log('✅ Seeding berhasil!');
}

main()
	.catch((e) => {
		console.error('❌ Seed gagal');
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});