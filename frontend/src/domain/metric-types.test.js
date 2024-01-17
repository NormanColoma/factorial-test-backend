import weatherMetricTypes from './metric-types';

describe('metrics types', () => {
  test('should return temperature metric type', () => {
    expect(weatherMetricTypes.TEMPERATURE).toBe('temperature');
  });

  test('should return wind speed metric type', () => {
    expect(weatherMetricTypes.WIND_SPEED).toBe('wind_speed');
  });

  test('should return precipitation metric type', () => {
    expect(weatherMetricTypes.PRECIPITATION).toBe('precipitation');
  });

  test('should return temperature metric type as string', () => {
    expect(weatherMetricTypes.toString(weatherMetricTypes.TEMPERATURE)).toBe('Temperature');
  });

  test('should return wind speed metric type as string', () => {
    expect(weatherMetricTypes.toString(weatherMetricTypes.WIND_SPEED)).toBe('Wind Speed');
  });

  test('should return precipitation metric type as string', () => {
    expect(weatherMetricTypes.toString(weatherMetricTypes.PRECIPITATION)).toBe('Precipitation');
  });
});
