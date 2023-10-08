import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UserGetInput } from '../models/user-get.input';
import { User } from '../models/user.object';
import { db } from '../users.db';

@Resolver(() => User)
export class UsersResolver {
    @ResolveReference()
    resolveReference(reference: { __typename: string; uuid: string }): User {
        return db.get(reference.uuid);
    }

    @Query(() => User, { name: 'user' })
    getUser(@Args('input') input: UserGetInput): User {
        return db.get(input.uuid);
    }

    @Query(() => [User], { name: 'users' })
    getUsers(): User[] {
        return Array.from(db.values());
    }
}
