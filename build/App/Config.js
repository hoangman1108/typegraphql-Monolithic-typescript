"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require('dotenv').config();
const env = process.env.NODE_ENV || 'dev';
exports.env = env;
//# sourceMappingURL=Config.js.map