const plugin = require('../api/album');
const model = require('../models/Album');
const Service = require('../services/AlbumService');
const StorageManager = require('../core/StorageManager');
const Repository = require('../repositories/AlbumRepository/postgres');

const AlbumModule = () => {
  const repository = new Repository();
  const storageManager = new StorageManager({ config: { folder: '/album-covers' } });
  const service = new Service({ repository, storageManager });

  return {
    plugin,
    options: { service, model },
  };
};

module.exports = AlbumModule;
