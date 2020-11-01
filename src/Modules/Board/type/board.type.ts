// eslint-disable-next-line max-classes-per-file
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { Error } from '../../../Scalars/Error.type';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@ObjectType()
export class Board {
  @Field(() => ObjectIdScalar)
  id: ObjectId;

  @Field(() => String)
  user: string;

  @Field(() => [ObjectIdScalar] || null)
  joined: ObjectId[] | null;

  @Field(() => String)
  title: string;

  @Field()
  date: Date;
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

@ObjectType()
export class DeleteBoardPayload {
  @Field()
  board: string;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class JoinedPayload {
  @Field(() => String, { nullable: true })
  board: string;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
