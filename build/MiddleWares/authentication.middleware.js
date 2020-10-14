"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const lodash_1 = require("lodash");
class AuthenticationMiddleware {
    async use({ info, context }, next) {
        const { authenticate } = (info === null || info === void 0 ? void 0 : info.parentType.getFields()[info.fieldName].extensions) || {};
        if (lodash_1.isFunction(authenticate)) {
            const user = await authenticate(context);
            context.user = { ...user };
        }
        else if (authenticate === true) {
            const { user } = await context.authenticate('jwt', { session: false }, context.req, context.res);
            if (!lodash_1.isEmpty(user)) {
                context.user = user;
            }
            else {
                throw new Error('Authentication required');
            }
        }
        return next();
    }
}
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=authentication.middleware.js.map