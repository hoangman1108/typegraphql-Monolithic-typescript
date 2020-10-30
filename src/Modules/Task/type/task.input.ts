/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@InputType()
export class TaskInput {
  @Field()
  name: string;

  @Field()
  status: string;

  @Field()
  like: number;

  @Field(() => ObjectIdScalar)
  board: ObjectId;

  @Field(() => ObjectIdScalar, { nullable: true })
  createdBy: ObjectId;

  @Field(() => ObjectIdScalar, { nullable: true })
  updatedBy: ObjectId;
}

@InputType()
export class FindTaskInput {
  @Field(() => ObjectIdScalar)
  board: ObjectId;

  @Field(() => ObjectIdScalar, { nullable: true })
  createdBy: ObjectId | null;
}

@InputType()
export class DeleteTaskInput {
  @Field(() => ObjectIdScalar)
  id: ObjectId;
}
