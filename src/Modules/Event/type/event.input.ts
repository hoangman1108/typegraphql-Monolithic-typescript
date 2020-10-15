// eslint-disable-next-line max-classes-per-file
import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@InputType()
export class EventInput {
  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
export class EventDeleteInput {
  @Field(() => ObjectIdScalar)
  id: ObjectId;
}
