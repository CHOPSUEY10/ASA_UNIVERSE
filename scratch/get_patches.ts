import { prisma } from '../src/lib/server/prisma';

async function main() {
    const patches = await prisma.patch.findMany();
    console.log(patches);
}

main().finally(() => prisma.$disconnect());
