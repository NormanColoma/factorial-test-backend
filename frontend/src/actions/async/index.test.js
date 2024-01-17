import container from '../../container';
import * as awilix from 'awilix';

describe('Async actions', () => {
  const weatherMetricsClientMock = {
    getWeatherMetrics: jest.fn(),
  };
  const dispatchMock = jest.fn();

  container.register({
    weatherMetricsClient: awilix.asValue(weatherMetricsClientMock),
  });

  test('should dispatch setWeatherMetrics action', async () => {
    const {fetchWeatherMetrics} = require('./index');
    const mockedMetrics = {
      temperature: [{timestamp: '2020-01-01', name: 'temperature', value: 10}],
      windSpeed: [{timestamp: '2020-01-01', name: 'windSpeed', value: 10}],
      precipitation: [{timestamp: '2020-01-01', name: 'precipitation', value: 10}],
    };
    const mockedAverage = {temperature: 10, windSpeed: 10, precipitation: 10};
    weatherMetricsClientMock.getWeatherMetrics.mockReturnValue({metrics: mockedMetrics, average: mockedAverage});

    await fetchWeatherMetrics(dispatchMock, {from: '2020-01-01', to: '2020-01-02'});

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({type: 'SET_WEATHER_METRICS', payload: {metrics: mockedMetrics, average: mockedAverage}});
    expect(weatherMetricsClientMock.getWeatherMetrics).toHaveBeenCalledTimes(1);
    expect(weatherMetricsClientMock.getWeatherMetrics).toHaveBeenCalledWith({from: '2020-01-01', to: '2020-01-02'});
  });
});
