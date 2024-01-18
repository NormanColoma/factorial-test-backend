const NewRelicMetricPublisher = require(
    '../../../../infrastructure/observability/new-relic-metric-publisher');

describe('New Relic Metric Publisher', () => {
  const newRelicClientMock = {
    recordMetric: jest.fn(),
  };
  let metricPublisher;

  beforeEach(() => {
    metricPublisher = new NewRelicMetricPublisher({newRelicClient: newRelicClientMock});
  });

  test('Should publish metric', () => {
    const metricName = 'metricName';
    const metricValue = 1;

    metricPublisher.publishMetric(metricName, metricValue);

    expect(newRelicClientMock.recordMetric).toHaveBeenCalledTimes(1);
    expect(newRelicClientMock.recordMetric).toHaveBeenCalledWith(metricName, metricValue);
  });
});

