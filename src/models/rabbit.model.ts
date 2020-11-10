import { Document, model, Schema } from 'mongoose';

export type IRabbit = Document & {
  title: string;
  description: string;
};

const rabitSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

export const RabbitCollection = model<IRabbit>('rabbit', rabitSchema);
