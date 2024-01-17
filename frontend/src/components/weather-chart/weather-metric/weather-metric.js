import Avatar from '@mui/material/Avatar';
import WeatherIcon from './weather-icon';
const {ListItemAvatar, ListItemText, ListItem} = require('@mui/material');
const WeatherMetric = ({timestamp, type, value}) => {
  return(
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <WeatherIcon type={type} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={value} secondary={timestamp} />
    </ListItem>
  )
};

export default WeatherMetric;
