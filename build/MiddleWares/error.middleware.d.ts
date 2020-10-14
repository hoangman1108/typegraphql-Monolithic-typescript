import { ResolverData, NextFn, MiddlewareInterface } from 'type-graphql';
import { IContext } from '../App/Context';
export declare class ErrorMiddleware implements MiddlewareInterface<IContext> {
    use({ info, context }: ResolverData<IContext>, next: NextFn): Promise<any>;
}
//# sourceMappingURL=error.middleware.d.ts.map