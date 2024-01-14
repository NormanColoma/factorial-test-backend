const ApplicationError = require('../common/application-error');

class InvalidWeatherMetricError extends ApplicationError {
  constructor(message, context) {
    super(message, context);
  }
}

module.exports = InvalidWeatherMetricError;
