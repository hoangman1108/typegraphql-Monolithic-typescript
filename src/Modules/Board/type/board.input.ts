// eslint-disable-next-line max-classes-per-file
import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@InputType()
export class BoardInput {
  @Field(() => String)
  title: string;
}

@InputType()
export class FindBoardInput {
  @Field(() => ObjectIdScalar, { nullable: true })
  user: ObjectId | null;

  @Field(() => String, { nullable: true })
  title: string | null;
}

@InputType()
export class IdBoardInput {
  @Field(() => ObjectIdScalar)
  id: ObjectId;
}

@InputType()
export class PublishBoardInput {
  @Field(() => ObjectIdScalar)
  user: ObjectId;

  @Field(() => ObjectIdScalar)
  board: ObjectId;

  @Field(() => ObjectIdScalar, { nullable: true })
  joiner: ObjectId | null;
}
