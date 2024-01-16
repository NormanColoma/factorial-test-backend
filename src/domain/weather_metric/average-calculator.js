class AverageCalculator {
  calculate(metrics) {
    return Math.round(metrics.reduce((acc, metric) => acc + metric.value, 0) / metrics.length);
  }
}

module.exports = AverageCalculator;
