const supertest = require('supertest');
const {server, app} = require('../../../..');
const request = supertest(app);
const container = require('../../../../container');
const awilix = require('awilix');
const {BAD_REQUEST, CREATED, SERVER_ERROR, UNPROCESSABLE_ENTITY} = require('../../../../infrastructure/rest/http-status-code');
const InvalidWeatherMetricError = require(
    '../../../../domain/weather_metric/invalid-weather-metric-error');

describe('Weather Metric Controller', () => {
  afterEach(async () => {
    await server.close();
    jest.resetAllMocks();
  });

  describe('POST Create Weather Metric', () => {
    const createWeatherMetric = {
      create: jest.fn(),
    };
    const idGeneratorMock = {
      generate: jest.fn(),
    };

    container.register({
      createWeatherMetric: awilix.asValue(createWeatherMetric),
      idGenerator: awilix.asValue(idGeneratorMock),
    });

    test('should return 400 when name param is missing', async () => {
      idGeneratorMock.generate.mockReturnValue('fakeCode');
      const res = await request.post('/api/v1/weather-metrics').send();
      const {status, body, headers} = res;
      const expectedError = {
        error: {
          message: 'Field \'name\' cannot be blank',
          code: 'fakeCode',
        },
      };

      expect(status).toBe(BAD_REQUEST);
      expect(body).toEqual(expectedError);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 400 when value param is missing', async () => {
      idGeneratorMock.generate.mockReturnValue('fakeCode');
      const res = await request.post('/api/v1/weather-metrics')
          .send({name: 'fakeName'});
      const {status, body, headers} = res;
      const expectedError = {
        error: {
          message: 'Field \'value\' cannot be blank',
          code: 'fakeCode',
        },
      };

      expect(status).toBe(BAD_REQUEST);
      expect(body).toEqual(expectedError);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 400 when timestamp param is missing', async () => {
      idGeneratorMock.generate.mockReturnValue('fakeCode');
      const res = await request.post('/api/v1/weather-metrics')
          .send({name: 'fakeName', value: 1});
      const {status, body, headers} = res;
      const expectedError = {
        error: {
          message: 'Field \'timestamp\' cannot be blank',
          code: 'fakeCode',
        },
      };

      expect(status).toBe(BAD_REQUEST);
      expect(body).toEqual(expectedError);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 400 when name param is not a string', async () => {
      idGeneratorMock.generate.mockReturnValue('fakeCode');
      const res = await request.post('/api/v1/weather-metrics')
          .send({name: 1, value: 1, timestamp: new Date()});
      const {status, body, headers} = res;
      const expectedError = {
        error: {
          message: 'Provided value \'name\' has no correct format for field',
          code: 'fakeCode',
        },
      };

      expect(status).toBe(BAD_REQUEST);
      expect(body).toEqual(expectedError);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 400 when timestamp param is not a date', async () => {
      idGeneratorMock.generate.mockReturnValue('fakeCode');
      const res = await request.post('/api/v1/weather-metrics')
          .send({name: 'fakeName', value: 1, timestamp: 'not valid date'});
      const {status, body, headers} = res;
      const expectedError = {
        error: {
          message: 'Provided value \'timestamp\' has no correct format for field',
          code: 'fakeCode',
        },
      };

      expect(status).toBe(BAD_REQUEST);
      expect(body).toEqual(expectedError);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 422 when InvalidWeatherMetricError is thrown', async () => {
      idGeneratorMock.generate.mockReturnValue('fakeCode');
      createWeatherMetric.create.mockRejectedValue(new InvalidWeatherMetricError('fakeError'));
      const res = await request.post('/api/v1/weather-metrics')
          .send({name: 'fakeName', value: 1, timestamp: new Date()});
      const {status, body, headers} = res;
      const expectedError = {
        error: {
          message: 'fakeError',
        },
      };

      expect(status).toBe(UNPROCESSABLE_ENTITY);
      expect(body).toEqual(expectedError);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 201 when weather metric is created', async () => {
      idGeneratorMock.generate.mockReturnValue('fakeCode');
      const res = await request.post('/api/v1/weather-metrics')
          .send({name: 'fakeName', value: 1, timestamp: new Date()});
      const {status, headers} = res;

      expect(status).toBe(CREATED);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 500 when error is thrown', async () => {
      idGeneratorMock.generate.mockReturnValue('fakeCode');
      createWeatherMetric.create.mockRejectedValue(new Error('fakeError'));
      const res = await request.post('/api/v1/weather-metrics')
          .send({name: 'fakeName', value: 1, timestamp: new Date()});
      const {status, headers} = res;

      expect(status).toBe(SERVER_ERROR);
      expect(headers['content-type']).toContain('application/json');
    });
  });
});
