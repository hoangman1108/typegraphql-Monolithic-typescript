import { FoodCollection, IFood } from '../models/food.model';
import { FoodInput } from '../Modules/Food/type/food.input';

class FoodService {
  async create(input: FoodInput): Promise<IFood> {
    return FoodCollection.findOne({ title: input.title })
      .then(async (food: IFood | null) => {
        if (food) {
          const error = new Error('Food is Exists');
          throw error;
        }
        const create:IFood = await FoodCollection.create(input);
        return create;
      });
  }

  async list(): Promise<IFood[] | null> {
    return FoodCollection.find().then((foods: IFood[]) => foods);
  }
}

export default FoodService;
