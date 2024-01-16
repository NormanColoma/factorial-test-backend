const awilix = require('awilix');
const Sentry = require('@sentry/node');
const {v4: uuidv4} = require('uuid');
const {MongoClient} = require('mongodb');
const SentryErrorPublisher = require('./infrastructure/logging/sentry-error-publisher');
const MongoDbHandler = require('./infrastructure/persistence/mongo/mongo-db-handler');
const muuid = require('uuid-mongodb');
const idGenerator = require('./domain/common/services/id-generator');
const WinstonLogger = require('./infrastructure/logging/winston-logger');
const CreateWeatherMetric = require('./application/create-weather-metric');
const WeatherMetricMongoRepository = require('./infrastructure/persistence/mongo/weather-metric-mongo-repository');
const WeatherMetricMongoParser = require('./infrastructure/persistence/mongo/weather-metric-mongo-parser');
const RabbitMqEventBus = require('./infrastructure/bus/event/rabbit-mq-event-bus');
const GetWeatherMetrics = require('./application/get-weather-metrics');
const AverageCalculator = require('./domain/weather_metric/average-calculator');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  sentry: awilix.asValue(Sentry),
  logger: awilix.asClass(WinstonLogger).singleton(),
  errorPublisher: awilix.asClass(SentryErrorPublisher).singleton(),
  idGenerator: awilix.asFunction(idGenerator).singleton(),
  uuidv4: awilix.asValue(uuidv4),
  mongoDbHandler: awilix.asClass(MongoDbHandler).singleton(),
  mongo: awilix.asValue(MongoClient),
  muuid: awilix.asValue(muuid),
  createWeatherMetric: awilix.asClass(CreateWeatherMetric).singleton(),
  getWeatherMetrics: awilix.asClass(GetWeatherMetrics).singleton(),
  weatherMetricRepository: awilix.asClass(WeatherMetricMongoRepository).singleton(),
  weatherMetricParser: awilix.asClass(WeatherMetricMongoParser).singleton(),
  eventBus: awilix.asClass(RabbitMqEventBus).singleton(),
  averageCalculator: awilix.asClass(AverageCalculator).singleton(),
});

module.exports = container;
