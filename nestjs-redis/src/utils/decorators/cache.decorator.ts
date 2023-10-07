import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '../interceptors/cache.interceptor';
import { CACHE_KEY_METADATA, CACHE_TTL_METADATA } from '../consts';

export type CacheableArgs = {
    key?: string;
    /** TTL in seconds */
    ttl?: number;
};

export function Cacheable(args?: CacheableArgs) {
    return applyDecorators(
        SetMetadata(CACHE_TTL_METADATA, args.ttl),
        SetMetadata(CACHE_KEY_METADATA, args.key),
        UseInterceptors(CacheInterceptor),
    );
}
