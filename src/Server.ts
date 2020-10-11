import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { buildSchema } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { ObjectIdScalar } from './Scalars/ObjectIdScalars';
import { UserResolver } from './Modules/User/user.resolver';
import { Playground } from './Playground';

import logger from './Log';
import Database from './database/db';

class Server {
  private App: express.Application;

  private Schema: any;

  private Database: any;

  constructor() {
    this.App = express();
    this.Database = new Database();
  }

  async bootstrap() {
    const schema = await buildSchema({
      resolvers: [UserResolver],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    });

    logger.info('Create Schema');
    this.Schema = schema;
  }

  async graphQl() {
    await this.bootstrap();
    this.App.use(cors({
      origin: '*',
      credentials: true,
    }));
    this.App.use(cookieParser());
    this.App.use(express.json());
    this.App.use('/graphql',
      graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
      graphqlHTTP(
        (request: any, response: any) => ({
          schema: this.Schema,
          graphiql: true,
          customFormatErrorFn: (error: any) => ({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
          }),
          context: {
            req: request,
            res: response,
          },
        })
      ));
    logger.info('Create service GraphQL');
  }

  async Start() {
    await this.graphQl();
    new Playground().Init(this.App);
    this.App.listen(3000, () => {
      logger.info('GraphQL Server is now running on port 3000');
    });
  }
}

new Server().Start();
