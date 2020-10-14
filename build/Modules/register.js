"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
exports.default = {
    services: {
        userService: user_service_1.default,
        authService: auth_service_1.default,
    },
};
//# sourceMappingURL=register.js.map