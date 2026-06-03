import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { env } from '$env/dynamic/private';
import pg from 'pg';

// Gunakan DATABASE_URL (Transaction Pooler di Supabase) bukan DIRECT_URL 
// untuk menghindari batas koneksi 15 (max clients reached) di Vercel / Serverless.
const connectionString = env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Mencegah Exhaustion Connection Pool saat HMR / Vercel Serverless
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
