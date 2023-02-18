const AWSStorage = require('./Aws');
const LocalStorage = require('./Local');

const Config = require('../Config');

class StorageManager {
  constructor({ type, config }) {
    const storageType = type || Config.app.STORAGE_TYPE;
    const STORAGE_TYPE = {
      aws: AWSStorage,
      local: LocalStorage,
    };
    this._storage = new STORAGE_TYPE[storageType](config);
  }

  async add(file, meta) {
    const filename = +new Date() + meta.filename;
    return this._storage.writeFile({ file, meta, filename });
  }
}

module.exports = StorageManager;
