import { Directive, Extensions, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../../external/user.object';
import { Post } from '../models/post.object';
import { db } from '../posts.db';

@Resolver(() => User)
export class UsersPostsResolver {
    @ResolveField('createdPosts', () => [Post], { complexity: 5 })
    resolveCreatedPosts(@Parent() user: User): Post[] {
        return Array.from(db.values()).filter((post) => post.createdByUuid === user.uuid);
    }

    @ResolveField('likedPosts', () => [Post], { complexity: 5 })
    resolveLikedPosts(@Parent() user: User): Post[] {
        return Array.from(db.values()).filter((post) => post.createdByUuid === user.uuid);
    }
}
