import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';
import { User, UserPayload, UserPayloads } from './type/user.type';
import { UserInput } from './type/user.input';
import userService from '../../services/user.service';
import logger from '../../Log';
import { IUser } from '../../models/user.model';
import { ObjectIdScalar } from '../../Scalars/ObjectIdScalars';
@Resolver()
export class UserResolver {
  @Query(() => UserPayloads)
  async listUsers(): Promise<UserPayloads> {
    const list: IUser[] | null = await userService.list();
    logger.info('UserMutation#create.check %o', list);
    let results: User[] | null = null;
    if (list) {
      results = list.map((user: IUser) => ({
        ...user,
        id: ObjectIdScalar.parseValue(user.id),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
    }
    return {
      users: results,
      errors: null,
    };
  }

  @Mutation(() => UserPayload)
  async createUser(@Arg('data') data: UserInput): Promise<UserPayload> {
    const create: IUser = await userService.create(data);
    logger.info('UserMutation#create.check %o', create);
    const result: User = {
      id: ObjectIdScalar.parseValue(create.id),
      email: create.email,
      password: create.password,
    };
    return {
      user: result,
      errors: null,
    };
  }
}
