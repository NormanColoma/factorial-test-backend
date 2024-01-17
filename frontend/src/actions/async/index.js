import {setWeatherMetrics} from '../index';
import container from '../../container';
export const fetchWeatherMetrics = async (dispatch, {from, to}) => {
  const WeatherMetricsClient = container.resolve('weatherMetricsClient');
  const {metrics, average} = await WeatherMetricsClient.getWeatherMetrics({from, to});
  dispatch(setWeatherMetrics({metrics, average}));
}
