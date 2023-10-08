import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "uuid")')
export class User {
    @Field(() => ID)
    uuid: string;

    @Field(() => String)
    firstName: string;

    @Field(() => String)
    lastName: string;
}
