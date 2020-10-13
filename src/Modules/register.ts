import UserHandler from '../Services/user.service';
import AuthHandler from '../Services/auth.service';

export default {
  services: {
    userService: UserHandler,
    authService: AuthHandler,
  },
};
