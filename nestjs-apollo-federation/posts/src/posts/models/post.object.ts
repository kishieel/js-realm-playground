import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "uuid")')
export class Post {
    @Field(() => ID)
    uuid: string;

    @Field(() => String)
    slug: string;

    @Field(() => String)
    title: string;

    @Field(() => String)
    content: string;

    @Field(() => String)
    @Directive('@inaccessible')
    createdByUuid: string;

    @Field(() => [String])
    @Directive('@inaccessible')
    likedByUuids: string[];
}
