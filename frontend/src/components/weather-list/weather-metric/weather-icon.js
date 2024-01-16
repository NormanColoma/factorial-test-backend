import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import AirIcon from '@mui/icons-material/Air';

const WeatherIcon = ({type}) => {
  return type === 'temperature' ? <DeviceThermostatIcon /> : <AirIcon />;
}

export default WeatherIcon;
