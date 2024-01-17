import {Box} from '@mui/material';
import {LineChart} from '@mui/x-charts';
import weatherMetricTypes from '../../domain/metric-types';
import WeatherAverage from './weather-average/weather-average';
import dayjs from 'dayjs';
import WeatherMetric from '../../domain/weather-metric';

const WeatherChart = ({metrics = [], average, type, scaleFormat}) => {
  if (!metrics.length) {
    return;
  }
  const data = metrics.map((metric) => ({
    time: dayjs(metric.timestamp),
    value: metric.value,
  }));

  const keyToLabel = {
    value: weatherMetricTypes.toString(type),
  };
  const yConfig = {
    dataKey: 'value',
    valueFormatter: (value) => WeatherMetric.displayMetric(value, type),
  };
  const xConfig = {
    dataKey: 'time',
    scaleType: scaleFormat,
  };

  const series = Object.keys(keyToLabel).map((key) => ({
    dataKey: key,
    label: keyToLabel[key],
    color: metricColor(type),
    valueFormatter: (value) => WeatherMetric.displayMetric(value, type),
    area: true,
  }));

  return(
    <Box mt={25}>
      <Box>
        <WeatherAverage average={average} type={type} />
      </Box>
      <LineChart
          xAxis={[{...xConfig}]}
          yAxis={[{scaleType: 'linear', ...yConfig}]}
          series={series}
          height={400}
          dataset={data}
          slotProps={{
            legend: {
              direction: 'column',
              position: { vertical: 'top', horizontal: 'right' },
              padding: 0,
            },
          }}
      />
    </Box>
  )
}

const metricColor = (type) => {
  switch (type) {
    case weatherMetricTypes.TEMPERATURE:
      return 'orange';
    case weatherMetricTypes.WIND_SPEED:
      return '#0000ff';
    case weatherMetricTypes.PRECIPITATION:
      return '#02B2AF';
    default:
      return '#000000';
  }
}

export default WeatherChart;
