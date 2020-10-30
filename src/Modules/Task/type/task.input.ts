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

  @Field(() => [String], { nullable: true })
  history: string[] | null;

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

  @Field(() => String, { nullable: true })
  status: string | null;
}

@InputType()
export class DeleteTaskInput {
  @Field(() => ObjectIdScalar)
  id: ObjectId;
}

@InputType()
export class UpdateTaskInput {
  @Field(() => ObjectIdScalar)
  id: ObjectId;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  status: string | null;

  @Field(() => [String], { nullable: true })
  history: string[] | null;

  @Field(() => Number, { nullable: true })
  like: number | null;

  @Field(() => ObjectIdScalar, { nullable: true })
  board: ObjectId | null;

  @Field(() => ObjectIdScalar, { nullable: true })
  updatedBy: ObjectId | null;
}
