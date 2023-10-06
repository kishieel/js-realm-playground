import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { USERS_CONFIG_TOKEN, UsersConfig } from '../configs/users.config';
import { AUTH_SECRET_TOKEN } from '../utils/guards/auth-secret.guard';
import { UsersController } from './users.controller';

@Module({
    controllers: [UsersController],
    providers: [
        {
            provide: AUTH_SECRET_TOKEN,
            useFactory: (configService: ConfigService) => {
                const config = configService.getOrThrow<UsersConfig>(USERS_CONFIG_TOKEN);
                return config.authSecret;
            },
            inject: [ConfigService],
        },
    ],
})
export class UsersModule {}
