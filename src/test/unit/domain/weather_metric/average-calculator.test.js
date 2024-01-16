const AverageCalculator = require(
    '../../../../domain/weather_metric/average-calculator');

describe('AverageCalculator domain service', () => {
  let averageCalculator;
  beforeEach(() => {
    averageCalculator = new AverageCalculator();
  });
  it('should return the average of the given metrics', () => {
    const metrics = [
      {value: 1},
      {value: 2},
      {value: 3},
    ];
    const average = averageCalculator.calculate(metrics);
    expect(average).toBe(2);
  });
});
