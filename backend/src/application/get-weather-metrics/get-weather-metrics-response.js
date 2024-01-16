const getWeatherMetricsResponseBuilder = ({metrics, average}) => {
  const weatherMetrics = metrics.map((metric) => {
    return {
      name: metric.name,
      timestamp: metric.timestampInMilliseconds,
      value: metric.value,
    };
  });

  return {
    average: {
      temperature: average.temperature,
      windSpeed: average.windSpeed,
      precipitation: average.precipitation,
    },
    metrics: weatherMetrics,
  };
};

module.exports = getWeatherMetricsResponseBuilder;
