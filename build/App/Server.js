"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const express_graphql_1 = require("express-graphql");
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const ObjectIdScalars_1 = require("../Scalars/ObjectIdScalars");
const Playground_1 = require("./Playground");
const Context_1 = require("./Context");
const authentication_middleware_1 = require("../MiddleWares/authentication.middleware");
const validate_middleware_1 = require("../MiddleWares/validate.middleware");
const registry_1 = __importDefault(require("../services/registry"));
const Log_1 = __importDefault(require("./Log"));
const db_1 = __importDefault(require("../database/db"));
const JWT_1 = __importDefault(require("./JWT"));
class Server {
    constructor() {
        this.App = express_1.default();
        this.Database = new db_1.default();
        this.serviceRegistry = new registry_1.default(Log_1.default);
        this.Port = Number(process.env.GRAPHQL_PORT) || 3000;
    }
    async bootstrap() {
        const schema = await type_graphql_1.buildSchema({
            resolvers: [
                path_1.default.resolve(__dirname, '../Modules/**/*.resolver.{ts,js}'),
            ],
            globalMiddlewares: [authentication_middleware_1.AuthenticationMiddleware, validate_middleware_1.ValidationMiddleware],
            scalarsMap: [{ type: mongodb_1.ObjectId, scalar: ObjectIdScalars_1.ObjectIdScalar }],
        });
        Log_1.default.info('Create Schema');
        this.Schema = schema;
    }
    async graphQl() {
        await this.bootstrap();
        this.App.use(cors_1.default({
            origin: '*',
            credentials: true,
        }));
        this.App.use(cookie_parser_1.default());
        this.App.use(express_1.default.json());
        this.App.use('/graphql', graphql_upload_1.graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }), express_graphql_1.graphqlHTTP((request, response) => ({
            schema: this.Schema,
            graphiql: true,
            customFormatErrorFn: (error) => ({
                message: error.message,
                locations: error.locations,
                stack: error.stack ? error.stack.split('\n') : [],
                path: error.path,
            }),
            context: {
                req: request,
                res: response,
                ...this.serviceRegistry.services,
                ...Context_1.Context,
            },
        })));
        Log_1.default.info('Create GraphQL');
    }
    async Start() {
        await this.graphQl();
        new Playground_1.Playground().Init(this.App);
        JWT_1.default.init(passport_1.default, this.serviceRegistry);
        this.App.use(passport_1.default.initialize());
        this.App.listen(this.Port, () => {
            Log_1.default.info(`GraphQL Server is now running on port ${this.Port}`);
        });
    }
}
new Server().Start();
//# sourceMappingURL=Server.js.map