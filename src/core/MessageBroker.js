const amqp = require('amqplib');

class MessageBroker {
  constructor() {
    this._connection = null;
    this._channels = null;
    this._init();
  }

  async _init() {
    this._connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    this._channels = await this._connection.createChannel();
  }

  async sendMessage(queue, message) {
    await this._channels.assertQueue(queue, {
      durable: true,
    });

    await this._channels.sendToQueue(queue, Buffer.from(message));

    this._close();
  }

  _close() {
    setTimeout(() => {
      this._connection.close();
    }, 1000);
  }
}

module.exports = MessageBroker;

// const MessageBroker = {
//   sendMessage: async (queue, message) => {
//     const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
//     const channel = await connection.createChannel();
//     await channel.assertQueue(queue, {
//       durable: true,
//     });

//     await channel.sendToQueue(queue, Buffer.from(message));

//     setTimeout(() => {
//       connection.close();
//     }, 1000);
//   },

// };

// module.exports = MessageBroker;
