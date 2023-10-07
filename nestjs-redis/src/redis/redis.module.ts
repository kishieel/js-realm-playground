import { DynamicModule, Inject, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { RedisAsyncOptions, RedisOptions } from './redis.interfaces';
import { REDIS_CLIENT_TOKEN, REDIS_OPTIONS_TOKEN } from './redis.consts';
import { RedisService } from './redis.service';
import { createClient, RedisClientType } from 'redis';

@Module({})
export class RedisModule implements OnApplicationBootstrap, OnApplicationShutdown {
    static forRoot(options: RedisOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: RedisModule,
            providers: [
                { provide: REDIS_OPTIONS_TOKEN, useValue: options },
                {
                    provide: REDIS_CLIENT_TOKEN,
                    useFactory: (options: RedisOptions) => {
                        return createClient({ url: options.url });
                    },
                    inject: [REDIS_OPTIONS_TOKEN],
                },
                RedisService,
            ],
            exports: [RedisService],
        };
    }

    static forRootAsync(options: RedisAsyncOptions): DynamicModule {
        return {
            global: options.isGlobal,
            module: RedisModule,
            providers: [
                {
                    provide: REDIS_OPTIONS_TOKEN,
                    useFactory: options.useFactory,
                    inject: options.inject,
                },
                {
                    provide: REDIS_CLIENT_TOKEN,
                    useFactory: (options: RedisOptions) => {
                        return createClient({ url: options.url });
                    },
                    inject: [REDIS_OPTIONS_TOKEN],
                },
                RedisService,
            ],
            imports: options.imports,
            exports: [RedisService],
        };
    }

    constructor(@Inject(REDIS_CLIENT_TOKEN) private readonly client: RedisClientType) {}

    async onApplicationBootstrap() {
        await this.client.connect();
    }

    async onApplicationShutdown() {
        await this.client.disconnect();
    }
}
