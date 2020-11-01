import UserHandler from './user.service';
import AuthHandler from './auth.service';
import BoardHandler from './board.service';
import TaskHandler from './task.service';

export default {
  services: {
    userService: UserHandler,
    authService: AuthHandler,
    boardService: BoardHandler,
    taskService: TaskHandler,
  },
};
