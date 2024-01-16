class AggregateRoot {
  constructor() {
    if (this.constructor === AggregateRoot) {
      throw new TypeError('Abstract class AggregateRoot cannot be instantiated directly.');
    }

    this.events = [];
  }

  addEvent(event) {
    this.events.push(event);
  }

  getEvents() {
    const events = this.events;
    this.clearEvents();
    return events;
  }

  clearEvents() {
    this.events = [];
  }
}

module.exports = AggregateRoot;
