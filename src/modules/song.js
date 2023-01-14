const plugin = require('../api/song');
const Service = require('../services/SongService');
const model = require('../models/Song');
const Repository = require('../repositories/SongRepository/postgress');

const SongModule = () => {
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

module.exports = SongModule;
