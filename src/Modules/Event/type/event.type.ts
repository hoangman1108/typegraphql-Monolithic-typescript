// eslint-disable-next-line max-classes-per-file
import { ObjectId } from 'mongodb';
import { Field, ObjectType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';
import { Error } from '../../../Scalars/Error.type';

@ObjectType()
export class Event {
  @Field(() => ObjectIdScalar)
  id: ObjectId;

  @Field()
  title: string;

  @Field()
  description: string;
}

@ObjectType()
export class EventPayload {
  @Field(() => Event)
  event: Event;

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}

@ObjectType()
export class EventPayloads {
  @Field(() => [Event])
  event: Event[];

  @Field(() => [Error], { nullable: true })
  errors: Error[] | null;
}
