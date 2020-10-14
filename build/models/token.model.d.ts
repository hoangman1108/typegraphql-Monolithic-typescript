import mongoose, { Schema } from 'mongoose';
export declare type IAuthToken = mongoose.Document & {
    user: Schema.Types.ObjectId;
    accessToken: string;
    refreshToken: string;
    kind: string;
};
export declare const AuthTokenCollection: mongoose.Model<IAuthToken, {}>;
//# sourceMappingURL=token.model.d.ts.map