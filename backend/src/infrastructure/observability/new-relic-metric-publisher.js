const MetricPublisher = require('../../domain/common/services/metric-publisher');

class NewRelicMetricPublisher extends MetricPublisher {
  #newRelicClient;
  constructor({newRelicClient}) {
    super();
    this.#newRelicClient = newRelicClient;
  }

  publishMetric(name, value) {
    this.#newRelicClient.recordMetric(name, value);
  }
}

module.exports = NewRelicMetricPublisher;
