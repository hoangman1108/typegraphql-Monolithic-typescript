import amqp from 'amqplib';
import { rabbitConfig } from './Config';
import logger from './Log';

class RabbitMQ {
  async Setup() {
    logger.info('Setting up RabbitMQ Exchanges/Queues...');
    // connect to RabbitMQ Instance
    // const connection = await amqp.connect(rabbitConfig.url);
    const connection = await amqp.connect('amqps://mgbhzyje:sXlTnhC1KRTmr_vhldRzemOaLeE8-BXg@fox.rmq.cloudamqp.com/mgbhzyje');
    Object.values(rabbitConfig.channel).forEach(async (channel: any) => {
      const channelMQ = await connection.createChannel();
      await channelMQ.assertExchange(channel.channel, 'direct', { durable: true });
      // create queues
      await channelMQ.assertQueue(`${channel.channel}.${channel.request}`, { durable: true });
      await channelMQ.assertQueue(`${channel.channel}.${channel.response}`, { durable: true });

      // bind queues
      await channelMQ.bindQueue(`${channel.channel}.${channel.request}`, channel.channel, channel.request);
      await channelMQ.bindQueue(`${channel.channel}.${channel.response}`, channel.channel, channel.response);
      logger.info(`Setup RabbitMQ Done Channel:${channel.channel}`);
    });
  }

  consume({
    connection,
    channel,
  }: {
    connection: amqp.Connection;
    channel: amqp.Channel;
  }) {
    return new Promise((resolve, reject) => {
      Object.values(rabbitConfig.channel).forEach(async (channelMQ: any) => {
        channel.consume(`${channelMQ.channel}.${channelMQ.response}`, async (msg: any) => {
          const controller: any = require(channelMQ.controller);
          const consume: any = Object.values(controller)[0];
          const msgBody = msg.content.toString();
          const data = JSON.parse(msgBody);

          const { processingResults } = data;

          await consume.consume(processingResults);
          // acknowledge message as received
          await channel.ack(msg);
        });
      });

      // handle connection closed
      connection.on('close', (err: any) => {
        logger.warn(`closed: ${err}`);
        return reject(err);
      });

      // handle errors
      connection.on('error', (err: any) => {
        logger.warn(`Error: ${err}`);
        return reject(err);
      });
    });
  }

  async listenForResults() {
    const connection = await amqp.connect(rabbitConfig.url);

    const channel = await connection.createChannel();
    await channel.prefetch(1);

    await this.consume({ connection, channel });
  }

  async publishToChannel(
    {
      routingKey,
      exchangeName,
      data,
    }: { routingKey: string | ''; exchangeName: string | ''; data: any }
  ) {
    const connection = await amqp.connect(rabbitConfig.url);
    const channel = await connection.createConfirmChannel();
    return new Promise<void>((resolve, reject) => {
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(data), 'utf-8'),
        { persistent: true },
        (err: any) => {
          if (err) {
            return reject(err);
          }
          resolve();
        }
      );
    });
  }
}

const rabbitMQ = new RabbitMQ();
rabbitMQ.listenForResults();

export default rabbitMQ;
