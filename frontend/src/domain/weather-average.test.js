import WeatherAverage from './weather-average';

describe('Weather average', () => {
  const temperature = 10;
  const windSpeed = 20;
  const precipitation = 30;

  test('should create a weather average', () => {
    const weatherAverage = new WeatherAverage({temperature, windSpeed, precipitation});
    expect(weatherAverage.temperature).toBe(10);
    expect(weatherAverage.windSpeed).toBe(20);
    expect(weatherAverage.precipitation).toBe(30);
  });

  test('should display temperature', () => {
    const weatherAverage = new WeatherAverage({temperature, windSpeed, precipitation});
    expect(weatherAverage.displayAverage('temperature')).toBe('Average was 10°C');
  });

  test('should display wind speed', () => {
    const weatherAverage = new WeatherAverage({temperature, windSpeed, precipitation});
    expect(weatherAverage.displayAverage('wind_speed')).toBe('Average was 20 Km/h');
  });

  test('should display precipitation', () => {
    const weatherAverage = new WeatherAverage({temperature, windSpeed, precipitation});
    expect(weatherAverage.displayAverage('precipitation')).toBe('Average was 30 %');
  });
});
