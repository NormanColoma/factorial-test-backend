const WeatherMetric = require('../../../domain/weather_metric/weather-metric');

class WeatherMetricMongoParser {
  #muuid;
  constructor({muuid}) {
    this.#muuid = muuid;
  }

  toDomain(weatherMetricDocument) {
    return WeatherMetric.build({
      id: this.#muuid.from(weatherMetricDocument._id).toString(),
      ...weatherMetricDocument,
    });
  }

  toDocument(weatherMetric) {
    const {id, ...weatherMetricFields} = weatherMetric.toObject();
    return {_id: this.#muuid.from(id), ...weatherMetricFields};
  }
}

module.exports = WeatherMetricMongoParser;
