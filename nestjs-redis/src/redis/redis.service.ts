import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT_TOKEN } from './redis.consts';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
    constructor(
        @Inject(REDIS_CLIENT_TOKEN)
        private readonly client: RedisClientType,
    ) {}

    async set(key: string, value: string, ttl: number = 1000) {
        await this.client.set(key, value, { EX: ttl });
    }

    async get(key: string) {
        return await this.client.get(key);
    }
}
