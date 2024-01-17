import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const WeatherIcon = ({type}) => {
  switch (type) {
    case 'temperature':
      return <DeviceThermostatIcon />;
    case 'wind_speed':
      return <AirIcon />;
    case 'precipitation':
      return <ThunderstormIcon />;
    default:
      return null;
  }
}

export default WeatherIcon;
