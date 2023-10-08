import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "uuid")')
export class Post {
    @Field(() => ID)
    uuid: string;

    @Field(() => String)
    @Directive('@external')
    createdByUuid: string;

    @Field(() => [String])
    @Directive('@external')
    likedByUuids: string[];
}
