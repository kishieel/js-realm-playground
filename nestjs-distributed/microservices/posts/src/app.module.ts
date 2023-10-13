import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma/prisma.module';
import { HealthModule } from '@app/health/health.module';
import { BindingsModule, MessagingModule } from '@kishieel/nestjs-distributed-messaging';
import { ConfigModule } from '@app/configs/config.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { RabbitConfig, RabbitConfigToken } from '@app/configs/rabbit.config';

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        HealthModule,
        PostsModule,
        UsersModule,
        BindingsModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const rabbitConfig = configService.getOrThrow<RabbitConfig>(RabbitConfigToken);
                return {
                    httpUrl: rabbitConfig.httpUrl,
                    eventbus: rabbitConfig.eventbus,
                    queue: rabbitConfig.queue,
                };
            },
            inject: [ConfigService],
        }),
        MessagingModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const rabbitConfig = configService.getOrThrow<RabbitConfig>(RabbitConfigToken);
                return {
                    rmqUrl: rabbitConfig.rmqUrl,
                    eventbus: rabbitConfig.eventbus,
                };
            },
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
