const {mongo: {mongoConnectionUri, dbName, timeout}} = require('../../config');

class MongoDbHandler {
  #mongo;
  #instance;
  #client;

  constructor({mongo}) {
    this.#mongo = mongo;
  }

  async #connect() {
    this.#client = await this.#mongo.connect(mongoConnectionUri,
        {serverSelectionTimeoutMS: timeout});
    this.#instance = await this.#client.db(dbName);
    await this.#instance.collection('metrics').createIndexes([
      {name: 'timestamp', key: {'timestamp': 1}},
      {name: 'name', key: {'name': 1}},
    ]);
  }

  async disconnect() {
    if (this.#client) {
      await this.#client.close();
    }
    this.#instance = null;
    this.#client = null;
  }

  async getInstance() {
    if (!this.#instance) {
      await this.#connect();
    }

    return this.#instance;
  }
}

module.exports = MongoDbHandler;
