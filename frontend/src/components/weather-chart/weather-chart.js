import {Box} from '@mui/material';
import {LineChart} from '@mui/x-charts';

const WeatherChart = ({metrics}) => {
  const realData = metrics.map((metric) => ({
    time: new Date(metric.timestamp),
    temperature: metric.value,
  }));

  const keyToLabel = {
    temperature: 'Temperature',
  };

  const xConfig = {
    dataKey: 'time',
  };

  const yConfig = {
    dataKey: 'temperature',
    valueFormatter: (value) => `${value}°`,
  }

  const series = Object.keys(keyToLabel).map((key) => ({
    dataKey: key,
    label: keyToLabel[key],
    valueFormatter: (value) => `${value}°`,
    area: true,
  }));

  return(
    <Box mt={25}>
      <LineChart
          xAxis={[{scaleType: 'utc', ...xConfig}]}
          yAxis={[{scaleType: 'linear', ...yConfig}]}
          series={series}
          height={400}
          dataset={realData}
      />
    </Box>
  )
}

export default WeatherChart;
