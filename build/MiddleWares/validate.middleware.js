"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
class ValidationMiddleware {
    async use({ info, args }, next) {
        const { validationSchema } = (info === null || info === void 0 ? void 0 : info.parentType.getFields()[info.fieldName].extensions) || {};
        if (validationSchema) {
            await validationSchema.validate(args, {
                strict: true,
                abortEarly: false,
            });
        }
        return next();
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validate.middleware.js.map