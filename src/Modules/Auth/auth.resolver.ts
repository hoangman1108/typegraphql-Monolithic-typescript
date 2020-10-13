import * as yup from 'yup';
import {
  Arg, Ctx, Extensions, Mutation, Resolver,
} from 'type-graphql';
import { Logger } from 'pino';
import { Auth, AuthPayload } from './type/auth.type';
import { LoginInput } from './type/auth.input';
import AuthService from '../../services/auth.service';
@Resolver()
export class AuthResolver {
  @Mutation(() => AuthPayload)
  @Extensions({
    validationSchema: yup.object().shape({
      data: yup.object().shape({
        email: yup.string()
          .trim()
          .required('Email is a required field.')
          .email('Email field should contain a valid email.'),
        password: yup.string()
          .trim()
          .min(5)
          .required('Password is a required field.'),
      }),
    }),
  })
  async login(@Arg('data') data: LoginInput,
    @Ctx() { authService, logger }: { authService: AuthService; logger: Logger }): Promise<AuthPayload> {
    const auth: Auth = await authService.login(data);
    logger.info('AuthMutation#Login.check1 %o', auth);
    return {
      user: auth,
      errors: null,
    };
  }
}
