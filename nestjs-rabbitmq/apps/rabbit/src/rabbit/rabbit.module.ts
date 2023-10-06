import { Module } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RabbitConfig, RabbitConfigToken } from '../config/rabbit.config';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                const rabbitConfig = configService.getOrThrow<RabbitConfig>(RabbitConfigToken);
                return {
                    baseURL: rabbitConfig.apiUrl,
                    auth: {
                        username: rabbitConfig.username,
                        password: rabbitConfig.password,
                    },
                    timeout: 30_000,
                    maxRedirects: 5,
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [RabbitService],
    exports: [RabbitService],
})
export class RabbitModule {}
