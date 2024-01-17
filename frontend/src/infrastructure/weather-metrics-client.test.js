import WeatherMetricsClient from './weather-metrics-client';

describe('Weather metrics client', () => {
  const httpClientMock = {
    get: jest.fn(),
  };
  const weatherMetricsClient = new WeatherMetricsClient({httpClient: httpClientMock});

  afterEach(() => jest.resetAllMocks());

  test('should return empty metrics and average when api response is not 200', async () => {
    httpClientMock.get.mockReturnValue({data: null, status: 500});
    const {metrics, average} = await weatherMetricsClient.getWeatherMetrics({from: '2020-01-01', to: '2020-01-02'});
    expect(metrics).toEqual({});
    expect(average).toEqual({});
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith('http://localhost:3000/api/v1/weather-metrics',
        {params: {from: '2020-01-01', to: '2020-01-02'}});
  });

  test('should return metrics and average when api response is 200', async () => {
    const mockedMetrics = {
      temperature: [{timestamp: '2020-01-01', name: 'temperature', value: 10}],
      windSpeed: [{timestamp: '2020-01-01', name: 'windSpeed', value: 10}],
      precipitation: [{timestamp: '2020-01-01', name: 'precipitation', value: 10}],
    };
    const mockedAverage = {temperature: 10, windSpeed: 10, precipitation: 10};
    httpClientMock.get.mockReturnValue({data: {metrics: mockedMetrics, average: mockedAverage}, status: 200});
    const {metrics, average} = await weatherMetricsClient.getWeatherMetrics({from: '2020-01-01', to: '2020-01-02'});
    expect(metrics.temperature[0].timestamp).toEqual(mockedMetrics.temperature[0].timestamp);
    expect(metrics.temperature[0].type).toEqual(mockedMetrics.temperature[0].name);
    expect(metrics.temperature[0].value).toEqual(mockedMetrics.temperature[0].value);
    expect(average.temperature).toEqual(mockedAverage.temperature);
    expect(average.windSpeed).toEqual(mockedAverage.windSpeed);
    expect(average.precipitation).toEqual(mockedAverage.precipitation);
    expect(httpClientMock.get).toHaveBeenCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith('http://localhost:3000/api/v1/weather-metrics',
        {params: {from: '2020-01-01', to: '2020-01-02'}});
  });
});
