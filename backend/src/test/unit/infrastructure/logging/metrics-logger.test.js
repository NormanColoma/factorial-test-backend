const metricsLoggerTest = require('../../../../infrastructure/logging/metrics-logger');

describe('metrics logger service', () => {
  let write;
  const loggerMock = {
    info: jest.fn(),
  };
  beforeEach(() => {
    write = metricsLoggerTest({logger: loggerMock}).write;
    loggerMock.info.mockRestore();
  });
  test('should log metrics', () => {
    write('HTTP POST /search');

    expect(loggerMock.info.mock.calls.length).toBe(1);
    expect(loggerMock.info.mock.calls[0][0]).toBe('HTTP POST /search');
  });
});
