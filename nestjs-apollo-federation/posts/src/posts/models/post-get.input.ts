import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class PostGetInput {
    @Field(() => ID)
    uuid: string;
}
