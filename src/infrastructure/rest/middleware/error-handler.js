const {SERVER_ERROR} = require('../http-status-code');
const container = require('../../../container');

const errorHandler = (err, req, res, next) => {
  const errorPublisher = container.resolve('errorPublisher');
  const logger = container.resolve('logger');
  const errorCode = container.resolve('idGenerator').generate();

  logger.error(`${err} with error code: ${errorCode}`);
  errorPublisher.publishError(err);

  const error = {
    message: 'Internal Server Error',
    code: errorCode,
  };
  return res.status(SERVER_ERROR).json({error, data: null});
};

module.exports = errorHandler;
