import { Logger } from 'pino';
import EventsBus from './eventBus';
declare class ServiceRegistry {
    services: any;
    eventsBus: EventsBus;
    constructor(logger: Logger);
    get(): void;
}
export default ServiceRegistry;
//# sourceMappingURL=registry.d.ts.map