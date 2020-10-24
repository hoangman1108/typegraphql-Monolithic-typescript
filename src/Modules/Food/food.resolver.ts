import { Arg, Ctx, Extensions, Mutation, Query, Resolver } from "type-graphql";
import { Food, FoodPayload, FoodPayloads } from "./type/food.type";
import * as yup from "yup";
import { FoodInput } from "./type/food.input";
import { Logger } from "pino";
import FoodService from "../../services/food.service";
import { IFood } from "../../models/food.model";
import { ObjectIdScalar } from "../../Scalars/ObjectIdScalars";
@Resolver()
export class FoodResolver {
    @Mutation(() => FoodPayload)
    @Extensions({
        authenticate: true,
        validationSchema: yup.object().shape({
            data: yup.object().shape({
                title: yup.string().required('title is required'),
                icon: yup.string().required('icon is required'),
                body: yup.string().required('body is required')
            }),
        }),
    })
    async createFood(@Arg('data') input: FoodInput,
        @Ctx() { foodService, logger }:
            {
                foodService: FoodService; logger: Logger
            }): Promise<FoodPayload> {
        const create: IFood = await foodService.create(input);
        logger.info('FoodMutation#create.check %o', create);
        return {
            food: {
                ...create.toObject(),
                id: ObjectIdScalar.parseValue(create.id),
            },
            errors: null
        }
    }

    @Query(() => FoodPayloads)
    @Extensions({
        authenticate: true,
    })
    async listFood(@Ctx() { foodService, logger }: {
        foodService: FoodService, logger: Logger
    }): Promise<FoodPayloads> {
        const list: IFood[] | null = await foodService.list();
        logger.info('FoodQuery#list.check %o', list);
    let results: Food[] | null = null;
        if(list){
            results = list.map((food: IFood) => {
                return {
                    ...food.toObject(),
                    id: ObjectIdScalar.parseValue(food.id),
                }
            });
        }
       
        return {
            foods: results,
            errors: null,
        }
    }
}