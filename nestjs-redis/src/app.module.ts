import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RedisModule } from './redis/redis.module';

@Module({
    imports: [
        RedisModule.forRoot({
            isGlobal: true,
            url: 'redis://redis:6379',
        }),
    ],
    controllers: [AppController],
})
export class AppModule {}
