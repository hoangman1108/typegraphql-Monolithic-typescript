import { MiddlewareInterface, ResolverData, NextFn } from 'type-graphql';
import { isFunction, isEmpty } from 'lodash';
import { IContext } from '../App/Context';
// import AuthService from '../services/auth.service';

import AuthService from '../services/auth.service';
import authHelper from '../Utils/auth';
import { IUser, UserCollection } from '../models/user.model';

export class AuthenticationMiddleware implements MiddlewareInterface<IContext> {
  async use({ info, context }: ResolverData<IContext>, next: NextFn) {
    const { authenticate } = info?.parentType.getFields()[info.fieldName].extensions || {};
    if (isFunction(authenticate)) {
      const user = await authenticate(context);
      context.user = { ...user };
    } else if (authenticate === true) {
      const jwt = await context.authenticate('jwt', { session: false }, context.req, context.res);
<<<<<<< HEAD
      if (jwt.info && isEmpty(jwt.user)) {
        if (!context.req.headers!.authorization) {
          throw new Error('Authentication required');
        }
        if (jwt.info && isEmpty(jwt.user)) {
          const authService = new AuthService();
          const refreshToken: string = await authService.getRefreshToken(context.req);
          if (refreshToken === 'TOKEN_NOT_EXISTS') {
            throw new Error('Authentication required');
          }
          const verifyToken: any = await authHelper.verifyToken(refreshToken);

          const user: IUser | null = await UserCollection.findById(verifyToken.sub);
          if (!user) {
            throw new Error('Authentication required');
          }
          const accessToken = await authHelper.generateAccessToken(user);
          context.res.cookie('token', accessToken);
          context.user = user;
        }
      } else if (!isEmpty(jwt.user)) {
=======
      // if (jwt.info) {
      //   const authService = new AuthService();
      //   const refreshToken = await authService.getRefreshToken(context.req.headers?.authorization || '');
      //   const verifyToken = await authHelper.verifyToken(refreshToken);
      //   const error = new Error(jwt.info);
      //   throw error;
      // }
      if (!isEmpty(jwt.user)) {
>>>>>>> d60ffb8234fd18ece55fefee13915450400039e6
        context.user = jwt.user;
      }
    }
    return next();
  }
}
