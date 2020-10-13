import logger from '../Log';

require('dotenv').config();

const Util = {
  mongo: {
    host: process.env.MONGODB_HOST || '127.0.0.1',
    user: process.env.MONGODB_USER || 'root',
    pass: process.env.MONGODB_PASS || 'root',
    port: process.env.MONGODB_PORT || '27017',
    db: process.env.MONGODB_DB || 'graphql',
  },
  mongoServer: {
    host: process.env.MONGODB_HOST_SERVER || 'cluster0.ascy6.mongodb.net',
    user: process.env.MONGODB_USER_SERVER || 'hoangman',
    pass: process.env.MONGODB_PASS_SERVER || '123',
    db: process.env.MONGODB_DB_SERVER || 'graphql',
    auth: process.env.MONGODB_SERVER
    || 'authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
  },
};

if (!Util.mongo.host) {
  logger.info('No mongo connection string. Set MONGODB_URI enviroment variable.');
  process.exit(1);
}

export default Util;
