const {v4: uuidv4} = require('uuid');

class DomainEvent {
  constructor({topic, name, domainEntity, entityId, entityName, data}) {
    if (this.constructor === DomainEvent) {
      throw new TypeError('Abstract class Event cannot be instantiated directly.');
    }

    this.id = uuidv4();
    this.createdAt = new Date();

    if (!topic) {
      throw new Error('Event topic field is mandatory');
    }

    if (!name) {
      throw new Error('Event name field is mandatory');
    }

    this.topic = topic;
    this.name = name;
    this.domainEntity = domainEntity;
    this.entityId = entityId;
    this.entityName = entityName;
    this.data = data;
  }
}

module.exports = DomainEvent;
