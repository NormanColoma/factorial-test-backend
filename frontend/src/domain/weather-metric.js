class WeatherMetric {
  #timestamp;
  #type;
  #value;

  constructor({timestamp, type, value}) {
    this.#timestamp = timestamp;
    this.#type = type;
    this.#value = value;
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
