import axios from 'axios';
import WeatherMetric from '../../domain/weather-metric';
import {setWeatherMetrics} from '../index';
import WeatherAverage from '../../domain/weather-average';
export const fetchWeatherMetrics = async (dispatch) => {
  const params = {
    from: '2024-01-15T00:00:00.000',
    to: '2024-01-16T22:59:59.599',
  }
  const response = await axios.get('http://localhost:3000/api/v1/weather-metrics', {params})
  const temperatureMetrics = response.data.metrics.temperature.map((metric) => new WeatherMetric(
      {timestamp: metric.timestamp, type: metric.name, value: metric.value}));
  const windSpeedMetrics = response.data.metrics.windSpeed.map((metric) => new WeatherMetric(
      {timestamp: metric.timestamp, type: metric.name, value: metric.value}));
  const precipitationMetrics = response.data.metrics.precipitation.map((metric) => new WeatherMetric(
      {timestamp: metric.timestamp, type: metric.name, value: metric.value}));
  const metrics = {
    temperature: temperatureMetrics,
    windSpeed: windSpeedMetrics,
    precipitation: precipitationMetrics,
  };
  dispatch(setWeatherMetrics({metrics, average: new WeatherAverage(response.data.average)}));
}
