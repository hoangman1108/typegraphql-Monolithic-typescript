import { BoardCollection, IBoard } from '../models/board.model';
import { FindBoardInput } from '../Modules/Board/type/board.input';

class BoardService {
  async create(input: any): Promise<IBoard> {
    return BoardCollection.findOne(
      {
        name: input.name,
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
    if (data.name) find.name = data.name;
    if (data.user) find.user = data.user;
    return BoardCollection.find(find).then((boards: IBoard[]) => boards);
  }
}
export default BoardService;
