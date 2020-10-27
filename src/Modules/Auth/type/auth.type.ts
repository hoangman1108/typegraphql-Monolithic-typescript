// eslint-disable-next-line max-classes-per-file
import { Field, ObjectType } from 'type-graphql';
import { Error } from '../../../Scalars/Error.type';
import { AuthToken } from '../../User/type/authToken.type';
import { User } from '../../User/type/user.type';

@ObjectType()
export class Auth {
  @Field(() => AuthToken, { nullable: true })
  token: AuthToken;

  @Field(() => User, { nullable: true })
  profile: User | null;
}
@ObjectType()
export class AuthPayload {
  @Field(() => Auth, { nullable: true })
  user: Auth | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class AccessToken {
  @Field(() => String, { nullable: true })
  token: string | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
