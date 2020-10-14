import { MiddlewareInterface, ResolverData, NextFn } from 'type-graphql';
import { IContext } from '../App/Context';
export declare class AuthenticationMiddleware implements MiddlewareInterface<IContext> {
    use({ info, context }: ResolverData<IContext>, next: NextFn): Promise<any>;
}
//# sourceMappingURL=authentication.middleware.d.ts.map