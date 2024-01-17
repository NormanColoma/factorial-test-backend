import weatherMetricTypes from './metric-types';

class WeatherAverage {
  #temperature;
  #windSpeed;
  #precipitation;

  constructor({temperature, windSpeed, precipitation}) {
    this.#temperature = temperature;
    this.#windSpeed = windSpeed;
    this.#precipitation = precipitation;
  }

  get temperature() {
    return this.#temperature;
  }

  get windSpeed() {
    return this.#windSpeed;
  }

  get precipitation() {
    return this.#precipitation;
  }

  displayAverage(type) {
    switch (type) {
      case weatherMetricTypes.TEMPERATURE:
        return `Average was ${this.temperature}°C`;
      case weatherMetricTypes.WIND_SPEED:
        return `Average was ${this.windSpeed} Km/h`;
      case weatherMetricTypes.PRECIPITATION:
        return `Average was ${this.precipitation} %`;
      default:
        return '';
    }
  }
}

export default WeatherAverage;
