import {SET_WEATHER_METRICS} from '../actions/types';

const weatherMetricsReducer = (state, action) => {
  switch (action.type) {
    case SET_WEATHER_METRICS: {
      const {payload: metrics} = action;
      return {...state, metrics: metrics, loading: false};
    }
    default: {
      return state;
    }
  }
}

export default weatherMetricsReducer;
