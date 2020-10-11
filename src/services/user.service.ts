import { IUser, UserCollection } from '../models/user.model';
import { UserInput } from '../Modules/User/type/user.input';

class UserService {
  async create(user: UserInput): Promise<IUser> {
    const create: IUser = await UserCollection.create(user);
    return create;
  }

  async list(): Promise<IUser[] | null> {
    const list: IUser[] = await UserCollection.find();
    return list;
  }
}

export default new UserService();
