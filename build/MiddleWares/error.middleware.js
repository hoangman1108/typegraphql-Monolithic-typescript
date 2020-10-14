"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const yup = __importStar(require("yup"));
class ErrorMiddleware {
    async use({ info, context }, next) {
        try {
            return await next();
        }
        catch (err) {
            context.logger.error(err);
            let errors = [];
            if (err instanceof yup.ValidationError) {
                await err.inner.forEach(async (inner) => {
                    const field = inner.path;
                    errors.push({
                        field,
                        message: inner.errors,
                    });
                });
                const errorsResult = [];
                await errors.forEach((Err) => {
                    if (errorsResult.find((e) => e.field === Err.field)) {
                        const er = errorsResult.find((e) => e.field === Err.field);
                        er.message.push(Err.message[0]);
                        const erIdx = errorsResult.findIndex((e) => e.field === Err.field);
                        delete errorsResult[erIdx];
                        errorsResult.push(er);
                    }
                    else {
                        errorsResult.push({
                            field: Err.field,
                            message: Err.message,
                        });
                    }
                });
                errors = errorsResult;
            }
            else {
                errors.push({
                    field: '',
                    message: [err.message],
                });
            }
            return { errors };
        }
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=error.middleware.js.map