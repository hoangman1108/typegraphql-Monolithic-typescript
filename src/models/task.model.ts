import { Document, model, Schema } from 'mongoose';

export type ITask = Document & {
  name: string;
  status: string;
  like: number;
  history: Array<string>;
  board: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  updatedBy: Schema.Types.ObjectId;
};

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  like: {
    type: String,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  history: {
    type: [String],
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });

export const TaskCollection = model<ITask>('task', taskSchema);
