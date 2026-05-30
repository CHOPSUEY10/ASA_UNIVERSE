import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const count = await prisma.visitorLog.count({
            where: {
                createdAt: {
                    gte: startOfMonth
                }
            }
        });

        return json({
            count
        });
    } catch (error) {
        console.error('Error counting visitor logs for this month:', error);
        return json(
            {
                message: 'Failed to count visitor logs',
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
};

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
    try {
        let body = {};
        try {
            body = await request.json();
        } catch {
            // Body might be empty or not valid JSON
        }

        const { path = '/' } = body as { path?: string };

        // Robust client IP resolution
        let ipAddress: string | null = null;
        try {
            ipAddress = getClientAddress();
        } catch {
            ipAddress = request.headers.get('x-forwarded-for') ||
                        request.headers.get('cf-connecting-ip') ||
                        request.headers.get('x-real-ip') ||
                        '127.0.0.1';
        }

        const userAgent = request.headers.get('user-agent');

        const newLog = await prisma.visitorLog.create({
            data: {
                path,
                ipAddress,
                userAgent
            }
        });

        return json(
            {
                message: 'Visitor log recorded successfully',
                data: newLog
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error recording visitor log:', error);
        return json(
            {
                message: 'Failed to record visitor log',
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
};
