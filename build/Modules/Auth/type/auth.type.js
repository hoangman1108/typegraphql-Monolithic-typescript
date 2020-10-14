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
exports.AuthPayload = exports.Auth = void 0;
// eslint-disable-next-line max-classes-per-file
const type_graphql_1 = require("type-graphql");
const Error_type_1 = require("../../../Scalars/Error.type");
const authToken_type_1 = require("../../User/type/authToken.type");
const user_type_1 = require("../../User/type/user.type");
let Auth = class Auth {
};
__decorate([
    type_graphql_1.Field(() => authToken_type_1.AuthToken, { nullable: true }),
    __metadata("design:type", authToken_type_1.AuthToken)
], Auth.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(() => user_type_1.User, { nullable: true }),
    __metadata("design:type", Object)
], Auth.prototype, "profile", void 0);
Auth = __decorate([
    type_graphql_1.ObjectType()
], Auth);
exports.Auth = Auth;
let AuthPayload = class AuthPayload {
};
__decorate([
    type_graphql_1.Field(() => Auth, { nullable: true }),
    __metadata("design:type", Object)
], AuthPayload.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(() => [Error_type_1.Error], { nullable: true }),
    __metadata("design:type", Object)
], AuthPayload.prototype, "errors", void 0);
AuthPayload = __decorate([
    type_graphql_1.ObjectType()
], AuthPayload);
exports.AuthPayload = AuthPayload;
//# sourceMappingURL=auth.type.js.map