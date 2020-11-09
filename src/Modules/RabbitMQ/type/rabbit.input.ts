import { Field, InputType } from 'type-graphql';

@InputType()
export class RabbitInput {
  @Field()
  title: String;

  @Field()
  description: String;
}
