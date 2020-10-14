"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const lodash_1 = require("lodash");
const Jwt = {
    init(passport, serviceRegistry) {
        passport.use('jwt', new passport_jwt_1.Strategy({
            secretOrKey: '2155B3A7378B76C15A33932859D6F',
            issuer: '6AC3E9A78E316',
            audience: 'B55EF41518AED',
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (req) => lodash_1.get(req, 'headers.authorization'),
            ]),
        }, async (token, done) => {
            const { userService, } = serviceRegistry.services;
            const userId = lodash_1.get(token, 'sub');
            if (userId) {
                try {
                    const user = await userService.detail(userId);
                    done(null, user);
                }
                catch (err) {
                    done(err);
                }
            }
            else {
                done(null);
            }
        }));
    },
};
exports.default = Jwt;
//# sourceMappingURL=JWT.js.map