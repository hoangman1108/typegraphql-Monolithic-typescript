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
exports.UserIdInput = exports.UserInput = void 0;
// eslint-disable-next-line max-classes-per-file
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const ObjectIdScalars_1 = require("../../../Scalars/ObjectIdScalars");
let UserInput = class UserInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
UserInput = __decorate([
    type_graphql_1.InputType()
], UserInput);
exports.UserInput = UserInput;
let UserIdInput = class UserIdInput {
};
__decorate([
    type_graphql_1.Field(() => ObjectIdScalars_1.ObjectIdScalar),
    __metadata("design:type", mongodb_1.ObjectId)
], UserIdInput.prototype, "id", void 0);
UserIdInput = __decorate([
    type_graphql_1.InputType()
], UserIdInput);
exports.UserIdInput = UserIdInput;
//# sourceMappingURL=user.input.js.map