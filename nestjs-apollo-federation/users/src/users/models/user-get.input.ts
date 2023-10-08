import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UserGetInput {
    @Field(() => ID)
    uuid: string;
}
