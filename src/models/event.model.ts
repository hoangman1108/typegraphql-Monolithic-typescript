import { Document, model, Schema } from 'mongoose';

export type IEvent = Document & {
  title: string;
  description: string;
};

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export const EventCollection = model<IEvent>('event', eventSchema);
