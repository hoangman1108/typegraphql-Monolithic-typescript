"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const util_1 = __importDefault(require("./util"));
const Log_1 = __importDefault(require("../App/Log"));
class Database {
    constructor() {
        this.uri = `mongodb+srv://${util_1.default.mongoServer.user}:${util_1.default.mongoServer.pass}@${util_1.default.mongoServer.host}/${util_1.default.mongoServer.db}?${util_1.default.mongoServer.auth}`;
        // this.uri = `mongodb://${utils.mongo.user}:${utils.mongo.pass}@${utils.mongo.host}:${utils.mongo.port}/${utils.mongo.db}`;
        this.onConnection();
    }
    onConnection() {
        this.connection = mongoose_1.default.connection;
        this.connection.on('connected', () => {
            Log_1.default.info('Mongo Connection Established');
        });
        this.connection.on('reconnected', () => {
            Log_1.default.info('Mongo Connection Reestablished');
        });
        this.connection.on('disconnected', () => {
            Log_1.default.info('Mongo Connection Disconnected');
            Log_1.default.info('Trying to reconnect to Mongo...');
            setTimeout(() => {
                mongoose_1.default.connect(this.uri, {
                    keepAlive: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    socketTimeoutMS: 3000,
                    connectTimeoutMS: 3000,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    authSource: 'admin',
                });
            }, 3000);
        });
        this.connection.on('close', () => {
            Log_1.default.info('Mongo Connection Closed');
        });
        this.connection.on('error', (error) => {
            Log_1.default.info(`Mongo Connection Error:${error}`);
        });
        const run = async () => {
            await mongoose_1.default.connect(this.uri, {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
                authSource: 'admin',
            });
        };
        run().catch((error) => Log_1.default.info(error));
    }
}
exports.default = Database;
//# sourceMappingURL=db.js.map