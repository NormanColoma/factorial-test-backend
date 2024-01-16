const createWeatherMetricCommandBuilder = ({name, timestamp, value}) => {
  return {
    name,
    timestamp,
    value,
  };
};

module.exports = createWeatherMetricCommandBuilder;
