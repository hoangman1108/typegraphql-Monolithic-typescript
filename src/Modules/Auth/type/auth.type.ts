import { Field, ObjectType } from 'type-graphql';
import { User } from '../../User/type/user.type';

// eslint-disable-next-line max-classes-per-file
@ObjectType()
export class Auth {
  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
