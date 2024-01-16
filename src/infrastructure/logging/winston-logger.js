const winston = require('winston');
const Logger = require('../../domain/common/services/logger');
const {combine, timestamp, json, errors} = winston.format;

const newLinesRemover = winston.format((info) => {
  info.message = info.message.replace(/\n|\r/g, '');
  return info;
})();

const logger = winston.createLogger({
  level: 'info',
  format: combine(
      newLinesRemover,
      timestamp({format: 'YYYY-MM-DD HH:mm:ss', alias: 'dateTime'}),
      errors({stack: false}),
      json()),
  transports: [new winston.transports.Console()],
  silent: process.env.NODE_ENV === 'test',
});

class WinstonLogger extends Logger {
  constructor() {
    super();
  }
  info(message) {
    logger.info(message);
  }

  error(message) {
    logger.error(message);
  }

  debug(message) {
    logger.debug(message);
  }
}

module.exports = WinstonLogger;
