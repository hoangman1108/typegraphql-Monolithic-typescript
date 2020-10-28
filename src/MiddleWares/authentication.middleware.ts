import { MiddlewareInterface, ResolverData, NextFn } from 'type-graphql';
import { isFunction, isEmpty } from 'lodash';
import { IContext } from '../App/Context';

// import AuthService from '../services/auth.service';
// import authHelper from '../Utils/auth';
export class AuthenticationMiddleware implements MiddlewareInterface<IContext> {
  async use({ info, context }: ResolverData<IContext>, next: NextFn) {
    const { authenticate } = info?.parentType.getFields()[info.fieldName].extensions || {};
    if (isFunction(authenticate)) {
      const user = await authenticate(context);
      context.user = { ...user };
    } else if (authenticate === true) {
      const jwt = await context.authenticate('jwt', { session: false }, context.req, context.res);
      // if (jwt.info) {
      //   const authService = new AuthService();
      //   const refreshToken = await authService.getRefreshToken(context.req.headers?.authorization || '');
      //   const verifyToken = await authHelper.verifyToken(refreshToken);
      //   const error = new Error(jwt.info);
      //   throw error;
      // }
      if (!isEmpty(jwt.user)) {
        context.user = jwt.user;
      }
    }
    return next();
  }
}
