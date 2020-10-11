/* eslint-disable-next-line max-classes-per-file */
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';
import { Error } from '../../../Scalars/error.type';
@ObjectType()
export class User {
  @Field(() => ObjectIdScalar)
  readonly id: ObjectId;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserPayload {
  @Field(() => User, { nullable: true })
  user: User | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class UserPayloads {
  @Field(() => [User], { nullable: true })
  users: User[] | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
