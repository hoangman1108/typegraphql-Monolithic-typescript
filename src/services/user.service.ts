import { IUser, UserCollection } from '../models/user.model';
import { UserIdInput, UserInput } from '../Modules/User/type/user.input';

class UserService {
  async create(input: UserInput): Promise<IUser> {
    return UserCollection.findOne({ email: input.email })
      .then(async (user: IUser | null) => {
        if (user) {
          const error = new Error('Email is exists');
          throw error;
        }
        const create = await UserCollection.create(input);
        return create;
      });
  }

  async list(): Promise<IUser[] | null> {
    const list: IUser[] = await UserCollection.find();
    return list;
  }

  async detail(id: String): Promise<IUser> {
    const user: IUser | null = await UserCollection.findById(id);
    if (!user) {
      throw new Error('User does not exists');
    }
    return user;
  }

  async delete(id: UserIdInput): Promise<string> {
    return UserCollection.deleteOne({ _id: id.id }).catch((error: any) => {
      if (error) return 'DELETE_ERROR';
      return 'DELETED_SUCCESS';
    });
  }
}

export default UserService;
