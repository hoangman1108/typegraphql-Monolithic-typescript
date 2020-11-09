require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const rabbitConfig = {
  url: `amqp://${process.env.RABBIT_USER}:${encodeURIComponent(process.env.RABBIT_PASS || '')}@${process.env.RABBIT}`,
  channel: [
    {
      channel: 'requestUser',
      request: 'pushMessage',
      response: 'sendMessage',
      controller: '../Modules/RabbitMQ/rabbit.resolver',
    },
    // {
    //   channel: 'scanVehicle',
    //   request: 'pushScanLicenseplate',
    //   response: 'sendScanLicenseplate',
    //   controller: '../Modules/Vehicle/api/scanVehicle.controller',
    // },
  ],
};

export {
  env,
  rabbitConfig,
};
