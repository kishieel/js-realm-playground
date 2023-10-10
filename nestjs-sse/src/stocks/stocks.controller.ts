import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { StocksService } from '@app/stocks/stocks.service';
import { interval, map, Observable, switchMap } from 'rxjs';

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @Sse('feed')
    getFeed(): Observable<MessageEvent> {
        return interval(1000).pipe(
            switchMap(() => this.stocksService.getFeed()),
            map((data) => ({ data })),
        );
    }
}
