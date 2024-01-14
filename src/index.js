require('dotenv').config();
const container = require('./container');

if (process.env.NODE_ENV !== 'test') {
  const mongoDbHandler = container.resolve('mongoDbHandler');
  mongoDbHandler.getInstance();
  const errorPublisher = container.resolve('errorPublisher');
  errorPublisher.init();
}
const {server: {port}} = require('./infrastructure/config');

const express = require('express');
const app = express();
const metricsLogger = require('./infrastructure/logging/metrics-logger');
const morgan = require('morgan');
const cors = require('cors');
const logger = container.resolve('logger');
const errorHandler = require('./infrastructure/rest/middleware/error-handler');
const weatherMetricsRoutes = require('./infrastructure/rest/weather-metric-controller');

morgan.token('reqBody', (req) => JSON.stringify(req.body));
app.use(morgan(
    'HTTP :method :url :reqBody - [:date[clf]] [:status] - :response-time ms',
    {
      'stream': metricsLogger({logger}),
    }));
app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use('/api/v1/weather-metrics', weatherMetricsRoutes);
app.use(errorHandler);
app.get('*', function(req, res) {
  res.status(404).send();
});

const server = app.listen(port, () => logger.info(`App listening at http://localhost:${port}`));

module.exports = {app, server};

