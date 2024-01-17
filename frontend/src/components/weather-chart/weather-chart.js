import {Box} from '@mui/material';
import {LineChart} from '@mui/x-charts';
import weatherMetricTypes from '../../domain/metric-types';
import WeatherAverage from './weather-average/weather-average';

const WeatherChart = ({metrics = [], average, type}) => {
  if (!metrics.length) {
    return;
  }
  const data = metrics.map((metric) => ({
    time: new Date(metric.timestamp),
    value: metric.value,
  }));

  const keyToLabel = {};
  const yConfig = {
    dataKey: 'value',
  };
  switch (type) {
    case weatherMetricTypes.TEMPERATURE:
      keyToLabel.value = 'Temperature';
      yConfig.valueFormatter = (value) => metricFormatter(value, type);
      break;
    case weatherMetricTypes.WIND_SPEED:
      keyToLabel.value = 'Wind Speed';
      yConfig.valueFormatter = (value) => metricFormatter(value, type);
      break;
    case weatherMetricTypes.PRECIPITATION:
      keyToLabel.value = 'Precipitation';
      yConfig.valueFormatter = (value) => metricFormatter(value, type);
      break;
    default:
      break;
  }

  const xConfig = {
    dataKey: 'time',
  };

  const series = Object.keys(keyToLabel).map((key) => ({
    dataKey: key,
    label: keyToLabel[key],
    color: metricColor(type),
    valueFormatter: (value) => metricFormatter(value, type),
    area: true,
  }));

  return(
    <Box mt={25}>
      <Box>
        <WeatherAverage average={average} type={type} />
      </Box>
      <LineChart
          xAxis={[{scaleType: 'time', ...xConfig, hideTooltip: !metrics.length}]}
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

const metricFormatter = (value, type) => {
  switch (type) {
    case weatherMetricTypes.TEMPERATURE:
      return `${value}°`;
    case weatherMetricTypes.WIND_SPEED:
      return `${value} km/h`;
    case weatherMetricTypes.PRECIPITATION:
      return `${value} %`;
    default:
      return value;
  }
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
