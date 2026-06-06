const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.patch.createMany({
    data: [
      { nama: 'Polyflex', harga: 20000 },
      { nama: 'Biasa', harga: 20000 }
    ],
    skipDuplicates: true
  });
  console.log('Successfully inserted patches.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
