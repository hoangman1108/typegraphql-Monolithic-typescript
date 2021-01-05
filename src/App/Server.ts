import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import passport from 'passport';

import { graphqlHTTP } from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { buildSchema } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { ObjectIdScalar } from '../Scalars/ObjectIdScalars';
import { Playground } from './Playground';
import { Context } from './Context';
import { AuthenticationMiddleware } from '../MiddleWares/authentication.middleware';
import { ValidationMiddleware } from '../MiddleWares/validate.middleware';
import { ErrorMiddleware } from '../MiddleWares/error.middleware';
// import RabbitMQ from './RabbitMQ';

import ServiceRegistry from './registry';
import logger from './Log';
import Database from '../database/db';
import Jwt from './JWT';

class Server {
  private App: express.Application;

  private Port: number;

  private Schema: any;

  private Database: any;

  private serviceRegistry: ServiceRegistry;

  constructor() {
    this.App = express();
    this.Database = new Database();
    this.serviceRegistry = new ServiceRegistry(logger);
    this.Port = Number(process.env.PORT) || 3000;
  }

  async bootstrap() {
    const schema = await buildSchema({
      resolvers: [
        path.resolve(__dirname, '../Modules/**/*.resolver.{ts,js}'),
      ],
      globalMiddlewares: [
        ErrorMiddleware, AuthenticationMiddleware, ValidationMiddleware,
      ],
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
            ...this.serviceRegistry.services,
            ...Context,
          },
        })
      ));
    logger.info('Create GraphQL');
  }

  async Start() {
    await this.graphQl();
    // await RabbitMQ.Setup();
    new Playground().Init(this.App);
    Jwt.init(passport, this.serviceRegistry);
    this.App.use(passport.initialize());
    this.App.listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => {
      logger.info(`GraphQL Server is now running on port ${this.Port}`);
    });
  }
}

new Server().Start();
