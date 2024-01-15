const getWeatherMetricsResponseBuilder = ({metrics, average}) => {
  const weatherMetrics = metrics.map((metric) => {
    return {
      name: metric.name,
      timestamp: metric.timestamp.getTime(),
      value: metric.value,
    };
  });

  return {
    average,
    metrics: weatherMetrics,
  };
};

module.exports = getWeatherMetricsResponseBuilder;
