import { MiddlewareInterface, ResolverData, NextFn } from 'type-graphql';
import { IContext } from '../App/Context';
export declare class ValidationMiddleware implements MiddlewareInterface<IContext> {
    use({ info, args }: ResolverData<IContext>, next: NextFn): Promise<any>;
}
//# sourceMappingURL=validate.middleware.d.ts.map