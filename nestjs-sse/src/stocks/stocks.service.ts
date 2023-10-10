import { Injectable } from '@nestjs/common';
import { FeedDto } from '@app/stocks/dtos/feed.dto';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class StocksService {
    constructor(private readonly prismaService: PrismaService) {}

    async getFeed(): Promise<FeedDto[]> {
        const stocks = await this.prismaService.stock.findMany({
            include: { prices: { orderBy: { pricedAt: 'desc' }, take: 2 } },
        });
        return stocks.map((stock) => ({
            uuid: stock.uuid,
            symbol: stock.symbol,
            price: stock.prices[0].price,
            pricedAt: stock.prices[0].pricedAt,
            change: stock.prices.length > 1 ? stock.prices[0].price - stock.prices[1].price : 0,
        }));
    }
}
