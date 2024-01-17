const weatherMetricTypes = {
  TEMPERATURE: 'temperature',
  WIND_SPEED: 'wind_speed',
  PRECIPITATION: 'precipitation',
  toString: (type) => {
    switch (type) {
      case weatherMetricTypes.TEMPERATURE:
        return 'Temperature';
      case weatherMetricTypes.WIND_SPEED:
        return 'Wind Speed';
      case weatherMetricTypes.PRECIPITATION:
        return 'Precipitation';
      default:
        return type;
    }
  }
};

export default weatherMetricTypes;
