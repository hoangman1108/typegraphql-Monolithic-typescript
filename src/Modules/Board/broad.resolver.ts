import { Logger } from 'pino';
import {
  Arg, Ctx, Extensions, Mutation, Query, Resolver,
} from 'type-graphql';
import { IBoard } from '../../models/board.model';
import { IUser } from '../../models/user.model';
import { ObjectIdScalar } from '../../Scalars/ObjectIdScalars';
import BoardService from '../../services/board.service';
import { BoardInput, FindBoardInput } from './type/board.input';

import { Board, BoardPayload, BoardPayloads } from './type/board.type';

@Resolver()
export class BoardResolver {
  @Mutation(() => BoardPayload)
  @Extensions({
    authenticate: true,
  })
  async createBoard(@Arg('data') data: BoardInput,
    @Ctx() {
      boardService, user, logger,
    }: {
      boardService: BoardService;
      logger: Logger;
      user: IUser;
    }): Promise<BoardPayload> {
    const input: any = {
      user: <Object>user.id,
      name: data.name,
    };
    const create: IBoard = await boardService.create(input);
    logger.info('BoardMutation#create.check %o', create);
    return {
      board: {
        ...create.toObject(),
        id: ObjectIdScalar.parseValue(create.id),
      },
      errors: null,
    };
  }

  @Query(() => BoardPayloads)
  @Extensions({
    authenticate: true,
  })
  async listBoard(@Arg('data') find: FindBoardInput,
    @Ctx() {
      boardService, logger,
    }: {
      boardService: BoardService;
      logger: Logger;
    }): Promise<BoardPayloads> {
    const list: IBoard[] = await boardService.list(find);
    logger.info('BoardQuery#list.check %o', list);
    let results: Board[] | null = null;

    if (list) {
      results = list.map((board: IBoard) => ({
        ...board.toObject(),
        id: ObjectIdScalar.parseValue(board.id),
      }));
    }
    return {
      boards: results,
      errors: null,
    };
  }
}
