import WeatherChart from '../components/weather-chart/weather-chart';
import {useEffect, useReducer, useState} from 'react';
import {weatherMetricsReducer, initialWeatherMetricsState} from '../reducers';
import {fetchWeatherMetrics} from '../actions/async';
import weatherMetricTypes from '../domain/metric-types';
import {DateTimePicker} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import {Button} from '@mui/material';

const WeatherTimeline = () => {
  const [state, dispatch] = useReducer(weatherMetricsReducer, initialWeatherMetricsState);
  const [fromValue, setFromValue] = useState(dayjs());
  const [toValue, setToValue] = useState(dayjs().hour(23).minute(59).second(59).millisecond(999));

  useEffect(() => {
    fetchWeatherMetrics(dispatch, {from: fromValue.valueOf(), to: toValue.valueOf()});
  }, []);

  const {metrics, average} = state;
  const handleOnClick = () => {
    fetchWeatherMetrics(dispatch, {from: fromValue.valueOf(), to: toValue.valueOf()});
  }
  return(
    <div>
      <div>
        <DateTimePicker
            label="From"
            onChange={(value) => setFromValue(value)}
            value={fromValue}
            format="YYYY/MM/DD HH:mm:ss"
            inputFormat="YYYY/MM/DD HH:mm:ss"
        />
        <DateTimePicker
            label="To"
            onChange={(value) => setToValue(value)}
            value={toValue}
            format="YYYY/MM/DD HH:mm:ss"
            inputFormat="YYYY/MM/DD HH:mm:ss"
        />
        <Button onClick={() => handleOnClick()}>
          Search
        </Button>
      </div>
      <div>
        <WeatherChart metrics={metrics.temperature} average={average} type={weatherMetricTypes.TEMPERATURE} />
        <WeatherChart metrics={metrics.precipitation} average={average} type={weatherMetricTypes.PRECIPITATION} />
        <WeatherChart metrics={metrics.windSpeed} average={average} type={weatherMetricTypes.WIND_SPEED} />
      </div>
    </div>
  )
}

export default WeatherTimeline;
