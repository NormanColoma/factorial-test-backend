const weatherMetricTypes = {
  TEMPERATURE: 'temperature',
  WIND_SPEED: 'wind_speed',
  PRECIPITATION: 'precipitation',
};

const isValid = (metricName) => {
  return Object.values(weatherMetricTypes).includes(metricName);
};

module.exports = {weatherMetricTypes, isValidMetricName: isValid};
