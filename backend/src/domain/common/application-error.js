class ApplicationError extends Error {
  constructor(message, context = {}) {
    super(message);
    this.name = this.constructor.name;
    this.context = context;
  }
}

module.exports = ApplicationError;
