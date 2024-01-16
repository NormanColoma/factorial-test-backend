const GetWeatherMetrics = require('../../../../application/get-weather-metrics');
const WeatherMetric = require(
    '../../../../domain/weather_metric/weather-metric');
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
    averageCalculator.calculate.mockReturnValue(2);
    const from = new Date();
    const to = new Date();
    const response = await getWeatherMetrics.get({from, to});
    expect(response).toEqual({
      metrics: [
        {timestamp: timestamp.getTime(), name: 'temperature', value: 1},
        {timestamp: timestamp.getTime(), name: 'temperature', value: 2},
        {timestamp: timestamp.getTime(), name: 'temperature', value: 3},
      ],
      average: 2,
    });
    expect(weatherMetricRepository.findBetweenDates).toHaveBeenCalledWith({from, to});
    expect(averageCalculator.calculate).toHaveBeenCalledWith(metrics);
  });
});
