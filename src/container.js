const awilix = require('awilix');
const Sentry = require('@sentry/node');
const {v4: uuidv4} = require('uuid');
const {MongoClient} = require('mongodb');
const SentryErrorPublisher = require('./infrastructure/logging/sentry-error-publisher');
const MongoDbHandler = require('./infrastructure/persistence/mongo/mongo-db-handler');
const muuid = require('uuid-mongodb');
const idGenerator = require('./domain/common/services/id-generator');
const WinstonLogger = require('./infrastructure/logging/winston-logger');

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
});

module.exports = container;
