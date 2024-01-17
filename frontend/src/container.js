import * as awilix from 'awilix';
import axios from 'axios';
import WeatherMetricsClient from './infrastructure/weather-metrics-client';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  httpClient: awilix.asValue(axios),
  weatherMetricsClient: awilix.asClass(WeatherMetricsClient).singleton(),
});

export default container;
