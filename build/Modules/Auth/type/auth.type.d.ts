import { Error } from '../../../Scalars/Error.type';
import { AuthToken } from '../../User/type/authToken.type';
import { User } from '../../User/type/user.type';
export declare class Auth {
    token: AuthToken;
    profile: User | null;
}
export declare class AuthPayload {
    user: Auth | null;
    errors: Error[] | null;
}
//# sourceMappingURL=auth.type.d.ts.map