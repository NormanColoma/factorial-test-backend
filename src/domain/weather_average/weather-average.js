class WeatherAverage {
  #temperature;
  #windSpeed;
  #precipitation;

  constructor(temperature, windSpeed, precipitation) {
    this.#_temperature = temperature;
    this.#_windSpeed = windSpeed;
    this.#_precipitation = precipitation;
  }

  static build({temperature, windSpeed, precipitation}) {
    return new WeatherAverage(temperature, windSpeed, precipitation);
  }

  get temperature() {
    return this.#temperature;
  }

  set #_temperature(value) {
    this.#temperature = value;
  }

  get windSpeed() {
    return this.#windSpeed;
  }

  set #_windSpeed(value) {
    this.#windSpeed = value;
  }

  get precipitation() {
    return this.#precipitation;
  }

  set #_precipitation(value) {
    this.#precipitation = value;
  }

  toObject() {
    return {
      temperature: this.temperature,
      windSpeed: this.windSpeed,
      precipitation: this.precipitation,
    };
  }
}

module.exports = WeatherAverage;
