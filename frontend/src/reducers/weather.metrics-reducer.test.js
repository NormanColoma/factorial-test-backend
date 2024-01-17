import weatherMetricsReducer from './weather-metrics-reducer';
import {SET_WEATHER_METRICS} from '../actions/types';

describe('Weather Metrics Reducer', () => {
  test('should set metrics', () => {
    const metrics = [{type: 'temperature'}];
    const action = {type: SET_WEATHER_METRICS, payload: {metrics, average: 1}};
    const state = {metrics: []};
    const newState = weatherMetricsReducer(state, action);
    expect(newState.metrics).toEqual(metrics);
  });

  test('should return default state', () => {
    const action = {type: 'UNKNOWN'};
    const state = {metrics: []};
    const newState = weatherMetricsReducer(state, action);
    expect(newState).toEqual(state);
  });
});
