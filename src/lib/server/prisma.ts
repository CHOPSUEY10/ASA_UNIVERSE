
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '$env/dynamic/private';
const adapter = new PrismaPg({ connectionString: env.DIRECT_URL });

export const prisma = new PrismaClient({ adapter });
