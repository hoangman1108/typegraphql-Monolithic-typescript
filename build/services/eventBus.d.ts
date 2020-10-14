/// <reference types="node" />
import * as events from 'events';
declare class EventsBus extends events.EventEmitter {
    publish(event: string, args: any): Promise<boolean>;
    subscribe(event: string, handler: any): Promise<void>;
}
export default EventsBus;
//# sourceMappingURL=eventBus.d.ts.map