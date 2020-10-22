import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Error {
  @Field(() => String)
  field: string;

  @Field(() => [String], { nullable: true })
  message: [string];
}
