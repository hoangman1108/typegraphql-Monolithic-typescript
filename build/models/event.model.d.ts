import { Document } from 'mongoose';
export declare type IEvent = Document & {
    title: string;
    description: string;
};
export declare const EventCollection: import("mongoose").Model<IEvent, {}>;
//# sourceMappingURL=event.model.d.ts.map