class EventBus {
  constructor() {
    if (this.constructor === EventBus) {
      throw new TypeError('Abstract class EventBus cannot be instantiated directly.');
    }
  }
  publish() {
    throw new Error('Method not implemented');
  }
}

module.exports = EventBus;
