const EventBus = require('../../../domain/common/bus/event/event-bus');

class RabbitMqEventBus extends EventBus {
  constructor() {
    super();
  }

  async publish(events) {
    console.log('Publishing events to RabbitMQ...');
  }
}

module.exports = RabbitMqEventBus;
