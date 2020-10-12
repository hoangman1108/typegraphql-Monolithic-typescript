import { MiddlewareInterface, ResolverData, NextFn } from 'type-graphql';
import { IContext } from '../App/Context';

export class ValidationMiddleware implements MiddlewareInterface<IContext> {
  async use({ info, args }: ResolverData<IContext>, next: NextFn) {
    const { validationSchema } = info?.parentType.getFields()[info.fieldName].extensions || {};
    if (validationSchema) {
      await validationSchema.validate(args, {
        strict: true,
        abortEarly: false,
      });
    }
    return next();
  }
}
