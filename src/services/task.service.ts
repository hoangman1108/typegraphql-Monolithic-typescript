import { BoardCollection } from '../models/board.model';
import { ITask, TaskCollection } from '../models/task.model';
import { DeleteTaskInput, FindTaskInput, TaskInput } from '../Modules/Task/type/task.input';

class TaskService {
  async create(input: TaskInput): Promise<ITask> {
    const board = await BoardCollection.findById(input.board);
    if (!board) {
      const error = new Error('board is not exist to create task');
      throw error;
    }

    return TaskCollection.findOne({
      name: input.name,
      board: <Object>input.board,
    }).then(async (task: ITask | null) => {
      if (task) {
        const error = new Error('Task is exists');
        throw error;
      }

      const create: ITask = await TaskCollection.create(input);
      return create;
    });
  }

  async list(input: FindTaskInput): Promise<ITask[] | null> {
    const find: any = {};

    if (input.board) find.board = input.board;
    if (input.createdBy) find.createdBy = input.createdBy;

    return TaskCollection.find(find)
      .then((tasks: ITask[]) => tasks);
  }

  async delete(id: DeleteTaskInput): Promise<string> {
    return TaskCollection.deleteOne({ _id: id.id }).then((value) => {
      if (value.n && value?.n > 0) return 'DELETE_SUCCESS';
      return 'DELETE_FAIL';
    });
  }
}
export default TaskService;
