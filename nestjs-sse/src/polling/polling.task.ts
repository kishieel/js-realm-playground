import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { PollingStrategy } from '@app/polling/polling.strategy';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class PollingTask {
    private readonly logger = new Logger(PollingTask.name);

    constructor(
        private readonly pollingStrategy: PollingStrategy,
        private readonly prismaService: PrismaService,
    ) {}

    @Interval(1000)
    async updateStocks(): Promise<void> {
        this.logger.log('Updating stocks...');
        const stocks = await this.pollingStrategy.getStock();
        await Promise.all(
            stocks.map((stock) =>
                this.prismaService.stock.update({
                    where: { symbol: stock.symbol },
                    data: { prices: { create: { price: stock.price, pricedAt: stock.pricedAt } } },
                }),
            ),
        );
    }
}
