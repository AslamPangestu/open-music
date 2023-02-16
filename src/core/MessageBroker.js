const amqp = require('amqplib');

class MessageBroker {
  constructor() {
    this._connection = amqp.connect(process.env.RABBITMQ_SERVER);
  }

  async sendMessage(queue, message) {
    const connection = await this._connection;
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.sendToQueue(queue, Buffer.from(message));

    setTimeout(() => {
      connection.close();
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
