const DomainEvent = require('../../../../../../domain/common/bus/event/domain-event');
describe('Domain Event', () => {
  const {v4: uuidv4} = require('uuid');

  test('Should throw error when try to instantiate directly', () => {
    expect(() => new DomainEvent({})).toThrowError(TypeError);
  });

  test('Should create a new instance', () => {
    const topic = 'topic';
    const name = 'name';
    const domainEntity = 'domainEntity';
    const entityId = uuidv4();
    const entityName = 'entityName';
    const data = {test: 'test'};

    const domainEvent = new (class extends DomainEvent {})({
      topic,
      name,
      domainEntity,
      entityId,
      entityName,
      data,
    });

    expect(domainEvent.id).toBeTruthy();
    expect(domainEvent.createdAt).toBeTruthy();
    expect(domainEvent.topic).toEqual(topic);
    expect(domainEvent.name).toEqual(name);
    expect(domainEvent.domainEntity).toEqual(domainEntity);
    expect(domainEvent.entityId).toEqual(entityId);
    expect(domainEvent.entityName).toEqual(entityName);
    expect(domainEvent.data).toEqual(data);
  });

  test('Should throw error when topic is not provided', () => {
    expect(() => new (class extends DomainEvent {})({
      name: 'name',
      domainEntity: 'domainEntity',
      entityId: uuidv4(),
      entityName: 'entityName',
      data: {test: 'test'},
    })).toThrowError(Error);
  });

  test('Should throw error when name is not provided', () => {
    expect(() => new (class extends DomainEvent {})({
      topic: 'topic',
      domainEntity: 'domainEntity',
      entityId: uuidv4(),
      entityName: 'entityName',
      data: {test: 'test'},
    })).toThrowError(Error);
  });
});
