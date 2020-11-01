import { CreateQuery } from 'mongoose';
import { BoardCollection, IBoard } from '../models/board.model';
import { TaskCollection } from '../models/task.model';
import { FindBoardInput, IdBoardInput, PublishBoardInput } from '../Modules/Board/type/board.input';

class BoardService {
  async create(input: CreateQuery<IBoard>): Promise<IBoard> {
    return BoardCollection.findOne(
      {
        title: input.title,
        user: <Object>input.user,
      }
    ).then(async (board: IBoard | null) => {
      if (board) {
        const error = new Error('Board is Exists');
        throw error;
      }
      const create: IBoard = await BoardCollection.create(input);
      return create;
    });
  }

  async list(data: FindBoardInput): Promise<IBoard[]> {
    const find: any = {};
    if (data.title) find.title = data.title;
    if (data.user) find.user = <Object>data.user;
    return BoardCollection.find(find).populate('user')
      .then((boards: IBoard[]) => boards.map((board: any) => ({
        ...board.toObject(),
        user: board.user?.name,
        id: board.id,
      })));
  }

  async update(data: PublishBoardInput): Promise<IBoard | null> {
    return BoardCollection.findOne({
      _id: data.board,
      user: <Object>data.user,
    }).then(async (find: IBoard | null) => {
      if (!find) {
        const error = new Error('Link not found');
        throw error;
      }
      const check: any = {
        joined: {
          $in: [data.joiner],
        },
        _id: data.board,
      };

      await BoardCollection.find(check).then((boards: IBoard[]) => {
        if (boards.length > 0) {
          const error = new Error('User has joined');
          throw error;
        }
      });

      let joined: any = [];
      if (find.joined) {
        joined = [...find.joined];
      }
      joined.push(data.joiner);
      return BoardCollection.update({
        _id: find.id,
      }, {
        joined,
      });
    });
  }

  async deleteBoard(id: IdBoardInput): Promise<string> {
    await TaskCollection.deleteMany({ board: <Object>id.id });
    return BoardCollection.deleteOne({ _id: id.id }).then((value) => {
      if (value.n && value?.n > 0) return 'DELETE_SUCCESS';
      return 'DELETE_FAIL';
    });
  }
}
export default BoardService;
