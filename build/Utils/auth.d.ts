import { IUser } from '../models/user.model';
declare const authUtils: {
    generateAccessToken(user: IUser): Promise<string>;
    generateRefreshToken(user: IUser): Promise<string>;
};
export default authUtils;
//# sourceMappingURL=auth.d.ts.map