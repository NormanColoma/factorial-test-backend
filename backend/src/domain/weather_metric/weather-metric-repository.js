class WeatherMetricRepository {
  constructor() {
    if (this.constructor === WeatherMetricRepository) {
      throw new TypeError('Abstract class WeatherMetricRepository cannot be instantiated directly.');
    }
  }

  async save(weatherMetric) {
    throw new Error('Method not implemented');
  }

  async find({name, timestamp}) {
    throw new Error('Method not implemented');
  }

  async findBetweenDates(from, to) {
    throw new Error('Method not implemented');
  }
}

module.exports = WeatherMetricRepository;
