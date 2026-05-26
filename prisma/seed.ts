
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

async function main() {
	console.log('🧹 Menghapus data lama...');

	// =====================================================
	// DELETE DATA (URUT BERDASARKAN RELATION)
	// =====================================================

	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();

	await prisma.productReview.deleteMany();
	await prisma.productImage.deleteMany();
	await prisma.productVariant.deleteMany();

	await prisma.product.deleteMany();
	await prisma.category.deleteMany();

	await prisma.visitorLog.deleteMany();
	await prisma.contactInformation.deleteMany();

	// Better Auth tables
	await prisma.session.deleteMany();
	await prisma.account.deleteMany();
	await prisma.verification.deleteMany();
	await prisma.user.deleteMany();

	console.log('🌱 Membuat data seed...');

	// =====================================================
	// USERS
	// =====================================================

	const admin = await prisma.user.create({
		data: {
			name: 'Admin ASA Universe',
			email: 'admin@asauniverse.com',
			emailVerified: true,
			image: 'https://via.placeholder.com/300x300?text=Admin'
		}
	});

	await prisma.user.createMany({
		data : [
			{
				name: 'Budi',
				email: 'budi12@gmail.com',
				emailVerified: true,
				image: 'https://via.placeholder.com/300x300?text=Budi'

			},

			{
				name: 'Putri',
				email: 'putri897@gmail.com',
				emailVerified: true,
				image: 'https://via.placeholder.com/300x300?text=Putri'

			},

			{
				name: 'Fanny',
				email: 'fanny17@gmail.com',
				emailVerified: true,
				image: 'https://via.placeholder.com/300x300?text=Fanny'

			},
		]
})



	const customerService = await prisma.user.create({
		data: {
			name: 'Customer Service ASA',
			email: 'cs@asauniverse.com',
			emailVerified: true,
			image: 'https://via.placeholder.com/300x300?text=CS'
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


	// =====================================================
	// PRODUCTS
	// =====================================================

	const jerseyHome = await prisma.product.create({
		data: {
			name: 'Jersey Futsal ASA Home',
			slug: 'jersey-futsal-asa-home',
			description:
				'Jersey futsal dry-fit premium dengan bahan ringan dan cepat menyerap keringat.',
			price: 185000,
			stock: 50,
			isFeatured: true,
			isActive: true,

			categoryId: atasanCategory.id,

			variants: {
				create: [
					{
						size: 'M',
						color: 'Hitam Merah',
						stock: 20
					},
					{
						size: 'L',
						color: 'Hitam Merah',
						stock: 20
					},
					{
						size: 'XL',
						color: 'Hitam Merah',
						stock: 10
					}
				]
			},

			images: {
				create: [
					{
						imageUrl:
							'https://via.placeholder.com/600x800?text=Jersey+Home',
						isPrimary: true
					},
					{
						imageUrl:
							'https://via.placeholder.com/600x800?text=Jersey+Belakang',
						isPrimary: false
					}
				]
			}
		}
	});

	const kaos = await prisma.product.create({
		data: {
			name: 'Kaos Sport Training Hitam',
			slug: 'kaos-sport-training-hitam',
			description: 'Kaos sport training berbahan dry-fit breathable untuk olahraga.',
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
							'https://via.placeholder.com/600x800?text=Kaos+Sport',
						isPrimary: true
					}
				]
			}
		}
	});

	const celanaTraining = await prisma.product.create({
		data: {
			name: 'Celana Training Sport',
			slug: 'celana-training-sport',
			description: 'Celana training olahraga fleksibel dan nyaman dipakai aktivitas sport.',
			price: 145000,
			stock: 35,
			isFeatured: false,
			isActive: true,

			categoryId: bawahanCategory.id,

			variants: {
				create: [
					{
						size: '30',
						color: 'Hitam',
						stock: 15
					},
					{
						size: '32',
						color: 'Hitam',
						stock: 10
					},
					{
						size: '34',
						color: 'Hitam',
						stock: 10
					}
				]
			},

			images: {
				create: [
					{
						imageUrl:
							'https://via.placeholder.com/600x800?text=Celana+Training',
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
				productId: jerseyHome.id,
				customerName: 'Fadli',
				rating: 5,
				comment: 'Bahannya bagus dan nyaman dipakai.'
			},
			{
				productId: kaos.id,
				customerName: 'Andi',
				rating: 4,
				comment: 'Oversize-nya pas banget.'
			},
			{
				productId: celanaTraining.id,
				customerName: 'Rizky',
				rating: 5,
				comment: 'Bahannya tebal dan jahitannya rapi.'
			}
		]
	});

	// =====================================================
	// ORDERS
	// =====================================================

	const order = await prisma.order.create({
		data: {
			customerName: 'Budi',
			userId : 'cmpl41duc0001d8tuid08479y',
			email : 'budisetiawan@gmail.com',
			totalPrice: 245000,
			status: 'CONFIRMED',
		}
	});

	await prisma.orderItem.createMany({
		data: [
			{
				orderId: order.id,
				productId: jerseyHome.id,
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
				path: '/products/kaos-sport-training-hitam'
			}
		]
	});

	console.log('✅ Seeding berhasil!');
	console.log({
		admin,
		customerService
	});
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

