const WeatherMetric = require(
    '../../../../domain/weather_metric/weather-metric');
const InvalidWeatherMetricError = require(
    '../../../../domain/weather_metric/invalid-weather-metric-error');
const WeatherMetricCreatedEvent = require(
    '../../../../domain/weather_metric/weather-metric-created-event');
const {weatherMetricTypes} = require(
    '../../../../domain/weather_metric/waether-metric-types');

describe('Weather Metric Aggregate Root', () => {
  const name = weatherMetricTypes.TEMPERATURE;
  test('should throw error when id is not provided', () => {
    expect(() => WeatherMetric.build({name, timestamp: new Date(), value: 1})).
        toThrow(new InvalidWeatherMetricError('Field id cannot be blank'));
  });

  test('should throw error when id is not a valid UUID', () => {
    expect(() => WeatherMetric.build({id: 'invalid-id', name, timestamp: new Date(), value: 1})).
        toThrow(new InvalidWeatherMetricError('Field id must be a valid UUID'));
  });

  test('should throw error when name is not provided', () => {
    expect(() => WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', timestamp: new Date(), value: 1})).
        toThrow(new InvalidWeatherMetricError('Field name cannot be blank'));
  });

  test('should throw error when name is not a string', () => {
    expect(() => WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name: 1, timestamp: new Date(),
      value: 1})).toThrow(new InvalidWeatherMetricError('Field name must be a valid string'));
  });

  test('should throw error when timestamp is not provided', () => {
    expect(() => WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name, value: 1})).
        toThrow(new InvalidWeatherMetricError('Field timestamp cannot be blank'));
  });

  test('should throw error when timestamp is not a date', () => {
    expect(() => WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name, timestamp: 'timestamp',
      value: 1})).toThrow(new InvalidWeatherMetricError('Field timestamp must be a valid date'));
  });

  test('should throw error when value is not provided', () => {
    expect(() => WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name,
      timestamp: new Date()})).toThrow(new InvalidWeatherMetricError('Field value cannot be blank'));
  });

  test('should throw error when value is not a number', () => {
    expect(() => WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name,
      timestamp: new Date(), value: 'value'}))
        .toThrow(new InvalidWeatherMetricError('Field value must be a valid number'));
  });

  test('should throw error when name is not a valid weather metric type', () => {
    expect(() => WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name: 'invalid-name',
      timestamp: new Date(), value: 1}))
        .toThrow(new InvalidWeatherMetricError('Field name must be a valid weather metric type ' +
        '(temperature, wind_speed, precipitation)'));
  });

  test('should create a new Weather Metric', () => {
    const date = new Date();
    const weatherMetric = WeatherMetric.create({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name,
      timestamp: date, value: 1, date});

    expect(weatherMetric).toBeInstanceOf(WeatherMetric);
    expect(weatherMetric.toObject()).toEqual({
      id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9',
      name,
      timestamp: date,
      value: 1,
      createdAt: date,
    });
    expect(weatherMetric.getEvents()[0]).toBeInstanceOf(WeatherMetricCreatedEvent);
  });

  test('should build a new Weather Metric', () => {
    const date = new Date();
    const weatherMetric = WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name,
      timestamp: date, value: 1, date});

    expect(weatherMetric).toBeInstanceOf(WeatherMetric);
    expect(weatherMetric.toObject()).toEqual({
      id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9',
      name,
      timestamp: date,
      value: 1,
      createdAt: date,
    });
    expect(weatherMetric.getEvents()).toEqual([]);
  });

  test('should return timestamp in milliseconds', () => {
    const date = new Date();
    const weatherMetric = WeatherMetric.build({id: 'b3b6dfd5-f3b3-45b5-9fb9-23a9b75a13f9', name,
      timestamp: date, value: 1, date});

    expect(weatherMetric.timestampInMilliseconds).toEqual(date.getTime());
  });
});
