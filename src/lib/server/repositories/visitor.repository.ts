import { prisma } from '$lib/server/prisma';

export const VisitorRepository = {
    async getTotalVisitors() {
        return await prisma.visitorLog.count();
    },

    async getDailyVisitors() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        return await prisma.visitorLog.count({
            where: {
                createdAt: {
                    gte: startOfDay
                }
            }
        });
    },

    async getMonthlyVisitors() {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        return await prisma.visitorLog.count({
            where: {
                createdAt: {
                    gte: startOfMonth
                }
            }
        });
    }
};
