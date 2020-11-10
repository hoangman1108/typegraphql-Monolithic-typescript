/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { Error } from '../../../Scalars/Error.type';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@ObjectType()
export class RabbitPayload {
  @Field(() => String, { nullable: true })
  message: string | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class Rabbit {
  @Field(() => ObjectIdScalar)
  id: ObjectId;

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
