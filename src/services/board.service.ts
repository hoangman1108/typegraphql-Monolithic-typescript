import { CreateQuery } from 'mongoose';
import { BoardCollection, IBoard } from '../models/board.model';
import { FindBoardInput, IdBoardInput } from '../Modules/Board/type/board.input';

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

  async deleteBoard(id: IdBoardInput): Promise<string> {
    return BoardCollection.deleteOne({ _id: id.id }).then((value) => {
      if (value.n && value?.n > 0) return 'DELETE_SUCCESS';
      return 'DELETE_FAIL';
    });
  }
}
export default BoardService;
