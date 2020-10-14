"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const passport_1 = __importDefault(require("passport"));
const Log_1 = __importDefault(require("./Log"));
exports.Context = {
    logger: Log_1.default,
    authenticate: (key, options, req, res) => new Promise((resolve, reject) => {
        const done = (error, user, info) => {
            if (error)
                reject(error);
            resolve({ user, info });
        };
        const auth = passport_1.default.authenticate(key, options, done);
        return auth(req, res);
    }),
};
//# sourceMappingURL=Context.js.map