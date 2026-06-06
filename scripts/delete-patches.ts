import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare const process: any;

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter });

async function deleteRedundantPatches() {
	await prisma.patch.deleteMany({
		where: {
			id: {
				in: [5, 6]
			}
		}
	});
	console.log('Deleted redundant patches (id 5 and 6)');
}

deleteRedundantPatches()
	.catch(e => console.error(e))
	.finally(() => prisma.$disconnect());
