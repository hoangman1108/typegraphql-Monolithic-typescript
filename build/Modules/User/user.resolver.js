"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const yup = __importStar(require("yup"));
const type_graphql_1 = require("type-graphql");
const user_type_1 = require("./type/user.type");
const user_input_1 = require("./type/user.input");
const ObjectIdScalars_1 = require("../../Scalars/ObjectIdScalars");
let UserResolver = class UserResolver {
    async listUsers({ userService, logger }) {
        const list = await userService.list();
        logger.info('UserQuery#list.check %o', list);
        let results = null;
        if (list) {
            results = list.map((user) => ({
                id: ObjectIdScalars_1.ObjectIdScalar.parseValue(user.id),
                email: user.email,
                name: user.name,
                password: user.password,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }));
        }
        return {
            users: results,
            errors: null,
        };
    }
    async createUser(data, { userService, logger }) {
        const create = await userService.create(data);
        logger.info('UserMutation#create.check %o', create);
        const result = {
            id: ObjectIdScalars_1.ObjectIdScalar.parseValue(create.id),
            email: create.email,
            name: create.name,
            password: create.password,
        };
        return {
            user: result,
            errors: null,
        };
    }
    async userDelete(id, { userService, logger }) {
        const deleted = await userService.delete(id);
        logger.info('UserMutation#delete.check1 %o', deleted);
        return {
            user: deleted,
            errors: null,
        };
    }
};
__decorate([
    type_graphql_1.Query(() => user_type_1.UserPayloads),
    type_graphql_1.Extensions({
        authenticate: true,
    }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "listUsers", null);
__decorate([
    type_graphql_1.Mutation(() => user_type_1.UserPayload),
    type_graphql_1.Extensions({
        authenticate: false,
        validationSchema: yup.object().shape({
            data: yup.object().shape({
                email: yup.string()
                    .trim()
                    .required('Email is a required field.')
                    .email('Email field should contain a valid email.'),
                password: yup.string()
                    .trim()
                    .min(5)
                    .required('Password is a required field.'),
                name: yup.string()
                    .trim()
                    .min(5)
                    .required('Name is a required field.'),
            }),
        }),
    }),
    __param(0, type_graphql_1.Arg('data')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    type_graphql_1.Mutation(() => user_type_1.UserDelete),
    __param(0, type_graphql_1.Arg('data')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserIdInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userDelete", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map