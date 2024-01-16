const {CREATED, OK, UNPROCESSABLE_ENTITY} = require('./http-status-code');
const createWeatherMetricCommandBuilder = require(
    '../../application/create-weather-metric/create-weather-metric-command');
const container = require('../../container');
const {isRequestValid} = require('./middleware/rest-validator');
const {body} = require('express-validator');
const InvalidWeatherMetricError = require(
    '../../domain/weather_metric/invalid-weather-metric-error');
// eslint-disable-next-line new-cap
const router = require('express').Router();


router.post('/', [body('name').isString(), body('value').notEmpty(), body('timestamp').isISO8601().toDate()],
    isRequestValid, async (req, res, next) => {
      try {
        const {name, value, timestamp} = req.body;

        const createWeatherMetric = container.resolve('createWeatherMetric');
        const command = createWeatherMetricCommandBuilder({name, value, timestamp});
        const response = await createWeatherMetric.create(command);
        res.status(CREATED).json(response);
      } catch (err) {
        if (err instanceof InvalidWeatherMetricError) {
          const error = {
            error: {
              message: err.message,
            },
          };
          res.status(UNPROCESSABLE_ENTITY).json(error);
        }
        next(err);
      }
    });

router.get('/', async (req, res, next) => {
  try {
    const {from, to} = req.query;
    const getWeatherMetrics = container.resolve('getWeatherMetrics');
    const response = await getWeatherMetrics.get({from, to});
    res.status(OK).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
