import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/configs/config.module';
import { HealthModule } from '@app/health/health.module';
import { HttpModule } from '@nestjs/axios';
import { MessagingModule } from '@kishieel/nestjs-distributed-messaging';
import { RabbitConfig, RabbitConfigToken } from '@app/configs/rabbit.config';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule,
        HealthModule,
        HttpModule,
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
})
export class AppModule {}
