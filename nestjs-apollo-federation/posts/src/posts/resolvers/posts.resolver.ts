import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Post } from '../models/post.object';
import { PostGetInput } from '../models/post-get.input';
import { db } from '../posts.db';

@Resolver(() => Post)
export class PostsResolver {
    @ResolveReference()
    resolveReference(reference: { __typename: string; uuid: string }): Post {
        return db.get(reference.uuid);
    }

    @Query(() => Post, { name: 'post' })
    getPost(@Args('input') input: PostGetInput): Post {
        return db.get(input.uuid);
    }

    @Query(() => [Post], { name: 'posts' })
    getPosts(): Post[] {
        return Array.from(db.values());
    }
}
