const plugin = require('../api/song');
const model = require('../models/Song');
const Service = require('../services/SongService');
const Repository = require('../repositories/SongRepository/postgres');

const SongModule = () => {
  const repository = new Repository();
  const service = new Service(repository, model);

  return {
    plugin,
    options: { service, model },
  };
};

module.exports = SongModule;
