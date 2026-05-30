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
	// DELETE DATA (urut berdasarkan relasi, child dulu)
	// =====================================================

	await prisma.orderItem.deleteMany();
	await prisma.order.deleteMany();

	await prisma.productReview.deleteMany();
	await prisma.productImage.deleteMany();
	await prisma.product.deleteMany();

	await prisma.kerah.deleteMany();
	await prisma.patch.deleteMany();
	await prisma.kain.deleteMany();
	await prisma.color.deleteMany();
	await prisma.size.deleteMany();

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

	const customerService = await prisma.user.create({
		data: {
			name: 'Customer Service ASA',
			email: 'cs@asauniverse.com',
			emailVerified: true,
			image: 'https://via.placeholder.com/300x300?text=CS'
		}
	});

	const [budi, putri, fanny] = await Promise.all([
		prisma.user.create({
			data: {
				name: 'Budi',
				email: 'budi12@gmail.com',
				emailVerified: true,
				image: 'https://via.placeholder.com/300x300?text=Budi'
			}
		}),
		prisma.user.create({
			data: {
				name: 'Putri',
				email: 'putri897@gmail.com',
				emailVerified: true,
				image: 'https://via.placeholder.com/300x300?text=Putri'
			}
		}),
		prisma.user.create({
			data: {
				name: 'Fanny',
				email: 'fanny17@gmail.com',
				emailVerified: true,
				image: 'https://via.placeholder.com/300x300?text=Fanny'
			}
		})
	]);

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
	// KERAH
	// =====================================================

	const [kerahBiasa, kerahPolo, kerahTali] = await Promise.all([
		prisma.kerah.create({ data: { nama: 'kerah biasa', harga: 0 } }),
		prisma.kerah.create({ data: { nama: 'kerah polo', harga: 10000 } }),
		prisma.kerah.create({ data: { nama: 'kerah tali', harga: 20000 } })
	]);

	// =====================================================
	// PATCH
	// =====================================================

	const [patchRubber, patch3dTpu] = await Promise.all([
		prisma.patch.create({ data: { nama: 'rubber', harga: 20000 } }),
		prisma.patch.create({ data: { nama: '3d tpu', harga: 20000 } })
	]);

	// =====================================================
	// KAIN
	// =====================================================

	const [kainMilano, kainSido, kainAirwalk, kainRabbit, kainEmboss] = await Promise.all([
		prisma.kain.create({ data: { nama: 'milano', quality: 'standard' } }),
		prisma.kain.create({ data: { nama: 'sido', quality: 'standard' } }),
		prisma.kain.create({ data: { nama: 'airwalk', quality: 'premium' } }),
		prisma.kain.create({ data: { nama: 'rabbit', quality: 'premium' } }),
		prisma.kain.create({ data: { nama: 'emboss', quality: 'premium' } }),
		prisma.kain.create({ data: { nama: 'emboss2', quality: 'premium' } }),
		prisma.kain.create({ data: { nama: 'emboss3', quality: 'premium' } })
	]);

	// =====================================================
	// COLOR
	// =====================================================

	const [colorHitam, colorPutih, colorNavy, colorMerah, colorAbu] = await Promise.all([
		prisma.color.create({ data: { name: 'Hitam' } }),
		prisma.color.create({ data: { name: 'Putih' } }),
		prisma.color.create({ data: { name: 'Navy' } }),
		prisma.color.create({ data: { name: 'Merah' } }),
		prisma.color.create({ data: { name: 'Abu-abu' } })
	]);

	// =====================================================
	// SIZE
	// =====================================================

	const [sizeS, sizeM, sizeL, sizeXL] = await Promise.all([
		prisma.size.create({ data: { name: 'XS', width: 44, height: 67 } }),
		prisma.size.create({ data: { name: 'S',  width: 46, height: 69 } }),
		prisma.size.create({ data: { name: 'M',  width: 48, height: 71 } }),
		prisma.size.create({ data: { name: 'L',  width: 50, height: 73 } }),
		prisma.size.create({ data: { name: 'XL', width: 52, height: 75 } }),
		prisma.size.create({ data: { name: 'XXL', width: 56, height: 78 } }),
		prisma.size.create({ data: { name: '3XL', width: 60, height: 80 } }),
		prisma.size.create({ data: { name: '4XL', width: 63, height: 82 } })
	]);

	// =====================================================
	// PRODUCTS (kainId wajib — relasi ke Kain)
	// =====================================================

	const [prodAsaStandart, prodAsaPremium, prodBajuStandart, prodBajuPremium, prodKaosPolo] =
		await Promise.all([
			prisma.product.create({
				data: {
					name: 'asa standart',
					slug: 'asa-standart',
					description: 'bahan kain standard',
					price: 160000,
					stock: 100,
					isFeatured: true,
					kainId: kainMilano.id
				}
			}),
			prisma.product.create({
				data: {
					name: 'asa premium',
					slug: 'asa-premium',
					description: 'bahan kain premium',
					price: 200000,
					stock: 100,
					isFeatured: true,
					kainId: kainAirwalk.id
				}
			}),
			prisma.product.create({
				data: {
					name: 'baju standart',
					slug: 'baju-standart',
					description: 'bahan kain standard',
					price: 130000,
					stock: 100,
					kainId: kainSido.id
				}
			}),
			prisma.product.create({
				data: {
					name: 'baju premium',
					slug: 'baju-premium',
					description: 'bahan kain premium',
					price: 140000,
					stock: 100,
					kainId: kainRabbit.id
				}
			}),
			prisma.product.create({
				data: {
					name: 'kaos polo',
					slug: 'kaos-polo',
					description: 'bordir depan belakang',
					price: 110000,
					stock: 100,
					kainId: kainMilano.id
				}
			})
		]);

	// =====================================================
	// PRODUCT IMAGES
	// =====================================================

	await prisma.productImage.createMany({
		data: [
			{ productId: prodAsaStandart.id, url: 'https://via.placeholder.com/600x600?text=ASA+Standart+1' },
			{ productId: prodAsaStandart.id, url: 'https://via.placeholder.com/600x600?text=ASA+Standart+2' },
			{ productId: prodAsaPremium.id,  url: 'https://via.placeholder.com/600x600?text=ASA+Premium+1' },
			{ productId: prodBajuStandart.id, url: 'https://via.placeholder.com/600x600?text=Baju+Standart+1' },
			{ productId: prodBajuPremium.id,  url: 'https://via.placeholder.com/600x600?text=Baju+Premium+1' },
			{ productId: prodKaosPolo.id,     url: 'https://via.placeholder.com/600x600?text=Kaos+Polo+1' }
		]
	});

	// =====================================================
	// PRODUCT REVIEWS
	// =====================================================

	await prisma.productReview.createMany({
		data: [
			{
				productId: prodAsaStandart.id,
				userId: budi.id,
				rating: 5,
				comment: 'Kualitas bagus, jahitan rapi!'
			},
			{
				productId: prodAsaStandart.id,
				userId: putri.id,
				rating: 4,
				comment: 'Bahan nyaman, pengiriman cepat.'
			},
			{
				productId: prodAsaPremium.id,
				userId: fanny.id,
				rating: 5,
				comment: 'Premium banget, worth it!'
			},
			{
				productId: prodKaosPolo.id,
				userId: budi.id,
				rating: 4,
				comment: 'Cocok untuk seragam kantor.'
			}
		]
	});

	// =====================================================
	// ORDERS + ORDER ITEMS
	// =====================================================

	// Order 1 — Budi (CONFIRMED)
	const order1 = await prisma.order.create({
		data: {
			userId: budi.id,
			customerName: budi.name,
			email: budi.email,
			status: 'CONFIRMED',
			totalPrice: 0, // dihitung setelah items dibuat
			items: {
				create: [
					{
						productId: prodAsaStandart.id,
						kerahId: kerahBiasa.id,
						patchId: patchRubber.id,
						sizeId: sizeM.id,
						colorId: colorHitam.id,
						quantity: 1,
						// price = product(160000) + kerah(0) + patch(20000)
						price: 180000
					},
					{
						productId: prodKaosPolo.id,
						kerahId: kerahPolo.id,
						patchId: patch3dTpu.id,
						sizeId: sizeL.id,
						colorId: colorNavy.id,
						quantity: 1,
						// price = product(110000) + kerah(10000) + patch(20000)
						price: 140000
					}
				]
			}
		}
	});

	await prisma.order.update({
		where: { id: order1.id },
		data: { totalPrice: 180000 + 140000 }
	});

	// Order 2 — Putri (PENDING)
	const order2 = await prisma.order.create({
		data: {
			userId: putri.id,
			customerName: putri.name,
			email: putri.email,
			status: 'PENDING',
			totalPrice: 0,
			items: {
				create: [
					{
						productId: prodAsaPremium.id,
						kerahId: kerahTali.id,
						patchId: patchRubber.id,
						sizeId: sizeS.id,
						colorId: colorPutih.id,
						quantity: 2,
						// price = product(200000) + kerah(20000) + patch(20000)
						price: 240000
					}
				]
			}
		}
	});

	await prisma.order.update({
		where: { id: order2.id },
		data: { totalPrice: 240000 * 2 }
	});

	// Order 3 — Fanny (CANCELLED)
	const order3 = await prisma.order.create({
		data: {
			userId: fanny.id,
			customerName: fanny.name,
			email: fanny.email,
			status: 'CANCELLED',
			totalPrice: 0,
			items: {
				create: [
					{
						productId: prodBajuPremium.id,
						kerahId: kerahBiasa.id,
						patchId: patch3dTpu.id,
						sizeId: sizeXL.id,
						colorId: colorAbu.id,
						quantity: 1,
						// price = product(140000) + kerah(0) + patch(20000)
						price: 160000
					}
				]
			}
		}
	});

	await prisma.order.update({
		where: { id: order3.id },
		data: { totalPrice: 160000 }
	});

	// =====================================================
	// VISITOR LOGS
	// =====================================================

	await prisma.visitorLog.createMany({
		data: [
			{ ipAddress: '127.0.0.1', userAgent: 'Chrome', path: '/' },
			{ ipAddress: '127.0.0.1', userAgent: 'Chrome', path: '/products' },
			{ ipAddress: '127.0.0.1', userAgent: 'Mobile Safari', path: '/products/asa-standart' },
			{ ipAddress: '192.168.1.10', userAgent: 'Firefox', path: '/products/asa-premium' },
			{ ipAddress: '192.168.1.11', userAgent: 'Mobile Safari', path: '/products/kaos-polo' }
		]
	});

	console.log('✅ Seeding berhasil!');
	console.log({ admin, customerService, budi, putri, fanny });
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