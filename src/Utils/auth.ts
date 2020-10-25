import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET || 'secret',
  refreshTokenSecret: process.env.JWT_REFRESHTOKEN_SECRET || 'secret',
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
};

const authUtils = {
  async generateAccessToken(user: IUser) {
    return jwt.sign({ user: user.email }, jwtConfig.accessTokenSecret, {
      subject: user.id,
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
      expiresIn: '20s',
    });
  },
  async generateRefreshToken(user: IUser) {
    return jwt.sign({ user: user.email }, jwtConfig.refreshTokenSecret, {
      subject: user.id,
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
      expiresIn: '30d',
    });
  },
  verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtConfig.refreshTokenSecret, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  },
};

export default authUtils;
