const getWeatherMetricsResponseBuilder = require('./get-weather-metrics-response');

class GetWeatherMetrics {
  #weatherMetricRepository;
  #averageCalculator;
  constructor({weatherMetricRepository, averageCalculator}) {
    this.#weatherMetricRepository = weatherMetricRepository;
    this.#averageCalculator = averageCalculator;
  }

  async get({from, to}) {
    const weatherMetrics = await this.#weatherMetricRepository.findBetweenDates({from, to});

    const average = this.#averageCalculator.calculate(weatherMetrics);

    return getWeatherMetricsResponseBuilder({metrics: weatherMetrics, average});
  }
}

module.exports = GetWeatherMetrics;
