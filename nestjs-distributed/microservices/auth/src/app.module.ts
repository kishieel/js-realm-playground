import { Module } from '@nestjs/common';
import { AuthModule } from '@app/auth/auth.module';
import { HealthModule } from '@app/health/health.module';
import { ConfigModule } from '@app/configs/config.module';
import { PrismaModule } from '@app/prisma/prisma.module';
import { BindingsModule, Eventbus, MessagingModule } from '@kishieel/nestjs-distributed-messaging';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import { RabbitConfig, RabbitConfigToken } from '@app/configs/rabbit.config';

@Module({
    imports: [
        ConfigModule,
        HealthModule,
        PrismaModule,
        AuthModule,
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
                return { rmqUrl: rabbitConfig.rmqUrl };
            },
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
