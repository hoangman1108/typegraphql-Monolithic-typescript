// eslint-disable-next-line max-classes-per-file
import { ObjectId } from 'mongodb';
import { Field, InputType } from 'type-graphql';
import { ObjectIdScalar } from '../../../Scalars/ObjectIdScalars';

@InputType()
export class FoodInput{
    @Field()
    title: string;

    @Field()
    icon: string;

    @Field()
    body: string;
}

@InputType()
export class FoodDeleteInput{
    @Field(()=> ObjectIdScalar)
    id: ObjectId;
}