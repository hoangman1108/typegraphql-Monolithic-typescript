import { Document, model, Schema } from "mongoose";

export type IFood = Document & {
    title: string;
    icon: string;
    body: string;
}

const foodSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
});

export const FoodCollection = model<IFood>('food', foodSchema);