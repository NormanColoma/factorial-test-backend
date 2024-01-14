const {mongo: {mongoConnectionUri, dbName, timeout}} = require('../../../../../infrastructure/config');
const MongoDbHandler = require('../../../../../infrastructure/persistence/mongo/mongo-db-handler');

describe('MongoDbHandler', () => {
  let subject;
  const mongoMock = {connect: jest.fn()};
  const createIndexesMock = {createIndexes: jest.fn()};
  const collectionMock = jest.fn();
  const dbMock = jest.fn();
  const closeMock = jest.fn();

  beforeEach(() => {
    collectionMock.mockReturnValue(createIndexesMock);
    dbMock.mockReturnValue({collection: collectionMock});
    mongoMock.connect.mockResolvedValue({
      db: dbMock,
      close: closeMock,
    });
    subject = new MongoDbHandler({mongo: mongoMock});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#disconnect', () => {
    it('disconnects from mongo when connection was established', async () => {
      await subject.getInstance();
      await subject.disconnect();

      expect(closeMock).toHaveBeenCalled();
    });

    it('do nothing when no connection was established', async () => {
      subject = new MongoDbHandler({mongo: mongoMock});
      await subject.disconnect();

      expect(closeMock).not.toHaveBeenCalled();
    });
  });

  describe('#getInstance', () => {
    it('should call connect when is not connected', async () => {
      await subject.getInstance();

      expect(mongoMock.connect).toHaveBeenCalledWith(mongoConnectionUri, {serverSelectionTimeoutMS: timeout});
      expect(dbMock).toHaveBeenCalledWith(dbName);
    });

    it('creates indexes when establishing connection', async () => {
      await subject.getInstance();

      expect(createIndexesMock.createIndexes).toHaveBeenCalledWith([
        {name: 'date', key: {'date': 1}},
        {name: 'name', key: {'name': 1}},
      ]);
    });

    it('should not call to connect when its already connected', async () => {
      await subject.getInstance();
      await subject.getInstance();

      expect(mongoMock.connect).toHaveBeenCalledTimes(1);
    });
  });
});
