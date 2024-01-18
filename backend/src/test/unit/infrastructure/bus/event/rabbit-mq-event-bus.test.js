const RabbitMqEventBus = require(
    '../../../../../infrastructure/bus/event/rabbit-mq-event-bus');

describe('RabbitMQ Event Bus', () => {
  const rabbitMqHandlerMock = {
    getInstance: jest.fn(),
  };
  const loggerMock = {
    info: jest.fn(),
  };
  const rabbitMqEventBus = new RabbitMqEventBus({rabbitMqHandler: rabbitMqHandlerMock, logger: loggerMock});

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should publish events', async () => {
    const channelMock = {
      publish: jest.fn(),
    };
    rabbitMqHandlerMock.getInstance.mockResolvedValue(channelMock);
    const events = [
      {
        topic: 'topic',
        name: 'name',
        payload: 'payload',
      },
    ];

    await rabbitMqEventBus.publish(events);

    expect(rabbitMqHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(channelMock.publish).toHaveBeenCalledTimes(1);
    expect(channelMock.publish).toHaveBeenCalledWith('topic', 'name', Buffer.from(JSON.stringify(events[0])));
    expect(loggerMock.info).toHaveBeenCalledTimes(0);
  });

  test('should log error when publishing events', async () => {
    rabbitMqHandlerMock.getInstance.mockRejectedValue(new Error('error'));
    const events = [
      {
        topic: 'topic',
        name: 'name',
        payload: 'payload',
      },
    ];

    await rabbitMqEventBus.publish(events);

    expect(rabbitMqHandlerMock.getInstance).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith('Error publishing events to RabbitMQ: Error: error');
  });
});
