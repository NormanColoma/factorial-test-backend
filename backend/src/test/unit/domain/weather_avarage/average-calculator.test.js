const AverageCalculator = require(
    '../../../../domain/weather_average/average-calculator');

describe('AverageCalculator domain service', () => {
  let averageCalculator;
  beforeEach(() => {
    averageCalculator = new AverageCalculator();
  });
  it('should calculate average for all metric types', () => {
    const metrics = [
      {name: 'temperature', value: 10},
      {name: 'temperature', value: 20},
      {name: 'wind_speed', value: 10},
      {name: 'wind_speed', value: 20},
      {name: 'precipitation', value: 25},
      {name: 'precipitation', value: 5},
    ];
    const average = averageCalculator.calculate(metrics);

    expect(average.toObject()).toEqual({
      temperature: 15,
      windSpeed: 15,
      precipitation: 15,
    });
  });

  it('should return 0 for all metric types if no metrics are given', () => {
    const metrics = [];
    const average = averageCalculator.calculate(metrics);

    expect(average.toObject()).toEqual({
      temperature: 0,
      windSpeed: 0,
      precipitation: 0,
    });
  });
});
