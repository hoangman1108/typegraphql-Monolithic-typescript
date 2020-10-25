// eslint-disable-next-line max-classes-per-file
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { Error } from '../../../Scalars/Error.type';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@ObjectType()
export class Board {
  @Field(() => ObjectIdScalar)
  id: ObjectId;

  @Field(() => ObjectIdScalar)
  user: ObjectId;

  @Field(() => String)
  name: string;
}

@ObjectType()
export class BoardPayload {
  @Field(() => Board, { nullable: true })
  board: Board;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class BoardPayloads {
  @Field(() => [Board], { nullable: true })
  boards: Board[] | null;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
