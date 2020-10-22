import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../../../Scalars/ObjectIdScalars";
import { Error } from "../../../Scalars/Error.type";
@ObjectType()
export class Food{
    @Field(()=>ObjectIdScalar)
    id: ObjectId;

    @Field()
    title: string;

    @Field()
    icon: string;

    @Field()
    body: string;
}

@ObjectType()
export class FoodPayload{
    @Field(()=>Food)
    food: Food;

    @Field(()=>[Error], { nullable: true})
    errors: Error[] | null;
}

@ObjectType()
export class FoodPayloads{
    @Field(()=>[Food])
    foods: Food[];

    @Field(()=>[Error], { nullable: true})
    errors: Error[] | null;
}