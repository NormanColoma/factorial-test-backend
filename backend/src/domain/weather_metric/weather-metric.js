const AggregateRoot = require('../common/aggregate-root');
const WeatherMetricCreatedEvent = require('./weather-metric-created-event');
const {isNull, isUUID, isString, isNumber} = require('../common/helpers');
const InvalidWeatherMetricError = require('./invalid-weather-metric-error');
const {isValidMetricName, weatherMetricTypes} = require('./waether-metric-types');

class WeatherMetric extends AggregateRoot {
  #id;
  #name;
  #timestamp;
  #value;
  #createdAt;
  constructor({id, name, timestamp, value, createdAt = new Date()}) {
    super();
    this.#_id = id;
    this.#_name = name;
    this.#_timestamp= timestamp;
    this.#_value = value;
    this.#_createdAt = createdAt;
  }

  static create({id, name, timestamp, value, createdAt}) {
    const weatherMetric = new WeatherMetric({id, name, timestamp, value, createdAt});
    weatherMetric.addEvent(new WeatherMetricCreatedEvent(weatherMetric));
    return weatherMetric;
  }

  static build({id, name, timestamp, value, createdAt}) {
    return new WeatherMetric({id, name, timestamp, value, createdAt});
  }

  get id() {
    return this.#id;
  }

  set #_id(id) {
    if (isNull(id)) {
      throw new InvalidWeatherMetricError('Field id cannot be blank');
    } else if (!isUUID(id)) {
      throw new InvalidWeatherMetricError('Field id must be a valid UUID');
    }
    this.#id = id;
  }

  get name() {
    return this.#name;
  }

  set #_name(name) {
    if (isNull(name)) {
      throw new InvalidWeatherMetricError('Field name cannot be blank');
    } else if (!isString(name)) {
      throw new InvalidWeatherMetricError('Field name must be a valid string');
    } else if (!isValidMetricName(name)) {
      throw new InvalidWeatherMetricError('Field name must be a valid weather metric type ' +
          '(temperature, wind_speed, precipitation)');
    }
    this.#name = name;
  }

  get timestamp() {
    return this.#timestamp;
  }

  set #_timestamp(timestamp) {
    if (isNull(timestamp)) {
      throw new InvalidWeatherMetricError('Field timestamp cannot be blank');
    } else if (isNaN(Date.parse(timestamp))) {
      throw new InvalidWeatherMetricError('Field timestamp must be a valid date');
    }
    this.#timestamp = new Date(timestamp);
  }

  get value() {
    return this.#value;
  }

  set #_value(value) {
    if (isNull(value)) {
      throw new InvalidWeatherMetricError('Field value cannot be blank');
    } else if (!isNumber(value)) {
      throw new InvalidWeatherMetricError('Field value must be a valid number');
    }
    switch (this.name) {
      case weatherMetricTypes.WIND_SPEED:
        if (value < 0) {
          throw new InvalidWeatherMetricError('Field value must be greater than or equal to 0 for wind speed');
        }
        break;
      case weatherMetricTypes.PRECIPITATION:
        if (value < 0 || value > 100) {
          throw new InvalidWeatherMetricError('Field value must be between 0 and 100 for precipitation');
        }
    }
    this.#value = value;
  }

  get createdAt() {
    return this.#createdAt;
  }

  set #_createdAt(createdAt) {
    this.#createdAt = createdAt;
  }

  get timestampInMilliseconds() {
    return this.timestamp.getTime();
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      timestamp: this.timestamp,
      value: this.value,
      createdAt: this.createdAt,
    };
  }
}

module.exports = WeatherMetric;
