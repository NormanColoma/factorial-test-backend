import WeatherMetric from './weather-metric';

describe('Weather metric', () => {
  const timestamp = new Date().getTime();
  const value = 1;
  const type = 'temperature';

  test('should create a metric', () => {
    const metric = new WeatherMetric({timestamp, value, type});
    expect(metric.timestamp).toBe(timestamp);
    expect(metric.value).toBe(value);
    expect(metric.type).toBe(type);
  });

  test('should display temperature metric', () => {
    const metric = new WeatherMetric({timestamp, value, type: 'temperature'});
    expect(WeatherMetric.displayMetric(metric.value, metric.type)).toBe('1°');
  });

  test('should display wind speed metric', () => {
    const metric = new WeatherMetric({timestamp, value, type: 'wind_speed'});
    expect(WeatherMetric.displayMetric(metric.value, metric.type)).toBe('1 km/h');
  });

  test('should display precipitation metric', () => {
    const metric = new WeatherMetric({timestamp, value, type: 'precipitation'});
    expect(WeatherMetric.displayMetric(metric.value, metric.type)).toBe('1 %');
  });
});
