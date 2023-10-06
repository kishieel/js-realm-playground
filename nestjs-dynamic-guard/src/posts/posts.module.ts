import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { POSTS_CONFIG_TOKEN, PostsConfig } from 'src/configs/posts.config';
import { AUTH_SECRET_TOKEN } from 'src/utils/guards/auth-secret.guard';
import { PostsController } from './posts.controller';

@Module({
    controllers: [PostsController],
    providers: [
        {
            provide: AUTH_SECRET_TOKEN,
            useFactory: (configService: ConfigService) => {
                const config = configService.getOrThrow<PostsConfig>(POSTS_CONFIG_TOKEN);
                return config.authSecret;
            },
            inject: [ConfigService],
        },
    ],
})
export class PostsModule {}
