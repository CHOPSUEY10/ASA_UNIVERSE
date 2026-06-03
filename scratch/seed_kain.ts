import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding products and kains...');

    // 1. Update Products
    const standartDesc = `- Motif dan Logo Full Printing (Termasuk Celana)
- Bahan Kain Standart
- Motif dan Logo Full Printing`;

    const premiumDesc = `- Motif dan Logo Full Printing (Termasuk Celana)
- Bahan Kain Premium
- Motif dan Logo Full Printing`;

    // Try to find products that match name loosely
    const products = await prisma.product.findMany();
    for (const p of products) {
        if (p.name.toLowerCase().includes('standart')) {
            await prisma.product.update({
                where: { id: p.id },
                data: { description: standartDesc }
            });
            console.log(`Updated description for product: ${p.name}`);
        } else if (p.name.toLowerCase().includes('premium')) {
            await prisma.product.update({
                where: { id: p.id },
                data: { description: premiumDesc }
            });
            console.log(`Updated description for product: ${p.name}`);
        }
    }

    // 2. Add Kain Options
    const standartKains = ['Milano', 'Sido'];
    const premiumKains = ['Airwalk', 'Rabbit', 'emboss', 'emboss 2', 'emboss 3'];

    for (const nama of standartKains) {
        const exists = await prisma.kain.findFirst({ where: { nama, quality: 'Standart' } });
        if (!exists) {
            await prisma.kain.create({ data: { nama, quality: 'Standart' } });
            console.log(`Created Kain: ${nama} (Standart)`);
        }
    }

    for (const nama of premiumKains) {
        const exists = await prisma.kain.findFirst({ where: { nama, quality: 'Premium' } });
        if (!exists) {
            await prisma.kain.create({ data: { nama, quality: 'Premium' } });
            console.log(`Created Kain: ${nama} (Premium)`);
        }
    }

    console.log('Seeding done.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
