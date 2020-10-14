"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_model_1 = require("../models/token.model");
const user_model_1 = require("../models/user.model");
const ObjectIdScalars_1 = require("../Scalars/ObjectIdScalars");
const auth_1 = __importDefault(require("../Utils/auth"));
class AuthService {
    async login(login) {
        const findUser = await user_model_1.UserCollection.findOne({ email: login.email });
        if (!findUser) {
            const error = new Error('Email does not exists');
            throw error;
        }
        const isMatch = await findUser.comparePassword(login.password);
        if (!isMatch) {
            const error = new Error('Password does not match');
            throw error;
        }
        const newAccessToken = await auth_1.default.generateAccessToken(findUser);
        const newRefreshToken = await auth_1.default.generateRefreshToken(findUser);
        const authToken = {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            kind: '',
        };
        await token_model_1.AuthTokenCollection.findOne({ user: findUser.id }, async (error, existingUser) => {
            if (existingUser) {
                await token_model_1.AuthTokenCollection.findOneAndUpdate({ user: findUser.id }, authToken);
            }
            await token_model_1.AuthTokenCollection.create({
                user: findUser.id,
                ...authToken,
            });
        });
        const result = await token_model_1.AuthTokenCollection.findOne({ user: findUser.id }).populate('user');
        const token = {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            kind: result.kind,
        };
        const profile = {
            id: ObjectIdScalars_1.ObjectIdScalar.parseValue(result.user.id),
            name: result.user.name,
            email: result.user.email,
            password: result.user.password,
        };
        return {
            token,
            profile,
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map