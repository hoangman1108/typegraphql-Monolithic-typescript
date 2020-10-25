import { Document, model, Schema } from 'mongoose';

export type ITask = Document & {
  name: string;
  board: Schema.Types.ObjectId;
  status: string;
};

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  board: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const TaskCollection = model<ITask>('task', taskSchema);
