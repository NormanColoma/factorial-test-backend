const WeatherMetricMongoRepository = require('../../../../../infrastructure/persistence/mongo/weather-metric-mongo-repository');
describe('WeatherMetricMongoRepository', () => {
  const muuidMock = {
    from: jest.fn(),
  };

  let weatherMetricMongoRepository;
  let mongoDbHandlerMock;
  let weatherMetricMongoParserMock;

  beforeEach(() => {
    jest.resetAllMocks();
    mongoDbHandlerMock = {
      getInstance: jest.fn(),
    };
    weatherMetricMongoParserMock = {
      toDomain: jest.fn(),
      toDocument: jest.fn(),
    };
    weatherMetricMongoRepository = new WeatherMetricMongoRepository({
      mongoDbHandler: mongoDbHandlerMock,
      weatherMetricParser: weatherMetricMongoParserMock,
      muuid: muuidMock,
    });
  });

  test('should save a weather metric', async () => {
    const date = new Date();
    const weatherMetricDocument = {
      _id: '84a4cb7b-742d-478c-9a08-e008a321a2ef',
      timestamp: date,
      name: 'temperature',
      value: 1,
      createdAt: date,
    };
    const weatherMetric = {
      id: '84a4cb7b-742d-478c-9a08-e008a321a2ef',
      timestamp: date,
      name: 'temperature',
      value: 1,
      createdAt: date,
    };
    const weatherMetricDomainMock = {
      toObject: jest.fn(),
    };
    muuidMock.from.mockReturnValue({toString: () => weatherMetric.id});
    weatherMetricDomainMock.toObject.mockReturnValue(weatherMetric);
    weatherMetricMongoParserMock.toDocument.mockReturnValue(
        weatherMetricDocument);
    mongoDbHandlerMock.getInstance.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockResolvedValue(),
      }),
    });

    await weatherMetricMongoRepository.save(weatherMetric);
    expect(weatherMetricMongoParserMock.toDocument).
        toHaveBeenCalledWith(weatherMetric);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalled();
    expect(mongoDbHandlerMock.getInstance().collection).toHaveBeenCalledWith(
        'metrics');
    expect(mongoDbHandlerMock.getInstance().collection().insertOne).toHaveBeenCalledWith(
        weatherMetricDocument);
  });

  test('should find weather metrics between dates', async () => {
    const date = new Date();
    const weatherMetricDocument = {
      _id: '84a4cb7b-742d-478c-9a08-e008a321a2ef',
      timestamp: date,
      name: 'temperature',
      value: 1,
      createdAt: date,
    };
    const weatherMetric = {
      id: '84a4cb7b-742d-478c-9a08-e008a321a2ef',
      timestamp: date,
      name: 'temperature',
      value: 1,
      createdAt: date,
    };
    const weatherMetricDomainMock = {
      toObject: jest.fn(),
    };
    muuidMock.from.mockReturnValue({toString: () => weatherMetric.id});
    weatherMetricDomainMock.toObject.mockReturnValue(weatherMetric);
    weatherMetricMongoParserMock.toDomain.mockReturnValue(
        weatherMetricDomainMock);
    mongoDbHandlerMock.getInstance.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([weatherMetricDocument]),
        }),
      }),
    });

    const result = await weatherMetricMongoRepository.findBetweenDates({
      from: date,
      to: date,
    });
    expect(weatherMetricMongoParserMock.toDomain).
        toHaveBeenCalledWith(weatherMetricDocument);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalled();
    expect(mongoDbHandlerMock.getInstance().collection).toHaveBeenCalledWith(
        'metrics');
    expect(mongoDbHandlerMock.getInstance().collection().find).toHaveBeenCalledWith(
        {
          timestamp: {
            $gte: date,
            $lte: date,
          },
        });
    expect(mongoDbHandlerMock.getInstance().collection().find().toArray).
        toHaveBeenCalled();
    expect(result).toEqual([weatherMetricDomainMock]);
  });
});
