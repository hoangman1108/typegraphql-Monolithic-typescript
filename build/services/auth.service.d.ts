import { LoginInput } from '../Modules/Auth/type/auth.input';
import { Auth } from '../Modules/Auth/type/auth.type';
declare class AuthService {
    login(login: LoginInput): Promise<Auth>;
}
export default AuthService;
//# sourceMappingURL=auth.service.d.ts.map