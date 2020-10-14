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
exports.UserDelete = exports.UserPayloads = exports.UserPayload = exports.User = void 0;
// eslint-disable-next-line max-classes-per-file
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const ObjectIdScalars_1 = require("../../../Scalars/ObjectIdScalars");
const Error_type_1 = require("../../../Scalars/Error.type");
let User = class User {
};
__decorate([
    type_graphql_1.Field(() => ObjectIdScalars_1.ObjectIdScalar),
    __metadata("design:type", mongodb_1.ObjectId)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
exports.User = User;
let UserPayload = class UserPayload {
};
__decorate([
    type_graphql_1.Field(() => User, { nullable: true }),
    __metadata("design:type", Object)
], UserPayload.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Error_type_1.Error], { nullable: true }),
    __metadata("design:type", Object)
], UserPayload.prototype, "errors", void 0);
UserPayload = __decorate([
    type_graphql_1.ObjectType()
], UserPayload);
exports.UserPayload = UserPayload;
let UserPayloads = class UserPayloads {
};
__decorate([
    type_graphql_1.Field(() => [User], { nullable: true }),
    __metadata("design:type", Object)
], UserPayloads.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(() => [Error_type_1.Error], { nullable: true }),
    __metadata("design:type", Object)
], UserPayloads.prototype, "errors", void 0);
UserPayloads = __decorate([
    type_graphql_1.ObjectType()
], UserPayloads);
exports.UserPayloads = UserPayloads;
let UserDelete = class UserDelete {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserDelete.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Error_type_1.Error], { nullable: true }),
    __metadata("design:type", Object)
], UserDelete.prototype, "errors", void 0);
UserDelete = __decorate([
    type_graphql_1.ObjectType()
], UserDelete);
exports.UserDelete = UserDelete;
//# sourceMappingURL=user.type.js.map