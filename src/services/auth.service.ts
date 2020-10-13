import { AuthTokenCollection, IAuthToken } from '../Models/token.model';
import { IUser, UserCollection } from '../Models/user.model';
import { LoginInput } from '../Modules/Auth/type/auth.input';
import { Auth } from '../Modules/Auth/type/auth.type';
import { AuthToken } from '../Modules/User/type/authToken.type';
import { User } from '../Modules/User/type/user.type';
import { ObjectIdScalar } from '../Scalars/ObjectIdScalars';
import authUtils from '../Utils/auth';

class AuthService {
  async login(login: LoginInput): Promise<Auth> {
    const findUser: IUser | null = await UserCollection.findOne({ email: login.email });
    if (!findUser) {
      const error = new Error('Email does not exists');
      throw error;
    }

    const isMatch: any = await findUser.comparePassword(login.password);
    if (!isMatch) {
      const error = new Error('Password does not match');
      throw error;
    }

    const newAccessToken = await authUtils.generateAccessToken(findUser);
    const newRefreshToken = await authUtils.generateRefreshToken(findUser);

    const authToken = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      kind: '',
    };
    await AuthTokenCollection.findOne(
      { user: findUser.id },
      async (error: Error, existingUser: IAuthToken) => {
        if (existingUser) {
          await AuthTokenCollection.findOneAndUpdate(
            { user: findUser.id },
            authToken
          );
        }
        await AuthTokenCollection.create({
          user: findUser.id,
          ...authToken,
        });
      }
    );

    const result: any = await AuthTokenCollection.findOne({ user: findUser.id }).populate('user');

    const token: AuthToken = {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      kind: result.kind,
    };

    const profile: User = {
      id: ObjectIdScalar.parseValue(result.user.id),
      name: result.user.name,
      email: result.user.email,
      password: result.user.password,
    };
    return {
      token,
      profile,
    };
  }
}

export default AuthService;
