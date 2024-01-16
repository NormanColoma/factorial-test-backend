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
    return new Date(this.#timestamp).toUTCString().replace('GMT', '');
  }

  get type() {
    return this.#type;
  }

  get value() {
    switch (this.#type) {
      case 'temperature':
        return `${this.#value}°C`;
      case 'windSpeed':
        return `${this.#value}km/h`;
      case 'precipitation':
        return `${this.#value}%`;
      default:
        return this.#value;
    }
  }
}

export default WeatherMetric;
