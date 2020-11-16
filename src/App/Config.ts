require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';
// console.log(`amqp://${process.env.RABBIT_USER}:${encodeURIComponent(process.env.RABBIT_PASS || '')}@${process.env.RABBIT}`);
const rabbitConfig = {
  url: 'amqps://mgbhzyje:sXlTnhC1KRTmr_vhldRzemOaLeE8-BXg@fox.rmq.cloudamqp.com/mgbhzyje',
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
