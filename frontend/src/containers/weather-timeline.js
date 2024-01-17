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

  const {metrics, average} = state;

  return(
    <div>
      <WeatherChart metrics={metrics.temperature} average={average} type={weatherMetricTypes.TEMPERATURE} />
      <WeatherChart metrics={metrics.precipitation} average={average} type={weatherMetricTypes.PRECIPITATION} />
      <WeatherChart metrics={metrics.windSpeed} average={average} type={weatherMetricTypes.WIND_SPEED} />
    </div>
  )
}

export default WeatherTimeline;
