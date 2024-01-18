const EventBus = require('../../../domain/common/bus/event/event-bus');

class RabbitMqEventBus extends EventBus {
  #rabbitMqHandler;
  #logger;
  constructor({rabbitMqHandler, logger}) {
    super();
    this.#rabbitMqHandler = rabbitMqHandler;
    this.#logger = logger;
  }

  async publish(events) {
    console.log('Publishing events to RabbitMQ...');
    try {
      const channel = await this.#rabbitMqHandler.getInstance();
      events.forEach((event) => {
        channel.publish(event.topic, event.name,
            Buffer.from(JSON.stringify(event)));
      });
    } catch (err) {
      this.#logger.info(`Error publishing events to RabbitMQ: ${err}`);
    }
  }
}

module.exports = RabbitMqEventBus;
