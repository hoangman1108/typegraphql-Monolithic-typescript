// eslint-disable-next-line max-classes-per-file
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';
import { Error } from '../../../Scalars/Error.type';
import { AuthToken } from './authToken.type';
@ObjectType()
export class User {
  @Field(() => ObjectIdScalar)
  readonly id: ObjectId;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field(() => AuthToken, { nullable: true })
  token?: AuthToken | null;
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

@ObjectType()
export class UserDelete {
  @Field()
  user: string;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
