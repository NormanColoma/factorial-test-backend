const {bus} = require('../../config');
class RabbitMqHandler {
  #rabbitClient;
  #instance;
  constructor({rabbitClient}) {
    this.#rabbitClient = rabbitClient;
  }

  async getInstance() {
    if (!this.#instance) {
      await this.#connect();
    }

    return this.#instance;
  }

  async #connect() {
    const connection = await this.#rabbitClient.connect(bus.rabbitmqUri);
    const channel = await connection.createChannel();
    await channel.assertExchange('metrics', 'direct', {durable: false});

    this.#instance = channel;
  }
}

module.exports = RabbitMqHandler;
