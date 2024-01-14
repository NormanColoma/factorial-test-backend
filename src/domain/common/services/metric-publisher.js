class MetricPublisher {
  constructor() {
    if (this.constructor === MetricPublisher) {
      throw new TypeError('Abstract class ErrorPublisher cannot be instantiated directly.');
    }
  }
  publishMetric(name, value) {
    throw new Error('Method not implemented');
  }
}

module.exports = MetricPublisher;
