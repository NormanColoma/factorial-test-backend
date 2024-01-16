const WeatherMetricMongoParser = require(
    '../../../../../infrastructure/persistence/mongo/weather-metric-mongo-parser');
const WeatherMetric = require(
    '../../../../../domain/weather_metric/weather-metric');
describe('WeatherMetricMongoParser', () => {
  const muuidMock = {
    from: jest.fn(),
  };

  let weatherMetricMongoParser;

  beforeEach(() => {
    jest.resetAllMocks();
    weatherMetricMongoParser = new WeatherMetricMongoParser({muuid: muuidMock});
  });

  test('should parse a weather metric document to a domain object', () => {
    const date = new Date();
    const weatherMetricDocument = {
      _id: '84a4cb7b-742d-478c-9a08-e008a321a2ef',
      timestamp: date,
      name: 'temperature',
      value: 1,
    };
    const weatherMetric = new WeatherMetric({
      id: '84a4cb7b-742d-478c-9a08-e008a321a2ef',
      timestamp: date,
      name: 'temperature',
      value: 1,
      createdAt: date,
    });

    muuidMock.from.mockReturnValue({toString: () => weatherMetric.id});
    const spy= jest.spyOn(WeatherMetric, 'build').mockReturnValue(weatherMetric);

    const result = weatherMetricMongoParser.toDomain(weatherMetricDocument);
    expect(result).toEqual(weatherMetric);
    expect(muuidMock.from).toHaveBeenCalledWith(weatherMetricDocument._id);
    expect(spy).toHaveBeenCalledWith({
      id: weatherMetric.id,
      ...weatherMetricDocument,
    });
  });

  test('should parse a weather metric domain object to a document', () => {
    const date = new Date();
    const weatherMetric = {
      id: '84a4cb7b-742d-478c-9a08-e008a321a2ef',
      timestamp: date,
      name: 'temperature',
      value: 1,
      createdAt: date,
    };
    const weatherMetricDocument = {
      _id: '84a4cb7b-742d-478c-9a08-e008a321a2ef',
      timestamp: date,
      name: 'temperature',
      value: 1,
      createdAt: date,
    };
    const weatherMetricDomainMock = {
      toObject: jest.fn(),
    };

    weatherMetricDomainMock.toObject.mockReturnValue(weatherMetric);
    muuidMock.from.mockReturnValue(weatherMetric.id);

    const result = weatherMetricMongoParser.toDocument(weatherMetricDomainMock);
    expect(result).toEqual(weatherMetricDocument);
    expect(muuidMock.from).toHaveBeenCalledWith(weatherMetric.id);
    expect(weatherMetricDomainMock.toObject).toHaveBeenCalled();
  });
});
