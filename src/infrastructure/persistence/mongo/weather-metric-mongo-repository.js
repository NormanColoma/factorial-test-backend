const WeatherMetricRepository = require(
    '../../../domain/weather_metric/weather-metric-repository');

const COLLECTION_NAME = 'metrics';

class WeatherMetricMongoRepository extends WeatherMetricRepository {
  #mongoDbHandler;
  #weatherMetricParser;
  #muuid;

  constructor({mongoDbHandler, weatherMetricParser, muuid}) {
    super();
    this.#mongoDbHandler = mongoDbHandler;
    this.#weatherMetricParser = weatherMetricParser;
    this.#muuid = muuid;
  }

  async save(weatherMetric) {
    const db = await this.#mongoDbHandler.getInstance();
    const document = this.#weatherMetricParser.toDocument(weatherMetric);

    await db.collection(COLLECTION_NAME).insertOne(document);
  }
}

module.exports = WeatherMetricMongoRepository;
