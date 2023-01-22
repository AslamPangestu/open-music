const plugin = require('../api/album');
const model = require('../models/Album');
const Service = require('../services/AlbumService');
const Repository = require('../repositories/AlbumRepository/postgres');

const AlbumModule = () => {
  const repository = new Repository();
  const service = new Service(repository, model);

  return {
    plugin,
    options: { service, model },
  };
};

module.exports = AlbumModule;
