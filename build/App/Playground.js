"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playground = void 0;
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
class Playground {
    async Tabs(endpoint) {
        const playgroundQueries = glob_1.default.sync(path_1.default.resolve(__dirname, '../**/playground.{ts,js}'));
        this.Tab = await lodash_1.reduce(playgroundQueries, (queryContents, filePath) => {
            if (fs_1.default.existsSync(filePath)) {
                const module = path_1.default.basename(path_1.default.dirname(filePath));
                const query = require(`${filePath}`);
                if (query.default) {
                    const tab = {
                        name: module,
                        endpoint: endpoint !== null && endpoint !== void 0 ? endpoint : '/graphql',
                        query: query.default,
                    };
                    /* eslint no-param-reassign: [0] */
                    queryContents = [...queryContents, tab];
                }
            }
            return queryContents;
        }, []);
    }
    async Init(App) {
        await this.Tabs('/graphql');
        App.get('/', graphql_playground_middleware_express_1.default({
            endpoint: '/graphql',
            subscriptionEndpoint: '/graphql',
            settings: {
                'request.credentials': 'include',
                'general.betaUpdates': true,
                'editor.cursorShape': 'block',
                'editor.theme': 'dark',
                'editor.reuseHeaders': true,
                'tracing.hideTracingResponse': true,
                'tracing.tracingSupported': true,
                'editor.fontSize': 12,
                'editor.fontFamily': '\'Roboto\', \'Consolas\', \'Inconsolata\', \'Droid Sans Mono\', \'Monaco\', monospace',
                'schema.polling.enable': false,
                'schema.polling.endpointFilter': '/graphql',
                'schema.polling.interval': 1,
            },
            tabs: this.Tab,
        }));
    }
}
exports.Playground = Playground;
//# sourceMappingURL=Playground.js.map