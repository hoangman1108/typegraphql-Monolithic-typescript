import * as yup from 'yup';
import { Logger } from 'pino';
import {
  Arg, Ctx, Extensions, Mutation, Query, Resolver,
} from 'type-graphql';
import { rabbitConfig } from '../../App/Config';
import rabbitMQ from '../../App/RabbitMQ';
import { RabbitInput } from './type/rabbit.input';
import {
  RabbitPayload, RabbitPayloads,
} from './type/rabbit.type';
import { IRabbit, RabbitCollection } from '../../models/rabbit.model';
import { ObjectIdScalar } from '../../Scalars/ObjectIdScalars';

let requestId = 1;
@Resolver()
export class RabbitResolver {
  static async consume(data: {
    title: string;
    description: string;
  }) {
    await RabbitCollection.create(data);
  }

  @Mutation(() => RabbitPayload)
  @Extensions({
    authenticate: true,
    validationSchema: yup.object().shape({
      data: yup.object().shape({
        title: yup.string()
          .trim()
          .min(5)
          .max(50)
          .required('Title must exists.'),
        description: yup.string()
          .trim()
          .min(5)
          .max(200)
          .required('Description must exists.'),
      }),
    }),
  })
  async pushMessage(@Arg('data') data: RabbitInput,
    @Ctx() { logger }: { logger: Logger }): Promise<RabbitPayload> {
    const channel: any = rabbitConfig.channel.find((x) => x.channel === 'requestUser');
    try {
      rabbitMQ.publishToChannel({
        routingKey: channel.request,
        exchangeName: channel.channel,
        data: { requestId, requestData: data },
      });
      requestId += 1;
      logger.info('Rabbit#push.check1 %o', data);
      return {
        message: `push message: ${data.title} success`,
        errors: null,
      };
    } catch {
      throw new Error('Cannot push');
    }
  }

  @Query(() => RabbitPayloads)
  async listMessage(): Promise<RabbitPayloads> {
    return RabbitCollection.find().then((results: IRabbit[]) => ({
      rabbits: [...results.map((value: IRabbit) => ({
        ...value.toObject(),
        id: ObjectIdScalar.parseValue(value.id),
      }))],
      errors: null,
    }));
  }
}
