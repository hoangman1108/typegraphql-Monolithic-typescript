"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPayloads = exports.EventPayload = exports.Event = void 0;
// eslint-disable-next-line max-classes-per-file
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const ObjectIdScalars_1 = require("../../../Scalars/ObjectIdScalars");
const Error_type_1 = require("../../../Scalars/Error.type");
let Event = class Event {
};
__decorate([
    type_graphql_1.Field(() => ObjectIdScalars_1.ObjectIdScalar),
    __metadata("design:type", mongodb_1.ObjectId)
], Event.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Event.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
Event = __decorate([
    type_graphql_1.ObjectType()
], Event);
exports.Event = Event;
let EventPayload = class EventPayload {
};
__decorate([
    type_graphql_1.Field(() => Event),
    __metadata("design:type", Event)
], EventPayload.prototype, "event", void 0);
__decorate([
    type_graphql_1.Field(() => [Error_type_1.Error], { nullable: true }),
    __metadata("design:type", Object)
], EventPayload.prototype, "errors", void 0);
EventPayload = __decorate([
    type_graphql_1.ObjectType()
], EventPayload);
exports.EventPayload = EventPayload;
let EventPayloads = class EventPayloads {
};
__decorate([
    type_graphql_1.Field(() => [Event]),
    __metadata("design:type", Array)
], EventPayloads.prototype, "event", void 0);
__decorate([
    type_graphql_1.Field(() => [Error_type_1.Error], { nullable: true }),
    __metadata("design:type", Object)
], EventPayloads.prototype, "errors", void 0);
EventPayloads = __decorate([
    type_graphql_1.ObjectType()
], EventPayloads);
exports.EventPayloads = EventPayloads;
//# sourceMappingURL=event.type.js.map