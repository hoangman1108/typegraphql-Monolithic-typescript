import * as yup from 'yup';
import {
  Arg, Extensions, Mutation, Query, Resolver,
} from 'type-graphql';
import { rabbitConfig } from '../../App/Config';
import rabbitMQ from '../../App/RabbitMQ';
import { RabbitInput } from './type/rabbit.input';
import {
  RabbitPayload, RabbitPayloads,
} from './type/rabbit.type';
import { IRabbit, RabbitCollection } from '../../models/rabbit.model';

let lastRequestId = 1;

@Resolver()
export class RabbitResolver {
  static async consume(data: {
    title: string;
    description: string;
  }) {
    await RabbitCollection.create({ ...data, stt: lastRequestId });
    lastRequestId += 1;
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
  async pushMessage(@Arg('data') data: RabbitInput): Promise<RabbitPayload> {
    const requestId = lastRequestId;
    lastRequestId += 1;
    const channel: any = rabbitConfig.channel.find((x) => x.channel === 'requestUser');
    rabbitMQ.publishToChannel({
      routingKey: channel.request,
      exchangeName: channel.channel,
      data: { requestId, requestData: data },
    });
    return {
      message: 'push message OK',
      errors: null,
    };
  }

  @Query(() => RabbitPayloads)
  async listMessage(): Promise<RabbitPayloads> {
    return RabbitCollection.find().then((results: IRabbit[]) => ({
      rabbits: results,
      errors: null,
    }));
  }
}
