const plugin = require('../api/album');
const Service = require('../services/AlbumService');
const model = require('../models/Album');
const Repository = require('../repositories/AlbumRepository/postgress');

const AlbumModule = () => {
  const repository = new Repository();
  const service = new Service(repository, model);

  return {
    plugin,
    options: {
      service,
      model,
    },
  };
};

module.exports = AlbumModule;
