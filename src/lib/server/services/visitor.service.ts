import { VisitorRepository } from '../repositories/visitor.repository';

export const VisitorService = {
    async getVisitorStats() {
        const [total, daily, monthly] = await Promise.all([
            VisitorRepository.getTotalVisitors(),
            VisitorRepository.getDailyVisitors(),
            VisitorRepository.getMonthlyVisitors()
        ]);

        return {
            total,
            daily,
            monthly
        };
    }
};
