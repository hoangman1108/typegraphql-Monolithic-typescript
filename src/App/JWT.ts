import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { get } from 'lodash';
import ServiceRegistry from './registry';
import UserService from '../services/user.service';
import { IUser } from '../models/user.model';
import { jwtConfig } from '../Utils/auth';

const Jwt = {
  init(passport: any, serviceRegistry: ServiceRegistry) {
    passport.use(
      'jwt',
      new JwtStrategy(
        {
          secretOrKey: jwtConfig.accessTokenSecret || '2155B3A7378B76C15A33932859D6F',
          issuer: jwtConfig.issuer || '6AC3E9A78E316',
          audience: jwtConfig.audience || 'B55EF41518AED',
          jwtFromRequest: ExtractJwt.fromExtractors([
            (req) => get(req, 'headers.authorization'),
          ]),
        },
        async (token, done) => {
          const {
            userService,
          }: { userService: UserService } = serviceRegistry.services;
          const userId = get(token, 'sub');
          if (userId) {
            try {
              const user:IUser = await userService.detail(userId);
              done(null, user);
            } catch (err) {
              done(err);
            }
          } else {
            done(null);
          }
        }
      )
    );
  },
};

export default Jwt;
