import WeatherChart from '../components/weather-chart/weather-chart';
import {useEffect, useReducer} from 'react';
import {weatherMetricsReducer, initialWeatherMetricsState} from '../reducers';
import {fetchWeatherMetrics} from '../actions/async';

const WeatherTimeline = () => {
  const [state, dispatch] = useReducer(weatherMetricsReducer, initialWeatherMetricsState);
  useEffect(() => {
    fetchWeatherMetrics(dispatch);
  }, []);

  const {metrics, loading} = state;

  return(
    <div>
      <WeatherChart metrics={metrics}>

      </WeatherChart>
    </div>
  )
}

export default WeatherTimeline;
