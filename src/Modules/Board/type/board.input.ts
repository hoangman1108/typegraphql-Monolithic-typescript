// eslint-disable-next-line max-classes-per-file
import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@InputType()
export class BoardInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class FindBoardInput {
  @Field(() => ObjectIdScalar, { nullable: true })
  user: ObjectId | null;

  @Field(() => String, { nullable: true })
  name: string | null;
}
