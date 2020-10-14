import { Document } from 'mongoose';
export declare type IUser = Document & {
    email: string;
    name: string;
    password: string;
    comparePassword: ComparePasswordFunction;
};
declare type ComparePasswordFunction = (this: IUser, candidatePassword: string, cb?: (err: any, isMatch: any) => {}) => void;
export declare const UserCollection: import("mongoose").Model<IUser, {}>;
export {};
//# sourceMappingURL=user.model.d.ts.map