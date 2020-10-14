import { IUser } from '../models/user.model';
import { UserIdInput, UserInput } from '../Modules/User/type/user.input';
import { User } from '../Modules/User/type/user.type';
declare class UserService {
    create(user: UserInput): Promise<IUser>;
    list(): Promise<IUser[] | null>;
    detail(id: String): Promise<User>;
    delete(id: UserIdInput): Promise<string>;
}
export default UserService;
//# sourceMappingURL=user.service.d.ts.map