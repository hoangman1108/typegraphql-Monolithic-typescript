// eslint-disable-next-line max-classes-per-file
import { IsEmail } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}

@InputType()
export class UserIdInput {
  @Field(() => ObjectIdScalar)
  id: ObjectId;
}
