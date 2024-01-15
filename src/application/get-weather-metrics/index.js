const getWeatherMetricsResponseBuilder = require('./get-weather-metrics-response');

class GetWeatherMetrics {
  #weatherMetricRepository;
  constructor({weatherMetricRepository}) {
    this.#weatherMetricRepository = weatherMetricRepository;
  }

  async get({from, to}) {
    const weatherMetrics = await this.#weatherMetricRepository.findBetweenDates({from, to});

    const average = Math.round(weatherMetrics.reduce((acc, metric) => acc + metric.value, 0) / weatherMetrics.length);

    return getWeatherMetricsResponseBuilder({metrics: weatherMetrics, average});
  }
}

module.exports = GetWeatherMetrics;
