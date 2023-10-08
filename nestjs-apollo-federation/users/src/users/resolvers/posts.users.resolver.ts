import { Directive, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../models/user.object';
import { Post } from '../../external/post.object';
import { db } from '../users.db';

@Resolver(() => Post)
export class PostsUsersResolver {
    @ResolveField('createdBy', () => User)
    @Directive('@requires(fields: "createdByUuid")')
    resolveCreatedBy(@Parent() post: Post): User {
        return db.get(post.createdByUuid);
    }

    @ResolveField('likedBy', () => [User])
    @Directive('@requires(fields: "likedByUuids")')
    resolveLikedBy(@Parent() post: Post): User[] {
        return post.likedByUuids.map((likedByUuid) => db.get(likedByUuid));
    }
}
