import { Logger } from 'pino';
import {
  Arg, Ctx, Extensions, Mutation, Query, Resolver,
} from 'type-graphql';
import { ITask } from '../../models/task.model';
import { IUser } from '../../models/user.model';
import { ObjectIdScalar } from '../../Scalars/ObjectIdScalars';
import TaskService from '../../services/task.service';
import {
  DeleteTaskInput, FindTaskInput, TaskInput, UpdateTaskInput,
} from './type/task.input';
import {
  TaskPayload, TaskPayloads, DeleteTaskPayload,
} from './type/task.type';

@Resolver()
export class TaskResolver {
  @Mutation(() => TaskPayload)
  @Extensions({
    authenticate: true,
  })
  async createTask(@Arg('data') data: TaskInput,
    @Ctx() {
      taskService, user, logger,
    }: {
      taskService: TaskService;
      user: IUser;
      logger: Logger;
    }): Promise<TaskPayload> {
    data.createdBy = user.id;
    data.updatedBy = user.id;
    const created: ITask = await taskService.create(data);
    logger.info('TaskMutation#create.check %o', created);
    const task: any = {
      ...created.toObject(),
      id: ObjectIdScalar.parseValue(created.id),
      board: ObjectIdScalar.parseValue(created.board),
    };
    return {
      task,
      errors: null,
    };
  }

  @Query(() => TaskPayloads)
  @Extensions({
    authenticate: true,
  })
  async listTask(@Arg('data') find: FindTaskInput,
    @Ctx() {
      taskService, logger,
    }: {
      taskService: TaskService;
      logger: Logger;
    }): Promise<TaskPayloads> {
    const list: ITask[] | null = await taskService.list(find);
    logger.info('TaskQuery#list.check %o', list);
    let results: any = null;
    if (list) {
      results = list.map((task: ITask) => ({
        ...task.toObject(),
        id: ObjectIdScalar.parseValue(task.id),
        createdBy: ObjectIdScalar.parseValue(task.createdBy),
        updatedBy: ObjectIdScalar.parseValue(task.updatedBy),
        board: ObjectIdScalar.parseValue(task.board),
      }));
    }
    return {
      tasks: results,
      errors: null,
    };
  }

  @Mutation(() => TaskPayload)
  @Extensions({
    authenticate: true,
  })
  async updateTask(@Arg('data') data: UpdateTaskInput,
    @Ctx() {
      taskService, logger, user,
    }: {
      taskService: TaskService;
      logger: Logger;
      user: IUser;
    }): Promise<TaskPayload> {
    data.updatedBy = user.id;
    const updated: ITask | null = await taskService.update(data);
    logger.info('TaskMutation#update.check %o', updated);
    let result: any = null;
    if (updated) {
      result = {
        ...updated.toObject(),
        id: ObjectIdScalar.parseValue(updated.id),
        createdBy: ObjectIdScalar.parseValue(updated.createdBy),
        updatedBy: ObjectIdScalar.parseValue(updated.updatedBy),
        board: ObjectIdScalar.parseValue(updated.board),
      };
    }
    return {
      task: result,
      errors: null,
    };
  }

  @Mutation(() => DeleteTaskPayload)
  @Extensions({
    authenticate: true,
  })
  async deleteTask(@Arg('data') id: DeleteTaskInput,
    @Ctx() {
      taskService, logger,
    }: {
      taskService: TaskService;
      logger: Logger;
    }): Promise<DeleteTaskPayload> {
    const deleted = await taskService.delete(id);
    logger.info('TaskMutation#delete.check %o', deleted);
    return {
      task: deleted,
      errors: null,
    };
  }
}
