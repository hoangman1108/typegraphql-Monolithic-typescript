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
};

if (!Util.mongo.host) {
  logger.info('No mongo connection string. Set MONGODB_URI enviroment variable.');
  process.exit(1);
}

export default Util;
