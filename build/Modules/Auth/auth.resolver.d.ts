import { Logger } from 'pino';
import { AuthPayload } from './type/auth.type';
import { LoginInput } from './type/auth.input';
import AuthService from '../../services/auth.service';
export declare class AuthResolver {
    login(data: LoginInput, { authService, logger }: {
        authService: AuthService;
        logger: Logger;
    }): Promise<AuthPayload>;
}
//# sourceMappingURL=auth.resolver.d.ts.map