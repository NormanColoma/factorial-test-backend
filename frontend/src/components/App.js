import './App.css';
import {
  Box,
  Container,
} from '@mui/material';
import AppBar from './app-bar/app-bar';
import WeatherTimeline from '../containers/weather-timeline';

function App() {
  return (
    <div className="App">
      <AppBar></AppBar>
      <Container>
        <Box mt={15}>
          <WeatherTimeline></WeatherTimeline>
        </Box>
      </Container>
    </div>
  );
}

export default App;
