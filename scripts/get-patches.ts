import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare const process: any;

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter });

async function getPatches() {
	const patches = await prisma.patch.findMany();
	console.log(patches);
}

getPatches()
	.catch(e => console.error(e))
	.finally(() => prisma.$disconnect());
