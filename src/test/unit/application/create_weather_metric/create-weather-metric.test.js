const CreateWeatherMetric = require('../../../../application/create-weather-metric');
const createWeatherMetricCommandBuilder = require('../../../../application/create-weather-metric/create-weather-metric-command');
const WeatherMetric = require('../../../../domain/weather_metric/weather-metric');
const WeatherMetricCreatedEvent = require('../../../../domain/weather_metric/weather-metric-created-event');

describe('Create weather metric application service', () => {
  const weatherMetricRepositoryMock = {
    save: jest.fn(),
  };
  const idGeneratorMock = {
    generate: jest.fn(),
  };
  const eventBusMock = {
    publish: jest.fn(),
  };
  let applicationService;
  const mockedDate = new Date();

  beforeEach(() => {
    applicationService = new CreateWeatherMetric({
      weatherMetricRepository: weatherMetricRepositoryMock,
      idGenerator: idGeneratorMock,
      eventBus: eventBusMock,
    });
    jest.useFakeTimers('modern');
    jest.setSystemTime(mockedDate);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  test('should create a weather metric and publish its events', async () => {
    const name = 'name';
    const timestamp = '2021-02-01T17:32:28Z';
    const value = 1.0;
    const id = 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9';
    idGeneratorMock.generate.mockReturnValue(id);

    const command = createWeatherMetricCommandBuilder({name, timestamp, value});
    await applicationService.create(command);

    const expectedWeatherMetric = WeatherMetric.create({id, name, timestamp, value});
    expect(weatherMetricRepositoryMock.save.mock.calls[0][0].toObject()).toEqual(expectedWeatherMetric.toObject());
    expect(idGeneratorMock.generate).toHaveBeenCalled();
    expect(eventBusMock.publish).toHaveBeenCalledTimes(1);
    expect(eventBusMock.publish.mock.calls[0][0][0]).toEqual(expect.any(WeatherMetricCreatedEvent));
    expect(eventBusMock.publish.mock.calls[0][0][0].name).toEqual('weather-metric-created');
    expect(eventBusMock.publish.mock.calls[0][0][0].topic).toEqual('fake-topic');
  });

  test('should throw error when error is thrown while creating weather metric', async () => {
    const timestamp = '2021-02-01T17:32:28Z';
    const value = 1.0;
    const id = 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9';
    idGeneratorMock.generate.mockReturnValue(id);

    const command = createWeatherMetricCommandBuilder({name: null, timestamp, value});
    await expect(applicationService.create(command)).rejects.toThrow();

    expect(idGeneratorMock.generate).toHaveBeenCalled();
    expect(eventBusMock.publish).not.toHaveBeenCalled();
    expect(weatherMetricRepositoryMock.save).not.toHaveBeenCalled();
  });
});
