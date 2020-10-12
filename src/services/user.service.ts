import { IUser, UserCollection } from '../Models/user.model';
import { UserIdInput, UserInput } from '../Modules/User/type/user.input';

class UserService {
  async create(user: UserInput): Promise<IUser> {
    const create: IUser = await UserCollection.create(user);
    return create;
  }

  async list(): Promise<IUser[] | null> {
    const list: IUser[] = await UserCollection.find();
    return list;
  }

  async delete(id: UserIdInput): Promise<string> {
    return UserCollection.deleteOne({ _id: id.id }).catch((error) => {
      if (error) return 'DELETE_ERROR';
      return 'DELETED_SUCCESS';
    });
  }
}

export default new UserService();
