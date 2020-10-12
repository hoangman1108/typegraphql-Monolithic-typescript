import { AuthTokenCollection, IAuthToken } from '../Models/token.model';
import { IUser, UserCollection } from '../Models/user.model';
import { LoginInput } from '../Modules/Auth/type/auth.input';
import authUtils from '../Utils/auth';

class AuthService {
  async login(login: LoginInput): Promise<IAuthToken> {
    const user: IUser | null = await UserCollection.findOne({ name: login.email });
    if (!user) {
      const error = new Error('Email does not exists');
      throw error;
    }

    const isMatch: any = await user.comparePassword(user.password);
    if (!isMatch) {
      const error = new Error('Password does not match');
      throw error;
    }

    const newAccessToken = await authUtils.generateAccessToken(user);
    const newRefreshToken = await authUtils.generateRefreshToken(user);

    const authToken = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      kind: '',
    };

    await AuthTokenCollection.findOne(
      { user: user.id },
      async (error: Error, existingUser: IAuthToken) => {
        if (existingUser) {
          await AuthTokenCollection.findOneAndUpdate(
            { user: user.id },
            authToken
          );
        }
        await AuthTokenCollection.create({
          user: user.id,
          ...authToken,
        });
      }
    );
    const result: any = {
      ...authToken,
      user: user.id,
    };
    return result;
  }
}

export default new AuthService();
