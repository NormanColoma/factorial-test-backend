const env = process.env.NODE_ENV;
const mongoTimeout = process.env.MONGO_TIMEOUT || 5000;
const mongoConnectionUri = process.env.MONGO_URI || 'mongodb://admin:admin@mongo:27017';
const rabbitmqUri = process.env.RABBITMQ_URI || 'amqp://guest:guest@rabbitmq:5672';

const run = {
  server: {
    port: 3000,
  },
  app: {
    logLevel: process.env.LOG_LEVEL || 'info',
  },
  mongo: {
    mongoConnectionUri,
    dbName: process.env.MONGO_DB_NAME || 'weather-metrics',
    timeout: mongoTimeout,
  },
  logging: {
    sentry: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT || 'dev',
    },
  },
  bus: {
    rabbitmqUri,
  },
};

const test = {
  server: {
    port: 3333,
  },
  mongo: {
    mongoConnectionUri: 'fake_mongo_uri',
    dbName: 'fake_db_name',
    timeout: 5000,
  },
  app: {
    logLevel: 'error',
  },
  bus: {
    rabbitmqUri: 'rabbitmqUri',
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
