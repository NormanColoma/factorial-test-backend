const metricsLogger = ({logger}) => {
  return {
    write: (message) => logger.info(message),
  };
};

module.exports = metricsLogger;
