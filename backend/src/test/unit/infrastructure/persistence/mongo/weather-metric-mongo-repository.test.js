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
        replaceOne: jest.fn().mockResolvedValue(),
      }),
    });

    await weatherMetricMongoRepository.save(weatherMetric);
    expect(weatherMetricMongoParserMock.toDocument).
        toHaveBeenCalledWith(weatherMetric);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalled();
    expect(mongoDbHandlerMock.getInstance().collection).toHaveBeenCalledWith(
        'metrics');
    expect(mongoDbHandlerMock.getInstance().collection().replaceOne).
        toHaveBeenCalledWith({_id: weatherMetricDocument._id},
            weatherMetricDocument, {upsert: true});
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
          sort: jest.fn().mockReturnThis(),
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
    expect(mongoDbHandlerMock.getInstance().collection().find().sort).
        toHaveBeenCalledWith({timestamp: 1});
    expect(mongoDbHandlerMock.getInstance().collection().find().toArray).
        toHaveBeenCalled();
    expect(result).toEqual([weatherMetricDomainMock]);
  });

  test('should find a weather metric', async () => {
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
        findOne: jest.fn().mockResolvedValue(weatherMetricDocument),
      }),
    });

    const result = await weatherMetricMongoRepository.find({
      timestamp: date,
      name: 'temperature',
    });
    expect(weatherMetricMongoParserMock.toDomain).
        toHaveBeenCalledWith(weatherMetricDocument);
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalled();
    expect(mongoDbHandlerMock.getInstance().collection).toHaveBeenCalledWith(
        'metrics');
    expect(mongoDbHandlerMock.getInstance().collection().findOne).
        toHaveBeenCalledWith({
          timestamp: date,
          name: 'temperature',
        });
    expect(result).toEqual(weatherMetricDomainMock);
  });

  test('should return null when no weather metric is found', async () => {
    mongoDbHandlerMock.getInstance.mockReturnValue({
      collection: jest.fn().mockReturnValue({
        findOne: jest.fn().mockResolvedValue(null),
      }),
    });

    const result = await weatherMetricMongoRepository.find({
      timestamp: new Date(),
      name: 'temperature',
    });
    expect(mongoDbHandlerMock.getInstance).toHaveBeenCalled();
    expect(mongoDbHandlerMock.getInstance().collection).toHaveBeenCalledWith(
        'metrics');
    expect(mongoDbHandlerMock.getInstance().collection().findOne).
        toHaveBeenCalledWith({
          timestamp: expect.any(Date),
          name: 'temperature',
        });
    expect(result).toEqual(null);
  });
});
