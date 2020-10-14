"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const Config_1 = require("./Config");
const logger = pino_1.default({
    safe: true,
    prettyPrint: Config_1.env === 'dev',
});
exports.default = logger;
//# sourceMappingURL=Log.js.map