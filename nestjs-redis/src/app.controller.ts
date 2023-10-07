import { Controller, Get } from '@nestjs/common';
import { Cacheable } from './utils/decorators/cache.decorator';
import { delay, firstValueFrom, of } from 'rxjs';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
    constructor(private readonly redisService: RedisService) {}

    @Get()
    @Cacheable({ ttl: 30 })
    async getHello() {
        return await firstValueFrom(of({ uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff' }).pipe(delay(10_000)));
    }
}
