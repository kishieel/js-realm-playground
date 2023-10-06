import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { usersConfig } from './configs/users.config';
import { postsConfig } from './configs/posts.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [usersConfig, postsConfig],
        }),
        UsersModule,
        PostsModule,
    ],
})
export class AppModule {}
