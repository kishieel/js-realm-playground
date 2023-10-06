import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { MessagingModule } from '@app/messaging';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessagingConfig, messagingConfig, MessagingConfigToken } from './config/messaging.config';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [messagingConfig],
            validationSchema: Joi.object({
                RABBIT_URL: Joi.string().required(),
            }),
        }),
        MessagingModule.forRootAsync({
            isGlobal: true,
            useFactory: (configService: ConfigService) => {
                return configService.getOrThrow<MessagingConfig>(MessagingConfigToken);
            },
            inject: [ConfigService],
        }),
    ],
    controllers: [BillingController],
    providers: [],
})
export class BillingModule {}
