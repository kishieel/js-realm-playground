import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users.resolver';
import { PostsUsersResolver } from './resolvers/posts.users.resolver';

@Module({
    providers: [UsersResolver, PostsUsersResolver],
})
export class UsersModule {}
