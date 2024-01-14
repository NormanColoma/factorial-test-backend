class Logger {
  constructor() {
    if (this.constructor === Logger) {
      throw new TypeError('Abstract class Logger cannot be instantiated directly.');
    }
  }
  info(message) {
    throw new Error('Method not implemented');
  }
  error(message) {
    throw new Error('Method not implemented');
  }
  debug(message) {
    throw new Error('Method not implemented');
  }
}

module.exports = Logger;
