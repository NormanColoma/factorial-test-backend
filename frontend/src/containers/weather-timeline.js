import WeatherList from '../components/weather-list/weather-list';
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
      <WeatherList metrics={metrics}>

      </WeatherList>
    </div>
  )
}

export default WeatherTimeline;
