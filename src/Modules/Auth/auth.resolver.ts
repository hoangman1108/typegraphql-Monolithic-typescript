import * as yup from 'yup';
import {
  Arg, Extensions, Mutation, Resolver,
} from 'type-graphql';
import { Auth } from './type/auth.type';
import { LoginInput } from './type/auth.input';
import AuthService from '../../services/auth.service';

@Resolver()
export class AuthResolver {
  @Mutation(() => Auth)
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
  async Login(@Arg('data') data: LoginInput): Promise<Auth> {
    const result = await AuthService.login(data);
    console.log(result);
    return new Auth();
  }
}
