import { Document, model, Schema } from 'mongoose';

export type IRabbit = Document & {
  stt: number;
  title: string;
  description: string;
};

const rabitSchema = new Schema({
  stt: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const RabbitCollection = model<IRabbit>('rabbit', rabitSchema);
