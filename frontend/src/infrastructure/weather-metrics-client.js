import WeatherMetric from '../domain/weather-metric';
import WeatherAverage from '../domain/weather-average';
import config from '../config';

class WeatherMetricsClient {
  #httpClient;
  constructor({httpClient}){
    this.#httpClient = httpClient;
  }

  async getWeatherMetrics({from, to}){
    const params = {from, to};
    const {data, status} = await this.#httpClient.get(config.api.weatherMetricsApiUrl, {params});
    if (status !== 200) {
      return {metrics: {}, average: {}};
    }

    const temperatureMetrics = data.metrics.temperature.map((metric) => new WeatherMetric(
        {timestamp: metric.timestamp, type: metric.name, value: metric.value}));
    const windSpeedMetrics = data.metrics.windSpeed.map((metric) => new WeatherMetric(
        {timestamp: metric.timestamp, type: metric.name, value: metric.value}));
    const precipitationMetrics = data.metrics.precipitation.map((metric) => new WeatherMetric(
        {timestamp: metric.timestamp, type: metric.name, value: metric.value}));
    const metrics = {
      temperature: temperatureMetrics,
      windSpeed: windSpeedMetrics,
      precipitation: precipitationMetrics,
    };
    return {metrics, average: new WeatherAverage(data.average)};
  }
}

export default WeatherMetricsClient;
