const amqp = require('amqplib');

class MessageBroker {
  constructor() {
    this._connection = null;
    this._channels = null;
  }

  async init() {
    this._connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    this._channels = await this._connection.createChannel();
  }

  async sendMessage(queue, message) {
    await this._channels.assertQueue(queue, {
      durable: true,
    });

    await this._channels.sendToQueue(queue, Buffer.from(message));
    // eslint-disable-next-line no-console
    console.log(`${queue} has been send`);
  }

  close() {
    setTimeout(() => {
      this._connection.close();
    }, 1000);
  }
}

module.exports = MessageBroker;
