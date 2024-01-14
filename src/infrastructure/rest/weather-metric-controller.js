const {CREATED} = require('./http-status-code');
const createWeatherMetricCommandBuilder = require(
    '../../application/create-weather-metric/create-weather-metric-command');
const container = require('../../container');
// eslint-disable-next-line new-cap
const router = require('express').Router();


router.post('/', async (req, res, next) => {
  try {
    const {name, value, timestamp} = req.body;

    const createWeatherMetric = container.resolve('createWeatherMetric');
    const command = createWeatherMetricCommandBuilder({name, value, timestamp});
    const response = await createWeatherMetric.create(command);
    res.status(CREATED).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
