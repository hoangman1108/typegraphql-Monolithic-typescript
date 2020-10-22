import UserHandler from './user.service';
import AuthHandler from './auth.service';
import EventHandler from './event.service';
import FoodHandler from './food.service';

export default {
  services: {
    userService: UserHandler,
    authService: AuthHandler,
    eventService: EventHandler,
    foodService: FoodHandler,
  },
};
