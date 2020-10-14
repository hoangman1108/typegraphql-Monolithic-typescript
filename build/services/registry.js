"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = __importDefault(require("./eventBus"));
const register_1 = __importDefault(require("../Modules/register"));
class ServiceRegistry {
    constructor(logger) {
        this.eventsBus = new eventBus_1.default();
        logger.info('Register Service');
        this.services = {
            eventsBus: this.eventsBus,
        };
        Object.entries(register_1.default.services).forEach((service) => {
            this.services = { ...this.services, [service[0].toString()]: new service[1]() };
        });
    }
    get() {
        return this.services;
    }
}
exports.default = ServiceRegistry;
//# sourceMappingURL=registry.js.map