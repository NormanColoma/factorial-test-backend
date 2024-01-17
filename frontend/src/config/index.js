const config = {
  api: {
    weatherMetricsApiUrl: process.env.REACT_APP_WEATHER_METRICS_API_URL || 'http://localhost:3000/api/v1/weather-metrics',
  }
}

export default config;
