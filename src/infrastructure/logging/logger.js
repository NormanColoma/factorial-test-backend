class Logger {
  constructor({loggerService}) {
    this.loggerService = loggerService;
  }
  info(message) {
    this.loggerService.info(message);
  }
  error(message) {
    this.loggerService.error(message);
  }
  debug(message) {
    this.loggerService.debug(message);
  }
}

module.exports = Logger;
