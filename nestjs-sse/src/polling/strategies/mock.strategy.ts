import { PollingStrategy } from '@app/polling/polling.strategy';
import { Injectable } from '@nestjs/common';
import { Stock } from '@app/polling/polling.interface';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class MockStrategy extends PollingStrategy {
    constructor(private readonly prismaService: PrismaService) {
        super();
    }

    async getStock(): Promise<Stock[]> {
        const stocks = await this.prismaService.stock.findMany({
            include: { prices: { orderBy: { pricedAt: 'desc' }, take: 1 } },
        });
        const now = new Date();
        return stocks.map((stock) => ({
            symbol: stock.symbol,
            price: stock.prices[0].price + (Math.random() - 0.5) * 10,
            pricedAt: now,
        }));
    }
}
