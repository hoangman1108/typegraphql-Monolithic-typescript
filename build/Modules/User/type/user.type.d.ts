import { ObjectId } from 'mongodb';
import { Error } from '../../../Scalars/Error.type';
export declare class User {
    readonly id: ObjectId;
    email: string;
    name: string;
    password: string;
}
export declare class UserPayload {
    user: User | null;
    errors: Error[] | null;
}
export declare class UserPayloads {
    users: User[] | null;
    errors: Error[] | null;
}
export declare class UserDelete {
    user: string;
    errors: Error[] | null;
}
//# sourceMappingURL=user.type.d.ts.map