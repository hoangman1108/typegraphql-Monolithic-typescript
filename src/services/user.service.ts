import { IUser, UserCollection } from '../models/user.model';
import { UserIdInput, UserInput } from '../Modules/User/type/user.input';
import { User } from '../Modules/User/type/user.type';

class UserService {
  async create(user: UserInput): Promise<IUser> {
    const create: IUser = await UserCollection.create(user);
    return create;
  }

  async list(): Promise<IUser[] | null> {
    const list: IUser[] = await UserCollection.find();
    return list;
  }

  async detail(id: String): Promise<User> {
    const user: IUser | null = await UserCollection.findById(id);
    if (!user) {
      throw new Error('User does not exists');
    }
    return { ...user.toObject() };
  }

  async delete(id: UserIdInput): Promise<string> {
    return UserCollection.deleteOne({ _id: id.id }).catch((error) => {
      if (error) return 'DELETE_ERROR';
      return 'DELETED_SUCCESS';
    });
  }
}

export default UserService;
