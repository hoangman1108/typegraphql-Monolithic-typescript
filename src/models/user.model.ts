import bcrypt from 'bcrypt';
import {
  Document, model, Schema, Error,
} from 'mongoose';

// eslint-disable-next-line max-classes-per-file
/* eslint-disable @typescript-eslint/no-unused-vars */
type ComparePasswordFunction = (this: any, candidatePassword: string, cb?: (err: any, isMatch: any) => {}) => void;

export type IUser = Document & {
  email: string;
  name: string;
  password: string;
  comparePassword: ComparePasswordFunction;
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', function save(next) {
  const user = this as IUser;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (Err: Error, hash) => {
      if (Err) { return next(Err); }
      user.password = hash;
      next();
    });
  });
});

// eslint-disable-next-line func-names
const comparePassword: ComparePasswordFunction = async function (this: IUser, candidatePassword) {
  const result = await bcrypt.compare(candidatePassword, this.password);
  return result;
};
userSchema.methods.comparePassword = comparePassword;

export const UserCollection = model<IUser>('user', userSchema);
