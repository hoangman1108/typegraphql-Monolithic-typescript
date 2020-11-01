import { Document, model, Schema } from 'mongoose';
import { UserCollection } from './user.model';

export type IBoard = Document & {
  user: Schema.Types.ObjectId;
  title: string;
  date: Date;
  joined?: Array<Schema.Types.ObjectId>;
};

const boardSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UserCollection,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    joined: {
      type: [Schema.Types.ObjectId],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const BoardCollection = model<IBoard>('board', boardSchema);
