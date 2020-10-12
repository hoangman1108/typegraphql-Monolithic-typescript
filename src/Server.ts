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
import { EventResolver } from './Modules/Event/event.resolver';
import { Playground } from './Playground';
import { Context } from './App/Context';
import { AuthenticationMiddleware } from './MiddleWares/authentication.middleware';
import { ValidationMiddleware } from './MiddleWares/validate.middleware';

import logger from './Log';
import Database from './Database/db';

class Server {
  private App: express.Application;

  private Port: Number;

  private Schema: any;

  private Database: any;

  constructor() {
    this.App = express();
    this.Database = new Database();
    this.Port = Number(process.env.GRAPHQL_PORT) || 3000;
  }

  async bootstrap() {
    const schema = await buildSchema({
      resolvers: [UserResolver, EventResolver],
      globalMiddlewares: [AuthenticationMiddleware, ValidationMiddleware],
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
            ...Context,
          },
        })
      ));
    logger.info('Create GraphQL');
  }

  async Start() {
    await this.graphQl();
    new Playground().Init(this.App);
    this.App.listen(this.Port, () => {
      logger.info(`GraphQL Server is now running on port ${this.Port}`);
    });
  }
}

new Server().Start();
