import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@app/configs/config.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { HealthModule } from '@app/health/health.module';
import { BindingsModule, MessagingModule } from '@kishieel/nestjs-distributed-messaging';
import { ConfigService } from '@nestjs/config';
import { RabbitConfig, RabbitConfigToken } from '@app/configs/rabbit.config';

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        HealthModule,
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
    controllers: [],
    providers: [],
})
export class AppModule {}
