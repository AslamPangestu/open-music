const redis = require('redis');

const Config = require('../Config');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: Config.cache.REDIS_HOST,
        port: Config.cache.REDIS_PORT,
      },
      password: Config.cache.REDIS_PASSWORD,
    });
    this._client.on('error', (error) => {
      console.error(error);
    });
    this._client.connect();
  }

  async set(key, value, expirationInSecond = 1800) {
    await this._client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  async get(key) {
    const result = await this._client.get(key);
    if (result === null) {
      throw new Error('Cache not found');
    }
    return result;
  }

  delete(key) {
    return this._client.del(key);
  }
}

module.exports = CacheService;
