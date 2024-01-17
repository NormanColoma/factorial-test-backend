import WeatherChart from '../components/weather-chart/weather-chart';
import {useEffect, useReducer} from 'react';
import {weatherMetricsReducer, initialWeatherMetricsState} from '../reducers';
import {fetchWeatherMetrics} from '../actions/async';
import weatherMetricTypes from '../domain/metric-types';

const WeatherTimeline = () => {
  const [state, dispatch] = useReducer(weatherMetricsReducer, initialWeatherMetricsState);
  useEffect(() => {
    fetchWeatherMetrics(dispatch);
  }, []);

  const {metrics} = state;

  return(
    <div>
      <WeatherChart metrics={metrics.temperature} type={weatherMetricTypes.TEMPERATURE} />
      <WeatherChart metrics={metrics.precipitation} type={weatherMetricTypes.PRECIPITATION} />
      <WeatherChart metrics={metrics.windSpeed} type={weatherMetricTypes.WIND_SPEED} />
    </div>
  )
}

export default WeatherTimeline;
