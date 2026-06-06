import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const patches = [
    { nama: 'Polyflex', harga: 20000 },
    { nama: 'Biasa', harga: 10000 }
  ];

  for (const patch of patches) {
    const existing = await prisma.patch.findFirst({
      where: { nama: patch.nama }
    });

    if (!existing) {
      console.log(`Inserting ${patch.nama}...`);
      await prisma.patch.create({
        data: patch
      });
      console.log(`${patch.nama} inserted.`);
    } else {
      console.log(`${patch.nama} already exists.`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
