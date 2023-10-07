import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, of } from 'rxjs';
import { RedisService } from '../../redis/redis.service';
import { Reflector } from '@nestjs/core';
import { CACHE_KEY_METADATA, CACHE_TTL_METADATA } from '../consts';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    private readonly defaultTtl = 10_000;

    constructor(
        private readonly redisService: RedisService,
        private readonly reflector: Reflector,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const cacheKey = this.getCacheKey(context);
        const cacheTtl = this.getCacheTtl(context);
        const cache = await this.redisService.get(cacheKey);

        if (!!cache) return of(JSON.parse(cache));

        return next.handle().pipe(
            map((response) => {
                this.redisService.set(cacheKey, JSON.stringify(response), cacheTtl);
                return response;
            }),
        );
    }

    getCacheKey(context: ExecutionContext) {
        const cacheKey = this.reflector.get(CACHE_KEY_METADATA, context.getHandler());
        return cacheKey ?? `${context.getClass().name}#${context.getHandler().name}`;
    }

    getCacheTtl(context: ExecutionContext) {
        const cacheTtl = this.reflector.get(CACHE_TTL_METADATA, context.getHandler());
        return cacheTtl ?? this.defaultTtl;
    }
}
