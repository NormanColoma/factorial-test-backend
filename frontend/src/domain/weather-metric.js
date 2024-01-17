import weatherMetricTypes from './metric-types';

class WeatherMetric {
  #timestamp;
  #type;
  #value;

  constructor({timestamp, type, value}) {
    this.#timestamp = timestamp;
    this.#type = type;
    this.#value = value;
  }

  static displayMetric = (metricValue, type) => {
    switch (type) {
      case weatherMetricTypes.TEMPERATURE:
        return `${metricValue}°`;
      case weatherMetricTypes.WIND_SPEED:
        return `${metricValue} km/h`;
      case weatherMetricTypes.PRECIPITATION:
        return `${metricValue} %`;
      default:
        return metricValue;
    }
  }

  get timestamp() {
    return this.#timestamp;
  }

  get type() {
    return this.#type;
  }

  get value() {
    return this.#value;
  }

}

export default WeatherMetric;
