const DomainEvent = require('../common/bus/event/domain-event');

class WeatherMetricCreatedEvent extends DomainEvent {
  constructor(domainEntity) {
    super({
      topic: 'metrics',
      name: 'weather-metric-created',
      domainEntity: domainEntity.toObject(),
      entityId: domainEntity.id,
      entityName: domainEntity.constructor.name,
    });
  }
}

module.exports = WeatherMetricCreatedEvent;
