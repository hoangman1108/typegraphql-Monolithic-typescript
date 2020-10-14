import * as yup from 'yup';
import {
  Arg, Ctx, Extensions, Mutation, Query, Resolver,
} from 'type-graphql';
import { Logger } from 'pino';

import {
  User, UserDelete, UserPayload, UserPayloads,
} from './type/user.type';
import { UserIdInput, UserInput } from './type/user.input';
import { IUser } from '../../models/user.model';
import { ObjectIdScalar } from '../../Scalars/ObjectIdScalars';
import UserService from '../../services/user.service';
@Resolver()
export class UserResolver {
  @Query(() => UserPayloads)
  @Extensions({
    authenticate: true,
  })
  async listUsers(@Ctx() { userService, logger }: { userService: UserService; logger: Logger }): Promise<UserPayloads> {
    const list: IUser[] | null = await userService.list();
    logger.info('UserQuery#list.check %o', list);
    let results: User[] | null = null;
    if (list) {
      results = list.map((user: IUser) => ({
        ...user.toObject(),
        id: ObjectIdScalar.parseValue(user.toObject().id),
      }));
    }
    return {
      users: results,
      errors: null,
    };
  }

  @Mutation(() => UserPayload)
  @Extensions({
    authenticate: false,
    validationSchema: yup.object().shape({
      data: yup.object().shape({
        email: yup.string()
          .trim()
          .required('Email is a required field.')
          .email('Email field should contain a valid email.'),
        password: yup.string()
          .trim()
          .min(5)
          .required('Password is a required field.'),
        name: yup.string()
          .trim()
          .min(5)
          .required('Name is a required field.'),
      }),
    }),
  })
  async createUser(@Arg('data') data: UserInput,
    @Ctx() { userService, logger }: { userService: UserService; logger: Logger }): Promise<UserPayload> {
    const create: IUser = await userService.create(data);
    logger.info('UserMutation#create.check %o', create);
    const result: User = {
      ...create.toObject(),
      id: ObjectIdScalar.parseValue(create.toObject().id),
    };
    return {
      user: result,
      errors: null,
    };
  }

  @Mutation(() => UserDelete)
  async userDelete(@Arg('data') id: UserIdInput,
    @Ctx() { userService, logger }: { userService: UserService; logger: Logger })
    : Promise<UserDelete> {
    const deleted: string = await userService.delete(id);
    logger.info('UserMutation#delete.check1 %o', deleted);
    return {
      user: deleted,
      errors: null,
    };
  }
}
