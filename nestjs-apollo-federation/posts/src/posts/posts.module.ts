import { Module } from '@nestjs/common';
import { PostsResolver } from './resolvers/posts.resolver';
import { UsersPostsResolver } from './resolvers/users.posts.resolver';

@Module({
    providers: [PostsResolver, UsersPostsResolver],
})
export class PostsModule {}
