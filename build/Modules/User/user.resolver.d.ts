import { Logger } from 'pino';
import { UserDelete, UserPayload, UserPayloads } from './type/user.type';
import { UserIdInput, UserInput } from './type/user.input';
import UserService from '../../services/user.service';
export declare class UserResolver {
    listUsers({ userService, logger }: {
        userService: UserService;
        logger: Logger;
    }): Promise<UserPayloads>;
    createUser(data: UserInput, { userService, logger }: {
        userService: UserService;
        logger: Logger;
    }): Promise<UserPayload>;
    userDelete(id: UserIdInput, { userService, logger }: {
        userService: UserService;
        logger: Logger;
    }): Promise<UserDelete>;
}
//# sourceMappingURL=user.resolver.d.ts.map