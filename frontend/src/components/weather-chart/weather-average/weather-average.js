import {Typography} from '@mui/material';

const WeatherAverage = ({average, type}) => {
  if (!average) {
    return;
  }
  const message = average.displayAverage(type);
  return(<Typography>
    {message}
  </Typography>)
}

export default WeatherAverage;
