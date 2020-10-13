import UserHandler from '../services/user.service';
import AuthHandler from '../services/auth.service';

export default {
  services: {
    userService: UserHandler,
    authService: AuthHandler,
  },
};
