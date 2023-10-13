import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthConfig, AuthConfigToken } from '@app/configs/auth.config';
import { AuthHandler } from '@app/auth/auth.handler';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                const authConfig = configService.getOrThrow<AuthConfig>(AuthConfigToken);
                return { secret: authConfig.jwtSecret };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController, AuthHandler],
})
export class AuthModule {}
