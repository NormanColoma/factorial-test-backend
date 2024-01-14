const {logging} = require('../config');
const ErrorPublisher = require('../../domain/common/services/error-publisher');
const ApplicationError = require('../../domain/common/application-error');

class SentryErrorPublisher extends ErrorPublisher {
  #sentry;
  #logger;

  constructor({sentry, logger}) {
    super();
    this.#sentry = sentry;
    this.#logger = logger;
  }

  init() {
    try {
      const {dsn, environment} = logging.sentry;
      this.#sentry.init({
        dsn,
        environment,
        defaultIntegrations: false,
        autoSessionTracking: false,
        initialScope: {},
        beforeSend: function(event, hint) {
          const exception = hint.originalException;

          if (exception instanceof ApplicationError) {
            event.fingerprint = [exception.name];
          }

          return event;
        },
      });
    } catch (err) {
      const error = err.message ? err.message : err;
      this.#logger.error(`Error in sentry Connection: ${error}`);
    }
  }

  publishError(err) {
    this.#sentry.setContext('Params', err.context);
    this.#sentry.captureException(err);
  }
}

module.exports = SentryErrorPublisher;
