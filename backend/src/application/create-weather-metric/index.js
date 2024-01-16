const WeatherMetric = require('../../domain/weather_metric/weather-metric');

class CreateWeatherMetric {
  #weatherMetricRepository;
  #idGenerator;
  #eventBus;
  constructor({weatherMetricRepository, idGenerator, eventBus}) {
    this.#weatherMetricRepository = weatherMetricRepository;
    this.#idGenerator = idGenerator;
    this.#eventBus = eventBus;
  }

  async create({name, timestamp, value}) {
    const weatherMetric = WeatherMetric.create({id: this.#idGenerator.generate(), name, timestamp, value});
    await this.#weatherMetricRepository.save(weatherMetric);

    this.#eventBus.publish(weatherMetric.getEvents());
  }
}

module.exports = CreateWeatherMetric;
