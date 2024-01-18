const RabbitMqHandler = require(
    '../../../../../infrastructure/bus/event/rabbit-mq-handler');

describe('RabbitMQ Handler', () => {
  const rabbitMQClientMock = {
    connect: jest.fn(),
  };
  const rabbitMqHandler = new RabbitMqHandler({rabbitClient: rabbitMQClientMock});

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should get RabbitMQ instance', async () => {
    const channelMock = {
      assertExchange: jest.fn(),
    };
    const connectionMock = {
      createChannel: jest.fn().mockResolvedValue(channelMock),
    };
    rabbitMQClientMock.connect.mockResolvedValue(connectionMock);

    const instance = await rabbitMqHandler.getInstance();

    expect(rabbitMQClientMock.connect).toHaveBeenCalledTimes(1);
    expect(rabbitMQClientMock.connect).toHaveBeenCalledWith('rabbitmqUri');
    expect(connectionMock.createChannel).toHaveBeenCalledTimes(1);
    expect(channelMock.assertExchange).toHaveBeenCalledTimes(1);
    expect(channelMock.assertExchange).toHaveBeenCalledWith('metrics', 'direct', {durable: false});
    expect(instance).toEqual(channelMock);
  });
});
