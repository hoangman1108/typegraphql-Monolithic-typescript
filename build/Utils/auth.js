"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig = {
    accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET || 'secret',
    refreshTokenSecret: process.env.JWT_REFRESHTOKEN_SECRET || 'secret',
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
};
const authUtils = {
    async generateAccessToken(user) {
        return jsonwebtoken_1.default.sign({ user: user.email }, jwtConfig.accessTokenSecret, {
            subject: user.id,
            audience: jwtConfig.audience,
            issuer: jwtConfig.issuer,
            expiresIn: '30min',
        });
    },
    async generateRefreshToken(user) {
        return jsonwebtoken_1.default.sign({ user: user.email }, jwtConfig.refreshTokenSecret, {
            subject: user.id,
            audience: jwtConfig.audience,
            issuer: jwtConfig.issuer,
            expiresIn: '2d',
        });
    },
};
exports.default = authUtils;
//# sourceMappingURL=auth.js.map