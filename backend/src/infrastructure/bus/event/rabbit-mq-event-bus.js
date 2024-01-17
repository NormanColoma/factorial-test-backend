const EventBus = require('../../../domain/common/bus/event/event-bus');

class RabbitMqEventBus extends EventBus {
  #rabbitMqHandler;
  constructor({rabbitMqHandler}) {
    super();
    this.#rabbitMqHandler = rabbitMqHandler;
  }

  async publish(events) {
    console.log('Publishing events to RabbitMQ...');
    const channel = await this.#rabbitMqHandler.getInstance();
    events.forEach((event) => {
      channel.publish(event.topic, event.name, Buffer.from(JSON.stringify(event)));
    });
  }
}

module.exports = RabbitMqEventBus;
