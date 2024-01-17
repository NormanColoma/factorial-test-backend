const {weatherMetricTypes} = require(
    '../../domain/weather_metric/waether-metric-types');
const getWeatherMetricsResponseBuilder = ({metrics, average}) => {
  const temperatureMetrics = [];
  const windSpeedMetrics = [];
  const precipitationMetrics = [];
  metrics.forEach((metric) => {
    const metricResponse = {
      name: metric.name,
      timestamp: metric.timestampInMilliseconds,
      value: metric.value,
    };
    if (metric.name === weatherMetricTypes.TEMPERATURE) {
      temperatureMetrics.push(metricResponse);
    } else if (metric.name === weatherMetricTypes.WIND_SPEED) {
      windSpeedMetrics.push(metricResponse);
    } else if (metric.name === weatherMetricTypes.PRECIPITATION) {
      precipitationMetrics.push(metricResponse);
    }
  });

  return {
    average: {
      temperature: average.temperature,
      windSpeed: average.windSpeed,
      precipitation: average.precipitation,
    },
    metrics: {
      temperature: temperatureMetrics,
      windSpeed: windSpeedMetrics,
      precipitation: precipitationMetrics,
    },
  };
};

module.exports = getWeatherMetricsResponseBuilder;
