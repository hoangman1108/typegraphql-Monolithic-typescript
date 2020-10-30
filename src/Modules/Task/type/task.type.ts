/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { Error } from '../../../Scalars/Error.type';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@ObjectType()
export class Task {
  @Field(() => ObjectIdScalar)
  id: ObjectId;

  @Field()
  name: string;

  @Field()
  status: string;

  @Field()
  like: number;

  @Field(() => ObjectIdScalar)
  board: ObjectId;

  @Field(() => [String], { nullable: true })
  history: string[];

  @Field(() => ObjectIdScalar)
  createdBy: ObjectId;

  @Field(() => ObjectIdScalar)
  updatedBy: ObjectId;
}

@ObjectType()
export class TaskPayload {
  @Field(() => Task, { nullable: true })
  task: Task | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class TaskPayloads {
  @Field(() => [Task], { nullable: true })
  tasks: Task[] | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class DeleteTaskPayload {
  @Field()
  task: string;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
