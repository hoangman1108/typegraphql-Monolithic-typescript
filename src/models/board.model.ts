import { Document, model, Schema } from 'mongoose';

export type IBoard = Document & {
  user: Schema.Types.ObjectId;
  name: string;
};

const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BoardCollection = model<IBoard>('board', boardSchema);
