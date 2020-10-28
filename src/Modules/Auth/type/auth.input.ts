// eslint-disable-next-line max-classes-per-file
import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class TokenInput {
  @Field()
  token: string;
}
