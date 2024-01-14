class ErrorPublisher {
  constructor() {
    if (this.constructor === ErrorPublisher) {
      throw new TypeError('Abstract class ErrorPublisher cannot be instantiated directly.');
    }
  }
  publishError(err, userId) {
    throw new Error('Method not implemented');
  }
}

module.exports = ErrorPublisher;
