import WeatherChart from '../components/weather-chart/weather-chart';
import {useEffect, useReducer, useState} from 'react';
import {weatherMetricsReducer, initialWeatherMetricsState} from '../reducers';
import {fetchWeatherMetrics} from '../actions/async';
import weatherMetricTypes from '../domain/metric-types';
import {DateTimePicker} from '@mui/x-date-pickers';
import {Button} from '@mui/material';
import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)


const WeatherTimeline = () => {
  const [state, dispatch] = useReducer(weatherMetricsReducer, initialWeatherMetricsState);
  const [fromValue, setFromValue] = useState(dayjs());
  const [toValue, setToValue] = useState(dayjs().hour(23).minute(59).second(59).millisecond(999));
  const [chartFormat, setChartFormat] = useState('time');

  useEffect(() => {
    const from = fromValue.utc().format();
    const to = toValue.utc().format();
    fetchWeatherMetrics(dispatch, {from, to});
  }, []);

  const {metrics, average} = state;
  const handleOnClick = () => {
    setChartFormat(toValue.diff(fromValue, 'day') > 0 ? 'utc' : 'time');
    const from = fromValue.utc().format();
    const to = toValue.utc().format();
    fetchWeatherMetrics(dispatch, {from, to});
  }
  return(
    <div>
      <div>
        <DateTimePicker
            label="From"
            onChange={(value) => setFromValue(value)}
            value={fromValue}
        />
        <DateTimePicker
            label="To"
            onChange={(value) => setToValue(value)}
            value={toValue}
        />
        <Button onClick={() => handleOnClick()}>
          Search
        </Button>
      </div>
      <div>
        <WeatherChart metrics={metrics.temperature} average={average} type={weatherMetricTypes.TEMPERATURE} scaleFormat={chartFormat} />
        <WeatherChart metrics={metrics.precipitation} average={average} type={weatherMetricTypes.PRECIPITATION} scaleFormat={chartFormat} />
        <WeatherChart metrics={metrics.windSpeed} average={average} type={weatherMetricTypes.WIND_SPEED} scaleFormat={chartFormat}/>
      </div>
    </div>
  )
}

export default WeatherTimeline;
