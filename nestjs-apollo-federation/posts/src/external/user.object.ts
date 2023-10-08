import { Directive, Extensions, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "uuid")')
export class User {
    @Field(() => ID)
    @Extensions({ yyy: 444 })
    uuid: string;
}
