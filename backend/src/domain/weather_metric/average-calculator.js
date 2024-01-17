const {weatherMetricTypes} = require('./waether-metric-types');
const WeatherAverage = require('../weather_average/weather-average');

class AverageCalculator {
  calculate(metrics) {
    const temperatureAvg= this.#calculateTemperatureAvgForMetricName(metrics, weatherMetricTypes.TEMPERATURE);
    const windSpeedAvg = this.#calculateTemperatureAvgForMetricName(metrics, weatherMetricTypes.WIND_SPEED);
    const precipitationAvg = this.#calculateTemperatureAvgForMetricName(metrics, weatherMetricTypes.PRECIPITATION);
    return WeatherAverage.build({temperature: temperatureAvg, windSpeed: windSpeedAvg,
      precipitation: precipitationAvg});
  }

  #calculateTemperatureAvgForMetricName(metrics, metricName) {
    const temperatureMetrics = metrics.filter((metric) => metric.name === metricName);
    return temperatureMetrics.length > 0 ?
        Math.round(temperatureMetrics.reduce((acc, metric) => acc + metric.value, 0) / temperatureMetrics.length) : 0;
  }
}

module.exports = AverageCalculator;