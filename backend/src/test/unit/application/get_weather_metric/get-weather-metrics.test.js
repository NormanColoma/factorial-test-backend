const GetWeatherMetrics = require('../../../../application/get-weather-metrics');
const WeatherMetric = require(
    '../../../../domain/weather_metric/weather-metric');
const WeatherAverage = require(
    '../../../../domain/weather_average/weather-average');
describe('GetWeatherMetrics application service', () => {
  let getWeatherMetrics;
  let weatherMetricRepository;
  let averageCalculator;
  beforeEach(() => {
    weatherMetricRepository = {
      findBetweenDates: jest.fn(),
    };
    averageCalculator = {
      calculate: jest.fn(),
    };
    getWeatherMetrics = new GetWeatherMetrics({
      weatherMetricRepository,
      averageCalculator,
    });
  });
  it('should return the average of the given metrics', async () => {
    const timestamp = new Date();
    const id = '84a4cb7b-742d-478c-9a08-e008a321a2ef';
    const metric1 = WeatherMetric.build({id, timestamp, name: 'temperature', value: 1});
    const metric2 = WeatherMetric.build({id, timestamp, name: 'temperature', value: 2});
    const metric3 = WeatherMetric.build({id, timestamp, name: 'temperature', value: 3});
    const metrics = [metric1, metric2, metric3];
    weatherMetricRepository.findBetweenDates.mockReturnValue(metrics);
    averageCalculator.calculate.mockReturnValue(WeatherAverage.build({temperature: 2, windSpeed: 0, precipitation: 0}));
    const from = new Date();
    const to = new Date();
    const response = await getWeatherMetrics.get({from, to});
    expect(response).toEqual({
      metrics: {
        temperature: [
          {timestamp: timestamp.getTime(), name: 'temperature', value: 1},
          {timestamp: timestamp.getTime(), name: 'temperature', value: 2},
          {timestamp: timestamp.getTime(), name: 'temperature', value: 3},
        ],
        windSpeed: [],
        precipitation: [],
      },
      average: {
        temperature: 2,
        precipitation: 0,
        windSpeed: 0,
      },
    });
    expect(weatherMetricRepository.findBetweenDates).toHaveBeenCalledWith({from, to});
    expect(averageCalculator.calculate).toHaveBeenCalledWith(metrics);
  });
});
