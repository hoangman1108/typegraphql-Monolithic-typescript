import { BoardCollection } from '../models/board.model';
import { ITask, TaskCollection } from '../models/task.model';
import {
  DeleteTaskInput, FindTaskInput, UpdateTaskInput,
} from '../Modules/Task/type/task.input';

class TaskService {
  async create(input: any): Promise<ITask> {
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
    if (input.status) find.status = input.status;

    return TaskCollection.find(find)
      .then((tasks: ITask[]) => tasks);
  }

  async update(input: UpdateTaskInput): Promise<ITask | null> {
    const task: ITask | null = await TaskCollection.findOne(input.id);
    if (!task) {
      const error = new Error('Task not found');
      throw error;
    }
    let history: Array<string> = [];
    if (input.status) {
      history = [...task.history];
      history.push(task.status);
      input.history = history;
    }
    const entity: any = {
      ...input,
    };
    delete entity.id;

    const condition = {
      _id: input.id,
    };
    const updated = await TaskCollection.findOneAndUpdate(condition, entity, { new: true });
    return updated;
  }

  async delete(id: DeleteTaskInput): Promise<string> {
    return TaskCollection.deleteOne({ _id: id.id }).then((value) => {
      if (value.n && value?.n > 0) return 'DELETE_SUCCESS';
      return 'DELETE_FAIL';
    });
  }
}
export default TaskService;
