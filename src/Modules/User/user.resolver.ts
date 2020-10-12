import * as yup from 'yup';
import {
  Arg, Extensions, Mutation, Query, Resolver,
} from 'type-graphql';
import {
  User, UserDelete, UserPayload, UserPayloads,
} from './type/user.type';
import { UserIdInput, UserInput } from './type/user.input';
import userService from '../../services/user.service';
import logger from '../../Log';
import { IUser } from '../../Models/user.model';
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
        id: ObjectIdScalar.parseValue(user.id),
        email: user.email,
        name: user.name,
        password: user.password,
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
  async createUser(@Arg('data') data: UserInput): Promise<UserPayload> {
    const create: IUser = await userService.create(data);
    logger.info('UserMutation#create.check %o', create);
    const result: User = {
      id: ObjectIdScalar.parseValue(create.id),
      email: create.email,
      name: create.name,
      password: create.password,
    };
    return {
      user: result,
      errors: null,
    };
  }

  @Mutation(() => UserDelete)
  async userDelete(@Arg('data') id: UserIdInput): Promise<UserDelete> {
    const deleted: string = await userService.delete(id);
    return {
      user: deleted,
      errors: null,
    };
  }
}
