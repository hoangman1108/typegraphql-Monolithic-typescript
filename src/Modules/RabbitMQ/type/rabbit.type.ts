/* eslint-disable max-classes-per-file */
import { Field, ObjectType } from 'type-graphql';
import { Error } from '../../../Scalars/Error.type';

@ObjectType()
export class RabbitPayload {
  @Field(() => String, { nullable: true })
  message: string | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class Rabbit {
  @Field()
  title: string;

  @Field()
  description: string;
}

@ObjectType()
export class RabbitPayloads {
  @Field(() => [Rabbit], { nullable: true })
  rabbits: Rabbit[] | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
