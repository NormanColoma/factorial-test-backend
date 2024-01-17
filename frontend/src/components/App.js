import './App.css';
import {
  Box,
  Container,
} from '@mui/material';
import AppBar from './app-bar/app-bar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import WeatherTimeline from '../containers/weather-timeline';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppBar></AppBar>
        <Container>
          <Box mt={2}>
            <WeatherTimeline></WeatherTimeline>
          </Box>
        </Container>
      </LocalizationProvider>
    </div>
  );
}

export default App;
