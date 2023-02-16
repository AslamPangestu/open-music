const plugin = require('../api/export');
const model = require('../models/Export');
const Service = require('../services/ExportService');
const ExportRepository = require('../repositories/ExportRepository/mq');
const PlaylistRepository = require('../repositories/PlaylistRepository/postgres');

const ExportModule = () => {
  const exportRepository = new ExportRepository();
  const playlistRepository = new PlaylistRepository();
  const service = new Service({ exportRepository, playlistRepository });

  return {
    plugin,
    options: { service, model },
  };
};

module.exports = ExportModule;
