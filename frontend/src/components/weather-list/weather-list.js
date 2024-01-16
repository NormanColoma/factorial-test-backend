import {List} from '@mui/material';
import WeatherMetric from './weather-metric/weather-metric';

const WeatherList = ({metrics}) => {
  const metricItems = metrics.map((metric, index) => {
    return(
      <WeatherMetric timestamp={metric.timestamp} value={metric.value} type={metric.type} key={index}>

      </WeatherMetric>
    )
  });

  return(
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {metricItems}
    </List>
  )
}

export default WeatherList;
