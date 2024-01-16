const AggregateRoot = require('../../../../src/domain/common/aggregate-root');

describe('Aggregate Root Entity', () => {
  const Clazz = class Clazz extends AggregateRoot {};
  let clazzInstance = null;
  beforeEach(() => clazzInstance = new Clazz());

  test('Should add event', () => {
    const event = {test: 'test'};

    clazzInstance.addEvent(event);

    expect(clazzInstance.events.length).toEqual(1);
  });

  test('Should clear events', () => {
    const event = {test: 'test'};

    clazzInstance.addEvent(event);
    expect(clazzInstance.events.length).toEqual(1);
    clazzInstance.clearEvents();
    expect(clazzInstance.events.length).toEqual(0);
  });

  test('Should get and clear events at once', () => {
    const event = {test: 'test'};

    clazzInstance.addEvent(event);
    expect(clazzInstance.events.length).toEqual(1);
    expect(clazzInstance.getEvents()).toEqual([event]);
    expect(clazzInstance.events.length).toEqual(0);
  });
});
