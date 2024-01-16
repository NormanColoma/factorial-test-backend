import {FETCH_WEATHER_METRICS, SET_WEATHER_METRICS} from './types';

export const fetchWeatherMetrics = (payload) => ({type: FETCH_WEATHER_METRICS, payload})
export const setWeatherMetrics = (payload) => ({type: SET_WEATHER_METRICS, payload})
