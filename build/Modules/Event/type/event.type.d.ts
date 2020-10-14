import { ObjectId } from 'mongodb';
import { Error } from '../../../Scalars/Error.type';
export declare class Event {
    id: ObjectId;
    title: string;
    description: string;
}
export declare class EventPayload {
    event: Event;
    errors: Error[] | null;
}
export declare class EventPayloads {
    event: Event[];
    errors: Error[] | null;
}
//# sourceMappingURL=event.type.d.ts.map