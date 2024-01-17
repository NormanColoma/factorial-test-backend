import {render, screen} from '@testing-library/react';
import WeatherAverage from './weather-average';

test('should render weather-average component if given average is present', () => {
  render(<WeatherAverage average={{displayAverage: () => 'test'}} />)
  const weatherAverage = screen.getByText(/test/i)
  expect(weatherAverage).toBeInTheDocument();
});

test('should not render weather-average component if given average is not present', () => {
  render(<WeatherAverage />)
  const weatherAverage = screen.queryByText(/test/i)
  expect(weatherAverage).not.toBeInTheDocument();
});
